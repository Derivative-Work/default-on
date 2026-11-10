# Upload metadata

YouTube metadata for the main video and the two vertical cuts, ready to paste at upload. Written by the agent (M5,
2026-11-10); the human uploads.

**Before uploading:**
- **Still to do before release:** the M7 check (S59–S67 frame by frame, and a listen for melodic likeness to any known
  children's TV theme), the M8 fact check of every on-screen claim by another lab's model, and the 4K render. Then fill
  in the file names, lengths and links below.
- **The repository** goes public before the video (the human, 2026-11-09): the end card points to its log.
- **Intervention count.** The main description gives the number logged at upload
  (`grep -c '^## ' log/human_interventions.md`). The end card gives the count when it was rendered.
- **The last news check (morning of release).** Search once for news since 2026-11-10 on: Thele v. Google (the motion
  to dismiss), LG's promised Copilot removal, the ACCC's case against Microsoft, and Google's school controls (due early
  2027). If any has moved, the matching fact card, caption and description line may need changing.
- **The reveal.** Nothing on screen says the song is generated until the Narrator says "An AI did" and the generation
  screen appears (S65). So the titles, the opening lines of each description and the thumbnails never name Suno or say
  the song is generated. The first line does say "AI-generated satire", as in every video in the series, and YouTube's
  synthetic-content label shows anyway (see Settings). Suno is named only under CREDITS, below the fold.
- **Links.** Once the main video is up, put its link in both vertical cuts' descriptions and set each one's
  **Related video** to it in YouTube Studio.
- **Licences** (video and assets CC BY-NC-SA 4.0, code MIT) are in the repo: `LICENSE`, `LICENSE-media.md`.

---

## Main video (16:9)

**File:** the 4K render, still to make (`deliverables/default_on_3840x2160.mp4`; 6:10.9, 11,128 frames at 30 fps).
Upload the 4K file: YouTube gives 4K uploads a higher bitrate at every resolution, and the fine ink lines and film
grain show it. Captions `captions/default_on.en.srt`. Thumbnail `deliverables/thumbnail.jpg`.

### Title

Recommended (60 characters):

```
Default On — a 1970s cartoon about AI you can't switch off
```

Alternatives:
- `How an opt-out works (it doesn't) — Default On`
- `Default On: a Saturday-morning cartoon for grown-ups about AI`
- `Little Switch learns how an opt-out works — Default On`

### Description

```
AI-generated satire about real events.

A cartoon for grown-ups about tech settings. A friendly Narrator teaches Little Switch how an opt-out works, while an off-screen hand keeps flipping him back on. Stay for the end.

Switch is voiced by a real child, recorded at home. No pitch correction was used on his solo singing.

Every frame was written as code by Claude Code. A human chose the takes, mixed the song, supplied the real footage and approved each stage; all [N] of those actions are logged:
https://github.com/Derivative-Work/default-on

Conflict of interest: Claude (Anthropic) wrote the words; the first fact card is about Anthropic's own default-on toggle. The creator is a former Google and Microsoft employee with no stock in either.

CHAPTERS
0:00 Intro
0:18 The search
0:34 Two sides
0:42 Default on
1:02 Opt-in, opt-out, default
1:32 The inbox, the menus and the TV
2:00 Two sides, again
2:27 Pop quiz
2:51 The school
3:22 Final chorus
3:41 Outro
4:15 What actually happened
5:55 Credits

WHAT ACTUALLY HAPPENED (the fact cards)
• Claude (Anthropic) drafted these lyrics. In August 2025, Anthropic asked existing users to accept new terms in a pop-up whose toggle for training on their chats was set to On by default. (The Verge; Tom's Guide)
• Google's AI Overviews rolled out broadly from I/O 2024. Google's help page calls them a core Search feature that can't be turned off. The "Web" filter shows plain results. (Google Search Help)
• ALLEGED: Thele v. Google alleges Gemini smart features were switched on by default for Gmail, Chat and Meet from about Oct 10, 2025. Google says it changed no settings. Dismissed July 7, 2026 with leave to amend; refiled; a new motion to dismiss is pending. (ModemGuides; PPC Land)
• Opting out takes changes in two to four separate settings, depending on the guide. (ModemGuides)
• A December 2025 LG webOS update added a Copilot shortcut that could only be hidden. LG said it would let owners delete it in a future update; that fix is unconfirmed. (PCWorld)
• Meta AI in WhatsApp, Facebook and Instagram can't be disabled; the chat can be muted. (Aaj News; inkl)
• iOS 18.3.2 (March 2025) turned Apple Intelligence back on for some users who had disabled it, after a screen with only a Continue button. Not every device; possibly a bug. (MacRumors; Daring Fireball)
• ALLEGED: The ACCC alleges Microsoft misled about 2.7 million Australians: the Personal plan rose 45% to A$159 and the Family plan 29% to A$179 with Copilot, and the Classic plan was offered only during cancellation. The case is before the Federal Court. (Arab News / Reuters)
• Nov 3, 2026: Google's VP for education told The New York Times that students at schools rejecting its AI would lose Search, because Search and AI are "deeply integrated." (GovTech)
• Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed from Search, from early 2027. In August 2026 Google had switched Gemini on by default for many K-12 student accounts. (Windows Report; Decrypt; Common Sense Media)

SOURCES
https://www.communicationstoday.co.in/anthropic-to-use-claude-chats-for-ai-training-by-sept-28/
https://www.tomsguide.com/ai/claude/claude-ai-will-start-training-on-your-data-soon-heres-how-to-opt-out-before-the-deadline
https://support.google.com/websearch/answer/14901683
https://www.modemguides.com/blogs/ai-news/turn-off-gmail-ai-smart-features
https://ppc.land/google-faces-refiled-gemini-gmail-suit-after-judge-found-no-concrete-harm/
https://www.pcworld.com/article/3018846/lg-will-let-tv-owners-remove-microsofts-copilot-app-after-backlash.html
https://english.aaj.tv/news/amp/330358765
https://www.inkl.com/news/meta-s-new-optional-ai-chatbot-in-apps-like-whatsapp-is-proving-controversial-here-s-why
https://www.macrumors.com/2025/03/11/ios-18-3-2-apple-intelligence-auto-on
https://daringfireball.net/linked/2025/03/21/ios-18-updates-reenable-apple-intelligence
https://www.arabnews.pk/node/2620368
https://www.govtech.com/education/k-12/google-reverses-decision-to-turn-off-search-for-schools-not-using-ai
https://windowsreport.com/google-backs-down-on-school-gemini-policy-but-refuses-to-remove-ai-from-search/
https://decrypt.co/382572/google-schools-reject-ai-but-lose-search
https://institute.commonsensemedia.org/what-to-know-about-google-turning-on-gemini-for-schools

CREDITS
Words: Claude, revised after audits by Gemini and ChatGPT
Music: Suno V6 · Credits music: Suno V6
Switch: a child of two ex-Googlers and ex-Microsofties
Mix and master: the creator, with Apple Logic Pro, music-deslop and Tuna Fish
Sound effects: the creator and child (door, switches); Pixabay (crowd, record scratch); Logic Pro (horn)
Animation and edit: Claude Code (Opus 5.5), in Remotion
Type: Titan One, Work Sans and Kalam (SIL OFL)

Video and assets: CC BY-NC-SA 4.0 · Code: MIT
Satire. Not affiliated with or endorsed by any company named here.

#AIgenerated #musicvideo #privacy
```

Length: 4,952 of YouTube's 5,000 characters with a two-digit count (counted 2026-11-10). Studio's counter is the final word; if it shows the description over 5,000
characters, shorten the opening paragraph first, not the facts or their sources. Replace `[N]` with the intervention
count.

### Tags

Paste as one comma-separated line (under 500 characters):

```
Default On, opt out, AI opt out, default settings, AI features, turn off AI, AI Overviews, Gemini, Copilot, Meta AI, Apple Intelligence, educational cartoon, 1970s cartoon, Saturday morning cartoon, jazz folk, AI music video, AI generated, AI satire, Remotion, Claude Code, Claude, Suno
```

### Settings

| Setting | Value |
|---|---|
| Category | Music |
| Audience | **Not made for kids.** The cartoon style could be mistaken for children's content (the brief flags it): the S00 card says "A cartoon for grown-ups about tech settings", and the subject is consumer tech and litigation. "Made for kids" would also turn off comments and the end screen. |
| Altered or synthetic content | **Yes.** The Narrator's voice and the music are AI-generated and sound real. |
| Language / caption language | English / English |
| Captions | Upload `captions/default_on.en.srt` as English subtitles (82 cues: every line as sung, Switch's labelled, the sound effects bracketed). The citation captions and the karaoke are burned in; the SRT gives search text and lets viewers restyle the lyrics. |
| License | Standard YouTube License. YouTube's only Creative Commons option is CC BY, which would drop the NC-SA terms; the description states the licence instead. |
| Thumbnail | `deliverables/thumbnail.jpg` (1920×1080): Switch mid-flip under the spotlight, the grey hand's finger on his paddle, "DEFAULT ON" and "click!". Never the real hand, the generation screen or the timeline, which would spoil the reveal (brief). |
| Chapters | From the description (first chapter at 0:00; each over 10 s). |
| End screen | The end card and the Sound card, 5:55 to the end (15 s). Both keep their text in the middle of the frame (about y = 220 to 860 of 1080), so put the elements low in the corners: a video (best for viewer, or another video in the series) bottom left, Subscribe bottom right. |
| Comments | Open. |
| Visibility | Unlisted for a check pass, then public. |

---

## Vertical cut 1: the pre-chorus and chorus 1 (9:16, 1080×1920)

**File:** `deliverables/vertical.mp4` (27.7 s). S09–S17: "I've only got two sides…", the off-screen hand flipping
Switch back on, and the first chorus through his echo, with the whole picture in the middle of the frame, the sung
line below it, and a "Full video" card. Settings as the main video: Music; not made for kids; altered or synthetic
content: yes; Standard YouTube License. Related video: the main video. No chapters or end screen.

**Title:**
```
"You push me down for off... so how'd I just return?" #Shorts
```

**Description:**
```
AI-generated satire. A cartoon for grown-ups about AI features that arrive switched on, and the off switches that don't stay off. Switch is voiced by a real child.

Full video, facts and sources: [main video link]
Production log, with every prompt and every human intervention: https://github.com/Derivative-Work/default-on
Animation and edit: Claude Code · Words: Claude
Video and assets CC BY-NC-SA 4.0. Satire; not affiliated with any company named.

#AIgenerated #privacy #Shorts
```

**Tags:**
```
Default On, opt out, default settings, turn off AI, educational cartoon, 1970s cartoon, AI music video, AI generated, AI satire, Remotion, Claude Code, shorts
```

## Vertical cut 2: the school (9:16, 1080×1920)

**File:** `deliverables/vertical_school.mp4` (52.6 s). S48 to the end of the final chorus: the school says "No AI,
please", the giant's offer, the rewind and the redub, "deeply integrated", and the final chorus, with a "Full video"
card. The three citations are repeated in large type at the foot of the frame for as long as each is on screen, so
they read on a phone. Settings as the first vertical cut.

**Title:**
```
"Take the robot with your search, or else there's no search there!" #Shorts
```

**Description:**
```
AI-generated satire about real events. On Nov 3, 2026, Google's VP for education told The New York Times that students at schools rejecting its AI would lose Search (GovTech). Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed from Search (Windows Report; Decrypt).

Full video, facts and sources: [main video link]
Production log, with every prompt and every human intervention: https://github.com/Derivative-Work/default-on
Animation and edit: Claude Code · Words: Claude
Video and assets CC BY-NC-SA 4.0. Satire; not affiliated with any company named.

#AIgenerated #education #Shorts
```

**Tags:**
```
Default On, Google, Gemini, AI Overviews, schools, K-12, AI in education, opt out, educational cartoon, AI music video, AI generated, AI satire, Claude Code, shorts
```
