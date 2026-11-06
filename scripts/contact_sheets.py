"""Review aid (brief, Pipeline): one contact sheet per shot, review/<shot>.jpg, from a rendered video of the whole cut.
Four frames per shot (at 10%, 35%, 65% and 90% of its range on screen) tiled 2x2, each 480 px wide; the render's own
burn-in names the shot and frame. Shot ranges come from timing/map.json (S67 holds 2 s past the audio, as in
remotion/src/timing.ts). A section render starts at frame <offset> of the cut; only the shots inside it get sheets.
Each frame is seeked to directly, so a sheet doesn't decode the whole video.

Usage: python3 -I scripts/contact_sheets.py <video> [<offset> <frames>]
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

HOLD_S = 2  # keep in step with remotion/src/timing.ts


def ranges():
    m = json.loads(Path("timing/map.json").read_text())
    end = round((m["events"]["audio_end"] + HOLD_S + m["preroll_s"]) * m["fps"])
    s = m["shots"]
    return m["fps"], [(x["id"], x["frame"], s[i + 1]["frame"] if i + 1 < len(s) else end) for i, x in enumerate(s)]


def main(video, offset=0, length=None):
    fps, shots = ranges()
    Path("review").mkdir(exist_ok=True)
    shots = [(sid, a - offset, b - offset) for sid, a, b in shots]
    if length is not None:
        shots = [(sid, max(a, 0), min(b, length)) for sid, a, b in shots if 0 <= a < length]
    with tempfile.TemporaryDirectory() as tmp:
        for sid, a, b in shots:
            paths = []
            for k, q in enumerate((0.1, 0.35, 0.65, 0.9)):
                p = f"{tmp}/{sid}_{k}.png"
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{(a + (b - a) * q) / fps:.3f}", "-i", video,
                                "-frames:v", "1", "-vf", "scale=480:-1", p], check=True)
                paths.append(p)
            ins = [x for p in paths for x in ("-i", p)]
            subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex",
                            "[0][1]hstack[a];[2][3]hstack[b];[a][b]vstack", "-q:v", "4", f"review/{sid}.jpg"], check=True)
    print(len(shots), "contact sheets in review/:", " ".join(sid for sid, _, _ in shots))


if __name__ == "__main__":
    main(sys.argv[1], *(int(x) for x in sys.argv[2:4]))
