// The whole video as one cut: whichever shot the timing map puts on screen at this frame, under the film layer, with
// the mix on the map's clock. `from` offsets the composition (a section starts mid-cut). The film layer splices at
// every section's first frame and goes to 0 from S65, where the real-world material begins (brief, Film layer).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import * as Intro from "../shots/Intro";
import * as Chorus from "../shots/Chorus";
import * as Lesson from "../shots/Lesson";
import * as Quiz from "../shots/Quiz";
import * as End from "../shots/End";
import { ShotC } from "../shots/common";
import { at, sections, shot, shots } from "../timing";

const ALL = { ...Intro, ...Chorus, ...Lesson, ...Quiz, ...End } as Record<string, unknown>;
export const SHOTS: Record<string, ShotC> = Object.fromEntries(shots.map((s) => {
  const c = ALL[s.id];
  if (typeof c !== "function") throw new Error(`no component for ${s.id}`);
  return [s.id, c as ShotC];
}));

const SPLICES = sections.slice(1).map((s) => s.frame_start);
const REAL = shot("S65").frame;
const AUDIO = at(0); // the frame the audio starts on (after the pre-roll)

export const ShotAt: React.FC<{ g: number }> = ({ g }) => {
  const s = [...shots].reverse().find((x) => g >= x.frame) ?? shots[0];
  const C = SHOTS[s.id];
  return <C f={g - s.frame} g={g} len={s.end - s.frame} />;
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
    </AbsoluteFill>
  );
};
