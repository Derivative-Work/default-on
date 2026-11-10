// The whole video as one cut: whichever shot the timing map puts on screen at this frame, under the film layer, with
// the mix on the map's clock. `from` offsets the composition (a section starts mid-cut). The film layer splices at
// every section's first frame and goes to 0 from S65, where the real-world material begins (brief, Film layer).
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import * as Intro from "../shots/Intro";
import * as Chorus from "../shots/Chorus";
import * as Lesson from "../shots/Lesson";
import * as Quiz from "../shots/Quiz";
import * as End from "../shots/End";
import * as Cards from "../shots/Cards";
import { ShotC } from "../shots/common";
import { END, FPS, at, credits, lines, sections, shot, shots } from "../timing";
import { BallLyric } from "../components/kit";
import { C, H, W } from "../theme/palette";

const ALL = { ...Intro, ...Chorus, ...Lesson, ...Quiz, ...End, ...Cards } as Record<string, unknown>;
export const SHOTS: Record<string, ShotC> = Object.fromEntries(shots.map((s) => {
  const c = ALL[s.id];
  if (typeof c !== "function") throw new Error(`no component for ${s.id}`);
  return [s.id, c as ShotC];
}));

const SPLICES = sections.slice(1).map((s) => s.frame_start);
const REAL = shot("S65").frame;
const AUDIO = at(0); // the frame the audio starts on (after the pre-roll)
const creditsGain = (g: number) => interpolate(g, [END - credits.fade_s * FPS, END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Switch's sung lines get bouncing-ball karaoke (the human's note, 2026-11-10: his singing, not his spoken lines;
// the brief's recording plan marks which are sung), in his teal against the Narrator's orange, over whatever shot is
// on: shown from a few frames before his first word to a beat after his last. Above the citation caption where a shot
// carries one (only S07 meets one), otherwise at the chorus lyrics' height. Not in the real material (S65 on).
const SUNG = ["L06", "L08", "L09", "L14a", "L16", "L32", "L33", "L38a", "L66", "L67"];
const CITED = new Set(["S05", "S06", "S07", "S08"]);
const SwitchKaraoke: React.FC<{ g: number; shotId: string }> = ({ g, shotId }) => {
  const l = lines.find((x) => SUNG.includes(x.id) && g >= x.frame_start - 8 && g < x.frame_end + 12);
  if (!l || g >= REAL) return null;
  const syl = l.words.map((w) => ({ t: w.w + " ", at: at(w.start) }));
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
      <BallLyric f={g} syl={syl} y={CITED.has(shotId) ? 880 : 1010} size={64} color={C.cream} hot={C.teal} />
    </svg>
  );
};

export const ShotAt: React.FC<{ g: number }> = ({ g }) => {
  const s = [...shots].reverse().find((x) => g >= x.frame) ?? shots[0];
  const Shot = SHOTS[s.id];
  return <><Shot f={g - s.frame} g={g} len={s.end - s.frame} /><SwitchKaraoke g={g} shotId={s.id} /></>;
};

export const Cut: React.FC<{ from?: number }> = ({ from = 0 }) => {
  const g = useCurrentFrame() + from;
  return (
    <AbsoluteFill>
      <Film strength={g >= REAL ? 0 : 1} splices={SPLICES.map((x) => x - from)}>
        <ShotAt g={g} />
      </Film>
      {from <= AUDIO
        ? <Sequence from={AUDIO - from}><Audio src={staticFile("track.wav")} /></Sequence>
        : <Audio src={staticFile("track.wav")} startFrom={from - AUDIO} />}
      {/* the credits music (the human's): from its start on fact card G, faded out over the video's last seconds */}
      {from <= credits.frame
        ? <Sequence from={credits.frame - from}><Audio src={staticFile("credits.wav")} volume={(f) => creditsGain(f + credits.frame)} /></Sequence>
        : <Audio src={staticFile("credits.wav")} startFrom={from - credits.frame} volume={(f) => creditsGain(f + from)} />}
    </AbsoluteFill>
  );
};
