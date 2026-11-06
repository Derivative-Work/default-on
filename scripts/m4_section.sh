#!/usr/bin/env bash
# M4: render one section at 1080p (Remotion composition Sec<NN>-<Name>), its contact sheets, and a review copy small
# enough to send (CRF 26). Usage: scripts/m4_section.sh <composition id> <file stem>
#   e.g. scripts/m4_section.sh Sec02-Verse1 sec02_verse1  ->  renders/m4/sec02_verse1.mp4, renders/m4/review/…, review/S*.jpg
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
comp=$1; out=$2
mkdir -p renders/m4/review
(cd remotion && npx remotion render src/index.ts "$comp" "../renders/m4/$out.mp4" --log=error --concurrency=8 --crf=18)
read -r from frames < <(.venv/bin/python -I -c "
import json, re, sys
m = json.load(open('timing/map.json')); secs = m['sections']
i = int(re.match(r'Sec(\d+)', sys.argv[1]).group(1)) - 1
end = secs[i + 1]['frame_start'] if i + 1 < len(secs) else m['video_end_frame']
print(secs[i]['frame_start'], end - secs[i]['frame_start'])" "$comp")
python3 -I scripts/contact_sheets.py "renders/m4/$out.mp4" "$from" "$frames"
ffmpeg -v error -y -i "renders/m4/$out.mp4" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 160k "renders/m4/review/${out}_review.mp4"
ls -la "renders/m4/$out.mp4" "renders/m4/review/${out}_review.mp4"
