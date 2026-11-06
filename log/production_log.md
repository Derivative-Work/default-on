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
