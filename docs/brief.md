# Default On: Shot List and Production Brief

2026-11-06 · @Albert Armea

## Overview

**A swung 1970s educational-cartoon video for "Default On," cut to a locked master. The Narrator is generated; Switch is sung by the human's six-year-old son.** Animation can start now from the master and stems; Switch's recordings slot into fixed gaps as they arrive.

- **Locked:** the chosen generation, its stems and its timing. Beyond the replaces listed under Lyrics, nothing is regenerated. Every shot is cued by lyric; the timing map turns cues into frames.
- **Lyrics:** Draft 3 in the Default On doc is the reference. "Hi, grown-ups!" has been regenerated, and the Gmail stanza (cues for S25–S28) was replaced in Suno Studio. Replaces of S45 and S47 failed, so those keep Draft 2 wording and their captions carry the fixes. M1 checks the replaced spans kept their length. The master as sung is the source of truth; M1 transcribes it and logs every difference.
- **The one human voice is the point.** Everything in the song is "default on." The only voice asking for an off switch is a real person's, and the outro shows that.
- **Ending:** the cartoon's off-screen hand finally hesitates. The last frame is a real light switch on a real wall, turned off by a small hand, and it stays off. Just before it, Switch asks whether the AI that wrote the song had its switch on too (V21), and the first fact card answers.

## Production rules, guardrails and logging

**AI-made by default, with one declared exception.** Claude Code builds every frame. The human picks takes, approves gates and supplies the real inputs below. Switch's voice is the largest human intervention in the series so far: log it in `log/human_interventions.md` as one entry per recorded line, with the take chosen and any processing.

**Logging.** Log every render (shot ID, composition, props, commit hash) in `log/renders.md`, and every Switch comp decision in `log/switch_takes.md`. The logs feed the end card.

**Content guardrails**

- No real company logos, wordmarks, brand colours or product UI in the animation. The search box, inbox, TV, chat app and phone are generic. Companies are named only on the fact cards after the song.
- The only real interface on screen is the generation screen in the outro reveal.
- On-screen facts must match the Default On fact card exactly. Allegations stay labelled as allegations.
- Borrow the format of the old shorts, not their content: no "I'm just a…" lament, no stairway or hilltop scene, no recreated characters.

**Protecting the child**

- His face, name, school and home never appear. The reveal shows hands, a phone or mic, a waveform and a light switch, framed tight so no room details identify the house.
- Credit him as you choose; the default is "Switch: voiced by a real kid." Record your consent as his guardian in the intervention log.
- Raw takes stay out of the public repo by default. Publish only the comped, processed lines that are in the final mix, and note in the log that the raw takes are withheld.

## Recording plan for Switch

**Twenty short lines****, most under three seconds, recorded over two or three 15-minute sessions.** Spoken lines count as finished takes; only the pre-chorus and the outro need real singing, and talk-singing is fine for both.

| ID | Section | Line | Delivery |
| --- | --- | --- | --- |
| V01 | Intro | "Hi! I've got two sides: on, and off!" | Spoken, bright |
| V02 | Verse 1 | "That's neat, but what if I would rather read the page myself?" | Sung or talk-sung, curious |
| V03 | Pre-chorus 1 | "I've only got two sides, it isn't much to learn: / You push me down for off… …so how'd I just return?" | Slow and bluesy; leave the gap for the click |
| V04 | Chorus 1 tag | "(On, on, on…)" | Sung, getting quieter |
| V05 | Lesson | "And 'opt-out' means that no one asked you, and you're hunting for the spot!" | Sung, proud of knowing the answer |
| V06 | Lesson | "There's always a test." | Spoken, sighing |
| V07 | Verse 2 | "And what's the company say?" | Spoken |
| V08 | Verse 2 | "Can I delete it?" | Spoken, hopeful |
| V09 | Verse 2 | "Is that the same?" | Spoken, suspicious |
| V10 | Pre-chorus 2 | Same as V03 | A fresh take; a sadder one is fine |
| V11 | Chorus 2 tag | "(On, on, on…)" | Same as V04 |
| V12 | Verse 3 | "I'll uninstall it!" | Spoken, confident |
| V13 | Verse 3 | "I'll mute it, then?" | Spoken, deflated |
| V14 | Verse 3 | "Where's the 'No'?" | Spoken |
| V15 | Verse 3 | "Was there one without the robot?" | Spoken |
| V16 | Bridge | "And the answer box on top?" | Spoken |
| V17 | Bridge | "What's that mean?" | Spoken, genuinely asking |
| V18 | Outro | "I've got two sides. / …Guess one of 'em was just for show." | Quiet, alone; the emotional line |
| V19 | Outro | "Hey, who wrote this song, anyway?" | Spoken, curious |
| V21 | Outro, after the Narrator's last line | "Hey… was its switch on, too?" | Spoken, genuinely curious, not a gotcha. Lands over the band's last bars; the generation dropped the old V20 sing-along |

**Session tips**

- **Call and response.** Say each line in his ear, then he says it back. Record three to five takes per line, and keep the giggles: a laughing take of V09 or V17 may be the best one.
- **Headphones on, track playing.** For the sung lines (V02–V05, V10, V18), play the instrumental plus the Narrator stem from two bars before the gap. Spoken lines don't need to land on the beat, but five have little room before the Narrator comes back: V14 1.2 s, V12 1.5 s, V13 1.7 s, V07 and V08 1.8 s. Keep those quick. V04 and V11 weren't generated; each gets 2.4 s right after the chorus's last "Default on!"
- **Let him change words.** If he says "Is that the same thing?", keep it and log it as a lyric change. A six-year-old's phrasing is better than the script.
- **Record the click for real.** Have him flip an actual light switch near the mic, 20 times. These become every [click] in the song and match the closing shot.
- **Setup.** A phone or USB mic about 15 cm away, in a closet or among coats to deaden the room, recording at 48 kHz WAV. A sock over the mic works as a pop filter. Record 10 seconds of room silence for noise reduction.
- **Processing (agent, in M2).** Light noise reduction, compression and the same short room reverb and tape saturation as the master, slightly drier so he stays distinct. Pitch-up isn't needed: his own voice is already the cartoon voice.

## Look and characters

**Limited-animation 1970s educational short: cutout characters on watercolour backgrounds, held poses, a few moving parts per shot.** Everything is built in Remotion as SVG rigs, so poses and mouth shapes are swapped rather than drawn frame by frame, which is how the originals were made too.

**Characters**

- **Switch.** A cream wall plate with a toggle for a nose, big round eyes, stubby arms and no legs; he travels by hopping off the wall onto other surfaces. Poses: neutral, curious, proud, sad, flipped-on (startled, toggle up) and off (relaxed, toggle down). Seven mouth shapes, driven by the comped Switch track.
- **The Narrator.** A hand-drawn host in a brown cardigan and wide collar, seen from the waist up, seated on a stool or leaning on a chalkboard. Relaxed and slightly rumpled; he never looks at the off-screen hand. Seven mouth shapes, driven by the Narrator stem.
- **The off-screen hand.** Only a cuff and fingers, entering from the frame edge. Same grey sleeve every time; no face is ever attached.
- **Kids at desks** (final chorus only). Simple, generic, varied cartoon kids. None is drawn to resemble the real child.

**Palette and type**

- Mustard, burnt orange, avocado green, teal and cream on off-white paper; ink lines in warm dark brown, never black.
- Titles and section cards in a rounded bubble face; captions in a plain sans.

**Film layer** (one shared module over every shot)

- Grain, slight gate weave, a soft vignette and occasional dust specks. Colour slightly faded toward yellow.
- Each section opens on a two-frame splice flash, like a film reel join.
- Strength stays constant through the song, then drops to zero for the real-world outro footage, so the shift to real life reads instantly.

## Shot list

**6****8 shots (S00–S67)**** plus fact cards, each cued by a lyric line; the timing map in M1 turns cues into frames.** Switch's lines are marked with their recording IDs, so shots can be animated against the gap and lip-synced when the take lands.

**Source key:** **A** animated in Remotion · **R** real screen capture · **H** real footage the human shoots · **E** sound or edit event.

### Intro

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S00 | Before the audio starts (about 2 s of room tone, added in the edit) | Pre-roll card on cream paper: "A cartoon for grown-ups about tech settings." Plain sans, warm dark-brown ink, film layer on, no bubble letters and no characters, so it reads as a label rather than a title. Cut straight to S01's countdown | A |
| S01 | Downbeat, before the first line | Film-leader countdown, then the title card "DEFAULT ON" in bubble letters on mustard. A small toggle under the title flips itself from OFF to ON | A |
| S02 | "Hi, grown-ups! Today we're learning how an opt-out works." (regenerated) | Narrator on a stool by a chalkboard reading "TODAY: HOW AN OPT-OUT WORKS" | A |
| S03 | "Say hello to Little Switch!" | Pan right along the wall to a wall plate; Switch's eyes open | A |
| S04 | V01 "Hi! I've got two sides…" | Switch waves, then demonstrates: toggle up, an "ON" label pops; toggle down, "OFF" | A |

### Verse 1

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S05 | "You typed a little question…" | A big generic search box on a desk; letters type themselves | A |
| S06 | "And an answer hopped on top of it…" | An answer box with legs hops onto the list of links and sits on them, squashing them flat | A |
| S07 | V02 "That's neat, but what if I would rather read the page myself?" | Switch lifts a corner of the answer box and peeks at the squashed links | A |
| S08 | "Well, there's a tiny tab marked 'Web'…" | Switch climbs a wobbling ladder to a tiny tab labelled "Web" on a high shelf | A |

### Pre-chorus 1 (half-time)

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S09 | V03 "I've only got two sides…" | Night-blue background, one spotlight; Switch alone on the wall, singing slowly | A |
| S10 | "You push me down for off…" | Switch pulls himself down to OFF, exhales, closes his eyes | A |
| S11 | [click] | The grey sleeve enters from frame left and flips him back up. Click from the real-switch recordings | A, E |
| S12 | "…so how'd I just return?" | Switch looks left and right; nobody's there | A |

### Chorus 1

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S13 | "Default on! Default on!" | Bright mustard background; bubble-letter lyrics with a bouncing ball | A |
| S14 | "It was there when you woke up…" | Sunrise over a bed with the answer box on the pillow; cut to the empty room at night, the answer box still there, waving | A |
| S15 | "You can hide it, you can mute it…" | Three beats: a blanket thrown over it; a mute bar over its mouth; it's shut in a drawer that slides back open | A |
| S16 | "But the switch is just a picture…" | Switch peels off the wall and turns out to be a sticker. A pencil finishes drawing him back on | A |
| S17 | "Default on!" / V04 "(On, on, on…)" | Switch, redrawn slightly crooked, echoes quietly | A |
| S18 | Flute and scat fill | The grey hand doodles little ON switches in a margin, in time with the fill | A |

### Lesson

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S19 | "Now, 'opt-in' means somebody asks you…" | Chalkboard: "OPT-IN." A cartoon kid is offered a cookie and nods | A |
| S20 | V05 "And 'opt-out' means that no one asked you…" | "OPT-OUT." The kid already has a cookie stuck to his hand and wanders a maze of menus looking for the exit | A |
| S21 | "And 'default' is the setting that they picked…" | "DEFAULT." The kid sits down to a plate already piled with broccoli | A |
| S22 | "…they'll say you picked the same." | A rubber stamp slams "YOU CHOSE THIS" onto the plate | A |
| S23 | "Got that? Opt-in, opt-out, default. There'll be a test." | The Narrator taps the three words; a stack of test papers thuds onto the desk | A, E |
| S24 | V06 "There's always a test." | Switch, half buried under the stack | A |

### Verse 2

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S25 | "Now your inbox got a helper…" (replaced) | An envelope with eyes reads over a cartoon person's shoulder | A |
| S26 | "A lawsuit says it flipped itself last fall…" | A calendar flips to an autumn page; while everyone looks away, a tiny switch in the inbox's corner flips ON. Caption, held through S28: "Alleged in a lawsuit. Google denies changing settings." | A |
| S27 | V07 "And what's the company say?" | Switch knocks on a door marked "SETTINGS" | A |
| S28 | "That they didn't, and here's the door: / Just a menu, then a menu…" (replaced) | The door opens on a menu, which opens on a menu, which opens on another, zooming in each time. Fine print scrolls past too fast to read: "on or about October 10" | A |
| S29 | "Then the TV got an update in the middle of the night," | A living room at night: a TV with a progress bar, the moon in the window | A |
| S30 | "And a brand-new tile was waiting…" | Sunrise. A new tile sits among generic tiles on the TV's home screen, and winks | A |
| S31 | V08 "Can I delete it?" | Switch drags the tile toward a trash can | A |
| S32 | "You can hide it!" | The trash can turns into a box labelled "HIDE" | A |
| S33 | V09 "Is that the same?" | Switch lifts the lid; the tile is inside, waving | A |
| S34 | "…Next verse!" | The Narrator yanks down a pull-down screen; whip transition | A, E |

### Pre-chorus 2 and Chorus 2

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S35 | V10 "I've only got two sides…" | S09–S10 staging with a dimmer spotlight; the grey hand is already waiting at the frame edge | A |
| S36 | [click] | The hand flips him up faster than before | A, E |
| S37 | Chorus 2, first three lines | S13–S15 layouts with new gags: the answer box in a lunchbox, the mute bar sliding off, a sleeping bag instead of a blanket | A |
| S38 | "But the switch is just a picture…" | The sticker reveal again; this time Switch peels himself off before anyone else can, and sighs | A |
| S39 | V11 "(On, on, on…)" | Switch echoes, more tired | A |

### Verse 3: Pop Quiz

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S40 | "Pop quiz!" | Game-show set with flashing bulbs and a "POP QUIZ!" sign; Switch at a contestant podium with a buzzer | A, E |
| S41 | "There's a blue ring in the chat app…" | A generic chat thread with "Mom" and "Dad" bubbles; a plain glowing ring floats in and parks at the bottom | A |
| S42 | V12 "I'll uninstall it!" / "Nope!" | Wrong-answer honk, big red X | A, E |
| S43 | V13 "I'll mute it, then?" / "That's not so bad!" | Half-credit chime; the ring puts on earmuffs and stays put | A, E |
| S44 | "Now your phone has got an update…" | A phone screen with one enormous button, "Continue," and nothing else | A |
| S45 | V14 "Where's the 'No'?" / "There isn't one!…" | Switch searches the phone's edges with a magnifying glass. Pull back to a row of phones: on some of them, a setting slides to ON by itself. Caption: "Some iPhones, iOS 18.3.2, March 2025" | A |
| S46 | "In Australia, office software went up forty-five percent…" | A map card of Australia; a price tag inflates like a balloon to "+45%". Caption: "Microsoft 365 Personal. Alleged by Australia's ACCC." | A |
| S47 | V15 "Was there one without the robot?" / "Only once you tried to leave!" | Switch walks toward a door marked "CANCEL"; a cheaper price tag peeks out from behind it, then the door slams | A, E |

### Bridge

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S48 | "Now the school's the place for learning…" | A one-room schoolhouse at dusk, slow pan, Rhodes-only | A |
| S49 | "So the school said, 'No AI, please'…" | A teacher's desk with a polite handwritten note on it | A |
| S50 | "And the giant said, 'We hear you!'…" | A giant pinstriped cuff (not the grey sleeve) slides a contract across the desk | A |
| S51 | "Take the robot with your search, or else there's no search there!" | The contract has two boxes, "Search + AI" and "No search" | A |
| S52 | [record scratch, tape rewind] | The film burns from the centre, the frame jitters, and the shot rewinds at speed to S50 | A, E |
| S53 | "Correction, boys and girls!…" ("Ahem!" isn't sung) | The Narrator redubs with mouth shapes visibly out of sync; a "CORRECTION" slate. The contract now has a third box | A |
| S54 | V16 "And the answer box on top?" | Tilt up: the answer box is bolted to the top of the frame, unchanged through the rewind | A |
| S55 | "…That one's 'deeply integrated.'" | The bolts tighten themselves; a small label plate reads "deeply integrated" | A, E |
| S56 | V17 "What's that mean?" / "It means it stays." | Switch looks up at the Narrator; the Narrator looks away | A |

### Final chorus

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S57 | Final chorus, through the second-to-last line | A classroom of cartoon kids, each with a little toggle on the desk; the toggles flick ON in rhythm. Bubble-letter lyrics with a bouncing ball. Switch in the front row, mouthing along | A |
| S58 | Last "Default on!" | Pull back: the classroom is on the TV from S29, with the winking tile from S30 | A |

### Outro and reveal

| ID | Cue | Picture | Source |
| --- | --- | --- | --- |
| S59 | V18 "I've got two sides." | Switch alone on a black wall under a spotlight | A |
| S60 | [click] [click] [click] | He flips himself off three times and springs back on each time. On the third, the grey hand enters to flip him back… | A, E |
| S61 | "…Guess one of 'em was just for show." | …and stops mid-frame, hesitates, and withdraws. Switch is still ON, looking where it was | A |
| S62 | "And that's how an opt-out works! Join us next week…" | The Narrator wraps up; an end slate starts to slide in | A |
| S63 | [pop-up chime] / "Who asked for that?" ("Huh." isn't sung) | A "Summary of this song" box pops up over everything; its close button runs from the cursor | A, E |
| S64 | V19 "Hey, who wrote this song, anyway?" | Switch shoves the summary box out of frame | A |
| S65 | "An AI did." | Film layer drops to zero. Real screen capture of the generation screen: style prompt, lyrics, take list | R |
| S66 | "…But somebody asked it to." | Split frame. Left: the generation screen. Right: the editing timeline with the Switch track labelled "Switch: recorded at home," its waveform playing | R |
| S67 | V21 "Hey… was its switch on, too?" over the band's last bars, then the audio ends (the band plays to the end of the file; there is no silence after the last word) | Real close-up of a light switch on a plain wall. On V21, a small hand reaches in and waits; on the band's last note it flips the switch OFF. It stays off. Hold two seconds on room tone after the audio ends, then cut to fact card G | H |

### End card and fact cards

- **End card:** lyrics drafted by Claude (Anthropic) and audited by another lab's model; music by the generator, with take ID; Narrator generated; Switch voiced by a real kid; animation by Claude Code; the human chose, edited and fact-checked every claim, with audits by Gemini, ChatGPT and Copilot; the count of human interventions, with a link to the log.
- **Fact cards:** card G (who wrote this, and Anthropic's own default-on toggle) first, answering V21; then one per row of the Default On fact card, in that order, about four seconds each, in plain type with the source under each. Allegations say so.

**Thumbnail:** Switch mid-flip with the grey hand reaching in. Never the real hand, the generation screen or the timeline, which would spoil the reveal.

**Vertical cut:** S09–S17 (pre-chorus and chorus 1), ending on the sticker reveal, with a "Full video" card.

## Inputs, pipeline and order of work

**Animation runs in parallel with the recordings: M1****–M5 need only the master and stems, and Switch's takes join at M6.**

**Inputs the human supplies**

- The locked master and its stems (Narrator vocal, instrumental, and any others the generator gave), with the take ID, prompt and settings.
- A screen capture of the generation screen showing the style prompt, lyrics and take list (for S65–S66).
- Switch's takes V01–V19 and V21, the 20 real-switch clicks and 10 seconds of room tone (see the recording plan).
- About ten seconds of real footage for S67: a close-up of a small hand flipping a light switch off, shot tight on plain wall, phone held still, 4K if possible.
- The Default On doc (lyrics, fact card) and this brief.

**Pipeline**

1. **Audio.** Draft: the generated mix as is, for animation until the recordings are in. Final: the human mixes the stems, the Switch comp and the real clicks (M1 gate), with the generated Switch muted on both vocal stems over the timing map's mute spans. Master to −14 LUFS integrated.
2. **Timing map.** Build `timing/map.json` from the master: section boundaries, every Narrator line's start and end, the beat grid, and a named slot for each Switch line (V01–V19) where the generated vocal left space, plus V21 over the band's tail after the last Narrator line.
3. **Graphics.** One Remotion project, one composition per section, sharing the theme and film-layer modules. Characters are SVG rigs; mouth shapes come from the Narrator stem and the Switch comp.
4. **Review aids.** For every render, write a contact sheet to `review/<shot>.jpg`.

**Layout**

```
default-on/
  audio/  audio/switch_raw/ (private)  timing/  assets/real/
  remotion/  renders/  review/  edit/  log/
```

**Milestones**

| # | Milestone | Gate (human) |
| --- | --- | --- |
| M1 | Transcribe the master, diff against Draft 2, and build the timing map with the twenty Switch slots | Confirm the lyrics and slot times |
| M2 | Look: Switch and Narrator rigs, palette, film layer, and a style board of five key frames (S04, S16, S28, S53, S61) | Approve the look |
| M3 | Animatic of every shot at low resolution, cut to the track. Switch's slots show the line as a text slate | Approve framing and timing |
| M4 | Final renders, section by section, with Narrator lip sync and contact sheets | Approve each section |
| M5 | Fact cards, end card, captions, thumbnail and vertical cut | Approve the closing materials |
| M6 | Switch comp: align and process the takes into their slots, log every choice, then lip-sync his shots. The human supplies the final mix | Approve the comp by ear |
| M7 | Reveal: S59–S67 checked frame by frame against the final mix, including the real footage. Also listen through the whole song for melodic similarity to any known children's TV theme | Approve the reveal |
| M8 | Fact check of every on-screen claim by another lab's model against the Default On fact card | Resolve every flag before release |

**Done when**

- Every shot S01–S67 is rendered and matches its cue in the timing map.
- Every Switch line in the final mix is the child's voice, and every take and edit is logged.
- No face, name or identifying room detail of the child appears anywhere, including the thumbnail.
- Captions match the master as sung, including any words he changed.
- The M8 audit is logged and every flag resolved.
