"""M4: mouth shapes from Rhubarb Lip Sync, as in Read Only (scripts/rhubarb_visemes.py there).

Each aligned line (timing/words.json) is cut from the vocal stem (padded 0.25 s), resampled to 16 kHz mono, and run
through Rhubarb 1.14.0 with the line's text as the dialog file (PocketSphinx recognizer). Extended shapes: X only,
so the cues use exactly the rigs' seven mouths (X, A-F; remotion/src/rigs/Mouth.tsx). Cue times come back relative to
the cut and are shifted to song seconds. Switch's lines are the generator's attempt: placeholders until M6 runs this
on the comped takes.

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
from song import STEM, VOCALS  # noqa: E402

RHUBARB = Path("tools/Rhubarb-Lip-Sync-1.14.0-Linux/rhubarb")
CACHE = Path("cache/rhubarb")
SR = 16000
PAD = 0.25


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    lines = json.loads(Path("timing/words.json").read_text())["lines"]
    voc = librosa.load(STEM.format(VOCALS), sr=SR, mono=True)[0]
    out = []
    for ln in lines:
        a, b = max(0.0, ln["start"] - PAD), ln["end"] + PAD
        wav, txt, js = (CACHE / f"{ln['id']}.{e}" for e in ("wav", "txt", "json"))
        sf.write(wav, voc[int(a * SR):int(b * SR)], SR, subtype="PCM_16")
        txt.write_text(ln["text"] + "\n")
        subprocess.run([str(RHUBARB), "-q", "-r", "pocketSphinx", "-f", "json", "--extendedShapes", "X",
                        "-d", str(txt), "-o", str(js), str(wav)], check=True)
        cues = [[round(a + c["start"], 3), c["value"]] for c in json.loads(js.read_text())["mouthCues"]]
        out.append({"id": ln["id"], "singer": ln["singer"], "start": ln["start"], "end": ln["end"], "cues": cues})
        print(f"{ln['id']} {ln['singer'][0]} {ln['start']:7.2f} {len(cues):4d} cues  {''.join(s for _, s in cues)[:60]}")
    Path("timing/visemes.json").write_text(json.dumps({
        "method": "Rhubarb Lip Sync 1.14.0 (PocketSphinx, dialog text, extended shapes X) per line on the vocal stem "
                  "(scripts/rhubarb_visemes.py)",
        "shapes": "A closed (MBP), B teeth (consonants, EE), C open (EH), D wide (AA), E round (AO), F pucker (OO, W), "
                  "X rest", "lines": out}, indent=1) + "\n")


if __name__ == "__main__":
    main()
