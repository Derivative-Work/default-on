# Default On

A swung 1970s educational-cartoon video for "Default On", cut to a locked generated master. The Narrator is generated; Switch is voiced by the human's six-year-old son, recorded at home and comped into fixed gaps. Built in Remotion as SVG cutout rigs.

**Start here:** the brief is the Claude Doc https://claude.ai/artifact/Tjs1G5E1QKevpWRqgKzJt9 (read it with the docs tools, not a web fetch; mirrored in `docs/brief.md`). The song doc (lyrics Draft 2, style prompt, fact card) is https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP (partial mirror `docs/song_doc.md`, lyrics `lyrics/draft2.txt`). Their production rules, guardrails, milestones (M1–M8) and gates govern this project. House conventions not in the brief come from the sibling repos under `~/Projects` (Nine Hundred Acres is the most recent finished one). Then read the latest entries of `log/production_log.md` and `log/human_interventions.md`.

Rules that apply to every step:
- **Human role:** the human (H1) picks takes, (H2) approves gates and (H3) supplies the real inputs listed under Inputs. Switch's voice is the declared exception: one entry per recorded line in `log/human_interventions.md`, with the take chosen and its processing. Anything else is an EXCEPTION.
- **Protecting the child:** his face, name, school and home never appear, in frames, logs, commits or filenames. Raw takes stay in `audio/switch/raw/` (git-ignored, out of the manifest, never published); only the comped, processed lines in the final mix are published.
- **Locked audio:** the master, its stems and its timing are never regenerated. Words and timing are locked for everything but Switch's lines.
- **Logs:** append to `log/production_log.md` for every action; every render in `log/renders.md` (shot ID, composition, props, commit); every Switch comp decision in `log/switch_takes.md`.
- **Gates:** stop at the end of each milestone until the human approves.
- **Guardrails:** no real logos, wordmarks, brand colours or product UI in the animation; companies are named only on the fact cards. On-screen facts match the fact card exactly; allegations stay labelled.
- **Commits:** one git commit per logged step.
- **Assets:** never delete or overwrite an asset. Superseded or rejected files go to `archive/` with a log note. Every third-party file goes in `assets/LICENSES.md`. Illustrations are SVG built in code; ask before any other source.
- **Large files** stay out of git; run `scripts/manifest.sh` after adding any.
- **Shot IDs** never change: inserts take a letter suffix, removals retire their ID.
- **Python:** `.venv/bin/python -I scripts/<script>.py` (uv; CPU torch on the GTX 970 box).
