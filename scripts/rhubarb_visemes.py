"""M4: mouth shapes from Rhubarb Lip Sync, as in Read Only (scripts/rhubarb_visemes.py there).

Each line of the timing map (timing/map.json, master clock) is cut from its singer's own track (padded 0.25 s): the
Narrator's from the vocal stem (v2's clock, so moved back by song.OFFSET_1), Switch's from the human's comp of his
takes (audio/switch/comp, 2026-11-08). Each cut is resampled to 16 kHz mono, and run
through Rhubarb 1.14.0 with the line's text as the dialog file (PocketSphinx recognizer). Extended shapes: X only,
so the cues use exactly the rigs' seven mouths (X, A-F; remotion/src/rigs/Mouth.tsx). Cue times come back relative to
the cut and are shifted to master seconds.

Rhubarb lives in tools/Rhubarb-Lip-Sync-1.14.0-Linux/ (git-ignored; the release zip's SHA-256 is in the production
log). Usage: .venv/bin/python -I scripts/rhubarb_visemes.py  ->  timing/visemes.json
"""
import json
import subprocess
import sys
from pathlib import Path

import librosa
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import OFFSET_1, STEM, SWITCH_COMP, VOCALS  # noqa: E402

RHUBARB = Path("tools/Rhubarb-Lip-Sync-1.14.0-Linux/rhubarb")
CACHE = Path("cache/rhubarb")
SR = 16000
PAD = 0.25


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    lines = json.loads(Path("timing/map.json").read_text())["lines"]
    src = {"narrator": (librosa.load(STEM.format(VOCALS), sr=SR, mono=True)[0], OFFSET_1),
           "switch": (librosa.load(SWITCH_COMP, sr=SR, mono=True)[0], 0.0)}
    out = []
    for ln in lines:
        a, b = max(0.0, ln["start"] - PAD), ln["end"] + PAD
        y, off = src[ln["singer"]]
        assert ln["singer"] == "switch" or ln["end"] < 243.6  # every Narrator line is before the added bar
        wav, txt, js = (CACHE / f"{ln['id']}.{e}" for e in ("wav", "txt", "json"))
        sf.write(wav, y[int((a - off) * SR):int((b - off) * SR)], SR, subtype="PCM_16")
        txt.write_text(ln["text"] + "\n")
        subprocess.run([str(RHUBARB), "-q", "-r", "pocketSphinx", "-f", "json", "--extendedShapes", "X",
                        "-d", str(txt), "-o", str(js), str(wav)], check=True)
        cues = [[round(a + c["start"], 3), c["value"]] for c in json.loads(js.read_text())["mouthCues"]]
        if cues[-1][1] != "X":  # a cut that ends mid-sound: close the mouth at the cut's end
            cues.append([round(b, 3), "X"])
        out.append({"id": ln["id"], "singer": ln["singer"], "start": ln["start"], "end": ln["end"], "cues": cues})
        print(f"{ln['id']} {ln['singer'][0]} {ln['start']:7.2f} {len(cues):4d} cues  {''.join(s for _, s in cues)[:60]}")
    Path("timing/visemes.json").write_text(json.dumps({
        "method": "Rhubarb Lip Sync 1.14.0 (PocketSphinx, dialog text, extended shapes X) per line, the Narrator on the "
                  "vocal stem, Switch on the human's comp of his takes (scripts/rhubarb_visemes.py)",
        "shapes": "A closed (MBP), B teeth (consonants, EE), C open (EH), D wide (AA), E round (AO), F pucker (OO, W), "
                  "X rest", "lines": out}, indent=1) + "\n")


if __name__ == "__main__":
    main()
