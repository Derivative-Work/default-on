"""M4: mouth shapes from Rhubarb Lip Sync, as in Read Only (scripts/rhubarb_visemes.py there).

Each line of the timing map (timing/map.json, master clock) is cut from its singer's own track (padded 0.25 s): the
Narrator's from the vocal stem (v2's clock, so moved back by song.OFFSET_1), Switch's from the human's comp of his
takes (audio/switch/comp, 2026-11-08). Each cut is resampled to 16 kHz mono, and run
through Rhubarb 1.14.0 with the line's text as the dialog file (PocketSphinx recognizer). Extended shapes: X only,
so the cues use exactly the rigs' seven mouths (X, A-F; remotion/src/rigs/Mouth.tsx). Cue times come back relative to
the cut and are shifted to master seconds.

Switch's lines then get a sung pass (the human's notes, 2026-11-09: his second pre-chorus and both "on, on, on" tags
were missing mouth movement). Rhubarb is built for speech: on held, sung vowels it often holds one near-closed shape
(B) for most of a second, and his tags came back almost still. So each Switch line is re-read frame by frame (30 fps)
against his comp's loudness (RMS, normalised to the line's 95th percentile): near-silence rests (X, keeping A's closed
lips); a dip between two sung syllables half-closes (B) for two frames, so each "on" visibly re-opens; a loud frame
held on a near-closed shape opens (C, D when loudest); a sung "on" opens round (E, Rhubarb's AO); and no shape lasts
a single frame.

Rhubarb lives in tools/Rhubarb-Lip-Sync-1.14.0-Linux/ (git-ignored; the release zip's SHA-256 is in the production
log). Usage: .venv/bin/python -I scripts/rhubarb_visemes.py  ->  timing/visemes.json
"""
import json
import subprocess
import sys
from pathlib import Path

import librosa
import numpy as np
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import OFFSET_1, STEM, SWITCH_COMP, VOCALS  # noqa: E402

RHUBARB = Path("tools/Rhubarb-Lip-Sync-1.14.0-Linux/rhubarb")
CACHE = Path("cache/rhubarb")
SR = 16000
PAD = 0.25


FR = 30


def sung(cues, y, ln, words):
    """Switch's sung pass (see the module notes): Rhubarb's cues resampled per frame and corrected by loudness."""
    a, b = cues[0][0], cues[-1][0]
    n = int(round((b - a) * FR))
    hop = SR // FR
    seg = y[int(a * SR):int(a * SR) + n * hop + 1024]
    env = librosa.feature.rms(y=seg, frame_length=1024, hop_length=hop, center=False)[0]
    env = np.convolve(np.pad(env, 1, mode="edge"), [0.25, 0.5, 0.25], mode="valid")[:n]
    if len(env) < n:
        env = np.pad(env, (0, n - len(env)))
    e = env / max(1e-9, np.percentile(env, 95))
    shape_at = lambda t: [s for c, s in cues if c <= t + 1e-6][-1]
    word_at = lambda t: next((w["w"].strip(".,!?\"'").lower() for w in words if w["start"] - 0.05 <= t <= w["end"] + 0.05), "")
    trough = set()
    for i in range(1, n - 1):
        if e[i] <= e[i - 1] and e[i] < e[i + 1]:
            l, r = e[max(0, i - 8):i].max(initial=0), e[i + 1:i + 9].max(initial=0)
            if min(l, r) > 0.3 and e[i] < 0.7 * min(l, r):
                trough.update((i, i + 1))
    frames = []
    for i in range(n):
        t = a + i / FR
        s0 = shape_at(t)
        if e[i] < 0.12:
            s1 = "A" if s0 == "A" else "X"
        elif i in trough:
            s1 = "B"
        elif word_at(t) == "on" and e[i] > 0.3:
            s1 = "E"
        elif s0 in "XAB" and e[i] > 0.4:
            s1 = "D" if e[i] > 0.8 else "C"
        else:
            s1 = s0
        frames.append(s1)
    for i in range(1, n - 1):  # no one-frame shapes: a lone frame takes its neighbour's shape, so the mouth never flickers
        if frames[i] != frames[i - 1] and frames[i] != frames[i + 1]:
            frames[i] = frames[i - 1]
    out = []
    for i, s1 in enumerate(frames):
        if not out or out[-1][1] != s1:
            out.append([round(a + i / FR, 3), s1])
    if out[-1][1] != "X":
        out.append([round(b, 3), "X"])
    return out


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    lines = json.loads(Path("timing/map.json").read_text())["lines"]
    src = {"narrator": (librosa.load(STEM.format(VOCALS), sr=SR, mono=True)[0], OFFSET_1),
           "switch": (librosa.load(SWITCH_COMP, sr=SR, mono=True)[0], 0.0)}
    words = {w["id"]: w["words"] for w in json.loads(Path("timing/words_switch.json").read_text())["lines"]}
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
        if ln["singer"] == "switch":
            cues = sung(cues, y, ln, words.get(ln["id"], []))
        out.append({"id": ln["id"], "singer": ln["singer"], "start": ln["start"], "end": ln["end"], "cues": cues})
        print(f"{ln['id']} {ln['singer'][0]} {ln['start']:7.2f} {len(cues):4d} cues  {''.join(s for _, s in cues)[:60]}")
    Path("timing/visemes.json").write_text(json.dumps({
        "method": "Rhubarb Lip Sync 1.14.0 (PocketSphinx, dialog text, extended shapes X) per line, the Narrator on the "
                  "vocal stem, Switch on the human's comp of his takes (scripts/rhubarb_visemes.py)",
        "shapes": "A closed (MBP), B teeth (consonants, EE), C open (EH), D wide (AA), E round (AO), F pucker (OO, W), "
                  "X rest", "lines": out}, indent=1) + "\n")


if __name__ == "__main__":
    main()
