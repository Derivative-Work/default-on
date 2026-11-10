# M8 review: each audit flag against its source

Claude's check of every flag in the two audits (`01_chatgpt_raw.md`, `02_gemini_raw.md`), 2026-11-10. Claude built the video and its company is named on card G, so each finding below rests on a source Claude opened itself, not on either auditor's word. **Status: proposed. Nothing here is applied until the human approves it** (brief, M8 gate: "Resolve every flag before release"). The fact-card changes are laid as suggestions in the song doc; the caption and on-screen changes wait in this file.

Sources Claude opened for this review: Microsoft Support, "Changes to the Microsoft Copilot app"; the Blumenthal–Hawley letter to Google (Oct 21, 2026; PDF); ModemGuides; Google's Nov 3, 2026 education post; Google's May 14, 2024 I/O Search post; the ACCC's release of Oct 27, 2025; Euronews (May 11, 2025). Not readable here: Windows Central (headline only), Tom's Hardware (headline only).

## Must fix (both auditors, or one auditor and Claude's own check)

| # | Flag | What the sources say | Proposed fix |
| --- | --- | --- | --- |
| A3 | The fine print scrolling past S28 reads like a real, dated Google notice ("Smart features were turned on for your account on or about October 10. Some features may remain available."). Both auditors: misleading. | "On or about October 10" is the plaintiffs' allegation in *Thele v. Google*; PPC Land notes the complaint cites no Google notice for that date, and Google denies changing settings. No real notice says this. | Replace with fine print that quotes nothing and dates nothing: "By continuing, you agree that smart features may be on. Some features may remain available. To change this, see Settings." |
| C | "Smart features: This setting is managed for you" in the settings maze (Gemini). | That wording is what managed (work or school) accounts see; the maze stands for a consumer's settings. | "Smart features: more settings ›". The maze joke is unchanged. |
| A5 | The TV says "Can't delete this app." (ChatGPT). | LG called the Copilot tile "a shortcut" (quoted by Tom's Hardware, per ChatGPT; PCWorld's headline says "app"). Card F4 already says "shortcut". | "Can't delete this shortcut. Hide it instead?" |
| A10 | The correction caption ends "can't be removed." where F9 says "can't be removed from Search." Both auditors: the difference matters. | Decrypt: schools "cannot remove AI from Search itself". Without "from Search", the caption could read as AI Overviews being unremovable even with Search off. | Caption: "Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed from Search." |
| A11, F9 | "Before the reversal" (caption and card). Gemini: Google's Nov 3 post already announced separate controls; it was a same-day clarification, not a reversal. ChatGPT: GovTech reports a reversal. | Google's Nov 3 post (opened): controls for "Gemini, Gemini Notebook, Gemini in Classroom, and Google Search… entirely off for K-12 student accounts until school administrators explicitly turn them on." GovTech's headline says "reverses"; Windows Report says Google "clarified". The word is contested; the date isn't. | Caption: "Google's VP for education told The New York Times on Nov. 3, 2026 that Search and AI are "deeply integrated."" Card F9: "On Nov. 3, 2026, Google's VP for education, Chris Phillips, had told…" (no "reversal"). |
| F9 | "…drawing a Senate letter": none of the card's sources supports it (Common Sense Media predates the letter). Gemini. | The Oct 21, 2026 letter (opened) is from Senators Blumenthal and Hawley to Sundar Pichai. It asks "Why has Google set A.I. product integration as the default…?" It doesn't cite the August Gemini change, so "drawing" implies more causation than shown. | "…for many K-12 student accounts; in October, Senators Blumenthal and Hawley asked Google why it makes AI the default in schools." Add the letter to the card's sources. |
| F3 | "Two to four separate settings, depending on the guide": the cited guide doesn't support four (ChatGPT; Gemini counted a fourth, Gemini Apps Activity). | ModemGuides (opened): "Turning off Gmail AI requires two separate settings"; its desktop steps are one checkbox and two toggles. "Four" doesn't appear; Gemini Apps Activity is "a separate setting". | "Turning off Gmail's smart features takes two separate settings, with three switches between them." |
| F4 | Newer development (Gemini). | Microsoft Support (opened): "Copilot is being retired from TVs and will no longer be available on Samsung and LG TVs on December 1, 2026." | Add: "Microsoft says Copilot leaves LG and Samsung TVs on December 1, 2026." Status: "Fact; LG's promised fix unconfirmed". Add Microsoft Support to the sources. |

## Sources to add or swap (no wording change)

| # | Why | Change |
| --- | --- | --- |
| F1 | Google's help page doesn't give the I/O 2024 date (both). | Add Google's May 14, 2024 post (opened: "AI Overviews will begin rolling out to everyone in the U.S."). |
| F2 | Primary source (both). | Add the court docket, *Thele v. Google LLC*, N.D. Cal. No. 5:25-cv-09704 (Justia). Both auditors confirm the status line: dismissed July 7, 2026 with leave to amend; refiled August 18; Google's second motion to dismiss (Sept 29) pending. |
| F5 | inkl is paywalled; its source is Euronews (Gemini). | Swap inkl for Euronews (opened: "The feature can't be disabled; however, it's possible to mute the AI chat in WhatsApp"). Wording kept: Aaj News carries Meta's statement that Meta AI's presence "cannot be disabled". |
| F7 | Primary source (both). | Add the ACCC's release (opened; every number on the card matches it). |
| G | Primary source; precision (both). | Add Anthropic's Aug 28, 2025 announcement. Say "existing consumer users" (Claude Free, Pro and Max). Gemini also objects that "with audits by Gemini and ChatGPT" reads as an endorsement: end instead with "Gemini and ChatGPT audited it; their findings and the fixes are logged." |

## Considered; no change proposed

- **Lyrics** (A2 "here's the door", A6 "I'll uninstall it!", A7 "There isn't one!", A8 "office software went up forty-five percent", A10 "you keep your search and everything"): the song is locked audio. Each lyric runs under a caption that names the product (and, for A7 and A8, "Some iPhones" and "Alleged by Australia's ACCC"), and its card gives the precise claim. A10's line is answered by the song itself in the next two lines ("And the answer box on top?" "…That one's 'deeply integrated.'"), and the caption under it (fixed above) says what stays.
- **A1** caption: supported once F1 carries the May 2024 post.
- **A7, F6**: already say "some"; Gemini rates both VERIFIED; the card keeps Gruber's "bug" theory.
- **F8**: supported by GovTech (ChatGPT opened it; Gemini's crawler is blocked there) and the New York Times report republished by the Inquirer.
- **F5 scope** (ChatGPT: controls may vary by region): the card claims what its sources say and nothing about every region.
- **Section C jokes** (the cookie, the broccoli and "YOU CHOSE THIS", the earmuffs, "Continue", the "deeply integrated" plate, the runaway close button): both pass them.
- **Card D and S67's caption**: personal statements, outside the audit (both).
