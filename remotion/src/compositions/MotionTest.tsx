// M2 motion test: S04 at its place in the song, with the mix, under the film layer (grain, weave, dust and the
// splice flash at its head, as if it opened a section), so the look can be judged moving.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { Film } from "../film/Film";
import { S04 } from "../scenes/KeyFrames";
import { PREROLL, shot, shotRange } from "../timing";
import { useCurrentFrame } from "remotion";

const [A, B] = shotRange("S04");
export const MOTION_TEST = { from: A, frames: B - A };

const Local: React.FC = () => <S04 f={useCurrentFrame()} />;

export const MotionTest: React.FC = () => (
  <Film splices={[0]}>
    <Local />
    <Sequence from={0}>
      <Audio src={staticFile("track.wav")} startFrom={A - Math.round(PREROLL * 30)} />
    </Sequence>
  </Film>
);
export { shot };
