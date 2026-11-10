# Default On

An AI-made music video in the style of a swung 1970s Saturday-morning educational cartoon, about AI features that
arrive switched on: an answer box on top of your search, a helper in your inbox, a tile on your TV you can hide but
not delete, a ring in the family chat, a phone update with no "No", a price rise with the cheaper plan offered only on
the way out, and a school told to take the AI with its search. A friendly Narrator teaches Little Switch how an opt-out
works; an off-screen grey hand keeps flipping him back on. It ends on a real light switch on a real wall, turned off by
a small real hand, and it stays off.

Claude Code (Opus 5.5) wrote every frame as code, as SVG cutout rigs rendered in [Remotion](https://www.remotion.dev).
Suno V6 made the music, and Claude drafted the words. Switch is voiced by a real child, recorded at home and comped
into the song by the creator, who also mixed and mastered it. Otherwise a human only picked takes, approved gates and
supplied the real material (the recordings, the sound effects, the closing footage and two screen recordings), and
every such action is logged.

AI-generated satire about real events. Every real product on screen is cited in a caption, in the fact card's own
words, and the fact cards after the song say what actually happened, with their sources. Allegations are labelled
as allegations.

**Conflict of interest:** Claude, made by Anthropic, drafted the lyrics, and Claude also ships inside some of the
companies' products the song is about. The first fact card says who wrote it, and names Anthropic's own default-on
toggle: its August 2025 terms pop-up, whose switch for training on users' chats was set to On. Gemini (Google) and ChatGPT (OpenAI)
audited the lyrics and claims; their reports and the changes made in response are in the
[song doc](https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP), mirrored in [docs/song_doc_full.md](docs/song_doc_full.md).
The creator is a former Google and Microsoft employee who holds no stock in either; every claim is from public
reporting.

## Watch

- **YouTube:** the main video and the two vertical cuts (links added at release).
- **Files:** the videos, captions, thumbnail and music are in the v1.0 release (added at release).

## The making-of record

- [The planning chat](https://claude.ai/share/3c896ee0-8eca-47f1-9c4b-dc62e4944768) that led to the song and the
  brief, archived in [docs/planning_chat/](docs/planning_chat/planning_chat.md).
- [docs/brief.md](docs/brief.md): the production brief, guardrails and shot list, mirrored from the
  [live brief](https://claude.ai/artifact/Tjs1G5E1QKevpWRqgKzJt9).
- [docs/song_doc_full.md](docs/song_doc_full.md): the lyrics, the style prompt, the fact card and the audits.
- [log/production_log.md](log/production_log.md): every action the agent took, with commands and outputs.
- [log/human_interventions.md](log/human_interventions.md): every human action, with the rule that allowed it.
- [docs/sources.md](docs/sources.md): every fact card, word for word, with its sources.
- [log/audits/](log/audits/README.md): the M8 fact check: ChatGPT's and Gemini's audits verbatim, and
  [Claude's review](log/audits/03_review.md) of each flag against its source.
- [log/switch_takes.md](log/switch_takes.md): every line of Switch's comp.
- [log/renders.md](log/renders.md): every render, with its commit.
- [log/prompts/suno/](log/prompts/suno/takes.md): the Suno take and its prompt.
- [timing/map.md](timing/map.md): where every shot, line and Switch slot lands in the song.
- [captions/default_on.en.srt](captions/default_on.en.srt): the closed captions, as sung.
- [assets/LICENSES.md](assets/LICENSES.md): every third-party file in the edit.
- [METADATA.md](METADATA.md): the YouTube titles, descriptions and settings.

## How it was made

- **Look:** a pastiche of 1970s educational shorts, driven by clips the human supplied, studied as sampled stills for
  line, colour and grade only: loose ink lines, flat cel colour, pale lavender-leaning paper, pen hatching, and a film layer (weave, grain,
  flicker, splices) over everything until the real material. No character, set or composition was taken from them.
- **Timing:** Beat This! for the beats, faster-whisper and torchaudio's MMS forced aligner for the words, and the
  sound effects measured in the FX-only mix (`timing/map.json`, the video's clock).
- **Lip sync:** Rhubarb Lip Sync 1.14.0 for the mouth shapes, with a second pass for Switch's singing that follows the
  loudness of his comp, so held notes and repeated "on"s keep moving.
- **Real material:** S65–S66 are the creator's screen recordings, placed by cross-correlating their audio with the
  master; S67 is the creator's footage, graded to the cartoon's paper and timed so the room goes dark on the band's
  last note.

## Protecting the child

Switch's raw takes, his isolated vocal, the clicks and the room tone are never published: they are kept privately,
outside git and outside the manifest. Only his processed lines in the final mix are in the video. His face, school
and home never appear. His guardians' consent is recorded in
[log/human_interventions.md](log/human_interventions.md).

## Files

Large files stay out of git. [MANIFEST.sha256](MANIFEST.sha256) lists them with SHA-256 hashes: the Suno track and
stems, the final master, the credits music, the closing footage and the screen recordings, the finished videos and
every render, so a rebuild can be checked against them. Not published, and not in the manifest: Switch's recordings
(above). Not published: the FX-only mix (its effects' licences allow them only inside a production) and the reference
clips for the look.

## Rebuilding

Versions used: Remotion 4.0.535, React 19.1, Node v24.22.0, ffmpeg 8.0.1, uv with Python 3.12 (CPU PyTorch 2.8),
Rhubarb Lip Sync 1.14.0. Built and rendered on one Linux box with a GTX 970.

```bash
uv sync                                   # .venv from pyproject.toml / uv.lock
npm ci                                    # Puppeteer, for the page fetches
(cd remotion && npm ci)                   # Remotion and the fonts
git config core.hooksPath scripts/hooks   # the 50 MiB pre-commit check
```

Put the large files back at the paths `MANIFEST.sha256` lists, including the master at
`audio/master/Default On (final master).wav` (hard-linked as `remotion/public/track.wav`) and the credits music at
`audio/credits/default-on-credits.wav` (`remotion/public/credits.wav`). Then, in order (each step's production-log
entry has its exact inputs, outputs and checks; Python runs as `.venv/bin/python -I scripts/<name>.py`):

1. **Timing:** `scripts/timing_map.py` → `timing/map.json`, which `remotion/src/timing.ts` reads as the video clock.
   Switch's word timings (`timing/words_switch.json`) and the mouth shapes (`timing/visemes.json`) are committed:
   remaking them (`scripts/align_words.py`, `scripts/rhubarb_visemes.py`) needs his private recordings.
2. **Real material:** `scripts/s67_grade.sh` and `scripts/s65_s66_clips.sh`, from `assets/real/`, into
   `remotion/public/`.
3. **Video:** `scripts/m4_section.sh <composition> <stem>` for each section (`Sec01-Intro` … `Sec11-Outroandreveal`),
   then `scripts/assemble.sh` (the master and the credits music under the joined sections). For 4K, add `--scale=2`
   to the render. `npx remotion studio` (from `remotion/`) opens the editor.
4. **Captions:** `scripts/captions.py` → `captions/default_on.en.srt`.
5. **Thumbnail and shorts:** the compositions `Thumbnail` (a still), `Vertical` and `VerticalSchool`.

## Licences

- **Video and assets:** [CC BY-NC-SA 4.0](LICENSE-media.md). That file lists exactly what it covers, and what it
  doesn't (Switch's recordings, the real footage and screen recordings as files, the sound effects, the fonts, the
  planning chat, Suno's page data, the reference clips).
- **Code:** [MIT](LICENSE). Remotion itself is not MIT: it is under the
  [Remotion License](https://www.remotion.dev/license), free for individuals and for companies of up to three
  people.

## Credits

- **Words:** Claude, in the planning chat, revised after audits by Gemini and ChatGPT.
- **Music:** Suno V6 (take `759f181e`, "Default On"), chosen by a human. **Credits music:** a second Suno V6 track
  ([share link](https://suno.com/s/EF0G3Pktq2aZmhlg)).
- **Switch:** voiced by a child of two ex-Googlers and ex-Microsofties, recorded at home. No pitch correction was used
  on his solo singing.
- **Mix and master:** the creator, with Apple Logic Pro, music-deslop, and Tuna Fish (the creator's own harmonizer,
  used here as an octave shifter on the creator's singing, for one more voice in the final choir). music-deslop is a
  post-filter model for AI-generated music that Claude Code built and trained from a human-written spec, on Creative
  Commons audio only; its training data is listed in
  [Not Yet's README](https://github.com/Derivative-Work/not-yet#mastering-model-training-data). The model is private
  for now.
- **Sound effects:** the door and the switches, recorded by the creator and child; "people crowd shouting" and "film
  special effects record scratch" from [Pixabay](https://pixabay.com/sound-effects/); a horn from Logic Pro's library.
- **Real material:** the closing footage and the two screen recordings, by the creator.
- **Animation, edit, lip sync, captions, cards, shorts and thumbnail:** Claude Code with Claude Opus 5.5.
- **Tools:** Remotion and React, ffmpeg, Rhubarb Lip Sync (Daniel S. Wolf, MIT), Node.js with Puppeteer, and Python
  with NumPy, SciPy, Pillow, librosa, soundfile, PyTorch and torchaudio, Beat This! (beats) and faster-whisper
  (transcription).
- **Fonts:** [Titan One](https://fonts.google.com/specimen/Titan+One) (Rodrigo Fuenzalida),
  [Work Sans](https://github.com/weiweihuanghuang/Work-Sans) (Wei Huang) and
  [Kalam](https://github.com/itfoundry/kalam) (Indian Type Foundry), SIL Open Font License 1.1.

Satire. Not affiliated with or endorsed by any company named here.
