# Audits

M8: the cross-lab fact check of every on-screen claim (brief, Milestones: "Fact check of every on-screen claim by another lab's model against the Default On fact card"). Claude built the video, and Anthropic is named on card G, so the audits come from other labs' models. The human ran each one with the prompt in `log/prompts/other/m8_fact_audit.md` (commit 0c2bd64).

| # | Auditor | Date | Browsing | Raw output | Use |
| --- | --- | --- | --- | --- | --- |
| 1 | ChatGPT (OpenAI) | 2026-11-10, saved 02:06 | Yes: opened 13 of the 15 listed URLs (Communications Today returned 403) and 16 others | `01_chatgpt_raw.md` | Each flag checked in `03_review.md` |
| 2 | Gemini (Google) | 2026-11-10, saved 02:06 | Yes: opened 13 of the 15 listed URLs (PCWorld and GovTech block its crawler) and others | `02_gemini_raw.md` | Each flag checked in `03_review.md` |

The raw files are byte-for-byte copies of the human's saves (`~/Downloads/default-on-m8-{chatgpt,gemini}-check.md`; SHA-256 7726fc3b… and 45d0447e…). Their earlier audits of the lyrics (2026-11-06) are in the song doc, mirrored in `docs/song_doc_full.md`.

`03_review.md` is Claude's check of each flag against a source it opened, with the proposed fixes for the human to approve.
