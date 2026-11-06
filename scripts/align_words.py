"""M1: word-level forced alignment of the as-sung lyrics against the lead vocal stem.

From Share the Shares (method from Not Yet and Sandbox Rhapsody): torchaudio's MMS forced aligner (MMS_FA,
multilingual wav2vec2 CTC) aligns each section's words as one continuous sequence inside the section's window, which
keeps every word in sung order, then splits it back into lines; words are trimmed to where the stem has energy
(-38 dB). Windows, sections and singers come from the lyrics file ("@ start end stem", "[Section]", "N:"/"S:").

Usage: .venv/bin/python -I scripts/align_words.py [lyrics file, default lyrics/as_sung.txt]  ->  timing/words.json
"""
import json
import re
import sys
from pathlib import Path

import librosa
import numpy as np
import torch
import torchaudio

sys.path.insert(0, str(Path(__file__).resolve().parent))
from song import STEM  # noqa: E402

SR = 16000
SPOKEN = {"it's": "its", "it'll": "itll", "ain't": "aint", "'em": "em", "they're": "theyre", "i'm": "im",
          "'cause": "cause", "i've": "ive", "you're": "youre", "wasn't": "wasnt"}


def windows(path):
    """[{start, end, stem, lines: [(section, singer, text)]}] in file order."""
    out, sec = [], None
    for line in Path(path).read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("@"):
            _, a, b, stem = line.split(None, 3)
            out.append({"start": float(a), "end": float(b), "stem": stem, "lines": []})
        elif re.match(r"\[(.+)\]$", line):
            sec = line[1:-1]
        else:
            who, text = line.split(":", 1)
            out[-1]["lines"].append((sec, {"N": "narrator", "S": "switch"}[who], text.strip()))
    return out


def spoken(word):
    w = word.lower().replace("’", "'")
    w = re.sub(r"[^a-z'\-]", "", w)
    w = SPOKEN.get(w, w)
    w = {"two": "two", "hundred": "hundred"}.get(w, w)
    return [p for p in re.split(r"[\s\-]+", w.replace("'", "")) if p]


def trim(words, y, a, floor_db=-38.0):
    hop = 160
    rms = librosa.feature.rms(y=y, frame_length=640, hop_length=hop)[0]
    db = 20 * np.log10(rms / (rms.max() + 1e-12) + 1e-12)
    for w in words:
        f0, f1 = int((w["start"] - a) * SR / hop), int((w["end"] - a) * SR / hop)
        loud = np.where(db[f0:f1 + 1] > floor_db)[0]
        if len(loud):
            s0, s1 = (f0 + loud[0]) * hop / SR + a, (f0 + loud[-1] + 1) * hop / SR + a
            if s1 - s0 >= 0.08:
                w["start"], w["end"] = round(s0, 3), round(s1, 3)
    return words


def main():
    bundle = torchaudio.pipelines.MMS_FA
    model = bundle.get_model(with_star=False)
    tokenizer, aligner = bundle.get_tokenizer(), bundle.get_aligner()
    stems, out = {}, []
    for win in windows(sys.argv[1] if len(sys.argv) > 1 else "lyrics/as_sung.txt"):
        if win["stem"] not in stems:
            stems[win["stem"]] = librosa.load(STEM.format(win["stem"]), sr=SR, mono=True)[0]
        voc = stems[win["stem"]]
        a, b = win["start"], win["end"]
        i0, i1 = int(a * SR), min(len(voc), int(b * SR))
        y = voc[i0:i1] / (np.abs(voc[i0:i1]).max() + 1e-9)
        display = [(k, w) for k, (_, _, ln) in enumerate(win["lines"]) for w in ln.split()]
        parts = [spoken(w) for _, w in display]
        flat = [p for ps in parts for p in ps]
        with torch.inference_mode():
            emission, _ = model(torch.from_numpy(y).float().unsqueeze(0))
            spans = aligner(emission[0], tokenizer(flat))
        ratio = (i1 - i0) / emission.shape[1] / SR
        per_line = [[] for _ in win["lines"]]
        j = 0
        for (k, w), ps in zip(display, parts):
            seg = spans[j:j + len(ps)]
            j += len(ps)
            start, end = seg[0][0].start * ratio + a, seg[-1][-1].end * ratio + a
            score = float(np.mean([s.score for sp in seg for s in sp]))
            per_line[k].append({"w": w, "start": round(start, 3), "end": round(end, 3), "score": round(score, 3)})
        for (sec, singer, text), words in zip(win["lines"], per_line):
            words = trim(words, y, a)
            ln = {"id": f"L{len(out) + 1:02d}", "section": sec, "stem": win["stem"], "singer": singer, "text": text,
                  "start": words[0]["start"], "end": words[-1]["end"], "words": words}
            out.append(ln)
            low = [w["w"] for w in words if w["score"] < 0.3]
            print(f"{ln['id']} {singer[0].upper()} {ln['start']:7.2f}-{ln['end']:7.2f} {text[:56]:56s} "
                  f"{'low: ' + ' '.join(low) if low else ''}")
    Path("timing/words.json").write_text(json.dumps({"aligner": "torchaudio MMS_FA", "torchaudio": torchaudio.__version__,
                                                     "lines": out}, indent=1) + "\n")


if __name__ == "__main__":
    main()
