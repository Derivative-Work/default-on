#!/usr/bin/env bash
# S67: cut and grade the human's real footage (assets/real/S67/C0143.MP4, Sony a6400, 3840x2160 29.97p, manual
# exposure/ISO/white balance, straight off the camera) into the clip the cut uses: edit/S67_graded.mp4, linked into
# remotion/public/. The clip is laid frame for frame on the 30 fps timeline (the 0.1% speed difference is
# invisible), starting so that the first dark frame (source 193.967 s: the switch turns the room's light off) lands on
# the band's last note (map events.last_note_frame, 7629), with S67 starting at frame 7436.
# The grade (the human's note, 2026-11-09: "it will need color grading to match the rest"): the camera's white
# balance reads the white wall as blue-grey (185,194,214); per-channel gains warm it to the cartoon's paper (about
# 216,206,201), with a touch more contrast and saturation and the cartoon's soft vignette. No audio (the camera's
# sound is the home's: never published) and no metadata are carried over.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
DARK=193.967; S67=7436; OFF=7629; LEN=320
# - one source frame: the input seek lands a frame late on this file (checked: the clip's first dark frame must be
# index OFF - S67 = 193; the luma check at the end prints it)
start=$(python3 -c "print(round($DARK - ($OFF - $S67 + 1) / 30 * 1.001, 4))")
mkdir -p edit
ffmpeg -v error -y -ss "$start" -i assets/real/S67/C0143.MP4 -frames:v $LEN -an -map_metadata -1 \
  -vf "setpts=N/30/TB,colorchannelmixer=rr=1.17:gg=1.06:bb=0.94,eq=contrast=1.06:saturation=1.08,vignette=angle=0.45" -r 30 \
  -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 edit/S67_graded.mp4
ln -f edit/S67_graded.mp4 remotion/public/S67_graded.mp4
echo "start $start"; ffprobe -v error -count_frames -show_entries stream=nb_read_frames,r_frame_rate -of csv=p=0 edit/S67_graded.mp4
ffmpeg -v error -i edit/S67_graded.mp4 -vf "scale=64:36,format=gray" -f rawvideo - | python3 -c "
import sys
d = sys.stdin.buffer.read(); n = 64 * 36
v = [sum(d[i * n:(i + 1) * n]) / n for i in range(len(d) // n)]
print('first dark frame', next(i for i, x in enumerate(v) if x < 5), '(want', $OFF - $S67, ')')"
