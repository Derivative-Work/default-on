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
const Digit: React.FC<{ x: number; y: number; deg: number; len: number; w: number; fill: string; nail?: boolean }> = ({ x, y, deg, len, w, fill, nail }) => (
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

export const Hand4: React.FC<{ pose?: HandPose; side?: -1 | 1; s?: number; fill?: string }> = ({ pose = "rest", side = 1, s = 1, fill = C.skin }) => {
  const w = 15; // finger width
  const palm = <path d="M-24,0 Q-27,30 -22,46 Q0,54 22,46 Q27,30 24,0 Q0,-6 -24,0 Z" fill={fill} stroke={C.ink} strokeWidth={lw(4.5)} strokeLinejoin="round" />;
  let fingers: React.ReactNode;
  let thumb: React.ReactNode;
  if (pose === "open") {
    fingers = <>{[[-15, 18], [0, 2], [15, -14]].map(([x, d], i) => <Digit key={i} x={x} y={42} deg={d} len={40 - Math.abs(i - 1) * 4} w={w} fill={fill} nail />)}</>;
    thumb = <Digit x={-20} y={16} deg={62} len={30} w={w + 1} fill={fill} nail />;
  } else if (pose === "point") {
    fingers = <>
      {[[2, 52], [16, 50]].map(([x, y], i) => <Knuckle key={i} x={x} y={y} w={w} fill={fill} />)}
      <Digit x={-13} y={42} deg={4} len={54} w={w} fill={fill} nail />
    </>;
    thumb = <Digit x={-18} y={20} deg={-30} len={30} w={w + 1} fill={fill} nail />;
  } else if (pose === "fist") {
    fingers = <>{[-14, 0, 14].map((x, i) => <Knuckle key={i} x={x} y={50 - (i === 1 ? 2 : 0)} w={w} fill={fill} />)}</>;
    thumb = <Digit x={-20} y={22} deg={-62} len={30} w={w + 1} fill={fill} nail />;
  } else {
    fingers = <>{[[-14, 3], [0, 0], [14, -3]].map(([x, d], i) => <Digit key={i} x={x} y={42} deg={d} len={30 - Math.abs(i - 1) * 4} w={w} fill={fill} />)}</>;
    thumb = <Digit x={-21} y={14} deg={28} len={28} w={w + 1} fill={fill} nail />;
  }
  return (
    <g transform={`scale(${side * s}, ${s})`}>
      {pose === "point" || pose === "fist" ? <>{palm}{fingers}{thumb}</> : <>{fingers}{palm}{thumb}</>}
    </g>
  );
};
