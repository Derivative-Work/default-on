#!/usr/bin/env bash
# S65-S66: the human's screen recordings (2026-11-10), cut, cropped and timed to the cut. Both recordings carry the
# song as it played, so each is placed by cross-correlating its audio with the final master (checked 2026-11-10):
#   logic_timeline.mov (the Logic project playing the final mix): master = recording + 234.978 s (correlation 0.99)
#   suno_create.mov (the Suno create page playing the original take): master = recording + 228.2 s up to the bar the
#     human added before V21, + 229.7 s after it (the original take doesn't have that bar; correlation 0.3-0.7, the
#     original mix differing). The clip runs on 1:1 from S65's start, so it is in step for S65 and slips by the added
#     bar partway through S66, where only the player's progress bar could show it.
# Crops (source pixels): S65 the Suno app at 16:9 without the browser's tab and address bars (the profile button);
# S66's left half the lyrics and style panel with the take list's start; S66's right half Logic's track names and
# timeline without the window title or the movie thumbnail, on Logic's own grey (23,23,23). The recordings' audio is
# not used. 240 fps sources, taken at 30 fps.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
read -r f65 f66 f67 pre < <(python3 -c "
import json; m = json.load(open('timing/map.json')); s = {x['id']: x['frame'] for x in m['shots']}
print(s['S65'], s['S66'], s['S67'], m['preroll_s'])")
t() { python3 -c "print(round($1 / 30 - $pre - $2, 4))"; }
SUNO=assets/real/S65/suno_create.mov; LOGIC=assets/real/S65/logic_timeline.mov
enc="-an -map_metadata -1 -r 30 -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p"
mkdir -p edit
ffmpeg -v error -y -ss "$(t $f65 228.2)" -i $SUNO -frames:v $((f66 - f65)) -vf "fps=30,crop=3238:1822:113:271,scale=1920:1080:flags=lanczos" $enc edit/S65_suno.mp4
ffmpeg -v error -y -ss "$(t $f66 228.2)" -i $SUNO -frames:v $((f67 - f66)) -vf "fps=30,crop=1645:1851:303:260,scale=960:1080:flags=lanczos" $enc edit/S66_suno.mp4
ffmpeg -v error -y -ss "$(t $f66 234.978)" -i $LOGIC -frames:v $((f67 - f66)) -vf "fps=30,crop=2151:1482:980:239,scale=960:-2:flags=lanczos,pad=960:1080:0:(oh-ih)/2:0x171717" $enc edit/S66_logic.mp4
for c in S65_suno S66_suno S66_logic; do ln -f edit/$c.mp4 remotion/public/$c.mp4; done
for c in S65_suno S66_suno S66_logic; do echo "$c $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=width,height,nb_read_frames -of csv=p=0 edit/$c.mp4)"; done
