"""M1: the timing map, the clock every later step reads.

Joins the beat grid (scripts/beats_beat_this.py), the aligned words (scripts/align_words.py) and the brief's shot
list (docs/brief.md) into timing/map.json, a readable timing/map.md and the M1 ear-check subtitles.

Clocks: `t` is seconds of the audio (the locked mix, v2). `frame` is the video's frame at 30 fps, which starts
PREROLL_S before the audio: S00's "cartoon for grown-ups" card (2 s), then S01's film-leader countdown (3 s) before
the downbeat: frame = round((t + PREROLL_S) * FPS).

Switch slots (V01-V20): the generator sang every Switch line itself, in the lead stem. Each slot has `mute`, the
spans of the generated attempt (muted in the final mix), and `room`, from the end of the Narrator's word before to
the start of his word after: the most a take can fill without overlapping him. V04 and V11 ("On, on, on...") were not
generated; their slots are proposed after the chorus's last "Default on!". V21 (new in Draft 3) has no generated
attempt either: it is proposed over the band's tail, after the Narrator's last word and before the band's last note,
where S67's real hand flips the switch off. V20 is retired (the generation has no sing-along). Clicks sit in the
vocal gaps the
generator left at each [click]: one per pre-chorus, three in the outro (on the beats inside the gap).

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
from song import BACKING, STEM, TITLE, TRACK  # noqa: E402

FPS = 30
S00_S = 2.0  # S00: the "cartoon for grown-ups" card, on room tone, before the countdown
PREROLL_S = S00_S + 3.0  # then S01's film-leader countdown (3 s, approved at the M1 gate) before the downbeat
SR = 22050
PAD = (0.08, 0.12)  # mute pad before/after a generated Switch word, clipped to the room
SLOTS = {  # Switch line: aligned line IDs (timing/words.json) of the generator's attempt; None = not generated
    "V01": ["L03"], "V02": ["L06"], "V03": ["L08", "L09"], "V04": None, "V05": ["L16"], "V06": ["L20"],
    "V07": ["L23"], "V08": ["L28"], "V09": ["L30"], "V10": ["L32", "L33"], "V11": None, "V12": ["L41"],
    "V13": ["L43"], "V14": ["L46"], "V15": ["L49"], "V16": ["L57"], "V17": ["L59"], "V18": ["L66", "L67"],
    "V19": ["L70"], "V21": None,
}
TAG_AFTER = {"V04": "L14", "V11": "L38"}  # ungenerated tags: after this line's last word
TAG_LEN = 2.4  # proposed length of an ungenerated "(On, on, on...)" tag, seconds
V21_GAP = 0.6  # V21 starts this long after the Narrator's last word
HOLD_S = 2.0  # S67 holds on room tone after the audio ends (brief); keep in step with remotion/src/timing.ts
CARD_S = 4.0  # a fact card (brief: about four seconds each)
S68_S = 5.0  # S68, the swag shot (brief: about five seconds)
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
        if m:
            out.append({"id": m.group(1), "section": sec, "cue": m.group(2), "picture": m.group(3), "source": m.group(4)})
    return out


def main():
    beats = json.loads(Path("timing/beat_this.json").read_text())["mix"]
    bt, db = np.array(beats["beats"]), np.array(beats["downbeats"])
    lines = json.loads(Path("timing/words.json").read_text())["lines"]
    by_id = {ln["id"]: ln for ln in lines}
    y, _ = librosa.load(TRACK, sr=SR, mono=True)
    duration = round(len(y) / SR, 3)
    rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    # the music ends where the mix falls 40 dB below its loudest frame for good (the tail never reaches -60 dBFS)
    loud = np.where(20 * np.log10(rms / rms.max() + 1e-12) > -40)[0]
    audio_end = round(float(librosa.frames_to_time(loud[-1], sr=SR, hop_length=512)), 3)
    narr = [w for ln in lines if ln["singer"] == "narrator" for w in ln["words"]]
    # the band's last note: the last strong onset in the mix after the last word (S67's hand flips the switch on it)
    env = librosa.onset.onset_strength(y=y, sr=SR, hop_length=512)
    ot = librosa.times_like(env, sr=SR, hop_length=512)
    tail = (ot > by_id["L71"]["end"]) & (ot < audio_end)
    strong = np.where(tail & (env > 0.5 * env[tail].max()))[0]
    last_note = round(float(ot[strong[-1]]), 3)

    def room(t0, t1):
        before = [w["end"] for w in narr if w["end"] <= t0 + 0.05]
        after = [w["start"] for w in narr if w["start"] >= t1 - 0.05]
        return [round(max(before), 3) if before else 0.0, round(min(after), 3) if after else duration]

    # events: clicks in the generator's gaps, the fill, the scratch, the chime, the silence
    def click_in(lid):
        g = max(gaps(by_id[lid]["words"]), key=lambda ab: ab[1] - ab[0])
        inside = bt[(bt > g[0]) & (bt < g[1])]
        return round(float(inside[0]) if len(inside) else (g[0] + g[1]) / 2, 3), g

    c1, g1 = click_in("L09")
    c2, g2 = click_in("L33")
    og = (by_id["L66"]["end"], by_id["L67"]["start"])
    ob = [round(float(b), 3) for b in bt[(bt > og[0]) & (bt < og[1])]][:3]
    if len(ob) < 3:
        ob = [round(og[0] + (og[1] - og[0]) * k / 4, 3) for k in (1, 2, 3)]
    events = {
        "first_downbeat": round(float(db[0]), 3),
        "click_prechorus_1": c1, "click_prechorus_1_gap": [round(x, 3) for x in g1],
        "click_prechorus_2": c2, "click_prechorus_2_gap": [round(x, 3) for x in g2],
        "clicks_outro": ob, "clicks_outro_gap": [round(x, 3) for x in og],
        "record_scratch": [by_id["L54"]["end"], by_id["L55"]["start"]],
        "popup_chime": round((by_id["L68"]["end"] + by_id["L69"]["start"]) / 2, 3),
        "last_word_end": by_id["L71"]["end"],
        "last_note": last_note,
        "audio_end": audio_end,
    }
    for k, v in list(events.items()):
        events[k + "_frame"] = [fr(x) for x in v] if isinstance(v, list) else fr(v)

    # Switch slots
    slots = []
    for vid, lids in SLOTS.items():
        if vid == "V21":
            t0 = by_id["L71"]["end"] + V21_GAP
            r = [by_id["L71"]["end"], last_note]
            slot = {"id": vid, "generated": False, "lines": [], "text": "Hey... was its switch on, too?", "mute": [],
                    "room": r, "proposed": [round(t0, 3), round(min(t0 + TAG_LEN, last_note - 0.3), 3)],
                    "note": "new in Draft 3; over the band's tail, before the last note (S67)"}
        elif lids is None:
            t0 = by_id[TAG_AFTER[vid]]["end"] + 0.1
            r = room(t0, t0 + TAG_LEN)
            slot = {"id": vid, "generated": False, "lines": [], "text": "(On, on, on...)", "mute": [],
                    "room": r, "proposed": [round(t0, 3), round(min(t0 + TAG_LEN, r[1]), 3)],
                    "note": "not generated; placed after the chorus's last \"Default on!\" (M1 gate)"}
        else:
            ws = [w for lid in lids for w in by_id[lid]["words"]]
            r = room(ws[0]["start"], ws[-1]["end"])
            mute = [[round(max(r[0], by_id[lid]["start"] - PAD[0]), 3), round(min(r[1], by_id[lid]["end"] + PAD[1]), 3)]
                    for lid in lids]
            slot = {"id": vid, "generated": True, "lines": lids, "text": " / ".join(by_id[lid]["text"] for lid in lids),
                    "mute": mute, "room": r, "generated_len": round(ws[-1]["end"] - ws[0]["start"], 3)}
            if vid in ("V03", "V10"):
                slot["click"] = c1 if vid == "V03" else c2
            if vid == "V18":
                slot["clicks"] = ob
        slot["room_len"] = round(slot["room"][1] - slot["room"][0], 3)
        slot["room_frames"] = [fr(x) for x in slot["room"]]
        slots.append(slot)
    # backing-stem bleed of the generated Switch inside each mute span (dB re the stem's median active level)
    by, _ = librosa.load(STEM.format(BACKING), sr=SR, mono=True)
    brms = 20 * np.log10(librosa.feature.rms(y=by, frame_length=2048, hop_length=512)[0] + 1e-12)
    ref = float(np.median(brms[brms > -60]))
    for s in slots:
        peaks = []
        for a, b in s["mute"]:
            f0, f1 = librosa.time_to_frames([a, b], sr=SR, hop_length=512)
            peaks.append(round(float(brms[f0:f1 + 1].max()) - ref, 1))
        s["backing_peak_db_re_median"] = peaks

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
    v04, v11, v21 = (next(s for s in slots if s["id"] == v) for v in ("V04", "V11", "V21"))
    special = {
        "S00": (-PREROLL_S, None, "pre-roll card on room tone, before the countdown"),
        "S01": (S00_S - PREROLL_S, None, "pre-roll countdown, title on the first downbeat"),
        "S11": (c1, "L09", "click in the generator's gap"),
        "S18": (v04["proposed"][1], "L14", "after the proposed V04 tag"),
        "S36": (c2, "L33", "click in the generator's gap"),
        "S37": (by_id["L34"]["start"], "L34", "first chorus-2 line"),
        "S39": (v11["proposed"][0], "L38", "proposed V11 tag (not generated)"),
        "S52": (events["record_scratch"][0], "L54", "vocal gap before the redub"),
        "S57": (by_id["L61"]["start"], "L61", "first final-chorus line"),
        "S58": (by_id["L65"]["start"], "L65", "last \"Default on!\""),
        "S60": (ob[0], "L66", "first outro click"),
        "S63": (events["popup_chime"], "L68", "chime in the gap; \"Huh.\" is not sung"),
        "S67": (v21["proposed"][0], "L71", "V21 over the band's tail; the hand flips on the last note; holds past the audio"),
        "S68": (audio_end + HOLD_S + CARD_S, "L71", "post-roll: after fact card G"),
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
    # the post-roll so far (brief, End card and fact cards): S67's hold, fact card G, then S68; the other cards are M5's
    post = [{"id": "FG", "what": "fact card G", "t": round(audio_end + HOLD_S, 3), "len_s": CARD_S},
            {"id": "S68", "what": "the swag shot (real footage)", "t": round(audio_end + HOLD_S + CARD_S, 3), "len_s": S68_S}]
    for p in post:
        p["frame"] = fr(p["t"])
    video_end = fr(audio_end + HOLD_S + CARD_S + S68_S)
    for k, s in enumerate(shots):
        s["frame"] = fr(s["t"])
        nxt = shots[k + 1]["t"] if k + 1 < len(shots) else audio_end + HOLD_S + CARD_S + S68_S
        if s["id"] == "S67":
            nxt = post[0]["t"]  # S67 hands over to fact card G
        s["end"] = nxt
        s["frame_end"] = fr(nxt) if nxt is not None else None
    next(s for s in shots if s["id"] == "S67")["note"] = "real footage; runs past the audio, holding 2 s on room tone, then fact card G"

    for ln in lines:
        ln["frame_start"], ln["frame_end"] = fr(ln["start"]), fr(ln["end"])
    iv = np.diff(bt)
    out = {"title": TITLE, "fps": FPS, "preroll_s": PREROLL_S, "audio": TRACK, "duration_s": duration,
           "duration_frames": fr(duration), "frame_formula": "round((t + preroll_s) * fps)", "meter": "4/4",
           "bpm_median": round(60 / float(np.median(iv)), 1), "beats": beats["beats"], "downbeats": beats["downbeats"],
           "events": events, "post": post, "video_end_frame": video_end, "sections": secs, "switch_slots": slots, "lines": lines, "shots": shots}
    Path("timing/map.json").write_text(json.dumps(out, indent=1) + "\n")

    md = [f"# Timing map: {TITLE}", "", f"Generated by `scripts/timing_map.py` from `timing/map.json`. {FPS} fps; "
          f"frame = round((t + {PREROLL_S}) × {FPS}). Audio {duration} s; music ends {audio_end} s; median "
          f"{out['bpm_median']} BPM (beat_this).", "", "## Sections", "", "| Section | Start s | End s | Frames |",
          "| --- | --- | --- | --- |"]
    md += [f"| {s['name']} | {s['start']:.2f} | {s['end']:.2f} | {s['frame_start']}–{s['frame_end']} |" for s in secs]
    md += ["", "## Switch slots", "", "Mute = the generator's attempt (muted in the final mix). Room = Narrator's word "
           "before → Narrator's word after. Backing = loudest backing-stem level inside the mute span, dB re its median.",
           "", "| ID | Line | Generated s | Mute s | Room s | Room len s | Backing dB |", "| --- | --- | --- | --- | --- | --- | --- |"]
    for s in slots:
        gen = f"{s['generated_len']:.2f}" if s["generated"] else "not sung"
        mute = ", ".join(f"{a:.2f}–{b:.2f}" for a, b in s["mute"]) or (
            f"proposed {s['proposed'][0]:.2f}–{s['proposed'][1]:.2f}" if "proposed" in s else "none")
        md.append(f"| {s['id']} | {s['text']} | {gen} | {mute} | {s['room'][0]:.2f}–{s['room'][1]:.2f} | "
                  f"{s['room_len']:.2f} | {', '.join(map(str, s['backing_peak_db_re_median'])) or '—'} |")
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
        print(s["id"], s.get("mute") or s.get("proposed"), "room", s["room"], s["room_len"], s["backing_peak_db_re_median"])
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
        for x, y in s["mute"] or ([s["proposed"]] if "proposed" in s else []):
            ev.append(f"Dialogue: 1,{ass_t(x)},{ass_t(y)},Slot,,0,0,0,,{{\\pos(320,180)}}"
                      f"{s['id']} {'MUTED' if s['generated'] else 'PROPOSED'}")
    e = m["events"]
    marks = [(e["click_prechorus_1"], "CLICK"), (e["click_prechorus_2"], "CLICK")] + [(t, "CLICK") for t in e["clicks_outro"]]
    marks += [(e["record_scratch"][0], "SCRATCH"), (e["popup_chime"], "CHIME"), (e["last_word_end"], "LAST WORD")]
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
