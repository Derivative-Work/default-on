"""M5: closed captions for the full video (brief: captions match the master as sung, including any words Switch
changed). One cue per line of timing/map.json, on the video's clock (frame / fps, so the pre-roll is included), with
the line's text as the map holds it: the Narrator's from the transcription of the master, Switch's from the human's comp
(timing/words_switch.json). Sung lines sit between music notes; spoken ones don't (the song doc's [spoken] tags).
Switch's lines are labelled SWITCH:, the Narrator's are not (he carries the song). The sound effects in the map's
events become bracketed cues, and the clicks inside "You push me down for off... ...so how'd I just return?" are written
in. Rows wrap at 42 characters, two rows at most; a cue holds at least a second, up to the next cue.
Writes captions/default_on.en.srt (and prints a summary). Run: .venv/bin/python -I scripts/captions.py
"""
import json
import textwrap
from pathlib import Path

m = json.loads(Path("timing/map.json").read_text())
FPS = m["fps"]
pre = m["preroll_s"]
ev = m["events"]
sec = lambda frame: frame / FPS
at = lambda t: t + pre  # audio seconds -> video seconds

SPOKEN = {"L01", "L02", "L03", "L19", "L20", "L39", "L68", "L69", "L70", "L71", "L71a"}
CLICK_IN = {"L09", "L33"}  # "...off... [click] ...so how'd..."

cues = []
for ln in m["lines"]:
    text = ln["text"]
    if ln["id"] in CLICK_IN:
        text = text.replace("... ...", "... [click] ...")
    if ln["id"] == "L66":
        text += " [click] [click] [click]"
    if ln["id"] not in SPOKEN:
        text = f"♪ {text} ♪"
    if ln["singer"] == "switch":
        text = f"SWITCH: {text}"
    cues.append([sec(ln["frame_start"]), sec(ln["frame_end"]), text])

# the music and the sound effects (the human's FX, timed in the FX-only file; events in the map)
fx = [
    (sec(m["shots"][1]["frame"]), "♪ [upbeat swung jazz-folk] ♪"),
    (at(ev["horn"][0]), "[wrong-answer horn]"),
    (at(ev["door_slam"]), "[door slams]"),
    (at(ev["booing"][0]), "[crowd boos]"),
    (at(ev["record_scratch"][0]), "[record scratch, tape rewinds]"),
    # no "[pop-up chime]": the human's mix has no chime there (2026-11-10: the box arrives with the piano instead); the
    # map's popup_chime only marks where the lyric's tag sat
    (at(ev["last_note"]), "[light switch clicks off]"),
]
shot = {s["id"]: s for s in m["shots"]}
fx.append((sec(shot["S18"]["frame"]), "♪ [flute and scat] ♪"))
for t, text in fx:
    cues.append([t, t + 1.5, text])

cues.sort(key=lambda c: c[0])
for k, c in enumerate(cues):
    nxt = cues[k + 1][0] if k + 1 < len(cues) else c[0] + 3
    c[1] = max(c[1], min(c[0] + 1.0, nxt))  # at least a second, not past the next cue's start


def stamp(s):
    ms = int(round(s * 1000))
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"


out = []
for i, (a, b, text) in enumerate(cues, 1):
    rows = textwrap.wrap(text, 42)
    if len(rows) > 2:  # rebalance into two rows
        rows = textwrap.wrap(text, (len(text) + 1) // 2 + 6)
    out.append(f"{i}\n{stamp(a)} --> {stamp(b)}\n" + "\n".join(rows) + "\n")
Path("captions").mkdir(exist_ok=True)
Path("captions/default_on.en.srt").write_text("\n".join(out))
print(f"{len(cues)} cues; last ends {stamp(cues[-1][1])}; video ends {stamp(sec(m['video_end_frame']))}")
