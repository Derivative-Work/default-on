"""M1 ear check: the mix with the generator's Switch taken out, so the slots can be heard as the comp will see them.

The stems are separations, not a lossless split (v1: unit-gain residual -9.2 dB, least squares -11.5 dB; v2 printed
below). So this keeps the mix as generated outside the mute spans and, inside them, plays the non-vocal stems at their
least-squares gains (fitted on the whole song), with 20 ms crossfades. Usage: .venv/bin/python -I scripts/m1_gap_mix.py -> audio/preview/m1_gapped.wav
"""
import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import BACKING, STEM, STEMS, TRACK, VOCALS  # noqa: E402

FADE = 0.02
m = json.loads(Path("timing/map.json").read_text())
mix, sr = sf.read(TRACK)
stems = {n: sf.read(STEM.format(n))[0] for n in STEMS}
X = np.stack([stems[n][::8].reshape(-1) for n in STEMS], 1)
gains, *_ = np.linalg.lstsq(X, mix[::8].reshape(-1), rcond=None)
inst = sum(g * stems[n] for g, n in zip(gains, STEMS) if n not in (VOCALS, BACKING))
w = np.zeros(len(mix))  # 1 = instrumental only, 0 = the mix
f = int(FADE * sr)
for s in m["switch_slots"]:
    for a, b in s["mute"]:
        i0, i1 = int(a * sr), int(b * sr)
        w[i0:i1] = 1
        w[max(0, i0 - f):i0] = np.maximum(w[max(0, i0 - f):i0], np.linspace(0, 1, i0 - max(0, i0 - f)))
        w[i1:i1 + f] = np.maximum(w[i1:i1 + f], np.linspace(1, 0, len(w[i1:i1 + f])))
out = mix * (1 - w)[:, None] + inst * w[:, None]
resid = 20 * np.log10(np.linalg.norm(X @ gains - mix[::8].reshape(-1)) / np.linalg.norm(mix[::8].reshape(-1)))
print("lstsq residual dB", round(resid, 1), "gains", dict(zip(STEMS, np.round(gains, 3))), "muted s", round(w.sum() / sr, 2), "peak", round(np.abs(out).max(), 3))
Path("audio/preview").mkdir(parents=True, exist_ok=True)
sf.write("audio/preview/m1_gapped.wav", np.clip(out, -1, 1), sr, subtype="PCM_24")
