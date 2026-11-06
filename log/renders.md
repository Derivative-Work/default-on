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
