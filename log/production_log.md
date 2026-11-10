# Production log

Append-only. One entry per action: timestamp, step (shot ID where relevant), what, exact command/prompt/script, outputs, why.

## 2026-11-06T07:32:00-05:00 — Step 1: repo scaffolding, the brief, the song doc and the supplied audio

- **What:** Read the brief (Claude Doc `d889a8ec-4fb1-4601-a920-0a630e527b62`, rev 9) in full and the song doc it names (`5d8e66eb-2767-4114-9eab-9448ea7848ee`, rev 16; linked from the planning chat, not from the brief). Created the brief's layout (`audio/ timing/ assets/real/ remotion/ renders/ review/ edit/ log/`) plus the house folders (`docs/ lyrics/ archive/ config/ deliverables/ scripts/`) and `audio/switch/raw/`, `audio/clicks/` for the recordings. Copied the house tooling from Nine Hundred Acres: `.gitignore`, the 50 MiB pre-commit hook, `scripts/{manifest.sh,doc_to_md.py,fetch_share.mjs,chat_snapshot_to_md.py,fetch_suno.mjs,suno_meta.py,align_words.py,first_pass.py}`, `package.json`/`package-lock.json` (Puppeteer 24.43.1) and `pyproject.toml`, renamed. Imported the mix and the stems from `~/Downloads` (originals left in place) and checked every copy's SHA-256 (3/3 OK).
- **Commands:**
  - `mkdir -p audio/{track,stems,switch/raw,clicks} timing assets/real remotion renders review edit log/{prompts/suno,audits} scripts/hooks docs/planning_chat lyrics archive config deliverables`; `git config core.hooksPath scripts/hooks`
  - `cp -p ~/Downloads/"Default On".{wav,mp3} audio/track/`; `cp -p ~/Downloads/"Default On Stems.zip" audio/`; `unzip -q … -d audio/stems`; `sha256sum -c` against the sources
  - Brief: docs `read` of node `b48897e5-71dd` (full view, rev 9), then `python3 -I scripts/doc_to_md.py <read result> docs/brief.md`
  - Song doc: docs `read` of node `7fce3d5e-42f3` (rev 16). Draft 2's lyrics block copied verbatim to `lyrics/draft2.txt`; the style prompt, fact card, fairness caveats and conflict-of-interest note to `docs/song_doc.md` (partial mirror, by hand)
  - `uv sync`; `npm ci`
- **Script changes:** `song.py` names this song's files and its ten stems. `.gitignore` ignores `audio/switch/` and `audio/clicks/`; `manifest.sh` skips `audio/switch/raw/`, so the child's raw takes are in no public listing (brief, Protecting the child).
- **Agent error, corrected:** while setting up, the agent deleted its copy of `audio/Default On Stems.zip` (an asset, against house rules). It was restored at once from `~/Downloads` and its SHA-256 re-checked (identical). The empty `audio/master/` folder was removed: this song has no post-filtered master; the mix is the master.
- **Findings:**
  - **The mix:** PCM s16le, 48 kHz stereo, 249.20 s (4:09.2), not the song doc's "about 3:00". SHA-256 `dac24031…e766e3`.
  - **Stems:** ten WAVs, no MIDI: Lead Vocals, Backing Vocals, Drums, Bass, Guitar, Keyboard, Percussion, Other, Brass, Woodwinds. There is no separate Narrator stem: the brief's "Narrator stem" is `0 Lead Vocals` minus any generated attempt at Switch, which M1 locates and the final mix mutes.
  - **No take metadata yet:** the generator's take ID, prompt and settings (brief, Inputs) weren't supplied. Asked at the M1 gate.
- **Why:** the brief (Inputs, Pipeline, Layout, Production rules).
- **Environment:** Claude Code (Opus 5.5); ffmpeg; uv; Node v24.22.0; 12 CPU threads, 30 GB RAM, GTX 970 4 GB. Disk: 78 GB free.

## 2026-11-06T07:33:00-05:00 — Step 2: planning chat archived

- **What:** Fetched the planning chat's share page with the house Puppeteer script and converted it to Markdown.
- **Commands:** `node scripts/fetch_share.mjs https://claude.ai/share/3c896ee0-8eca-47f1-9c4b-dc62e4944768 docs/planning_chat/planning_chat`; `python3 -I scripts/chat_snapshot_to_md.py docs/planning_chat/planning_chat.json <url> > docs/planning_chat/planning_chat.md`
- **Outputs:** `docs/planning_chat/planning_chat.{json,html,txt,md}`
- **Findings:** snapshot 2026-11-06T12:27:34Z, "Song: Default On (Unwanted AI features in apps)", messages 1–18, 2026-11-06T01:36Z to 12:06Z. Messages 7–10 aren't in the share (probably edited branches). Message 13: the generator sang the Narrator fine but not Switch; message 15: the human's son will voice Switch, and the generation and stems are locked. No lyric audit by another lab's model is in the chat, so `log/audits/` stays empty until M8.
- **Why:** house practice: the planning chat is part of the making-of record.

## 2026-11-06T07:45:00-05:00 — Step 3: the Suno take logged

- **What:** The human sent the Suno share link mid-step. Fetched the page with the house Puppeteer script, extracted the clip's metadata and submitted lyrics, and diffed them against Draft 2.
- **Commands:** `node scripts/fetch_suno.mjs https://suno.com/s/h5g20uJMykgSH4pn log/prompts/suno/fetch_accepted`; `python3 -I scripts/suno_meta.py log/prompts/suno/fetch_accepted`; an inline `difflib` diff of `fetch_accepted/lyrics.txt` against `lyrics/draft2.txt` (curly quotes normalized)
- **Script change:** `suno_meta.py`'s lyric bounds are now `[Intro` … `But somebody asked it to.`
- **Outputs:** `log/prompts/suno/fetch_accepted/{clip.json,lyrics.txt,page.*,resp_*.json}`; `log/prompts/suno/takes.md`
- **Findings:** clip `759f181e-63fa-462f-acbe-32d6fd031117`, V6 (`chirp-hawk`), created 2026-11-06T02:06:56Z, 249.2 s (matches the mix). The submitted lyrics are Draft 2 word for word, including the bracketed voice and cue notes; no lyric exception. The stored style is a reworded, longer version of the song doc's prompt (`clip.json`, `tags`). Two prompt-to-audio differences for M1: the beat tracker finds a median 130.4 BPM against the prompt's 100, and the song runs 4:09 against "about 3:00".
- **Why:** the brief (Inputs: take ID, prompt and settings).

## 2026-11-06T07:50:00-05:00 — M1: transcription, lyric diff, timing map and the twenty Switch slots

- **What:** Transcribed both vocal stems (faster-whisper medium.en, int8, CPU, unprompted, word timestamps). Re-heard the doubtful spots with medium.en and small.en on the lead stem, the backing stem and the mix. Ran beat_this on the mix and the drum stem. Wrote the as-sung draft, force-aligned it (MMS_FA) on the lead stem, and built the timing map: sections, all 71 lines, the beat grid, the Switch slots, the sound events and all 67 shot cues resolved to frames. Rendered an ear-check preview.
- **Commands:** `.venv/bin/python -I scripts/first_pass.py`; `.venv/bin/python -I scripts/m1_recheck.py` (new); an inline medium.en/small.en re-hearing of 194.5–201.0 s; `.venv/bin/python -I scripts/beats_beat_this.py`; `.venv/bin/python -I scripts/align_words.py lyrics/as_sung_draft.txt`; `.venv/bin/python -I scripts/timing_map.py` (new); `.venv/bin/python -I scripts/m1_gap_mix.py` (new); `scripts/m1_preview.sh` (new); an inline per-stem RMS table and stem-gain fit (soundfile + numpy).
- **Script changes:** `align_words.py` now reads its windows, sections and singers from the lyrics file (`@ start end stem`, `[Section]`, `N:`/`S:`) instead of a table in the script.
- **Outputs:** `timing/{first_pass_vocals,first_pass_backing,m1_recheck,beat_this,words,map}.json`, `timing/map.md`, `lyrics/as_sung_draft.txt`, `review/m1_preview.ass`, `audio/preview/m1_gapped.wav`, `renders/m1/m1_preview.mp4`
- **Findings (words):** the master sings Draft 2 except:
  - **Not sung:** both "(On, on, on…)" tags (V04, V11), the Narrator's "Ahem!" before the redub and his "Huh." before "Who asked for that?". Captions drop "Ahem!" and "Huh."; S53 and S63 lose those mouth shapes.
  - **Doubtful, for the human's ear:** "It means it **stays**": the mix is heard as "stays" (4/4) and the lead stem as "stayed" (4/4). Kept as written.
  - Switch's lines as the generator sang them ("I got two sides", "You pushed me down") don't matter: they're muted and re-recorded.
- **Findings (Switch slots):** the generator sang all of Switch's lines itself, in the Narrator's lead stem (18 of 20; V04 and V11 not at all), so every slot is a mute span plus the room between the Narrator's neighbouring words (`timing/map.md`). The tight ones: V14 "Where's the 'No'?" 1.21 s, V12 "I'll uninstall it!" 1.49 s, V13 1.65 s, V07 1.77 s, V08 1.79 s. A take longer than its room would overlap the Narrator, so for those lines timing does matter, contrary to the brief's session tips.
- **Findings (the backing stem carries generated Switch too):** inside the mute spans the backing stem peaks at +9.6 dB re its median in V05, +5.4 in V10, −0.5 in V07, −3.9 in V08 (the first pass hears "you are hunting for a spot", "can I delete it"), so the mute must cover both vocal stems.
- **Findings (stems vs mix):** the ten stems are separations. At unit gain they sum to the mix with a residual of −9.2 dB and clip at 2.06; least-squares gains only reach −11.5 dB (lead 0.99, backing 0.27, keyboard 1.08, other 0.02). The brief's "final mix = instrumental + Narrator stem + Switch comp" would audibly change the approved sound. The preview uses a hybrid instead: the mix untouched outside the mute spans (42.6 s in all), the fitted non-vocal stems inside them, 20 ms crossfades. Proposed for M6 (gate question).
- **Findings (timing):** 249.2 s; median 130.4 BPM, 4/4 (beat_this; the prompt asked for 100); first downbeat 0.70 s. The pre-chorus click gaps are 0.45 s (37.44–37.89, 123.67–124.11); the outro's three clicks sit on the beats in a 1.93 s gap (220.84, 221.30, 221.76). Record-scratch gap 183.68–186.54. The chime goes in the 2.95 s gap where "Huh." would be (231.95). The master has no silence after the last word (242.40 s): the band's ending plays to the end of the file, so S67 starts when the audio ends and runs on room tone. The pre-roll is set to 3.0 s for S01's countdown before the first downbeat. Both are gate questions.
- **Why:** the brief, M1.

## 2026-11-06T08:00:00-05:00 — M1 gate applied: brief rev 15, as-sung lyrics, map rebuilt

- **What:** Applied the M1 gate. Edited the brief (rev 9 → 15, six text replacements): the Audio pipeline step (the generated mix is the draft; the human mixes the final), the session tip on spoken lines (the five tight slots and the V04/V11 placement), the cues of S53 ("Ahem!" isn't sung), S63 ("Huh." isn't sung) and S67 (the audio ends), and the M6 milestone (the human supplies the final mix). Re-mirrored the brief. Promoted the as-sung draft to `lyrics/as_sung.txt` unchanged ("stays" kept). Re-ran the aligner and the map on it: times unchanged; only the three cue labels differ. `CLAUDE.md`'s audio rule updated.
- **Commands:** docs `update` of node `b48897e5-71dd` (find/replace ×6) and `read` (rev 15); `python3 -I scripts/doc_to_md.py <read result> docs/brief.md`; `cp lyrics/as_sung_draft.txt lyrics/as_sung.txt` (header line edited); `.venv/bin/python -I scripts/align_words.py`; `.venv/bin/python -I scripts/timing_map.py`
- **Decision not taken:** the hybrid draft in `audio/preview/m1_gapped.wav` stays a review aid only; the animation is cut to `audio/track/Default On.wav`.
- **Why:** M1 gate (log/human_interventions.md, 07:58).

## 2026-11-06T08:20:00-05:00 — M2: the look (rigs, palette, film layer, style board, motion test)

- **What:** Started the Remotion project (`remotion/`, Remotion 4.0.535, React 19.1.10, the versions Nine Hundred Acres pinned) and built the shared look: the palette (`theme/palette.ts`), fonts (Titan One for bubble titles and lyrics, Work Sans for captions; both OFL, `assets/LICENSES.md`), the film layer (`film/Film.tsx`: a fresh grain field each frame, 15 Hz gate weave of about 2 px, a soft vignette, dust specks on about one frame in four and a hair one in thirty, a sepia-and-yellow fade, a 2-frame splice flash, one `strength` that goes to 0 for the real-world outro), procedural watercolour paper (`film/Paper.tsx`: displaced and blurred washes with pooled edges and broad pigment variation, paper tooth, an ink wobble filter), and three cutout rigs (`rigs/`): Switch (six poses, a toggle from 0 OFF to 1 ON, blink, look, wave), the Narrator (head turn, five arm poses, a sheepish redub face) and the grey-sleeved hand (reach, curl). Both characters share seven mouth shapes named as Rhubarb's basic set (X, A–F) for M4. Built S04, S16, S28, S53 and S61 as shot components of their local frame (`scenes/KeyFrames.tsx`), so M3 reuses them; S04 is timed to its aligned words.
- **Iterations (agent review of its own renders):** the first watercolour mottling read as TV static (fine noise); replaced by broad, low-frequency density variation. Switch's eyes were enlarged (r 38 → 50), his arms thickened, the plate lengthened so the lowered toggle clears his mouth, and the sad brows corrected (they read as cross). The Narrator's ears and sideburns now follow a head turn. S16's peel was redrawn as a true corner fold. The bouncing-ball line is laid out by measuring the loaded font (an estimate ran words together).
- **Commands:** `npm install` in `remotion/`; `npx tsc --noEmit`; the stills and render in `log/renders.md`. `remotion/public/track.wav` is a hard link to `audio/track/Default On.wav` (the bundler doesn't follow symlinks).
- **Outputs:** `remotion/src/**`, `review/m2/*.jpg`, `renders/m2/m2_motion_S04.mp4`, `assets/LICENSES.md`
- **Guardrails checked:** no logos, wordmarks or product UI: the settings menus in S28 are generic (titles "Settings", "More settings", "Advanced", "Privacy & more", "Smart features", "Other"); the fine print paraphrases the fact card ("on or about October 10"). The Narrator is a generic 1970s host, not a recreated character.
- **Why:** the brief, M2.

## 2026-11-06T09:10:00-05:00 — v2 master imported; planning chat and docs re-mirrored; M1 re-run on v2; M2 look revised

- **What (inputs):** Re-fetched the planning chat (now messages 1–30; the share's "snapshot taken" stamp is unchanged at 12:27:34Z, but the content runs to 13:13Z). The first snapshot moved to `docs/planning_chat/snapshot_2026-11-06T1227Z/`. Re-read the brief (rev 47) and the song doc (rev 38) in full: `docs/brief.md` re-mirrored; `docs/song_doc_full.md` is a full mirror of the song doc (Draft 3, the updated fact card, the audit log), and `docs/song_doc.md` (rev 16 partial) is marked superseded. Draft 3's lyrics block saved to `lyrics/draft3.txt`; it differs from Draft 2 in the intro ("Hi, grown-ups!"), two Gmail lines, the dropped "Ahem!" and "Huh.", and the new V21.
- **What (audio):** Moved the v1 mix, stems and zip to `archive/audio/2026-11-06_v1/` (superseded, kept for the timing comparison). Imported `Default On updated.zip` (SHA-256 checked) to `audio/`, unzipped to `audio/stems/` (13 files: the mix as "0 Default On", Woodwinds, Brass, FX, Synth, Strings, Percussion, Keyboard, Guitar, Bass, Drums, Backing_Vocals, "Vocals (original)"), and copied the mix to `audio/track/Default On.wav` (byte-identical). `remotion/public/track.wav` re-linked to it. `song.py` names the new stems; `first_pass.py`, `beats_beat_this.py`, `m1_gap_mix.py` and `timing_map.py` read the vocal, backing and drum stems from it.
- **Findings (v2 vs v1):**
  - **Format:** PCM float32, 48 kHz stereo, 249.184 s (v1: s16, 249.200 s); peak 0.93 (v1 0.74).
  - **Words:** the first pass hears "Hi, grownups!", "Now your inbox got a helper, and it wants to help you too" and "That they didn't" as Draft 3 says; everything else is as v1. "It means it stays" is again heard as "stayed" on the vocal stem; kept as approved.
  - **Timing is not identical.** Waveforms barely correlate (0.12–0.47): the export is re-rendered, not patched. Aligned line by line, every line keeps its length (±0.04 s; the replaced lines −0.12 to +0.60 s), but the song sits on a smooth drift against v1: L01 −0.42 s, then +0.2 s rising to +0.98 s by L21, +1.30 s at the Gmail replace (L23–L25), about +0.9 s through verse 3, falling to +0.20 s at L71. The total length is unchanged. Nothing had been animated against v1 seconds, so the map is rebuilt on v2; `timing/{words,map,first_pass_vocals,beat_this}_v1.json` keep v1's.
  - **Beats:** 130.4 BPM median as before; first downbeat 0.72 s.
  - **Stems vs mix:** the stems are time-aligned with the mix (cross-correlation lag 0–1 samples on vocals, drums and bass at 20, 100 and 200 s) but fit it worse than v1's (least squares −2.7 dB, implausible gains such as strings ×4.6): separation bleed, not timing. Relevant only to the human's final mix.
- **What (map):** `timing_map.py`: S00 (2 s card on room tone) makes the pre-roll 5.0 s (S00 frames 0–59, the countdown 60–149, the downbeat at 150). V20 retired; V21 added, proposed at 243.10–245.50 s after the last word (242.50 s), with room to the band's last note (247.50 s, the last strong onset), where S67's hand flips the switch; S67 starts on V21. Windows in `lyrics/as_sung.txt` widened for the drift; `lyrics/as_sung_v1.txt` keeps v1's. Slot rooms on v2: V14 1.21 s, V12 1.49 s, V13 1.65 s, V08 1.77 s, V07 2.25 s (was 1.77 s; the Gmail replace left more room). The ear-check preview was re-rendered on v2.
- **What (look):** Switch is now a flat rocker plate: a flush paddle rocks top-in for ON and bottom-in for OFF, its pressed half shaded with a shadow under the raised lip, and a pilot light glows when ON; the eyes and mouth moved to clear it. The Narrator's head was redrawn in Switch's cartoon language (big round eyes with a resting lid, a bulb nose, cheeks, a bushy moustache), and head turns are now discrete front and three-quarter drawings swapped on a cut, never features sliding across the face. The brief's Characters, S01, S04 and S57 lines were changed to match (docs `update`, rev 47 → 52; card G's "toggle" is a real UI toggle and stays).
- **Commands:** `node scripts/fetch_share.mjs …`; docs `read` of both docs and `update` (×5) of the brief; `python3 -I scripts/doc_to_md.py` ×2; `mv`/`cp -p`/`unzip`/`sha256sum -c` for the audio; `.venv/bin/python -I scripts/{first_pass,beats_beat_this,align_words,timing_map,m1_gap_mix}.py`; `scripts/m1_preview.sh`; inline cross-correlation and line-timing comparisons; the Remotion stills and render in `log/renders.md`.
- **Why:** the human's inputs and look notes (log/human_interventions.md, 08:50); the brief (M1 "checks the replaced spans kept their length").

## 2026-11-06T09:45:00-05:00 — M3: animatic of every shot, cut to the track

- **What:** Built every shot S00–S67 as a Remotion component of its local frame (`remotion/src/shots/{Intro,Chorus,Lesson,Quiz,End}.tsx`, sharing `shots/common.tsx` and a prop kit `components/props.tsx`: answer box, search box, links, chalkboard, stool, captions, envelope, generic people and kids, mini rockers, TV, tiles, phone, doors, price tags, contract, slates, spotlight). The five M2 key frames are reused. `compositions/Cut.tsx` plays whichever shot the map puts on screen, under the film layer (splices at every section start; strength 0 from S65) with the mix on the map's clock; one composition per section (`Sec01-Intro` … `Sec11-Outroandreveal`, brief Pipeline) and the `Animatic` (960x540, the 1920x1080 frame at half scale) with burn-ins: shot and cue, frame and audio time, and Switch's slots as text slates (line, ID, room). Mouths are placeholders: an open-shape cycle inside aligned words and proposed slots (`timing.ts`, `mouthAt`); M4 does Rhubarb. S65–S67 are stand-ins naming the real material they wait for.
- **Agent review before the full render:** a 68-frame `SpotCheck` (one mid-shot frame per shot) found and fixed: long lyric lines running off frame (the bouncing-ball line now shrinks to fit), the Narrator cropped in the lesson corner, the pull-down screen covering his face in S34, S58's classroom missing from the TV (HTML nested in SVG), and Switch overlapping the Narrator in S64 (the Narrator is no longer in S64; the brief has only Switch).
- **Guardrails:** all products are generic. S26–S28 carry "Alleged in a lawsuit. Google denies changing settings.", S45 "Some iPhones, iOS 18.3.2, March 2025", S46 "Microsoft 365 Personal. Alleged by Australia's ACCC." (brief rev 47). S47's cheaper tag reads "CLASSIC" with no price, because the fact card gives none (a first draft showed a made-up A$ figure; caught before render). The final-chorus kids are generic and varied.
- **Checks:** audio is frame-exact (the mix's 5.0 s mark found at video 10.0 s, with silence through the 5 s pre-roll). 7,684 frames (4:16.1). Shortest shots: S11 8 frames (the first [click], in a 0.45 s vocal gap), S32 37, S27 38; longest S57 510 (the final chorus in one classroom shot, as the brief stages it).
- **Commands:** `npx tsc --noEmit`; `npx remotion render src/index.ts SpotCheck <dir> --sequence`; `npx remotion render src/index.ts Animatic ../renders/m3/m3_animatic.mp4 --concurrency=8 --crf=26` (5 min 42 s, about 22 fps); `python3 -I scripts/contact_sheets.py renders/m3/m3_animatic.mp4` (new port: seeks each frame directly).
- **Outputs:** `remotion/src/**`, `renders/m3/m3_animatic.mp4`, `review/S00.jpg` … `review/S67.jpg`
- **Why:** the brief, M3.

## 2026-11-06T10:20:00-05:00 — M3 revised: S11 timing, S57a–c, the post-roll (card G, S68)

- **What:** Re-read the brief (rev 58): S68 added after fact card G; the credit changed; S68's footage added to Inputs. Edited the brief (rev 58 → 61): S57 now cues the final chorus's first line; new rows S57a ("It was there when we woke up…": the desks, rockers rocking ON in turn), S57b ("We can hide it, we can mute it…": the kids try the gags on their own switches; each rocks back ON) and S57c ("But the switch is just a picture…": Switch close, a sticker corner lifting); S10's picture now says the sleeve starts reaching in its last half second. Re-mirrored the brief.
- **Map:** `timing_map.py` adds the post-roll so far: S67 holds 2 s past the audio (251.15 s), fact card G for 4 s ("FG"), S68 for 5 s (255.15 s); `video_end_frame` 7954. S57a–c resolve to L62–L64. The other fact cards and the end card are M5's.
- **Shots:** S10's last 15 frames bring the sleeve in to 82% reach; S11 (8 frames) flips him on its first frame; S12's first 8 frames withdraw the hand while he looks after it. S57 is the wide classroom on the first line; S57a–c new; FG is a placeholder card; S68 a stand-in carrying the brief's caption. `timing.ts` merges the post-roll into the shot list; `contact_sheets.py` reads it from the map.
- **Commands:** docs `read` (rev 58, 61) and `update` (insert 3 rows; 2 find/replace); `python3 -I scripts/doc_to_md.py`; `.venv/bin/python -I scripts/timing_map.py`; stills of map frames 1288–1306 and a SpotCheck of S57–S68; the render below; `python3 -I scripts/contact_sheets.py renders/m3/m3_animatic.mp4`.
- **Outputs:** `renders/m3/m3_animatic.mp4` (replaces the 09:40 render; regenerable from e33b2e7), 73 contact sheets (`review/S57a.jpg`, `S57b`, `S57c`, `FG`, `S68` new).
- **Why:** the human's M3 notes (log/human_interventions.md, 10:05).

## 2026-11-06T10:40:00-05:00 — M4: lip sync with Rhubarb Lip Sync

- **What:** Fetched Rhubarb Lip Sync 1.14.0 (the human used it on Read Only; memory and the planning chat), verified against the SHA-256 Read Only recorded, and adapted Read Only's `scripts/rhubarb_visemes.py`: each of the 71 aligned lines is cut from the vocal stem (padded 0.25 s, 16 kHz mono) and run with its text as the dialog file (PocketSphinx), extended shapes X only, so the cues are exactly the rigs' seven mouths. `remotion/src/timing.ts` `mouthAt` now reads the cues (binary search per singer); Switch's ungenerated slots (V04, V11, V21) keep the placeholder flap; his other cues follow the generator's attempt until M6.
- **Rhubarb:** https://github.com/DanielSWolf/rhubarb-lip-sync/releases/download/v1.14.0/Rhubarb-Lip-Sync-1.14.0-Linux.zip, SHA-256 a9a9074862cff47b2d59b8bf399a678a3b0b74f9452ad6ad94cb292913dd8667, unpacked to `tools/` (git-ignored, never archived). Third-party tool, MIT licence; it produces timing data, not an asset in the video.
- **Commands:** `curl -sSL -o tools/rhubarb.zip <url>`; `sha256sum -c`; `.venv/bin/python -I scripts/rhubarb_visemes.py` (8 min 19 s)
- **Outputs:** `timing/visemes.json`; `cache/rhubarb/` (regenerable, ignored)

## 2026-11-06T11:05:00-05:00 — M4 detail pass: section 1, the Intro (S00–S04)

- **What:** Applied the human's detail note (10:25) to the Intro, as the benchmark for the other sections. New set-dressing kit `remotion/src/components/sets.tsx` (wallpaper patterns, a 70s sunburst, a ticking clock, a globe, a plant, a bookshelf of varied books, a curtained window, a rug, a pennant, a lamp, framed pictures, an outlet, chalk doodles and a chalk tray; `breath` and `sway` idles).
  - **S01:** the title over a slowly turning mustard-and-orange sunburst, with a drop shadow and twinkling sparkles; the little rocker hops ON with an "ON" pop.
  - **The classroom (S02, and S23 later):** striped wallpaper, a floor with boards and a skirting, the chalkboard with a tray (chalk, eraser), a CIVICS pennant, a ticking clock, a curtained window, a bookshelf with a spinning globe, a plant; the Narrator now sits behind a teacher's desk (apple, books, pencil cup), which hides the waist-up rig's edge, and breathes, sways and raises his brows on wide vowels.
  - **The living-room wall (S03, S04):** one continuous wash across the pan (a seam between two tiles was fixed), daisy wallpaper, an avocado wainscot, a sailboat picture, a lamp and plant on a side table, a flower picture, an outlet, a hills picture. S04's flips get anticipation, a hop and a squash, and Switch breathes.
  - **Switch's rig:** shut eyes are now a curved lid line with lashes (they read as empty circles before).
- **Commands:** stills of `Sec01-Intro` at frames 140–588 for review; `npx remotion render src/index.ts Sec01-Intro ../renders/m4/sec01_intro.mp4 --concurrency=8 --crf=18` (2 min 25 s); `python3 -I scripts/contact_sheets.py renders/m4/sec01_intro.mp4 0 659`
- **Outputs:** `renders/m4/sec01_intro.mp4` (1920x1080, 659 frames, with audio), `review/S00–S04.jpg`

## 2026-11-06T11:30:00-05:00 — M4 detail pass: section 2, Verse 1 (S05–S08)

- **What:** A study-desk set for S05–S07: diamond wallpaper on teal, a pinboard of notes, a floor lamp, a wood-grain desktop with a round-key keyboard (a key dips with each typed letter), a steaming mug, a notepad and pencil. The search page under the box now has results (an icon, a title bar and two snippet lines each). S06: the answer box comes in from the left on a low hop with speed lines and lands on the first results (a dust puff; they squash flat). S07: Switch lifts its corner with a strain and a sweat drop. S08: a tall bookcase of seven shelves with the tiny "Web" tab glinting on top, a wooden ladder Switch climbs rung by rung, alternating arms, and the Narrator framed chest-up, cropped by the frame edge rather than floating.
- **Agent review:** stills before the render caught the Narrator floating waist-up in S08 and S06's hop covering the search box and landing below the page; both fixed.
- **Commands:** `scripts/m4_section.sh Sec02-Verse1 sec02_verse1` (new: render, contact sheets, CRF 26 review copy)
- **Outputs:** `renders/m4/sec02_verse1.mp4`, `renders/m4/review/sec02_verse1_review.mp4`, `review/S05–S08.jpg`

## 2026-11-06T11:45:00-05:00 — M4 detail pass: section 3, pre-chorus 1 (S09–S12)

- **What:** The night set (shared with S35–S36): night-blue striped wallpaper, a curtained window with the moon and twinkling stars, a clock at 11:47, a lamp switched off and a dark bookshelf pushed to the frame's edge, floorboards, a radial falloff into the dark so Switch is alone in the spotlight, and a moth circling the light. S09: he sways to the half-time and breathes. S10: a sigh puff as he settles to OFF; the sleeve slides in over the last half second. S11: the fingertip presses his paddle on the click, with a "click!". S12: the hand withdraws; two question marks rise as he looks around.
- **Agent review:** the first render's sleeve pointed at his eyes, not his paddle, and the furniture competed with him; both fixed before this render.
- **Command:** `scripts/m4_section.sh Sec03-Prechorus1 sec03_prechorus1`
- **Outputs:** `renders/m4/sec03_prechorus1.mp4`, review copy, `review/S09–S12.jpg`

## 2026-11-06T12:10:00-05:00 — M4 detail pass: section 4, chorus 1 (S13–S18)

- **What:** S13 over a turning sunburst; the five rockers bounce and flick ON on the downbeats; music notes drift up. A bedroom set for S14–S15 (and S37): daisy wallpaper, a curtained window (sunrise or moon), a headboard bed with a patchwork quilt and pillow, a bedside table with an alarm clock that rings at sunrise ("BRRING!"), a dresser with three drawers and a plant, slippers, a rug; night dims it. The gags are now staged in that room: a blanket thrown over the pillow; the mute bar; the top drawer that shuts on the answer box and slides back open (chorus 2: a zipped sleeping bag, the mute bar sliding off by itself, a lunchbox that pops open). S16 gains the wallpaper and skirting. S17's crooked redraw shows its pencil construction lines and eraser crumbs, with "on, on, on" drifting up. S18 is a ruled notebook page (binder holes, a red margin, a coffee ring, a star and notes) with the hand drawing each rocker with a pencil.
- **Agent review:** stills caught the bed's headboard colliding with the bedside table and S18's hand off-frame; fixed before the render.
- **Command:** `scripts/m4_section.sh Sec04-Chorus1 sec04_chorus1`

## 2026-11-06T12:30:00-05:00 — M4 detail pass: section 5, the Lesson (S19–S24)

- **What:** The lesson board sits in the classroom (striped wallpaper, the clock, the pennant, a floor), with a chalk tray; each heading writes itself on in chalk with a puff of dust and an underline; the Narrator is chest-up at the right, cropped by the frame, turned to the board. S19: a plate of chocolate-chip cookies; the kid says "sure!". S20: the maze is built of labelled menu panels ("Settings", "Privacy", "More", "Advanced", "Personalize", "Other", "Help") with an "EXIT?" arrow; Switch watches from the chalk tray. S21: a fork and napkin. S22: the stamp slams down on the plate (the frame shakes), lifts, and leaves "YOU CHOSE THIS" and ink flecks. S23: a dust puff when the test papers thud onto the desk. S24: papers flutter down around the buried Switch.
- **Agent review:** caught an off-board "EXIT?", Switch hidden behind the Narrator, and a stamp that missed the plate and hid its own print; fixed.
- **Command:** `scripts/m4_section.sh Sec05-Lesson sec05_lesson`

## 2026-11-06T12:55:00-05:00 — M4 detail pass: section 6, Verse 2 (S25–S34)

- **What:** The study (S25–S26): a generic mail client on the desk (folder column, mail rows with unread dots and stars, a tiny "smart features" switch in the corner), diamond wallpaper, a window, a plant, a framed picture. S26: a calendar with real date grids flips from September to October (the 10th circled), leaves drift past, and while the envelope looks at the calendar, the inbox's switch flips ON with a glint. S27: a hallway (striped wallpaper, wainscot, runner rug, coat rack, picture); the door rattles on each knock. The living room (S29–S33): striped wallpaper, a window (moon; sunrise with sunbeams), a clock (2:40 a.m.; 6:45 a.m.), a sofa with a cat (asleep, then sitting up), a lamp, a plant, a rug, the TV on its cabinet; S29's screen says "Do not turn off your TV"; S30's home screen has a header, and the new tile winks with "new!"; S31–S33 happen in front of the TV in the same room. S34 is back in the classroom, with the pull-down screen over the chalkboard. The lawsuit caption runs S26–S28, as the brief has it.
- **Agent review:** caught the caption starting a shot early (S25), the person cropped to a head-top, and the calendar overlapping a picture; fixed.
- **Command:** `scripts/m4_section.sh Sec06-Verse2 sec06_verse2`

## 2026-11-06T13:20:00-05:00 — M4: the look driven toward the reference shorts (pastiche: drawing and grading)

- **Reference study:** 16 stills sampled from 8 clips (two per clip, at 30% and 62%) into a contact grid in the scratchpad, plus two full-size frames, for line, colour and grade only. Findings: thin, loose near-black pen lines that thicken and thin; flat cel colours, brighter than the brief's earthy set; mostly pale pastel or near-white backgrounds, with detail as pen hatching; a high-key, soft telecine look whose whites lean lavender (sampled ~(224,217,255) and ~(234,197,197) on two backgrounds), with pale cool vignetting. No characters, sets or compositions were taken.
- **What changed (globally, `remotion/src`):**
  - **Line:** every ink outline's width now goes through `lw()` (`theme/palette.ts`, `LINE` 0.62): 262 outlines across 13 files, by a scripted rewrite of `stroke={C.ink} strokeWidth={N}` (N ≤ 10) and the shared `ink` styles; the limb strokes' ink rims narrowed by hand (Switch's arms, the Narrator's arms, the hand's finger and thumb). Ink colour #2a1f1b (near-black warm brown; was #3d2617).
  - **Line boil:** a 3.2 px displacement over the drawn frame whose seed changes every 3 frames (`film/Film.tsx`).
  - **Palette:** flat cel colours a step brighter (mustard #f0b52e, orange #ea7230, green #7aa645, teal #3a8fbd, red #d6443a, night #2c3f88, skin #f2c29c), paper #f5f1f2.
  - **Backgrounds:** washes are flat colour fields with a slightly irregular edge (the mottled watercolour filter is gone); a base or wall colour is a 40% pastel tint (night and the dark wall stay deep); wallpaper patterns at half their former strength.
  - **Grade:** no sepia or yellow; saturation +10%, contrast −7%, brightness +3%, a 0.55 px softness; a lavender multiply (#e6def5 at 20%); a pale cool vignette (rgba(105,95,130,0.42) at the edge); finer grain.
- **Brief:** Look and characters: "cutout characters on flat pastel backgrounds"; the palette line now describes the pastiche (drawing and grading only, never the reference's characters, sets or compositions); the film layer is "graded high-key and a little soft, with whites leaning lavender and a pale, cool vignette". Docs `update`, rev 61 → 64.
- **Outputs:** `review/m4_look_reference_pastiche.jpg` (six frames in the new look). Sections 1–6 are re-rendered in it next.

## 2026-11-06T13:55:00-05:00 — M4: the pen-detail layer (thin lines carry the detail, as in the reference)

- **Why:** the human's note (13:35). In the reference shorts, the thin pen line carries the detail: hatching in shadow, grain, folds, hair, pattern drawn in ink.
- **What (shared, so every section has it):**
  - **Hatching:** pen patterns in every frame's defs (`pen-hatch`, `pen-cross`, `pen-dots`, `film/Paper.tsx`); a `PEN` line style (2.4 px ink, `theme/palette.ts`); helpers `Grain`, `Floorboards`, `CastShadow` (`components/sets.tsx`).
  - **The Narrator:** cable-knit chevrons and side folds on the cardigan, a stitched pocket, stitched collar edges and a shirt fold, a hem line, a hatched shadow under the chin and neck lines, hair strands, ear curls, laugh lines, a nostril, moustache bristles, a forehead line, elbow creases, cuff ribbing and knuckle lines.
  - **Switch:** the plate's thickness as a hatched edge to the right and below, a bevel highlight, faint scuffs, grip lines on the raised half of the paddle, shaded screw heads.
  - **The hand:** sleeve folds, a stitched cuff seam, knuckle creases, a fingernail, lines on the back of the hand.
  - **People and kids:** collar and shirt seams; hair strands; freckles on some kids.
  - **Sets and props:** spine bands on every book and a hatched shadow inside bookcases; curtain folds and window glints; lampshade pleats; rug fringes; mitred picture frames; globe meridians; leaf veins; chalkboard frame lines and smudges; TV bezel grain; door panels and grain; a phone's speaker slot and screen glint; wallpaper prints now drawn in ink over their faint colour; floorboards with nail heads on every floor; a hatched shadow band where each wall meets its floor; wood grain on the desktops.
- **Interrupted:** the 13:20 re-render of sections 1–6 was stopped after three sections (out of date); all are re-rendered below.
- **Outputs:** `review/m4_pen_detail.jpg` (six frames).

## 2026-11-06T14:15:00-05:00 — M4 detail pass: sections 9–11 (bridge, final chorus, outro), code and stills

- **Bridge:** S48's dusk schoolhouse in pen (clapboard lines, cross-hatched roof, a bell in the tower, a panelled door, mullioned windows, a picket fence, a path, three trees, the first stars, two birds). S49: the teacher's desk at dusk with grain, the note on ruled paper, an ink pot and pen, an apple with a highlight, exercise books, the board's corner, a dusky window, a clock at 4:52. S50: the "No AI, please" note still on the desk as the pinstriped cuff (with a cufflink and knuckle lines) slides the contract over. S51: the contract close up on the desk's grain, fine print and a "Sign here" line. S53: the redub at the Narrator's desk in the classroom, his mouth 8 frames late (visibly out of sync), the contract with its third box, the CORRECTION slate, tape wobble. S54–S55: the classroom ceiling (grained beams, school lights) above the bolted answer box. S56: in the classroom; Switch on the desk; the Narrator turns away with "ahem…".
- **Final chorus:** the classroom gains an alphabet strip, a clock, windows, a floor and desk grain; S57a–b an alphabet strip, grain and pencils; S57c grain. S58 now pulls back into the living room of S29–S30 (same room by day): the classroom shrinks into the TV's screen and the new tile winks in the screen's corner.
- **Outro:** the dark wall (S59–S61) has a faint printed wallpaper, a skirting, a floor, and a pool of light under the spotlight. S62 and S64 are in the classroom set.
- **Checked:** twelve stills across sections 9–11.

## 2026-11-06T14:40:00-05:00 — M4: all eleven sections rendered in the final look; the full cut assembled

- **What:** Re-rendered sections 1–8 in the reference-driven look with the pen-detail layer, rendered sections 9–11, and assembled the full M4 cut: the eleven section videos concatenated (stream copy, 7,954 frames), with the audio replaced by one continuous track from the master (5 s pre-roll delay, padded), because per-section AAC encodes added padding at each join (the concatenated audio ran 265.28 s against 265.15 s). Sync checked by cross-correlation at 30 s and 220 s into the song: +0.0000 s at both.
- **Checked:** the rendered contact sheets for the quiz fixes (S43 on the studio screen; S45's phones clipped to the screen, its caption above the audience), S38's self-peel and S58's pull-back.
- **Commands:** `scripts/m4_section.sh` for each section; `ffmpeg -f concat … -c copy`; `ffmpeg -i <concat> -i "audio/track/Default On.wav" -map 0:v -map 1:a -c:v copy -af "adelay=5000|5000,apad" -c:a aac -b:a 256k -shortest renders/m4/m4_full.mp4`; a 720p CRF 27 review copy.
- **Outputs:** `renders/m4/sec01…sec11*.mp4`, `renders/m4/m4_full.mp4` (1080p, 4:25), `renders/m4/review/m4_full_review_720p.mp4`, `review/S00…S68.jpg` and `FG.jpg`.

## 2026-11-06T16:10:00-05:00 — M4: the human's 13 review notes applied

1. **On/off read backwards:** the rocker now shows its state by the raised, lit half: ON = top raised (bottom pressed in), OFF = the reverse; small printed ON and OFF marks on the paddle halves, the raised half's mark clear and the other faint; the pilot light moved clear of the ON mark. The desks' mini rockers follow the same rule. (`rigs/Switch.tsx`, `components/props.tsx`; the `toggle` value's meaning is unchanged.)
2. **Ladder:** the wobble is about a third of what it was and slower (±1.1°, an occasional 0.5° judder).
3. **"Switch is just a picture":** S16 is now its own shot: the sticker peels on the left (flat); on the right a pencil redraws him in six stages (outline; bevel and screws; eyes; paddle and pilot light; mouth and arms; hatching), the pencil travelling to each stroke, then the drawing is inked into the fully detailed Switch. Its lyric now follows the aligned words (the old key frame had placeholder timing).
4. **The notebook (S18):** a new `PencilHand`: the pencil pinched between thumb and index, its tip on the page at the latest doodle, the fist and grey sleeve running off the frame's bottom edge.
5. **Opt-in cookie (S19):** the grey bar with a cookie (which read as a misaligned toggle) is replaced by a hand in a teal sleeve (not the grey off-screen hand) offering the cookie on its fingertip, with a "Cookie?" bubble.
6. **CIVICS pennant:** the text sits on the pennant's centre line, fitted inside the taper.
7. **Opt-out maze (S20):** twelve settings windows on a grid that never overlap, each titled on its own title bar (25 px); links that loop ("More ›", "‹ Back", "See all ›", "Settings ›"), dashed arrows going round in circles, one window "managed for you"; the kid's route winds and doubles back with a dotted trail; EXIT? is greyed out, its arrow pointing back to the start.
8. **Default (S21–S22):** a lunch tray glides in by itself (broccoli with steam, a CHEF'S PICK flag, a milk carton, a spoon, a tag whose checkbox is already ticked: "pre-selected"); the kid scoots in on a chair and frowns; in S22 he pushes the tray away and it slides back, then the stamp, the shake, the ink and a slump.
9. **Australia (S46):** a map card with a recognisable outline (Cape York, Arnhem Land, the Gulf, the Bight, Tasmania), ocean waves, the name, a compass rose; a generic boxed office suite on the east coast whose price tag is a balloon on a string swelling to "+45%" and tugging the box up.
10. **School exterior (S48):** rebuilt in full: sky with moon, clouds and stars; hills with tiny houses; the schoolhouse with chimney and smoke, scalloped shingles, a belfry with a swinging bell and a weathervane, clapboard and trim, a porch with posts, steps and railing, panelled doors and a fanlight, a SCHOOL plaque, shuttered lit windows with curtains and flower boxes, a stone foundation; a picket fence and gate, a stone path, a flagpole with a plain pennant, a tree with a tire swing, a bike rack and bicycle, a mailbox, shrubs, grass.
11. **"No AI, please" (S49–S50):** a shared ruled note with a red margin; the handwriting fits the sheet and sits on the rules.
12. **The finger:** the hand is redrawn as one pointing hand (three curled knuckles, the thumb along them, an extended index finger with a nail that bends a little as it presses). Every flip shot (S10–S12, S35–S36, S60–S61) brings it in along one line to press Switch's bottom half, the half that goes in when he turns ON.
13. **The peel:** a `flat` Switch (no plate thickness or edge shadow) for every peel (S16, S38, S57c and the key frame): a sticker has no thickness.
- **Checked:** stills of each fix (S10–S12, S16 at four stages, S18–S22, S46, S48–S50, S60–S61).

## 2026-11-06T16:45:00-05:00 — M4: all sections re-rendered with the 13 fixes; the full cut reassembled

- **What:** every section re-rendered (the rocker and the hand appear throughout), the full cut reassembled with one continuous master track; sync verified (+0.0000 s at 30 s and 220 s). Rendered contact sheets checked for S16, S20, S46, S48.

## 2026-11-06T17:30:00-05:00 — M4: review notes, round 2, applied

1. **YOU CHOSE THIS (S22):** the stamp's impression is a framed print: red letters in a double red frame on a cream patch, legible over the broccoli.
2. **The ladder (S08):** it now leans against the bookcase (about 5°), and Switch is drawn in the ladder's own frame, so he is always on it, climbing rung by rung with his hands reaching up.
3. **The seated kid (S21–S22):** the Kid rig has a seated lower body (lap, shorts or trousers by seed, knees, socks, shoes) and arms with hands that point or rest; the kid sits on a full chair, hands on the table, points at the tray, pushes it away.
4. **TEST (S23):** the stack lands on the desk's left end, and its cover sheet springs up to face us like a sign: "TEST" large in red bubble letters, "Name:", "Score: ____ / 100", a staple.
5. **The TV hide (S31–S33):** now on the TV's own home screen, filling the frame inside its bezel: Switch drags the winking tile toward a "Delete" bin; the bin card-flips into a "Hide" box (an eye with a line through it) with "Can't delete this app. Hide it instead?"; the tile drops in; Switch lifts the lid and the tile waves from inside.
6. **The schoolhouse (S48):** the chimney now runs down behind the roof (it floated 17 px above it) with a cap; the tire swing is a real tire (a dark ring with a see-through hole, tread and a highlight) on a rope from the branch, swaying from the knot; the school is drawn 12% larger.
7. **The kids' attempts (S57a–b):** each switch stands centred on its desk at 1.5×, in front of the kid; the kids' arms are drawn in front of the desk (body behind it, `armsOnly`); one pushes it OFF with a finger and it springs back ON ("boing!"), one drops a BIG BOOK on it and it bounces off, one sticks an OFF note over it and it flutters away ("ON!"); desks gain an open notebook, a pencil, an eraser and an apple.
8. **Summary of this song (S63–S64):** real text, written the way an auto-generated video summary reads: "This animated music video uses the style of a 1970s educational cartoon to explain how AI features are often switched on by default in everyday apps and devices. A narrator and a talking light switch walk through examples, including search results, email, smart TVs, chat apps, phone updates and software subscriptions, showing how hard these features can be to turn off. The video ends by revealing that the song itself was written by AI." A footer: "AI-generated summary · Was this helpful?" with thumbs. Generic, no platform branding.
- **Checked:** stills of each (S08, S21–S23, S31–S33, S48, S57a–b, S63).

## 2026-11-06T17:50:00-05:00 — Guardian consent recorded; the child-protection rule narrowed

- **What:** recorded the human's consent statement verbatim in `log/human_interventions.md`, after asking whether to keep the child's name out of the repo; the human chose verbatim. Edited the brief's Protecting the child section (docs `update`, rev 64 → 66: his name appears only in his guardians' signed consent statements in the intervention log; the consent is done, his mother's to follow by pull request), its mirror, and `CLAUDE.md`'s rule to match.

## 2026-11-08T23:30-05:00 — The human's final master: imported, measured, and the video re-synced to it

- **Imported (copied, hashes verified):**
  - `audio/master/Default On (final master).wav` (ec5b3381…be65);
  - `audio/master/Default On (FX only).wav` (eea217c9…0b94);
  - `audio/switch/comp/Default On (switch only).wav` (fdc60885…83af), private like the raw takes.
  - All three are 263.459 s, 48 kHz, f32 stereo.
  - `remotion/public/track.wav` is now a hard link to the master. `scripts/manifest.sh` now skips all of `audio/switch/` and `audio/clicks/`.
- **Offset:** cross-correlated against the v2 mix and the vocal stem at 11 points.
  - The master is v2 +1.0878 s (±0.0002) up to the Narrator's last word.
  - It is +2.8915 s after it: the human's added bar (1.80 s) sits before V21.
  - The human estimated the shift at about 2.46 s; the measurement is 1.0878 s.
- **Clock:** the pre-roll shrinks to 5 − 1.0878 = 3.9122 s. Every frame before the added bar stays where it was (`song.v2_to_master`, map `clock`), and S68 and the end move 57 frames later (7,954 → 8,011 frames).
- **Switch:**
  - his lines are aligned on his comp (`lyrics/switch_comp.txt` → `timing/words_switch.json`, `align_words.py` now takes a file path and line IDs);
  - mouths come from Rhubarb on the comp (`rhubarb_visemes.py`; a line's mouth closes at its end);
  - the placeholder flap and the generated attempt's mute spans are gone. Slots now carry `take` spans (`log/switch_takes.md`).
- **FX, measured in the FX-only file (master s):**

  | Effect | Master s | Notes |
  | --- | --- | --- |
  | Clicks | 39.277, 125.865 | |
  | Outro clicks | 222.407, 222.872 | two, not three |
  | Horn | 153.28, 153.41 | |
  | Door | 170.752 | |
  | Booing | 185.0–190.3 | |
  | Record scratch | 187.50–188.15 | |
  | New click | 241.805 | between "An AI did." and "…But" |
  | Real switch OFF | 250.391 | the band's last note |

  The music ends at 252.12 s, followed by 11.3 s of digital silence.
- **Shots:**
  - S42's X and HONK! land on the horn, and S47's door slams on the door, 6 frames before S48.
  - S51 gains a booing crowd (heads rise and shake, thumbs down, BOOs pop in the margins) from the booing's start, carried under S52.
  - S52 starts on the scratch (+59 frames).
  - S60 flips on each of the two clicks; the hand enters on the last.
  - S66 cuts on the new click (−22 frames).
  - S67 takes V21's real span.
  - S07 follows the new V02 (brief cue updated). Others move by at most 15 frames, following his takes.
- **Brief:** V02's wording, and S60 as two clicks (docs `update`, rev 66 → 70; mirror `docs/brief.md`).
- **Licences:** `assets/LICENSES.md` lists the effects. The FX-only file is never released: Pixabay and Logic sounds may not be distributed on their own.
- **Archived:** the round-2 renders → `archive/renders/m4_round2_2026-11-06/`.
- **2026-11-09T00:20:** all sections re-rendered against the final master; the full cut reassembled (sync verified at 30, 150, 245 s; `log/renders.md`).

## 2026-11-09 — M4: review notes, round 3 (19), applied

1. **S00:** "(Mostly) AI-generated satire." under "A cartoon for grown-ups about tech settings."
2. **Search scene (S05–S07):**
   - **Lamp:** a table lamp standing on the desk with a contact shadow, replacing the floor lamp that hovered at desk height.
   - **Keyboard:** centred, staggered rows of lettered round keys (QWERTY…), a frame and a space bar. The key lit as each letter types is that letter's key.
   - **Answer box:** it thumps down and shoves the results page down behind the desk edge (clipped); nothing scales or squashes, borders included.
   - **S07:** starts on exactly S06's last layout (search box, pushed page, box position; shared `SearchPage`), and Switch walks in.
3. **Lamps:** `Lamp` is replaced by `FloorLamp` (origin at the foot, a dome base, contact shadow, a cord along the boards) and `TableLamp`.
   - Floor lamps now stand on the floor line in the pre-chorus night set and the living room.
   - The side-table and study lamps are table lamps.
4. **Sweaters:**
   - The kid's stripes are clipped to the jumper's outline, so they no longer run into the arms.
   - The inbox person is redrawn from behind: hair over the whole back of the head with a crown whorl and a tapered nape, both ears, the neck, a ribbed collar, and raglan and back seams.
5. **Opt-out maze:** the trail drops new dots at a fixed 26 px spacing along the walked route; existing dots never move.
6. **CHEF'S PICK:** a bigger swallow-tailed pennant that holds its words.
7. **Narrator's classroom:**
   - the plant is redrawn: a terracotta pot with a rim, soil and a saucer, and broad leaves with midribs and veins in two greens;
   - new: an alphabet strip over the board, a tear-off calendar, a wall pencil sharpener, a radiator under the window and a wire wastebasket.
8. **Hands:** one cartoon hand, `rigs/Hand4.tsx` (a thumb and three separate fingers; rest, open, point and fist poses), now on:
   - the Narrator (replacing the mittens);
   - the kids (replacing the circles);
   - Switch (small gloves replacing the balls).

   The off-screen hand's curled fingers are now three separate knuckles with tucked tips and a shorter thumb, and the pencil hand has separate curled fingers.
9. **Test stack (S24):** a real squared-up stack on the desk in front of Switch, who peers over it. It has a top sheet in perspective with "TEST", page edges, a few sticking-out sheets, a shaded side, a binder clip and a contact shadow.
10. **Menu zoom (S28):** a true infinite zoom: each menu holds the next at the same spot (R = 2), and the camera flies steadily toward the stack's vanishing point. Titles keep going (ten, cycling) instead of resetting every 24 frames.
11. **Lip sync gaps:** S36 (the flip during "…so how'd I just return?") and S61 ("…Guess one of 'em was just for show.") drew Switch with no mouth; both now follow the lip sync. S60 does too. An audit of every Switch line found no other mouthless shot.
12. **Chorus 2 karaoke:** S37 reused S13, which was hard-wired to chorus 1's line L10, so the ball had already finished. The opener now takes its line, L34 in chorus 2.
13. **Phone (S41–S45):** the screen has its content's exact proportions (400 × 860) and clips to rounded corners. The chat has wider bubbles, a third message and a message bar, and the ring floats up from below the screen edge. The phones are scaled to sit inside the quiz screen.
14. **CLASSIC (S47):** the price tag's lettering shrinks to fit the tag.
15. **Belfry (S48):** its walls run down to the roof and its base is cut to the roof's pitch, with a trim skirt over the shingles; it no longer perches on the apex.
16. **Summary (S63):** starts on the piano's entrance after "…learn about…" (keyboard stem onset, master 232.154 s; was 233.408). S62 continues underneath with its slate still sliding, and the close button keeps fleeing across the cut into S64.
17. **S64:** Switch walks in from the right edge over S63's last 24 frames and finishes the walk in S64 before he shoves; he no longer pops in.
- **Checked:** stills of every fix (S00, S03, S05–S07, S09, S20–S21, S24–S25, S28, S35–S36 mouths, S41, S44–S45, S47–S48, S57, S63–S64, the flip hand, the Narrator's hands, the kids' hands, Switch's gloves, S02/S23's classroom).
- **2026-11-09T01:15:** all sections re-rendered after round 3; the full cut reassembled on the final master (sync verified; `log/renders.md`).

## 2026-11-09 — M4 review notes, round 4 (17), S67 footage, S68 retired

- **Notes:** the human's 17, verbatim in `log/human_interventions.md` (2026-11-09, round 4).
1. **Countdown (S01):** cut. The title is on screen from S01's first frame; the rocker still flips on its beat after the downbeat.
2. **Calendars:** the classroom's wall calendar is a week to a row (S M T W T F S header), centred with even margins; S26's October page centres its days in seven even columns, with the circle on the 10th re-centred.
3. **Typewriter (S05–S07):** taller, with depth: a slab with a visible front face and a contact shadow; three tiers of keys on stalks, each with a cap edge, the back row highest and smallest. Rows stagger like a real keyboard (A a quarter key right of Q, Z half a key right of A) on one pitch. The space bar has a thickness.
4. **Pencil (study):** a drawn pencil (eraser, ferrule, sharpened tip) lying flat across the notepad with a shadow; the pad has a shadow too. It no longer floats at the keyboard's edge.
5. **Test stack (S24):** a messy pile: eight bundles, each shifted and turned against the one below, sheet corners poking out at the sides, the top two sheets askew, one binder clip.
6. **Envelope and V-necks:** the envelope's flap lines start inside its rounded corners. The kids' V-necks (and stripes) are clipped to the jumper's outline.
7. **Menu zoom (S28):** the doorway wall and fine-print band are opaque. The outermost menu drawn is the deepest one still covering the whole frame, so no menu disappears while any of it is visible.
8. **TV (S29–S33):** the home-screen shots clip everything to the glass, and the bezel is redrawn on top; Switch is smaller and higher, inside the screen; S32's dialog moved clear of him. Caption S29–S33, from the fact card: "LG webOS TVs, December 2025 update".
9. **Mouths:** `scripts/rhubarb_visemes.py` adds a sung pass for Switch's lines. Each line is re-read per frame against his comp's loudness: rests in near-silence, half-closes in the dip between syllables, opens on loud frames that Rhubarb held near-closed, and opens round on a sung "on". No one-frame shapes. The second pre-chorus (L32 19 → 28 cues) and both tags now move: L14a 20 → 22 and L38a 9 → 16, each "on" opening and closing. `timing/visemes.json` regenerated.
10. **Chat (S41–S43):** caption from the fact card: "Meta AI in WhatsApp, Facebook and Instagram".
11. **S49 detail pass:** the desktop starts at y 560 and everything stands on it with a contact shadow: the note lies flat; there is an ink pot with its pen, a pencil cup, the apple, and a squared stack of exercise books with page edges.
12. **Giant's hand (S50, S52):** the cuff ends in the film's four-digit hand ("open", fingers spread), pressed flat on the contract's edge. It moves with the contract and sits on the same desk.
13. **School citations:** S50–S52: "Google's VP for education, to The New York Times, Nov. 3, 2026". S53–S56: "Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed."
    - Both are worded from the fact card's rows (song doc rev 40, checked today).
    - `Caption` now breaks a caption over 62 characters into two lines.
    - The S53 contract moved up so its third box stays clear of the caption, and the S54–S55 caption sits mid-frame, clear of Switch.
14. **Summary's close button (S63–S64):** a visible chase. The pointer glides to the button; just before it lands, the button darts to another spot with speed lines; the pointer stops where it was, then sets off again (every 20 frames).
15. **S67 footage:** `assets/real/S67/C0143.MP4` and `C0143M01.XML` (the human's; Sony ILCE-6400, 3840×2160 29.97p; no GPS fix in the metadata).
    - SHA-256: `1864a718a58477667462c27b400cfc243fb6e3ecccb6d16996f505e894b1758d` (MP4), `fd4521e83a8287438c61f4ef5f762c274489f6594af227e3bea9d5c9066b78cf` (XML).
    - The flip is at source 193.95 s. It switches the room's light off: the first fully dark frame is 193.967 s, and the room stays dark for 8.4 s.
    - In frame: the wall, the door trim, the plate and a hand. No face; nothing identifying.
    - `scripts/s67_grade.sh` cuts the clip and grades it into `edit/S67_graded.mp4` (linked into `remotion/public/`). The first dark frame lands on the band's last note (frame 7629, checked by luma).
    - The grade warms the camera's blue-grey white wall from (185,194,214) to about (216,206,201), with a touch of contrast and saturation and the cartoon's vignette. No camera audio or metadata are carried over.
    - The hand enters about 2 s after V21 begins (1:1 playback; the brief asked for "on V21").
16. **Switch's disclosure:** a caption on S67 in the human's words. It fades in about 4.7 s before the flip and goes dark with the room.
17. **S68 retired:** the brief row stays and is marked retired; the swag shot is cut. Its disclosure becomes a credits card right after fact card G (M5). The brief (docs, rev 80) and its mirror were updated, along with S00/S01 (countdown), the TV, chat and school captions, the S67 caption, the fact-card order and the inputs list.
    - `scripts/timing_map.py` skips retired rows and drops S68 from the post-roll.
    - `timing/map.json` was regenerated: only S68 changed, and the video now ends at frame 7861 (was 8011).
- **2026-11-09T10:20:** all sections re-rendered after round 4; the full cut reassembled on the final master (7,861 frames, sync verified; `log/renders.md`).

## 2026-11-09 — Guardian consent merged; M4 review notes, round 5 logged

- Fetched origin: 84c00d4 (guardian consent, `log/human_interventions.md` only) merged as ebcfe9c; conflict was the two appended entries, both kept.
- Round-5 notes (3) logged verbatim in `log/human_interventions.md`.
