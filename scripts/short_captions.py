"""Captions for the two vertical cuts, cut from captions/default_on.en.srt: every cue that overlaps the short's window
of the main timeline, shifted to the short's clock and clipped to the window (the closing card after it has no
words). Windows as in remotion/src/compositions/Vertical.tsx: Vertical S09 to the end of S17; VerticalSchool S48 to
the start of the outro. Writes captions/default_on_vertical.en.srt and captions/default_on_vertical_school.en.srt.
Run after scripts/captions.py: .venv/bin/python -I scripts/short_captions.py
"""
import json
import re
from pathlib import Path

m = json.loads(Path("timing/map.json").read_text())
FPS = m["fps"]
shots = {s["id"]: s for s in m["shots"]}
outro = next(s for s in m["sections"] if s["name"] == "Outro and reveal")["frame_start"]
WINDOWS = {
    "default_on_vertical": (shots["S09"]["frame"], shots["S17"]["frame_end"]),
    "default_on_vertical_school": (shots["S48"]["frame"], outro),
}

def t2s(t):
    h, mi, s = t.replace(",", ".").split(":")
    return int(h) * 3600 + int(mi) * 60 + float(s)

def s2t(x):
    ms = round(x * 1000)
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02},{ms % 1000:03}"

cues = []
for block in Path("captions/default_on.en.srt").read_text().strip().split("\n\n"):
    rows = block.split("\n")
    a, b = re.match(r"(\S+) --> (\S+)", rows[1]).groups()
    cues.append((t2s(a), t2s(b), "\n".join(rows[2:])))

for name, (f0, f1) in WINDOWS.items():
    lo, hi = f0 / FPS, f1 / FPS
    out = [(max(a, lo) - lo, min(b, hi) - lo, txt) for a, b, txt in cues if b > lo and a < hi]
    out = [c for c in out if c[1] - c[0] >= 0.2]
    srt = "\n\n".join(f"{i}\n{s2t(a)} --> {s2t(b)}\n{t}" for i, (a, b, t) in enumerate(out, 1)) + "\n"
    Path(f"captions/{name}.en.srt").write_text(srt)
    print(f"{name}: {len(out)} cues, {lo:.3f}-{hi:.3f} s of the main cut")
