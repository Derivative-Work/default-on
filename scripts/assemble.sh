#!/usr/bin/env bash
# The full cut from the section renders: the eleven renders/m4/sec*.mp4 joined (stream copy), with their audio
# replaced by one continuous soundtrack built from the timing map: the final master from the end of the pre-roll, and
# the credits music (the human's) from fact card G's first frame, faded out over the video's last seconds. The two are
# summed without normalising (neither track's level is changed). Then a 720p review copy.
# Usage: scripts/assemble.sh [section dir] [output] [review copy, or "-" for none]
#   defaults: renders/m4 renders/m4/m4_full.mp4 renders/m4/review/m4_full_review_720p.mp4
#   the 4K release: scripts/assemble.sh renders/final deliverables/default_on_3840x2160.mp4 -
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
SRC=${1:-renders/m4}; OUT=${2:-renders/m4/m4_full.mp4}; REV=${3:-renders/m4/review/m4_full_review_720p.mp4}
read -r pre cframe fade end fps < <(python3 -c "
import json; m = json.load(open('timing/map.json')); c = m['credits_audio']
print(m['preroll_s'], c['frame'], c['fade_s'], m['video_end_frame'], m['fps'])")
master_ms=$(python3 -c "print(round($pre * 1000, 1))")
credits_ms=$(python3 -c "print(round($cframe / $fps * 1000, 1))")
fade_st=$(python3 -c "print(round($end / $fps - $fade, 3))")
tmp=$(mktemp -d)
ls "$SRC"/sec*.mp4 | sed "s#^#file '$PWD/#; s#\$#'#" > "$tmp/concat.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$tmp/concat.txt" -c copy "$tmp/concat.mp4"
ffmpeg -v error -y -i "$tmp/concat.mp4" -i "audio/master/Default On (final master).wav" -i audio/credits/default-on-credits.wav \
  -filter_complex "[1:a]aresample=48000,adelay=${master_ms}|${master_ms},apad[m];[2:a]aresample=48000,adelay=${credits_ms}|${credits_ms},afade=t=out:st=${fade_st}:d=${fade}[c];[m][c]amix=inputs=2:normalize=0:duration=first[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 320k -shortest "$OUT"
[ "$REV" != "-" ] && ffmpeg -v error -y -i "$OUT" -vf scale=1280:720 -c:v libx264 -crf 27 -preset slow -c:a aac -b:a 160k "$REV"
rm -r "$tmp"
echo "master at ${master_ms} ms, credits at ${credits_ms} ms, fade from ${fade_st} s; $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of csv=p=0 "$OUT") frames"
