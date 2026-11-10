// One cartoon hand for every character (the human's note, 2026-11-09: a separated index finger read wrong next to
// hands whose other fingers were a single blob, and some hands had no fingers at all). The classic cartoon count, a
// thumb and three fingers, each digit its own outlined shape, so a pose only moves whole fingers:
//   "rest"  fingers together and slightly curled, each finger still drawn separately; the thumb along the side
//   "open"  fingers spread, the explaining palm
//   "point" the first finger straight out, the other two curled into the palm as separate knuckles, the thumb over them
//   "fist"  all three curled, knuckles in a row, the thumb across
// Drawn from the wrist at the origin, the hand hanging along +y; `side` -1 mirrors it (the thumb toward the body);
// `s` scales (1 is about 100 units from wrist to fingertip).
import React from "react";
import { C, lw } from "../theme/palette";

export type HandPose = "rest" | "open" | "point" | "fist";

// a finger: a capsule from (x, y) at `deg` from straight down, `len` long and `w` wide, rounded at the tip
export const Digit: React.FC<{ x: number; y: number; deg: number; len: number; w: number; fill: string; nail?: boolean }> = ({ x, y, deg, len, w, fill, nail }) => (
  <g transform={`translate(${x}, ${y}) rotate(${-deg})`}>
    <rect x={-w / 2} y={-w / 2} width={w} height={len + w / 2} rx={w / 2} fill={fill} stroke={C.ink} strokeWidth={lw(4)} />
    <path d={`M${-w * 0.3},${len * 0.45} q${w * 0.3},${w * 0.18} ${w * 0.6},0`} fill="none" stroke={C.ink} strokeWidth={lw(2)} opacity={0.5} />
    {nail && <path d={`M${-w * 0.26},${len - w * 0.1} q${w * 0.26},${w * 0.34} ${w * 0.52},0`} fill="none" stroke={C.ink} strokeWidth={lw(2)} opacity={0.6} />}
  </g>
);

// a curled finger seen from the back of the hand: a rounded knuckle with the fingertip tucked under
const Knuckle: React.FC<{ x: number; y: number; w: number; fill: string }> = ({ x, y, w, fill }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x={-w / 2} y={-w * 0.55} width={w} height={w * 1.25} rx={w / 2} fill={fill} stroke={C.ink} strokeWidth={lw(4)} />
    <path d={`M${-w * 0.28},${w * 0.25} q${w * 0.28},${w * 0.2} ${w * 0.56},0`} fill="none" stroke={C.ink} strokeWidth={lw(2)} opacity={0.55} />
  </g>
);

export const Hand4: React.FC<{ pose?: HandPose; side?: -1 | 1; s?: number; fill?: string; thumb?: boolean }> = ({ pose = "rest", side = 1, s = 1, fill = C.skin, thumb = true }) => {
  // (the human's note, 2026-11-09, round 5: the hands still read wrong) Built back to front so every digit grows out
  // from under the palm: the thumb and straight fingers sit behind it, their bases hidden; curled fingers and a
  // folded thumb sit on top of it. A positive `deg` turns a digit toward +x, so the thumb (on the -x side) points
  // out with a negative angle and only folds across the hand (positive) in the point and the fist.
  const w = 16; // finger width
  const palm = <path d="M-18,0 Q-26,14 -25,32 Q-22,42 0,43 Q22,42 25,32 Q26,14 18,0 Z" fill={fill} stroke={C.ink} strokeWidth={lw(4.5)} strokeLinejoin="round" />;
  const knuckles = (y: number, xs: number[]) => xs.map((x, i) => <Knuckle key={i} x={x} y={y} w={w} fill={fill} />);
  let back: React.ReactNode = null, front: React.ReactNode = null;
  if (pose === "open") {
    back = <>
      {thumb && <Digit x={-19} y={16} deg={-56} len={32} w={w + 1} fill={fill} nail />}
      {[[-15, -15, 42], [0, 0, 48], [15, 14, 42]].map(([x, d, l], i) => <Digit key={i} x={x} y={30} deg={d} len={l} w={w} fill={fill} nail />)}
    </>;
  } else if (pose === "point") {
    back = <Digit x={-16} y={30} deg={0} len={56} w={w} fill={fill} nail />;
    front = <>
      {knuckles(40, [0, 16])}
      <Digit x={-19} y={26} deg={68} len={28} w={w + 1} fill={fill} nail />
    </>;
  } else if (pose === "fist") {
    front = <>
      {knuckles(40, [-16, 0, 16])}
      <Digit x={-21} y={26} deg={68} len={30} w={w + 1} fill={fill} nail />
    </>;
  } else {
    back = <>
      {thumb && <Digit x={-20} y={16} deg={-36} len={30} w={w + 1} fill={fill} nail />}
      {[[-16, 4, 38], [0, 2, 42], [16, 0, 37]].map(([x, d, l], i) => <Digit key={i} x={x} y={30} deg={d} len={l} w={w} fill={fill} nail />)}
    </>;
  }
  return (
    <g transform={`scale(${side * s}, ${s})`}>
      {back}{palm}{front}
    </g>
  );
};
