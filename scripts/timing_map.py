"""M1: the timing map, the clock every later step reads.

Joins the beat grid (scripts/beats_beat_this.py), the aligned words (scripts/align_words.py) and the brief's shot
list (docs/brief.md) into timing/map.json, a readable timing/map.md and the M1 ear-check subtitles.

Clocks: `t` is seconds of the human's final master (2026-11-08). The Narrator's words and the beats were aligned on the
v2 mix and its stems (M1) and are moved onto the master's clock (song.v2_to_master: +1.0878 s, +2.8915 s after the
bar the human added before V21); Switch's lines are aligned on his comp (lyrics/switch_comp.txt ->
timing/words_switch.json); the sound effects are measured in the FX-only file. `frame` is the video's frame at 30 fps.
The master starts 1.0878 s later than v2 did, so the pre-roll is that much shorter and every frame before the added bar
is where it was: S00's card (2 s), then S01's countdown (3 s) before v2's downbeat:
frame = round((t + PREROLL_S) * FPS), PREROLL_S = 5 - 1.0878.

Switch slots (V01-V21, V20 retired): `take`, the spans of his comped lines in the master, and `room`, from the end of
the Narrator's word before to the start of his word after. Clicks, the horn, the door, the booing, the scratch and the
real switch are the human's effects (FX), each confirmed by an onset in the FX-only file.

Shot cues are resolved in reading order, searching forward from the previous shot's line: a quoted cue matches the
first line holding its words in order (leading words the master doesn't sing, like "Ahem!", are dropped) and the
shot starts at the first matched word. Event cues ([click], the fill, the scratch, the chime, the silence) come from
the events below. A shot ends where the next begins.

Usage: .venv/bin/python -I scripts/timing_map.py  ->  timing/map.json, timing/map.md, review/m1_preview.ass
"""
import json
import re
import sys
from pathlib import Path

import librosa
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import FX, MASTER, OFFSET_1, OFFSET_2, BAR_AFTER_V2, SWITCH_COMP, TITLE, v2_to_master  # noqa: E402

FPS = 30
S00_S = 2.0  # S00: the "cartoon for grown-ups" card, on room tone, before the title
# the master's first downbeat (v2's start, OFFSET_1 into the final master) lands on S01's first frame: the music starts
# the moment the title comes on (the human's note, 2026-11-09, round 6; the 3 s countdown that used to sit between
# them was cut in round 4). Was S00_S + 3.0 - OFFSET_1 = 3.9122; see Clocks
PREROLL_S = round(S00_S - OFFSET_1, 4)
SR = 22050
SLOTS = {  # Switch line: its line IDs in timing/words_switch.json
    "V01": ["L03"], "V02": ["L06"], "V03": ["L08", "L09"], "V04": ["L14a"], "V05": ["L16"], "V06": ["L20"],
    "V07": ["L23"], "V08": ["L28"], "V09": ["L30"], "V10": ["L32", "L33"], "V11": ["L38a"], "V12": ["L41"],
    "V13": ["L43"], "V14": ["L46"], "V15": ["L49"], "V16": ["L57"], "V17": ["L59"], "V18": ["L66", "L67"],
    "V19": ["L70"], "V21": ["L71a"],
}
# The human's effects, master seconds, measured in the FX-only file (2026-11-08; checked by fx_onset below): the real
# switch clicks, the quiz horn (Logic's library), the CANCEL door, the crowd booing and the record scratch (Pixabay)
FX_EVENTS = {
    "click_prechorus_1": 39.277, "click_prechorus_2": 125.865, "horn": [153.28, 153.41], "door_slam": 170.752,
    "booing": [185.0, 190.3], "record_scratch": [187.5, 188.15], "clicks_outro": [222.407, 222.872],
    "click_reveal": 241.805, "switch_off": 250.391,
}
# the piano's entrance after "…learn about…" (onset in the keyboard stem, v2 231.066 -> master 232.154): S63's summary
# box starts appearing on it (the human's note, 2026-11-09)
PIANO_IN = 232.154
HOLD_S = 2.0  # S67 holds on room tone after the audio ends (brief); keep in step with remotion/src/timing.ts
CARD_S = 4.0  # a fact card (brief: about four seconds each)
CARD_WPS = 4.5  # words a second a viewer reads a card at (a long card holds longer)
END_S = 8.0  # the end card
SOUND_S = 7.0  # the sound credits card after it
CREDITS_FADE_S = 4.0  # the credits music fades out over the last seconds of the video
SECTIONS = [  # brief section (one composition each): the as-sung sections it covers
    ("Intro", ["Intro"]), ("Verse 1", ["Verse 1"]), ("Pre-chorus 1", ["Pre-chorus 1"]), ("Chorus 1", ["Chorus 1"]),
    ("Lesson", ["Lesson"]), ("Verse 2", ["Verse 2"]), ("Pre-chorus 2 and Chorus 2", ["Pre-chorus 2", "Chorus 2"]),
    ("Verse 3: Pop Quiz", ["Verse 3: Pop Quiz"]), ("Bridge", ["Bridge", "Bridge redub"]),
    ("Final chorus", ["Final chorus"]), ("Outro and reveal", ["Outro"]),
]


def fr(t):
    return None if t is None else int(round((t + PREROLL_S) * FPS))


def norm(s):
    return [w for w in re.sub(r"[^a-z0-9' ]", " ", s.lower().replace("’", "'").replace("-", " ")).replace("'", "").split()]


def gaps(words, lo=0.3):
    """Gaps between consecutive words longer than lo seconds: [(end of word i, start of word i+1)]."""
    return [(a["end"], b["start"]) for a, b in zip(words, words[1:]) if b["start"] - a["end"] > lo]


def shots_from_brief():
    out, sec = [], None
    for line in Path("docs/brief.md").read_text().splitlines():
        m = re.match(r"### (.+)", line)
        if m:
            sec = m.group(1)
        m = re.match(r"\| (S\d\d[a-z]?) \| (.*?) \| (.*?) \| (.*?) \|$", line)
        if m and m.group(4) != "—":  # a retired shot (S68, 2026-11-09) keeps its row and ID but is not cut
            out.append({"id": m.group(1), "section": sec, "cue": m.group(2), "picture": m.group(3), "source": m.group(4)})
    return out


def fx_onset(fx, t, tol=0.06):
    """The FX file's sharpest rise within tol of t (a check that an effect is where FX_EVENTS says)."""
    i0, i1 = int((t - tol - 0.01) * SR), int((t + tol) * SR)
    e = 20 * np.log10(np.convolve(np.abs(fx[i0:i1]), np.ones(22) / 22, "same") + 1e-9)
    k = np.argmax(e[110:] - e[:-110]) + 110
    return round((i0 + k) / SR, 3), float(e.max())


def to_master(t):
    return v2_to_master(t)


def remap_beats(ts):
    """v2 beats on the master clock, with the added bar filled by repeating the bar before it."""
    out = [to_master(t) for t in ts]
    bar = OFFSET_2 - OFFSET_1
    out += [round(t + OFFSET_2, 3) for t in ts if BAR_AFTER_V2 - bar < t <= BAR_AFTER_V2]
    return sorted(set(out))


def main():
    beats = json.loads(Path("timing/beat_this.json").read_text())["mix"]
    beats = {"beats": remap_beats(beats["beats"]), "downbeats": remap_beats(beats["downbeats"])}
    bt, db = np.array(beats["beats"]), np.array(beats["downbeats"])
    narr_lines = [ln for ln in json.loads(Path("timing/words.json").read_text())["lines"] if ln["singer"] == "narrator"]
    for ln in narr_lines:
        ln["start"], ln["end"] = to_master(ln["start"]), to_master(ln["end"])
        for w in ln["words"]:
            w["start"], w["end"] = to_master(w["start"]), to_master(w["end"])
    sw_lines = json.loads(Path("timing/words_switch.json").read_text())["lines"]
    lines = sorted(narr_lines + sw_lines, key=lambda ln: ln["start"])
    by_id = {ln["id"]: ln for ln in lines}
    y, _ = librosa.load(MASTER, sr=SR, mono=True)
    fx, _ = librosa.load(FX, sr=SR, mono=True)
    for k, v in FX_EVENTS.items():
        if k in ("booing", "record_scratch", "horn"):
            continue
        for t in (v if isinstance(v, list) else [v]):
            got, peak = fx_onset(fx, t)
            assert abs(got - t) < 0.03 and peak > -40, (k, t, got, peak)
    duration = round(len(y) / SR, 3)
    rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    # the music ends where the mix falls 40 dB below its loudest frame for good (the tail never reaches -60 dBFS)
    loud = np.where(20 * np.log10(rms / rms.max() + 1e-12) > -40)[0]
    audio_end = round(float(librosa.frames_to_time(loud[-1], sr=SR, hop_length=512)), 3)
    narr = [w for ln in lines if ln["singer"] == "narrator" for w in ln["words"]]
    # the band's last note: where the human put the real switch's OFF (S67's hand flips it there)
    last_note = FX_EVENTS["switch_off"]

    def room(t0, t1):
        before = [w["end"] for w in narr if w["end"] <= t0 + 0.05]
        after = [w["start"] for w in narr if w["start"] >= t1 - 0.05]
        return [round(max(before), 3) if before else 0.0, round(min(after), 3) if after else duration]

    # events: the human's effects (FX_EVENTS); the pop-up chime is the generator's (v2, moved)
    c1, c2, ob = FX_EVENTS["click_prechorus_1"], FX_EVENTS["click_prechorus_2"], FX_EVENTS["clicks_outro"]
    events = {
        "first_downbeat": round(float(db[0]), 3),
        "click_prechorus_1": c1, "click_prechorus_2": c2, "horn": FX_EVENTS["horn"], "door_slam": FX_EVENTS["door_slam"],
        "booing": FX_EVENTS["booing"], "record_scratch": FX_EVENTS["record_scratch"], "clicks_outro": ob,
        "popup_chime": to_master(232.32), "piano_in": PIANO_IN, "click_reveal": FX_EVENTS["click_reveal"],
        "last_word_end": by_id["L71"]["end"],
        "last_note": last_note,
        "audio_end": audio_end,
    }
    for k, v in list(events.items()):
        events[k + "_frame"] = [fr(x) for x in v] if isinstance(v, list) else fr(v)

    # Switch slots: his comped takes
    slots = []
    for vid, lids in SLOTS.items():
        ws = [w for lid in lids for w in by_id[lid]["words"]]
        r = room(ws[0]["start"], ws[-1]["end"])
        slot = {"id": vid, "lines": lids, "text": " / ".join(by_id[lid]["text"] for lid in lids),
                "take": [[by_id[lid]["start"], by_id[lid]["end"]] for lid in lids], "room": r,
                "take_len": round(ws[-1]["end"] - ws[0]["start"], 3)}
        if vid in ("V03", "V10"):
            slot["click"] = c1 if vid == "V03" else c2
        if vid == "V18":
            slot["clicks"] = ob
        slot["room_len"] = round(slot["room"][1] - slot["room"][0], 3)
        slot["room_frames"] = [fr(x) for x in slot["room"]]
        slots.append(slot)

    # sections
    secs = []
    for name, parts in SECTIONS:
        ls = [ln for ln in lines if ln["section"] in parts]
        secs.append({"name": name, "first_line": ls[0]["id"], "last_line": ls[-1]["id"], "first_word": ls[0]["start"]})
    for k, s in enumerate(secs):
        if k == 0:
            s["start"] = 0.0
        else:
            prev_end = by_id[secs[k - 1]["last_line"]]["end"]
            cand = db[(db <= s["first_word"]) & (db >= prev_end - 0.05)]
            s["start"] = round(float(cand[-1]) if len(cand) else s["first_word"] - 0.2, 3)
    for k, s in enumerate(secs):
        s["end"] = secs[k + 1]["start"] if k + 1 < len(secs) else duration
        s["frame_start"], s["frame_end"] = fr(s["start"]), fr(s["end"])
    if secs[0]["name"] == "Intro":
        secs[0]["frame_start"] = 0  # the pre-roll belongs to the intro

    # shots
    shots = shots_from_brief()
    v04, v11, v21 = (by_id[x] for x in ("L14a", "L38a", "L71a"))
    special = {
        "S00": (-PREROLL_S, None, "pre-roll card on room tone, before the title"),
        "S01": (S00_S - PREROLL_S, None, "the title (its countdown cut, 2026-11-09); the rocker flips after the first downbeat"),
        "S11": (c1, "L09", "the real click"),
        "S18": (v04["end"], "L14a", "after Switch's V04 tag"),
        "S36": (c2, "L33", "the real click"),
        "S37": (by_id["L34"]["start"], "L34", "first chorus-2 line"),
        "S39": (v11["start"], "L38a", "Switch's V11 tag"),
        "S52": (events["record_scratch"][0], "L54", "the record scratch (under the booing)"),
        "S57": (by_id["L61"]["start"], "L61", "first final-chorus line"),
        "S58": (by_id["L65"]["start"], "L65", "last \"Default on!\""),
        "S60": (ob[0], "L66", "first outro click (the human's comp has two)"),
        "S63": (events["piano_in"], "L68", "the piano comes in; \"Huh.\" is not sung"),
        "S66": (events["click_reveal"], "L71", "the click between \"An AI did.\" and \"...But\""),
        "S67": (v21["start"], "L71a", "V21 over the band's tail; the hand flips on the last note; holds past the audio"),
    }
    cur = 0
    for s in shots:
        if s["id"] in special:
            t, lid, how = special[s["id"]]
            if lid:
                cur = lines.index(by_id[lid])
            s.update(t=round(t, 3), line=lid, how=how)
            continue
        q = re.findall(r"\"([^\"]+)\"", s["cue"])
        cue = norm((q[0] if q else s["cue"]).split(" / ")[0])
        hit = None
        for drop in range(len(cue)):
            want = cue[drop:]
            for k in range(cur, len(lines)):
                ws = lines[k]["words"]
                toks = [norm(w["w"]) for w in ws]
                flat = [(i, t) for i, ts in enumerate(toks) for t in ts]
                for j in range(len(flat)):
                    if [t for _, t in flat[j:j + len(want)]] == want:
                        hit = (k, ws[flat[j][0]]["start"], drop)
                        break
                if hit:
                    break
            if hit:
                break
        if not hit:
            s.update(t=None, line=None, how="UNRESOLVED")
            continue
        cur = hit[0]
        s.update(t=round(hit[1], 3), line=lines[cur]["id"],
                 how="cue words" + (f" (first {hit[2]} not sung)" if hit[2] else ""))
    # the post-roll (brief, End card and fact cards; M5): after S67's hold, fact card G, the creator's disclosure card
    # (formerly S68), one card per fact-card row in table order, then the end card. Content in remotion/src/closing.json.
    # A card holds for about four seconds (brief) or longer if its words need it: reading at CARD_WPS words a second,
    # plus a second and a half to find the start; the end card holds END_S. The end card's intervention count is the
    # number of entries in log/human_interventions.md as of this run.
    closing = json.load(open("remotion/src/closing.json"))
    words = lambda txt: len(txt.split())
    card_len = lambda txt: max(CARD_S, round(words(txt) / CARD_WPS + 1.5, 1))
    t = audio_end + HOLD_S
    post = []
    for c, what in [(closing["G"], "fact card G"), (closing["D"], "the creator's disclosure")] + \
            [(r, f"fact card: {r['lyric']}") for r in closing["rows"]]:
        post.append({"id": c["id"], "what": what, "t": round(t, 3), "len_s": card_len(c["body"])})
        t += post[-1]["len_s"]
    interventions = sum(1 for ln in open("log/human_interventions.md") if ln.startswith("## "))
    post.append({"id": closing["end"]["id"], "what": "end card", "t": round(t, 3), "len_s": END_S, "interventions": interventions})
    t += END_S
    post.append({"id": closing["sound"]["id"], "what": "sound credits", "t": round(t, 3), "len_s": SOUND_S})
    t += SOUND_S
    for p in post:
        p["frame"] = fr(p["t"])
    video_end = fr(t)
    for k, s in enumerate(shots):
        s["frame"] = fr(s["t"])
        nxt = shots[k + 1]["t"] if k + 1 < len(shots) else t
        if s["id"] == "S67":
            nxt = post[0]["t"]  # S67 hands over to fact card G
        s["end"] = nxt
        s["frame_end"] = fr(nxt) if nxt is not None else None
    next(s for s in shots if s["id"] == "S67")["note"] = "real footage; runs past the audio, holding 2 s on room tone, then fact card G"

    for ln in lines:
        ln["frame_start"], ln["frame_end"] = fr(ln["start"]), fr(ln["end"])
    iv = np.diff(bt)
    out = {"title": TITLE, "fps": FPS, "preroll_s": PREROLL_S, "audio": MASTER, "clock": "the human's final master; "
           f"v2 times + {OFFSET_1} s (+ {OFFSET_2} s after v2 {BAR_AFTER_V2} s)", "duration_s": duration,
           "duration_frames": fr(duration), "frame_formula": "round((t + preroll_s) * fps)", "meter": "4/4",
           "bpm_median": round(60 / float(np.median(iv)), 1), "beats": beats["beats"], "downbeats": beats["downbeats"],
           "events": events, "post": post, "video_end_frame": video_end,
           # the credits music (the human's, 2026-11-09): from its start on fact card G's first frame, faded out over
           # the video's last CREDITS_FADE_S seconds
           "credits_audio": {"file": "audio/credits/default-on-credits.wav", "frame": post[0]["frame"], "fade_s": CREDITS_FADE_S}, "sections": secs, "switch_slots": slots, "lines": lines, "shots": shots}
    Path("timing/map.json").write_text(json.dumps(out, indent=1) + "\n")

    md = [f"# Timing map: {TITLE}", "", f"Generated by `scripts/timing_map.py` from `timing/map.json`. {FPS} fps; "
          f"frame = round((t + {PREROLL_S}) × {FPS}). Audio {duration} s; music ends {audio_end} s; median "
          f"{out['bpm_median']} BPM (beat_this).", "", "## Sections", "", "| Section | Start s | End s | Frames |",
          "| --- | --- | --- | --- |"]
    md += [f"| {s['name']} | {s['start']:.2f} | {s['end']:.2f} | {s['frame_start']}–{s['frame_end']} |" for s in secs]
    md += ["", "## Switch slots", "", "Take = his comped line(s) in the master. Room = Narrator's word before → "
           "Narrator's word after.", "", "| ID | Line | Take s | Room s | Room len s |", "| --- | --- | --- | --- | --- |"]
    for s in slots:
        take = ", ".join(f"{a:.2f}–{b:.2f}" for a, b in s["take"])
        md.append(f"| {s['id']} | {s['text']} | {take} | {s['room'][0]:.2f}–{s['room'][1]:.2f} | {s['room_len']:.2f} |")
    md += ["", "## Events", ""] + [f"- **{k}:** {v}" for k, v in events.items() if not k.endswith("_frame")]
    md += ["", "## Shots", "", "| Shot | Section | Cue | t s | Frame | Line | How |", "| --- | --- | --- | --- | --- | --- | --- |"]
    md += [f"| {s['id']} | {s['section']} | {s['cue']} | {'' if s['t'] is None else f'{s[chr(116)]:.2f}'} | "
           f"{s['frame']} | {s['line'] or ''} | {s['how']} |" for s in shots]
    md += ["", "## Lines", "", "| Line | Singer | Section | Start s | End s | Text |", "| --- | --- | --- | --- | --- | --- |"]
    md += [f"| {ln['id']} | {ln['singer']} | {ln['section']} | {ln['start']:.2f} | {ln['end']:.2f} | {ln['text']} |"
           for ln in lines]
    Path("timing/map.md").write_text("\n".join(md) + "\n")
    write_ass(out)
    for s in shots:
        print(f"{s['id']} {s['t'] if s['t'] is not None else '—':>8} {s['line'] or '':4s} {s['how']:44s} {s['cue'][:50]}")
    for s in slots:
        print(s["id"], s["take"], "room", s["room"], s["room_len"])
    print(json.dumps({k: v for k, v in events.items() if not k.endswith("_frame")}))
    print([(s["name"], s["start"]) for s in secs])



def ass_t(t):
    t = max(0.0, t)
    return f"{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}"


def write_ass(m):
    """Subtitles for the M1 ear-check preview, on the audio clock (no pre-roll): shot labels top left, Switch slots
    mid-frame (room in grey, the line in green), events top right, karaoke lyrics at the bottom (Switch in green)."""
    head = ("[Script Info]\nScriptType: v4.00+\nPlayResX: 640\nPlayResY: 360\n\n[V4+ Styles]\n"
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, "
            "Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, "
            "MarginR, MarginV, Encoding\n"
            "Style: Shot,DejaVu Sans,14,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,0,7,12,12,10,1\n"
            "Style: Event,DejaVu Sans,15,&H0000FFFF,&H0000FFFF,&H00000000,&H00000000,1,0,0,0,100,100,0,0,1,1,0,9,12,12,10,1\n"
            "Style: Lyric,DejaVu Sans,18,&H0000C8FF,&H00FFFFFF,&H00000000,&H00000000,1,0,0,0,100,100,0,0,1,1,0,2,20,20,24,1\n"
            "Style: Switch,DejaVu Sans,18,&H0060E060,&H00FFFFFF,&H00000000,&H00000000,1,0,0,0,100,100,0,0,1,1,0,2,20,20,24,1\n"
            "Style: Room,DejaVu Sans,15,&H00A0A0A0,&H00A0A0A0,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,0,5,20,20,20,1\n"
            "Style: Slot,DejaVu Sans,20,&H0060E060,&H0060E060,&H00000000,&H00000000,1,0,0,0,100,100,0,0,1,1,0,5,20,20,20,1\n\n"
            "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n")
    ev = []
    for s in m["shots"]:
        if s["t"] is None:
            continue
        end = s["end"] if s["end"] is not None else s["t"] + 3
        ev.append(f"Dialogue: 0,{ass_t(s['t'])},{ass_t(end)},Shot,,0,0,0,,{s['id']}  {s['cue'][:78]}")
    for s in m["switch_slots"]:
        a, b = s["room"]
        ev.append(f"Dialogue: 0,{ass_t(a)},{ass_t(b)},Room,,0,0,0,,{{\\pos(320,150)}}{s['id']} room {b - a:.2f} s")
        for x, y in s["take"]:
            ev.append(f"Dialogue: 1,{ass_t(x)},{ass_t(y)},Slot,,0,0,0,,{{\\pos(320,180)}}{s['id']} TAKE")
    e = m["events"]
    marks = [(e["click_prechorus_1"], "CLICK"), (e["click_prechorus_2"], "CLICK")] + [(t, "CLICK") for t in e["clicks_outro"]]
    marks += [(e["horn"][0], "HORN"), (e["door_slam"], "DOOR"), (e["booing"][0], "BOOING"), (e["record_scratch"][0], "SCRATCH"),
              (e["popup_chime"], "CHIME"), (e["click_reveal"], "CLICK"), (e["last_word_end"], "LAST WORD"), (e["last_note"], "SWITCH OFF")]
    for t, txt in marks:
        ev.append(f"Dialogue: 0,{ass_t(t)},{ass_t(t + 0.35)},Event,,0,0,0,,{txt}")
    for ln in m["lines"]:
        parts, cur = [], ln["start"]
        for w in ln["words"]:
            parts.append(f"{{\\k{max(0, int(round((w['start'] - cur) * 100)))}}}")
            parts.append(f"{{\\kf{max(1, int(round((w['end'] - w['start']) * 100)))}}}{w['w']} ")
            cur = w["end"]
        style = "Switch" if ln["singer"] == "switch" else "Lyric"
        ev.append(f"Dialogue: 0,{ass_t(ln['start'] - 0.3)},{ass_t(ln['end'] + 0.4)},{style},,0,0,0,,{''.join(parts)}")
    Path("review").mkdir(exist_ok=True)
    Path("review/m1_preview.ass").write_text(head + "\n".join(ev) + "\n")


if __name__ == "__main__":
    main()
