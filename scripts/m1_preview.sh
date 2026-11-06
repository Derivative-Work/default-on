#!/usr/bin/env bash
# M1 ear check: review/m1_preview.ass (shot labels, Switch slots, events, karaoke lyrics) on black, 640x360, 30 fps,
# on the audio clock (no pre-roll). Audio track 1: the gapped stem mix (generated Switch muted); track 2: the mix.
# Usage: scripts/m1_preview.sh -> renders/m1/m1_preview.mp4
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
mkdir -p renders/m1
ffmpeg -v error -y -f lavfi -i "color=c=0x0b1020:s=640x360:r=30:d=249.2" -i audio/preview/m1_gapped.wav -i "audio/track/Default On.wav" \
  -map 0:v -map 1:a -map 2:a -metadata:s:a:0 title="Switch muted" -metadata:s:a:1 title="Mix as generated" \
  -vf "subtitles=review/m1_preview.ass,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf:fontsize=13:fontcolor=gray:x=w-tw-10:y=h-th-6:text='%{pts\:hms}  f%{eif\:n+90\:d}'" \
  -c:v libx264 -crf 28 -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 192k -shortest renders/m1/m1_preview.mp4
