"""M1 ear check: the mix with the generator's Switch taken out, so the slots can be heard as the comp will see them.

The ten stems are separations, not a lossless split: at unit gain they sum to the mix with a residual of -9.2 dB
(and clip at 2.06), and least-squares gains only bring that to -11.5 dB. So this keeps the mix as generated outside
the mute spans and, inside them, plays the eight non-vocal stems at their least-squares gains (fitted on the whole
song), with 20 ms crossfades. Usage: .venv/bin/python -I scripts/m1_gap_mix.py -> audio/preview/m1_gapped.wav
"""
import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import STEM, STEMS, TRACK  # noqa: E402

FADE = 0.02
m = json.loads(Path("timing/map.json").read_text())
mix, sr = sf.read(TRACK)
stems = {n: sf.read(STEM.format(n))[0] for n in STEMS}
X = np.stack([stems[n][::8].reshape(-1) for n in STEMS], 1)
gains, *_ = np.linalg.lstsq(X, mix[::8].reshape(-1), rcond=None)
inst = sum(g * stems[n] for g, n in zip(gains, STEMS) if n not in ("0 Lead Vocals", "1 Backing Vocals"))
w = np.zeros(len(mix))  # 1 = instrumental only, 0 = the mix
f = int(FADE * sr)
for s in m["switch_slots"]:
    for a, b in s["mute"]:
        i0, i1 = int(a * sr), int(b * sr)
        w[i0:i1] = 1
        w[max(0, i0 - f):i0] = np.maximum(w[max(0, i0 - f):i0], np.linspace(0, 1, i0 - max(0, i0 - f)))
        w[i1:i1 + f] = np.maximum(w[i1:i1 + f], np.linspace(1, 0, len(w[i1:i1 + f])))
out = mix * (1 - w)[:, None] + inst * w[:, None]
print("gains", dict(zip(STEMS, np.round(gains, 3))), "muted s", round(w.sum() / sr, 2), "peak", round(np.abs(out).max(), 3))
Path("audio/preview").mkdir(parents=True, exist_ok=True)
sf.write("audio/preview/m1_gapped.wav", np.clip(out, -1, 1), sr, subtype="PCM_24")
