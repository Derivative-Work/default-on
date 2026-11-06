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
