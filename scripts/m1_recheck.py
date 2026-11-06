"""M1 re-check: re-hear the doubtful spots of the first pass (lines it didn't hear, or the generated Switch tags)
with medium.en and small.en on three sources (lead stem, backing stem, mix), each on a short window, unprompted.
Usage: .venv/bin/python -I scripts/m1_recheck.py -> timing/m1_recheck.json
"""
import json
import sys
from pathlib import Path

import librosa
from faster_whisper import WhisperModel

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import STEM, TRACK  # noqa: E402

SPOTS = {  # name: (start s, end s)
    "V04 tag after chorus 1": (52.5, 60.6),
    "V11 tag after chorus 2": (139.0, 144.2),
    "pre-chorus 1 click gap": (34.0, 39.5),
    "pre-chorus 2 click gap": (118.5, 126.0),
    "Ahem! before the redub": (183.0, 187.0),
    "Huh. before Who asked": (229.5, 233.5),
    "outro clicks": (217.5, 222.5),
    "final chorus tail": (213.5, 219.0),
}
SOURCES = {"lead": STEM.format("0 Lead Vocals"), "backing": STEM.format("1 Backing Vocals"), "mix": TRACK}
audio = {k: librosa.load(p, sr=16000, mono=True)[0] for k, p in SOURCES.items()}
out = {}
for size in ("medium.en", "small.en"):
    model = WhisperModel(size, device="cpu", compute_type="int8")
    for name, (a, b) in SPOTS.items():
        for src, y in audio.items():
            segs, _ = model.transcribe(y[int(a * 16000):int(b * 16000)], beam_size=5, temperature=0,
                                       word_timestamps=True, vad_filter=False, condition_on_previous_text=False)
            words = [{"w": w.word.strip(), "start": round(w.start + a, 2), "end": round(w.end + a, 2),
                      "p": round(w.probability, 2)} for s in segs for w in s.words]
            out.setdefault(name, {})[f"{size}/{src}"] = words
            print(f"{name:26s} {size:9s} {src:7s} " + " ".join(f"{w['w']}@{w['start']}" for w in words))
Path("timing/m1_recheck.json").write_text(json.dumps({"spots": SPOTS, "hearings": out}, indent=1) + "\n")
