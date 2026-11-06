# Renders

Every render: timestamp, shot ID, composition, props, commit hash, output, contact sheet.

## 2026-11-06T07:46 — M1 ear-check preview

- **Shots:** all (labels only; no graphics). **Composition:** none (ffmpeg, not Remotion): `scripts/m1_preview.sh` burns `review/m1_preview.ass` (from `scripts/timing_map.py`) over a navy background. 640x360, 30 fps, audio clock (no pre-roll); the corner counter shows the video frame (with the 90-frame pre-roll). Audio track 1: `audio/preview/m1_gapped.wav` (Switch muted); track 2: the mix.
- **Commit:** built on 48222ea + the M1 scripts (committed with this entry).
- **Output:** `renders/m1/m1_preview.mp4`. No contact sheet (text only).
