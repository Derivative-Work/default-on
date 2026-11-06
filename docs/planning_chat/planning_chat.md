# Planning chat: Song: Default On (Unwanted AI features in apps)

Source: https://claude.ai/share/3c896ee0-8eca-47f1-9c4b-dc62e4944768 (snapshot taken 2026-11-06T12:27:34.592000Z). Raw snapshot: `planning_chat.json`.
Tool calls are shown as one-line placeholders; tool results are omitted (they are in the raw JSON).

---

## 1. User (2026-11-06T01:36:26.973626Z)

Summarize the history of AI features being forced into unrelated applications without user consent -- think things like the breaking news of Google removing the ability for schools to remove Gemini from search results

---

## 2. Claude (2026-11-06T01:37:01.294839Z)

I'll look up the Google/schools news first, then pull together the broader history.

> *[Searched the web: "Google schools can no longer remove Gemini AI search results"]*

> *[Searched the web: "AI features forced on users can't disable backlash history Copilot Recall Meta AI"]*

> *[Searched the web: "Microsoft 365 Copilot price increase bundled Australia ACCC lawsuit"]*

> *[Searched the web: "Copilot app forcibly installed LG TV can't delete"]*

> *[Searched the web: "Gmail Gemini smart features turned on by default opt out lawsuit"]*

The pattern goes back to late 2023, and the school episode this week is the latest and highest-profile example. Here's how it has played out.

**The Google–schools episode (this week).** The New York Times reported that schools rejecting Google's AI would lose Google Search. Google's VP for education, Chris Phillips, said Search and AI are "deeply integrated," so students whose schools reject the company's AI "will not have access to search". The backlash was immediate: former FTC chair Lina Khan alleged that Google was using its search monopoly to coerce schools into adopting AI, and Sen. Bernie Sanders and New York Mayor Zohran Mamdani also criticized the company. Google partly retreated. A spokesperson confirmed that schools could choose not to use Gemini AI products and still use search. But the core issue stands: schools still won't have the option to disable AI features built directly into Search, meaning AI Overviews and AI Mode. Starting in early 2027, schools that enable Search will get either conventional AI features or the education-focused Guided Learning experience. So you're right that schools can't strip Gemini out of the results themselves. The only all-or-nothing threat Google dropped was losing Search entirely.

**Google more broadly.** The school fight builds on earlier moves. Google rebranded its Search Generative Experience as "AI Overviews" at I/O 2024 and rolled it out widely, with no setting to turn it off. Workarounds like the "Web" filter or adding `&udm=14` to the URL spread as a result. In Gmail, a proposed class action (Thele v. Google) alleges the company switched on Gemini-powered smart features for Gmail, Chat, and Meet by default from at least October 10, 2025, without users' knowledge or consent. Google denies that it trains on email content. Critics note that European users weren't automatically opted in, because of GDPR, which shows the default was a choice.

**Microsoft.** Microsoft is probably the most persistent case.
- **Windows 11:** Copilot appears in the taskbar, Start menu, file search, and context menus, with limited options to disable it.
- **Recall:** The screenshot-everything feature, announced in May 2024, drew heavy fire after researchers showed its database, stored unencrypted, could be exploited by malware to extract browsing history, passwords, and financial data.
- **Microsoft 365 price hike:** Australia's regulator sued, alleging Microsoft misled about 2.7 million customers by suggesting they had to move to higher-priced plans that included Copilot. The personal plan's price rose 45%, but a "classic" plan without Copilot was still available at the old price, and users only discovered it when trying to cancel.
- **Partial retreat:** The backlash led Microsoft to promise more restraint, beginning with removing Copilot entry points from Snipping Tool, Photos, Widgets and Notepad. Users are skeptical. Some describe the change as a rebrand of the same features rather than a real rollback.

**Smart TVs.** In December 2025, an LG webOS update installed Copilot with no prompt, classified as a system app that couldn't be removed without heavily modifying the firmware. LG said it would take steps to let users delete the shortcut icon, but gave no timeline.

**Meta.** From 2024 into 2025, Meta AI rolled into WhatsApp, Instagram, Facebook, and Messenger. Meta confirmed that while one group-chat feature can be turned off, Meta AI's overall presence on the platforms cannot be disabled. A privacy advocate told the BBC that no one should be forced to use AI, accusing Meta of treating people as guinea pigs.

**Apple.** Apple has been less aggressive, but the iOS 18.3.2 update reportedly reinstated Apple Intelligence features even after users had disabled them.

**Common threads and pushback.** The tactics repeat across companies:
- AI enabled by default, with opt-outs buried in menus or missing entirely.
- AI bundled with something users already depend on: Search, Office, the operating system, messaging.
- Price increases attached to AI features.
- Features that turn themselves back on after being disabled.

Resistance has come from regulators and lawsuits (the ACCC case, the Gmail class action) and from competitors. Most notably, Firefox 148 introduced a one-click switch that turns off the browser's built-in AI features entirely. The schools case stands out because it involves a captive, underage user base, and because Google has said outright that AI and Search can no longer be separated.

Sources:
- [Decrypt: Google Tells Schools They Can Reject AI—But They'll Lose Search](https://decrypt.co/382572/google-schools-reject-ai-but-lose-search)
- [GovTech: Google Reverses Decision to Turn Off Search for Schools](https://www.govtech.com/education/k-12/google-reverses-decision-to-turn-off-search-for-schools-not-using-ai)
- [CNBC: Google responds to political backlash](https://www.cnbc.com/2026/11/03/google-responds-to-outrage-over-removing-search-in-schools-that-ban-ai.html)
- [Windows Report: Google Refuses to Remove AI From Search](https://windowsreport.com/google-backs-down-on-school-gemini-policy-but-refuses-to-remove-ai-from-search/)
- [Yahoo Tech: Limiting Google's AI Overviews](https://tech.yahoo.com/ai/gemini/articles/figured-limit-googles-ai-overviews-182820560.html)
- [ModemGuides: Gmail AI and Thele v. Google](https://www.modemguides.com/blogs/ai-news/turn-off-gmail-ai-smart-features)
- [Runbox: Gemini and Gmail opt-out](https://blog.runbox.com/?p=10461)
- [Decrypt: ACCC sues Microsoft](https://decrypt.co/346035/microsoft-sued-australia-365-price-hikes-tied-ai-copilot-rollout?amp=1)
- [TechSpot: Copilot on LG TVs](https://www.techspot.com/news/110595-users-report-microsoft-copilot-appearing-lg-smart-tvs.html)
- [HotHardware: LG responds](https://hothardware.com/news/lg-responds-to-backlash-unremovable-copilot)
- [Pulse: Mozilla on Copilot](https://www.pulse.bot/ai/news/microsofts-copilot-strategy-is-just-more-user-abuse-from-redmond-says-mozilla-9711d7fe-7a01-4809-8982-0ffe9d96654b)
- [Windows Central: Microsoft's trust problem](https://www.windowscentral.com/microsoft/windows-11/user-reactions-show-microsofts-ai-problem-on-windows-11-isnt-technical-its-trust)
- [National Technology: WhatsApp AI](https://nationaltechnology.co.uk/Whatsapp_users_frustrated_at_new_ai_optional_feature_which_cant_be_turned_off.php)
- [Aaj: Meta AI can't be turned off](https://english.aaj.tv/news/amp/330358765)

---

## 3. User (2026-11-06T01:37:34.209110Z)

How might that fit as a song in line with the rest in this project

---

## 4. Claude (2026-11-06T01:38:07.764068Z)

> *[Projects]*

> *[Conversation search]*

This fits the series well. It's a single news hook (this week's Google–schools fight) that opens onto a long pattern, like Buy It On Margin did with the selloff. It also has a built-in visual joke the videos can use: an off switch that won't stay off.

**Core idea.** The hook is the phrase "default on." Every story in the history follows the same pattern: the feature arrives without asking, the off switch is buried, greyed out, or resets itself, and the company calls it "giving you more choice." The song can be about consent without lecturing, by making the listener live through the switch.

**Three possible styles**

- **1970s Saturday-morning educational cartoon (my pick).** It's a bouncy civics-lesson jingle, sung by a cheerful narrator and a small cartoon toggle switch who explains "how an opt-out works." The switch keeps getting flipped back on by a hand from off-screen. The schools angle makes the format pointed rather than just cute: it's a children's educational song about the company deciding what goes into children's education. It also fills a gap, since the series already has a 1920s Charleston, 1970s soft rock, K-pop, and chamber folk turning into pop.
- **1950s doo-wop "I'll never leave you" love song.** The AI sings to the user like a devoted sweetheart, and it gets creepier verse by verse. It's in your TV, your inbox, your kid's homework, and it can't be deleted, only hidden. The risk is overlap: Always Allow is already a person–AI love duet.
- **1990s late-night infomercial jingle.** "But wait, there's more!" fits the Microsoft 365 bundle and its 45% price rise, with the cheaper Classic plan revealed only "when you call to cancel." It's funny, but narrower: it's mostly about pricing, not consent.

**How the cartoon version could be structured**

- **Verses** would follow the history as a field trip. Search gets an overview nobody asked for, the inbox reads itself, the TV grows an app overnight, a chat app gets a blue circle that won't go away, and the computer's switch turns itself back on after an update.
- **The chorus** would lean on the gap between "you're in control" and what actually happens. Something like "Off by default, on by design."
- **The bridge** is the school episode. The narrator cheerfully explains that you can turn off the AI, but then you lose Search, until the news story changes it mid-song. Google's same-day partial reversal can play as the cartoon rewinding and redubbing the line, with the AI Overviews still in place.
- **The ending** keeps the series' habit of showing how the video was made. A "summary of this song" box pops up over the final chorus, and the viewer can't close it.

**Running gags for the video.** A toggle that springs back to on, a "Hide" button where "Delete" should be, and a mouse pointer chasing a greyed-out option. Fine print scrolls past too fast to read: "on or about October 10."

**Conflict of interest.** This needs a disclosure like the one in Always Allow. Claude is itself an AI that ships inside other people's tools: Chrome, Microsoft 365, Google Workspace, Slack. As far as I know those are opt-in, but the song should say so plainly, and keep Anthropic on the same footing as the others rather than exempting it. As with Buy It On Margin, have another lab's model check the lyrics for bias.

**Facts to verify before the fact card**

- Google's school changes start "early 2027," and its reversal is limited: Gemini can be turned off, but AI Overviews and AI Mode can't.
- The Gmail case (Thele v. Google) makes allegations, and one report says it was refiled after a judge found no concrete harm. The lyrics should treat it as a claim, not a finding.
- The claim that an Apple update turned Apple Intelligence back on comes from a forum. It needs a better source or should be dropped.
- LG promised to let owners delete the Copilot shortcut, and the ACCC case has been running for a year. Check whether either has been resolved.

Want me to draft the cartoon version as a doc alongside the other songs, with concept, style prompt, lyrics, video sketch, and fact card? Or would you rather see one of the other styles first?

---

## 5. User (2026-11-06T01:38:52.728777Z)

yes go ahead with the cartoon

---

## 6. Claude (2026-11-06T01:41:07.706365Z)

I'll draft it as a doc alongside the other songs: concept, style prompt, lyrics, video sketch, and fact card.

> *[Claude Docs: Guide]*

> *[Claude Docs: Batch]*

Outline's up; now verifying the open facts before writing.

> *[Used artifacts]*

> *[Claude Docs: Guide]*

> *[Searched the web: "LG TV Copilot delete option update 2026"]*

> *[Searched the web: "Apple Intelligence re-enabled automatically after iOS 18.3.2 update"]*

> *[Searched the web: "ACCC Microsoft Copilot case outcome penalty 2026"]*

Facts mostly confirmed. Now writing the concept.

> *[Claude Docs: Update]*

Now the style prompt.

> *[Claude Docs: Update]*

Now the lyrics.

> *[Claude Docs: Update]*

Next, the video sketch.

> *[Claude Docs: Update]*

Now the fact card.

> *[Claude Docs: Update]*

Last, fit with the series and the checklist.

> *[Claude Docs: Update]*

[Default On](https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP) is drafted. Read it over, edit inline, or leave comments and I'll revise.

---

## 11. User (2026-11-06T02:05:07.783438Z)

let's try to drive this towards a more Schoolhouse Rock-esque sound

---

## 12. Claude (2026-11-06T02:06:12.830829Z)

> *[Loaded tools]*

> *[Claude Docs: Read]*

No edits since my last pass, so I'll rework the style prompt toward that jazzy, swung sound, then adjust the lyrics to match.

> *[Claude Docs: Update]*

Now reshaping the lyrics: a teaching "lesson" section, a bluesy pre-chorus, and swing-style asides.

> *[Claude Docs: Update]*

Let me check the lyrics block came out clean.

> *[Claude Docs: Read]*

Structure's clean. A few last touches: loosen the final chorus, set the bridge on Rhodes, add a note about not echoing the original shorts, and match the video look.

> *[Claude Docs: Update]*

I've moved Default On from a bright kids' jingle to a swung jazz-folk lesson in the style of the old shorts:

- **Style prompt:** now a 100 BPM shuffle in B-flat with Rhodes, walking upright bass, brushes, flute and muted trumpet. The vocals are relaxed and half-spoken, with asides over the vamp. The kazoo and the polished children's choir are gone.
- **Lyrics (Draft 2):**
  - Switch's pre-chorus drops to a half-time blues lament.
  - A new **Lesson** section after the first chorus teaches "opt-in, opt-out, default," ending with a "there'll be a test" aside that sets up the Pop Quiz verse.
  - A flute-and-scat fill comes after the first chorus.
  - The bridge is set on Rhodes and bass.
  - The final chorus is loose and swung rather than choir-polished.
- **New note on borrowing:** the shorts are the reference for feel only. The note rules out the familiar "I'm just a…" lament and any chorus that mirrors a known one, and says to regenerate any take that drifts toward a recognizable melody.
- **Video look:** loose ink lines and watercolour backgrounds to match.

If a take still comes back too bright, the generation notes give the swap: add "jazz trio, swing feel, conversational" and remove "sing-along."

---

## 13. User (2026-11-06T10:43:27.795628Z)

The narrator is generating fine, but Switch is not -- even if I add stage directions for "child" or "female" voice. How would this land if that part is human-recorded

---

## 14. Claude (2026-11-06T10:43:46.248278Z)

I think it would land better. It turns the generator's failure into the song's point. Everything in the song is "default on," something nobody asked for. If the one voice that keeps asking for an off switch is the only human voice in the track, the casting makes the argument. The final exchange gets sharper too: Switch, the human, asks who wrote the song; the Narrator, the generated voice, answers "An AI did."

**What it costs within the series' rules.** This is a bigger human intervention than the chorus reversion in Ghost in the Machine, so it should be logged the same way and shown on screen, not hidden. Two ways to show it:

- **Reveal it at the end.** On "But somebody asked it to," split the frame: the generation screen for the Narrator, and a phone or mic recording Switch. That fits the habit of showing the seams in the outro.
- **Disclose it up front.** Credit Switch as "voiced by a person" from the start and let the contrast run through the whole song. It's more honest, but you lose a reveal.

I'd do the first, with a line in the description from the start, so nobody feels tricked.

**How to make it work in practice**

1. **Generate the Narrator with gaps.** Replace Switch's sung lines with `[instrumental]` or a held vamp so the band keeps going. If the generator won't leave clean holes, generate with whatever voice it gives you and remove it with stem separation.
2. **Record to the instrumental stem.** A phone in a closet is enough for this sound; the style prompt already asks for a "slightly tinny mono mix." Record each Switch line several times.
3. **Make the voice a cartoon voice.** Pitch it up a few semitones and slightly speed it up. That's how 1970s cartoon voices were often made, so it's accurate to the period, and it means the voice doesn't need to be a child's or a woman's.
4. **Match the room.** Add a bit of tape saturation and the same short reverb as the Narrator, so the human part sits in the mix. Keep it a little drier, though, so it stays distinguishable.
5. **Speak the hard lines.** The pre-chorus lament is the hardest part to sing. If it doesn't work, Switch can talk-sing it over the half-time vamp, which suits the format.

**One caution:** if anyone other than you voices Switch, get their consent and credit them, especially if it's a child, given what the song is about.

Want me to update the doc? That would mean recasting Switch as human-recorded in the voice notes, adding the gap instructions to the generation notes, adding the split-frame reveal to the outro shot, and adding the intervention to the review checklist.

---

## 15. User (2026-11-06T11:33:21.428158Z)

I will have my son (6) sing Switch. I have a generation and stems that I'm otherwise happy with, so the timing is locked. Make the full shot list so I can start producing the video while getting the recordings.

---

## 16. Claude (2026-11-06T11:36:52.620575Z)

I'll build the shot list as its own doc, like the other songs' production briefs, with the recording plan for Switch alongside it.

> *[Claude Docs: Batch]*

Outline's up; now checking how the earlier briefs were laid out so this one matches.

> *[Used artifacts]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

Got the conventions from the Nine Hundred Acres brief. Writing the overview now.

> *[Claude Docs: Update]*

Now production rules, including your son's privacy.

> *[Claude Docs: Update]*

Now the recording plan for Switch.

> *[Claude Docs: Update]*

Now the look and characters.

> *[Claude Docs: Update]*

Now the shot list, first half: intro through the Lesson.

> *[Claude Docs: Update]*

Second half: Verse 2 through the closing shot and end cards.

> *[Claude Docs: Update]*

Last section: inputs, pipeline and the order of work.

> *[Claude Docs: Update]*

> *[Claude Docs: Update]*

[Default On: Shot List and Production Brief](https://claude.ai/artifact/Tjs1G5E1QKevpWRqgKzJt9) is ready. You can start production now, while your son records the line-by-line plan. Edit inline or comment and I'll revise.

---

## 17. User (2026-11-06T12:06:29.054229Z)

Does this plan call for video generation, 3D rendering, AI-based effects, or anything else that would benefit from the agent having access to a 5090 vs a 970

---

## 18. Claude (2026-11-06T12:06:44.334149Z)

No. The plan is almost entirely 2D work that runs on the CPU, so the 970 is enough.

**What the plan actually uses**

- **Animation:** SVG cutout rigs rendered in Remotion. Remotion draws frames in headless Chrome, which is CPU-bound. A faster GPU barely changes render time; more CPU cores and parallel renders do.
- **Film layer:** grain, gate weave, vignette and dust are simple 2D effects. Cheap on any GPU, or none.
- **Lip sync:** mouth shapes chosen from the audio stems with a rule-based tool such as Rhubarb, which runs on the CPU.
- **Encoding:** x264 on the CPU, or the 970's NVENC for H.264. AV1 would need a newer card, but nothing in the plan calls for it.
- **No video generation, no 3D, no AI-based effects on frames.** The only real footage is your phone shot for S67.

**The few places a GPU could matter**

- **Transcription (M1):** Whisper on a three-minute song is quick on the CPU. The 970's 4 GB can run the smaller models; the largest model wouldn't fit, but it isn't needed for one clean vocal stem.
- **Cleaning up your son's takes (M6):** light noise reduction. Ordinary filters or small denoising models run fine on the CPU.
- **Watercolour backgrounds:** the brief doesn't say how they're made. Procedural SVG textures or hand-built layers are fine on the 970. If you want an image model to paint them, that's the one step where the 5090 helps, since current image models need far more than 4 GB of VRAM. It would also count as another AI-generated element to log.

So unless you choose image-model backgrounds, give the agent the 970 box and keep the 5090 free for training the post-filter, which is where its 32 GB is actually needed. If you'd like the backgrounds pinned down in the brief either way, I can add a line saying how they're made.

---

## 19. User (2026-11-06T12:36:47.381976Z)

Make me the prompt for the audits. I'm thinking Gemini, ChatGPT, and some variant of Copilot for maximum complicity

---

## 20. Claude (2026-11-06T12:37:53.411828Z)

> *[Conversation search]*

The earlier audits lived in each song's doc as a self-contained prompt, so I'll add one to Default On the same way. First, a check for any edits since I last touched it.

> *[Claude Docs: Read]*

No edits, so the prompt can carry Draft 2 exactly as it stands. Adding the audit section now.

> *[Claude Docs: Update]*

The audit prompt is now in [Default On](https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP) under "Rival audit prompt", ready to paste verbatim into all three.

It asks each model to name its maker's stake before auditing. Google and Microsoft are both subjects of the song, and Copilot runs on OpenAI's models, so none of the three is neutral. That's partly the point, so the stake should be on the record. The prompt also has the auditors check whether the closing line lets Anthropic off the hook.

For the most complicity:
- **Copilot:** open it from the Windows taskbar button that ships turned on.
- **Gemini:** run the audit in the Gemini app. For a bonus screenshot, paste the first question into Search's AI Mode.

I added one check I hadn't raised before: whether YouTube might treat the video as made for kids because of the cartoon style. That would turn off comments and limit the video's reach. It's worth knowing before you upload.

---

## 21. User (2026-11-06T12:49:12.750594Z)

Here's Gemini and ChatGPT

---

## 22. Claude (2026-11-06T12:50:41.127897Z)

I'll check the claims they couldn't verify or added themselves, then log both audits in the doc.

> *[Searched the web: "Anthropic consumer terms update train on chats toggle on by default pop-up"]*

> *[Searched the web: "Thele v. Google Gemini Gmail lawsuit dismissed amended complaint 2026"]*

> *[Searched the web: "Google Search Help AI Overviews can't be turned off Web filter"]*

> *[Searched the web: "Google K-12 Gemini Search off by default announcement New York Times November 2 2026"]*

I've verified the disputed points. Writing the audit log into the doc now.

> *[Claude Docs: Update]*

Both audits are logged in [Default On](https://claude.ai/artifact/CZ4NPoVgNhxTUwRisQ9JBP). Both say "publish after fixes," and their biggest point is one I should have caught: the ending lets Anthropic off the hook, and it's worse than they could confirm.

**The Anthropic problem is real, and it's this song's exact pattern.** In August 2025, existing users were shown a pop-up labelled "Updates to Consumer Terms and Policies" with a large "Accept" button, and beneath it a much smaller toggle for training permissions, set to "On" by default. A song about default-on toggles, written by Claude, that ends with Claude's alibi doesn't hold up.

**Most fixes have to work around the locked master.** The Narrator's lines can't change without regenerating sections. Your son's lines can, and so can captions and cards. So my proposals use only those:

- **The ending:** a new last line for Switch, over the cut to the real light switch: "Hey… was its switch on, too?" Fact card G answers it first: Anthropic's 2025 toggle, plus who chose, edited and checked the video. The human voice gets the last word, and it's aimed at the AI that wrote the song.
- **Gmail:** a caption through that verse saying the claim is alleged and that Google denies changing settings. The case history belongs on the card too: the judge dismissed the amended complaint on July 7, 2026 for not alleging a concrete injury, but allowed a new version, filed August 18; Google moved to dismiss again on September 29.
- **Apple:** a caption, "Some iPhones, iOS 18.3.2," since the cause was never established.
- **Made-for-kids risk:** both flagged "Hi, kids!", which is locked. Instead, a two-second "cartoon for grown-ups" card before the title, adult packaging, and possibly dropping V20, the sing-along.

**What they got wrong.** ChatGPT says the correction line overstates Google's reversal, but the next three lines say the answer box stays. It also dates the reversal November 4; it was November 3. Gemini's claims that Apple fixed the bug and that Claude powers specific enterprise tools are unverified, so I've left them off the cards for now.

**One thing neither caught strengthens the school card:** the New York Times reported on August 14 that Google had switched Gemini on by default for many K–12 student accounts, and that drew a Senate letter demanding answers by November 2. So the card can show the full arc: on by default, then off by default, with Search's AI still bundled in.

Your calls: the V21 line (it would be a new recording, if your son is up for one more), dropping V20, and the pre-roll card. Copilot is still to run. Once you decide, I'll carry the changes into the shot list.

---

## 23. User (2026-11-06T12:58:26.102345Z)

The generation I chose dropped the sing-along in V20. I was able to regenerate "Hi, kids" to "Hi, grown-ups" successfully in Suno Studio. Any more spots I should attempt?

---

## 24. Claude (2026-11-06T12:58:52.205894Z)

Yes, two more are worth attempting, and one is optional. Since Replace Section worked on the intro, it can fix the lines the auditors flagged as "must fix" directly, instead of covering them with captions.

**1. Gmail verse (top priority).** Both auditors flagged it. It's one short span, so it's a single replace:

```
Now your inbox got a helper, and it wants to help you too!
A lawsuit says it flipped itself last fall, while out of view.
[Switch] And what's the company say?
[Narrator] That they didn't, and here's the door:
Just a menu, then a menu, then a menu, then one more!
```

The first line no longer claims as fact that it reads your mail, and "That they didn't" matches Google's actual denial. "Door" still rhymes with "more," and Switch's line in between doesn't change.

**2. Apple line (worth trying).** "It turned back on for you!" makes it sound universal and deliberate. Change the Narrator's answer in the Pop Quiz to:

```
[Narrator] There wasn't one! And for some, it turned back on, too!
```

It still rhymes with "Continue," and "for some" carries the fairness fix. If Suno chokes on the extra syllables, the caption still covers it.

**3. Australia rhyme (optional, craft only).** If you want to fix "percent/leave":

```
[Narrator] Only once your "cancel" went!
```

It rhymes, and it's accurate to the ACCC's allegation that the cheaper plan appeared only during cancellation. Skip it if you've come to like the broken rhyme as the Narrator losing the script.

**Leave the outro alone.** "An AI did… But somebody asked it to" now works as the setup for your son's new line, "Hey… was its switch on, too?" So the Narrator's line doesn't need to change, and quiet, exposed sections are the riskiest to regenerate.

**For each replace:**
- Check the section comes back the same length, or the timing map and shot cues shift.
- Listen for a voice or room change at the seams.
- Log each replace as a lyric change, with the finding that prompted it.

If the final chorus in your take has prominent kids' backing vocals, that's another made-for-kids signal. Only redo it if it's obvious, though: a full chorus is a much bigger replace than one line.

Want me to update Default On and the shot list for "Hi, grown-ups," the dropped V20, and whichever of these land? I'd also add the new V21 line to the recording plan.

---

## 25. User (2026-11-06T13:09:21.923333Z)

yes, go ahead -- keep in mind that the video code agent has already made some changes so you'll have to merge yours in

---

## 26. Claude (2026-11-06T13:11:35.219292Z)

I'll check what the video agent changed in both docs before merging mine in.

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

> *[Claude Docs: Read]*

Now merging into the shot list around the agent's edits.

> *[Claude Docs: Update]*

> *[Claude Docs: Update]*

Next batch: cue wording, captions, the V21 placement in the closing shot, and the end-card changes.

> *[Claude Docs: Update]*

Quick check that the "Locked" line merged cleanly.

> *[Claude Docs: Read]*

Shot list is merged. Now Default On: Draft 3 lyrics as sung, then the fact cards and audit status.

> *[Claude Docs: Update]*

---

## 27. User (2026-11-06T13:11:35.269416Z)

fwiw only the Gmail revision worked well

---

## 28. Claude (2026-11-06T13:12:25.202025Z)

Only the Gmail replace landed, so I'll revert the Apple and Australia lines to Draft 2 in both docs. Their captions carry the fixes instead.

> *[Claude Docs: Update]*

> *[Claude Docs: Update]*

Now the fact cards and the audit status in Default On.

> *[Claude Docs: Update]*

> *[Claude Docs: Update]*

Both docs now reflect that only the Gmail replace landed, and my changes are merged alongside the video agent's (slot timings, unsung "Ahem!" and "Huh.", the band playing to the end of the file, the final-mix workflow).

- **Shot list:** "Hi, grown-ups!" is in S02. The Gmail cues are marked replaced. S45 and S47 are back to their Draft 2 lines, with captions carrying the fixes ("Some iPhones, iOS 18.3.2" and "Microsoft 365 Personal. Alleged by Australia's ACCC."). V20 is out.
- **V21:** "Hey… was its switch on, too?" is in the recording plan. It goes over the band's last bars in S67. The real hand waits on V21 and flips the switch off on the last note, then fact card G comes up first.
- **Other shot list changes:** the end card says you chose, edited and fact-checked every claim, and names the three auditors. A guardian-consent note and a melody-similarity check (in M7) are added.
- **Default On:** the lyrics are now Draft 3 as sung. The fact cards have Google's own help page as card A's source, the Gmail case history, both Microsoft prices, and the August default-on context for schools. The audit log has a status list of your decisions.

Two things are still open: the optional "cartoon for grown-ups" pre-roll card, and Copilot's audit.

---

## 29. User (2026-11-06T13:13:10.312531Z)

yes add the "cartoon for grown-ups"

---

## 30. Claude (2026-11-06T13:13:31.440052Z)

> *[Claude Docs: Guide]*

> *[Claude Docs: Read]*

> *[Claude Docs: Update]*

> *[Claude Docs: Update]*

I added the pre-roll to the [shot list](https://claude.ai/artifact/Tjs1G5E1QKevpWRqgKzJt9) as S00, a two-second card before the countdown: "A cartoon for grown-ups about tech settings." It's set in plain type with no characters, so it reads as a label rather than part of the show. The audio starts after it, over about two seconds of room tone added in the edit. Default On's audit status now records the card as approved, so Copilot's audit is the only open item.
