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

## 2026-11-06T17:55 — M4 sections 1–11 and the full cut, after review notes round 2

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, from 216b10b. **Command:** `scripts/m4_section.sh` per section; concat; one continuous master track. **Checks:** sync +0.0000 s at 30 s and 220 s.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` (27.1 MB), contact sheets in `review/`. **Commit:** f1cd161.

## 2026-11-09T00:20 — M4 sections 1–11 and the full cut, on the human's final master

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, 1920x1080, from 3306699. **Command:** `scripts/m4_section.sh` per section; concat; the final master laid under it in one piece (`adelay=3912.2|3912.2,apad`, the new pre-roll).
- **Checks:** 8,011 frames; sync +0.0000 s at 30 s, 150 s and 245 s into the master (the last one after the added bar). Master −14.1 LUFS integrated, −1.0 dBTP.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4`, contact sheets in `review/`. **Commit:** 3306699.

## 2026-11-09T01:15 — M4 sections 1–11 and the full cut, after review notes round 3

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, 1920x1080, from 7fc03b7. **Command:** `scripts/m4_section.sh` per section; concat; the final master laid under it in one piece (`adelay=3912.2|3912.2,apad`).
- **Checks:** 8,011 frames; sync +0.0000 s at 30 s, 150 s and 245 s into the master. Frames checked in the render itself: S36's mouth, chorus 2's karaoke mid-line, S61's mouth, S63's summary.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` (29.1 MB), contact sheets in `review/`. **Commit:** 7fc03b7. Superseded renders: `archive/renders/m4_final_master_2026-11-09/`.

## 2026-11-09T10:20 — M4 sections 1–11 and the full cut, after review notes round 4

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, 1920x1080, from 74766e0 (S67 from `edit/S67_graded.mp4`, `scripts/s67_grade.sh`). **Command:** `scripts/m4_section.sh` per section; concat; the final master laid under it in one piece (`adelay=3912.2|3912.2,apad`, `-shortest`).
- **Checks:** 7,861 frames (S68 retired); sync +0.0001 s / +0.0000 s / +0.0001 s at 30 s, 150 s and 245 s into the master. In the render: S39's and S17's mouths on the "on"s, S35's mouth, S67's caption, and the room going dark on frame 7629 (the last note; luma 148 → 0).
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4`, contact sheets in `review/`. **Commit:** 74766e0. Superseded renders: `archive/renders/m4_round3_2026-11-09/`.

## 2026-11-09T20:09 — M4 sections 1–11 and the full cut, after review notes round 5

- **Compositions:** `Sec01-Intro` … `Sec11-Outroandreveal`, 1920x1080. Sections 1–3 and 6–11 from 4d8b0b2–64e11b2 (the batch, 19:27–19:59; the shared hand and the pointing hand are in every one of them); Sec04 and Sec05 re-rendered from fbfb222 (S18 without the hand, the push-in, Kalam and the stars; S18 spans the join). **Command:** `scripts/m4_section.sh` per section; concat; the final master laid under it in one piece (`adelay=3912.2|3912.2,apad`, `-shortest`).
- **Checks:** 7,861 frames; sync −0.0001 s / −0.0001 s / 0.0000 s at 30 s, 150 s and 245 s into the master. In the render: S07's keyboard whole in front of the links, S18's pencil, heading and stars, S24's stack with solid tops, S50's hand under the agreement with the thumb on top.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` (29.9 MB), contact sheets in `review/`. Superseded renders: `archive/renders/m4_round4_2026-11-09/`, `archive/renders/m4_round5_pre_s18_2026-11-09/` (the batch's Sec04 and Sec05 and its full cut).

## 2026-11-09T21:09 — M4 sections 1–11 and the full cut, after review notes round 6

- **Compositions:** `Sec01-Intro` from 03b0ee2 (the batch stopped at Sec03; none of the follow-ups touch it); `Sec02-Verse1` … `Sec11-Outroandreveal` from 24e15cb. **Command:** `scripts/m4_section.sh` per section; concat; the final master laid under it in one piece (`adelay=912.2|912.2,apad`, `-shortest`: the new pre-roll).
- **Checks:** 7,771 frames (90 fewer: the music now starts on the title); the cut's first sound at 2.0005 s, frame 60, S01's first frame; sync −0.0001 s / 0.0000 s / 0.0000 s at 30 s, 150 s and 245 s into the master; S67's room goes dark on frame 7539, the last note (luma 146 → 0). In the render: S06's keyboard outline whole over the links, S08's ladder, S19's cookie on the palm, S21's broccoli, S47's door on the floor line, S55's citation under the plate.
- **Outputs:** `renders/m4/sec*.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` (29.8 MB), contact sheets in `review/`. Superseded: `archive/renders/m4_round5_2026-11-09/`, `archive/renders/m4_round6_partial_2026-11-09/` (the stopped batch's Sec02).

## 2026-11-09T21:33 — M4 Sec06 and Sec09 and the full cut, after review notes round 7

- **Compositions:** `Sec06-Verse2` (S28's and S32's captions) and `Sec09-Bridge` (S48's windows; the redub's captions) from 6aab316; the other sections as rendered at 21:09. **Command:** `scripts/m4_section.sh` for the two; concat; the final master in one piece (`adelay=912.2|912.2,apad`, `-shortest`).
- **Checks:** 7,771 frames; sync −0.0001 s / 0.0000 s / 0.0000 s at 30 s, 150 s and 245 s. In the render: S48's windows and fanlight; the correction caption in one place across S54–S56 and the quote's source in one place across S55–S56.
- **Outputs:** `renders/m4/sec06_verse2.mp4`, `renders/m4/sec09_bridge.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4`, contact sheets in `review/`. Superseded: `archive/renders/m4_round6_2026-11-09/`.

## 2026-11-09T22:08 — M5: Sec11 with the closing cards and the credits music; the full cut

- **Compositions:** `Sec11-Outroandreveal` from 344fc6a's code (S59–S67, then FG, FD, F1–F9 and FE; the credits music under them); sections 1–10 as rendered for round 7. **Command:** `scripts/m4_section.sh Sec11-Outroandreveal sec11_outro`; `scripts/assemble.sh` (the master at 912.2 ms, the credits music at 255,033.3 ms with a 4 s fade from 360.133 s, summed without normalising).
- **Checks:** 10,924 frames (6:04); sync −0.0001 s / 0.0000 s / 0.0000 s at 30 s, 150 s and 245 s; S67's 2 s hold silent, the credits music in on card G (−23.5 dB RMS at 256–260 s) and faded out by the end (−34.4 dB in the last second). In the render: card G, the disclosure, card 7 of 9 with its Alleged tag, the end card (26 interventions).
- **Outputs:** `renders/m4/sec11_outro.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4`, contact sheets in `review/` (FG–FE included). Superseded: `archive/renders/m4_round7_2026-11-09/`.

## 2026-11-09T22:37 — M5: Sec06, Sec08 and Sec11 after Copilot and V07/V15; the full cut; the vertical cut

- **Compositions:** `Sec06-Verse2` (V07's mouth), `Sec08-Verse3PopQuiz` (V15's mouth; S47 a frame later) and `Sec11-Outroandreveal` (card G without Copilot, the cards 6 frames earlier) from 04f46ce; the other sections as before. `scripts/assemble.sh`; then `npx remotion render src/index.ts Vertical ../deliverables/vertical.mp4 --concurrency=8 --crf=18`.
- **Checks:** full cut 10,918 frames; sync −0.0001 s / 0.0000 s / 0.0000 s at 30 s, 150 s and 245 s; the credits music fades from 359.933 s. Vertical: 1080x1920, 832 frames (27.7 s), the title, picture and line in place, the Full video card at the end. In the render: card G reads "…with audits by Gemini and ChatGPT."
- **Outputs:** `renders/m4/sec06_verse2.mp4`, `sec08_verse3_popquiz.mp4`, `sec11_outro.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4`, `deliverables/vertical.mp4`, contact sheets in `review/`. Superseded: `archive/renders/m5_cards_v1_2026-11-09/`.
- **Sent copy:** `renders/m4/review/m4_full_review_720p_send.mp4` (CRF 29, AAC 128k, 25.4 MB), because the CRF 27 review copy (31.5 MB) is over the 30 MB upload limit.

## 2026-11-09T23:12 — M5: Sec11 with the Sound card; the full cut; the school short

- **Compositions:** `Sec11-Outroandreveal` from 5ced211 (the Sound card after the end card); `scripts/assemble.sh`; a sending copy at CRF 29. `VerticalSchool` from 3f123fb: `npx remotion render src/index.ts VerticalSchool ../deliverables/vertical_school.mp4 --concurrency=8 --crf=18`.
- **Checks:** full cut 11,128 frames (6:11); sync −0.0001 s / 0.0000 s / 0.0000 s at 30 s, 150 s and 245 s; the credits music fades from 366.933 s; the Sound card in the render. School short: 1080x1920, 1,579 frames (52.6 s), −15.2 dB mean, −1.0 dB peak; its citations in the render at the foot of the frame.
- **Outputs:** `renders/m4/sec11_outro.mp4`, `renders/m4/m4_full.mp4`, `renders/m4/review/m4_full_review_720p.mp4` and `_send.mp4` (25.6 MB), `deliverables/vertical_school.mp4` (21.9 MB). Superseded: `archive/renders/m5_cards_v2_2026-11-09/`.
