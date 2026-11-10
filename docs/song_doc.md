# Default On (song doc): mirrored sections

Source: Claude Doc https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP ("Default On (forced AI features)"), rev 16, read 2026-11-06. **Superseded:** the full mirror at rev 38 is `docs/song_doc_full.md` (Draft 3, updated fact card, audit log); this file is kept for the record.

## Style prompt

```
1970s educational cartoon song, swung jazz-folk shuffle, small jazz combo, Fender Rhodes and upright piano, walking upright bass, brushed drums, flute and muted trumpet fills, relaxed raspy conversational male vocal, sincere young character vocal, spoken asides over a vamp, half-time bluesy character verse, scat fills, sing-along teaching chorus, warm analog tape, slightly tinny mono mix
```

- **Settings:** 100 BPM, swung 4/4, B-flat major, about 3:00. Vocal language English.
- **The [click] marks** are sound cues, not lyrics: a real switch click is added in the edit.
- **Bridge:** the record scratch and rewind are added in the edit.

## Fact card

Every line in the song points to a reported event; allegations are labelled as allegations.

| Lyric | What happened | Status | Source |
| --- | --- | --- | --- |
| Answer box on top; tiny "Web" tab | Google's AI Overviews rolled out broadly from I/O 2024 with no setting to turn them off. The "Web" filter shows plain results. | Fact | [Yahoo Tech](https://tech.yahoo.com/ai/gemini/articles/figured-limit-googles-ai-overviews-182820560.html) |
| Inbox helper flipped on last fall | Thele v. Google alleges Gemini-powered smart features were switched on by default for Gmail, Chat and Meet from about October 10, 2025. Google says it changed no settings and doesn't train Gemini on Gmail content. | Alleged; refiled after an earlier dismissal | [ModemGuides](https://www.modemguides.com/blogs/ai-news/turn-off-gmail-ai-smart-features), [PPC Land](https://ppc.land/google-faces-refiled-gemini-gmail-suit-after-judge-found-no-concrete-harm/) |
| "A menu, then a menu…" | Opting out takes changes in two to four separate settings, depending on the guide. | Fact | [ModemGuides](https://www.modemguides.com/blogs/ai-news/turn-off-gmail-ai-smart-features) |
| TV tile you can hide but not delete | A December 2025 LG webOS update added a Copilot shortcut that could only be hidden. LG said it would let owners delete it in a future update. | Fact; promised fix unconfirmed | [PCWorld](https://www.pcworld.com/article/3018846/lg-will-let-tv-owners-remove-microsofts-copilot-app-after-backlash.html) |
| Blue ring in the chat app; mute, not uninstall | Meta AI in WhatsApp, Facebook and Instagram can't be disabled; the chat can be muted. | Fact | [Aaj News](https://english.aaj.tv/news/amp/330358765), [inkl](https://www.inkl.com/news/meta-s-new-optional-ai-chatbot-in-apps-like-whatsapp-is-proving-controversial-here-s-why) |
| "Continue" with no "No" | iOS 18.3.2 (March 2025) turned Apple Intelligence back on for some users who had disabled it, after a splash screen with only a Continue button. Not every device was affected; John Gruber suspected a bug. | Fact; intent unclear | [MacRumors](https://www.macrumors.com/2025/03/11/ios-18-3-2-apple-intelligence-auto-on), [Daring Fireball](https://daringfireball.net/linked/2025/03/21/ios-18-updates-reenable-apple-intelligence) |
| Forty-five percent; cheap plan only on leaving | The ACCC alleges Microsoft misled about 2.7 million Australians: the Personal plan rose 45% to A$159 with Copilot, and the Classic plan was offered only during cancellation. | Alleged; case before the Federal Court | [Arab News / Reuters](https://www.arabnews.pk/node/2620368) |
| "Take the robot or no search" | Google's VP for education told The New York Times that students at schools rejecting its AI would lose Search. | Fact (Nov 3, 2026) | [GovTech](https://www.govtech.com/education/k-12/google-reverses-decision-to-turn-off-search-for-schools-not-using-ai) |
| Correction; "deeply integrated" | Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed from Search. Changes begin in early 2027. Before the reversal, Google's VP for education, Chris Phillips, told The New York Times on Nov. 3, 2026 that Search and AI are "deeply integrated," so students at schools that reject its AI "will not have access to search." | Fact | [Windows Report](https://windowsreport.com/google-backs-down-on-school-gemini-policy-but-refuses-to-remove-ai-from-search/), [Decrypt](https://decrypt.co/382572/google-schools-reject-ai-but-lose-search), [GovTech](https://www.govtech.com/education/k-12/google-reverses-decision-to-turn-off-search-for-schools-not-using-ai) |

**Fairness caveats**

- Google's school default is **off** for K-12 student accounts until administrators turn services on. The complaint is that Search can't be had without its built-in AI, not that AI is switched on for students.
- Microsoft has removed Copilot entry points from several Windows apps after the backlash, and Recall now ships disabled by default. The song doesn't claim otherwise.
- The Apple re-enable may have been a bug. The cartoon shows what users saw, not a motive.

**Conflict of interest**

Claude drafted these lyrics, and Claude also ships inside other companies' tools, including Chrome, Microsoft 365, Google Workspace and Slack. Those integrations are, as far as I know, things a person or organisation installs or switches on, but that should be verified rather than taken from me. The last line ("But somebody asked it to") is about this song, not a claim that Anthropic is above the pattern. Send the lyrics to another lab's model for a bias audit, as with Buy It On Margin, and keep Anthropic on the same footing as everyone else if the audit finds a gap.

**Open questions (doc rev 16):** LG's delete option shipped? ACCC case decided or settled? Thele v. Google status after the refiling? Does Google's school change hold through the 2027 rollout?
