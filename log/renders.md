# Renders

Every render: timestamp, shot ID, composition, props, commit hash, output, contact sheet.

## 2026-11-06T07:46 — M1 ear-check preview

- **Shots:** all (labels only; no graphics). **Composition:** none (ffmpeg, not Remotion): `scripts/m1_preview.sh` burns `review/m1_preview.ass` (from `scripts/timing_map.py`) over a navy background. 640x360, 30 fps, audio clock (no pre-roll); the corner counter shows the video frame (with the 90-frame pre-roll). Audio track 1: `audio/preview/m1_gapped.wav` (Switch muted); track 2: the mix.
- **Commit:** built on 48222ea + the M1 scripts (committed with this entry).
- **Output:** `renders/m1/m1_preview.mp4`. No contact sheet (text only).

## 2026-11-06T08:20 — M2 rig sheet, style board and motion test

- **Shots:** S04, S16, S28, S53, S61 (style board), plus the rig sheet (Switch's six poses, the seven mouth shapes, the Narrator twice, the hand) and S04 in motion.
- **Compositions and props:** `RigSheet` (1 frame); `StyleBoard` frames 0–4 = S04 at local frame 92, S16 at 18, S28 at 10, S53 at 12, S61 at 24 (`remotion/src/compositions/StyleBoard.tsx`); `MotionTest` = S04's 198 frames (map frames 437–635) with the mix from 11.57 s, a splice at its head. 1920x1080, 30 fps, JPEG frames; `npx remotion still src/index.ts StyleBoard ../review/m2/<shot>.jpg --frame=<i>`, `npx remotion render src/index.ts MotionTest ../renders/m2/m2_motion_S04.mp4 --concurrency=6` (58 s, about 3.4 fps on this box).
- **Commit:** built on a6fcf73 + the M2 code (committed with this entry).
- **Outputs:** `review/m2/{rig_sheet,S04,S16,S28,S53,S61}.jpg`, `renders/m2/m2_motion_S04.mp4`. Mouths in the motion test are a placeholder flap on the aligned words (M4 does the lip sync).

## 2026-11-06T09:05 — M2 revised: rig sheet, style board, motion test (flat-plate Switch, new Narrator, v2 audio); M1 preview on v2

- **Shots and compositions:** as at 08:20 (`RigSheet`, `StyleBoard` frames 0–4, `MotionTest` = S04 on v2: map frames 506 - 707, the mix from 11.85 s). `scripts/m1_preview.sh` on v2 (counter now adds the 150-frame pre-roll).
- **Commit:** built on 88cfa92 + the changes committed with this entry.
- **Outputs (replacing the 08:20 renders, which are in git history and regenerable from 88cfa92):** `review/m2/*.jpg`, `renders/m2/m2_motion_S04.mp4`, `renders/m1/m1_preview.mp4`.

## 2026-11-06T09:40 — M3 animatic

- **Shots:** S00–S67, all. **Composition:** `Animatic` (960x540, `from` 0), 7,684 frames = the map's 7,624 + S67's 2 s hold; the mix from frame 150. Props: none beyond `from`.
- **Command:** `npx remotion render src/index.ts Animatic ../renders/m3/m3_animatic.mp4 --log=error --concurrency=8 --crf=26`
- **Commit:** built on 19eb99c + the M3 code (committed with this entry).
- **Output:** `renders/m3/m3_animatic.mp4` (20.6 MB). Contact sheets: `review/S00.jpg` … `review/S67.jpg` (`scripts/contact_sheets.py`).

## 2026-11-06T10:18 — M3 animatic, revised

- **Shots:** S00–S68 and FG. **Composition:** `Animatic` (960x540), 7,954 frames (4:25.2): the cut through S67's hold, fact card G's placeholder, S68's stand-in.
- **Command:** as at 09:40. **Commit:** built on e33b2e7 + the changes committed with this entry.
- **Output:** `renders/m3/m3_animatic.mp4`; 73 contact sheets in `review/`.

## 2026-11-06T11:00 — M4 section 1, Intro

- **Shots:** S00–S04. **Composition:** `Sec01-Intro` (`Cut`, `from` 0), 1920x1080, 659 frames, with the mix from frame 150.
- **Command:** `npx remotion render src/index.ts Sec01-Intro ../renders/m4/sec01_intro.mp4 --log=error --concurrency=8 --crf=18`
- **Commit:** built on 89f1d11 + the changes committed with this entry.
- **Output:** `renders/m4/sec01_intro.mp4`; contact sheets `review/S00.jpg`–`S04.jpg`.

## 2026-11-06T11:28 — M4 section 2, Verse 1

- **Shots:** S05–S08. **Composition:** `Sec02-Verse1` (`Cut`), 1920x1080, 480 frames. **Command:** `scripts/m4_section.sh Sec02-Verse1 sec02_verse1`. **Commit:** built on 0e786d4 + this entry's changes.
- **Output:** `renders/m4/sec02_verse1.mp4`, review copy `renders/m4/review/sec02_verse1_review.mp4`; contact sheets `review/S05–S08.jpg`.

## 2026-11-06T11:44 — M4 section 3, pre-chorus 1

- **Shots:** S09–S12. **Composition:** `Sec03-Prechorus1`, 217 frames. **Command:** `scripts/m4_section.sh Sec03-Prechorus1 sec03_prechorus1`. **Commit:** built on d2223a5 + this entry's changes.

## 2026-11-06T12:08 — M4 section 4, chorus 1

- **Shots:** S13–S18. **Composition:** `Sec04-Chorus1`, 602 frames. **Command:** `scripts/m4_section.sh Sec04-Chorus1 sec04_chorus1`. **Commit:** built on 2159b8a + this entry's changes.

## 2026-11-06T12:28 — M4 section 5, the Lesson

- **Shots:** S19–S24. **Composition:** `Sec05-Lesson`, 896 frames. **Command:** `scripts/m4_section.sh Sec05-Lesson sec05_lesson`. **Commit:** built on 72b3204 + this entry's changes.

## 2026-11-06T12:52 — M4 section 6, Verse 2

- **Shots:** S25–S33 (S34 runs into section 7). **Composition:** `Sec06-Verse2`, 836 frames. **Command:** `scripts/m4_section.sh Sec06-Verse2 sec06_verse2`. **Commit:** built on 3748113 + this entry's changes.

## 2026-11-06T14:35 — M4 sections 1–11 and the full cut

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal` (`Cut`), 1920x1080; sections 1–8 bundled from 83ede8e, 9–11 from 3ef3e38 (End.tsx edits between them touch only sections 7's S34 hand-off and 9–11). **Command:** `scripts/m4_section.sh <comp> <stem>` each.
- **Full cut:** `renders/m4/m4_full.mp4` (concat + one continuous master track; see the production log). Review copy `renders/m4/review/m4_full_review_720p.mp4` (26 MB). **Commit:** 3ef3e38.

## 2026-11-06T16:40 — M4 sections 1–11 and the full cut, after the 13 review notes

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, 1920x1080, all from d3dc750. **Command:** `scripts/m4_section.sh` per section; concat; one continuous master track (5 s delay), as at 14:35.
- **Checks:** 7,954 frames; sync +0.0000 s at 30 s and 220 s into the song.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` (26.7 MB), contact sheets in `review/`.
