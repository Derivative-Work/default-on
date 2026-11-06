// The off-screen hand: only a grey cuff and fingers, entering from the frame edge; the same sleeve every time, no
// face ever attached (brief, Characters). Drawn pointing along +x from the sleeve's open end at the origin, so a shot
// places it at the frame edge and rotates it in. `reach` 0 = all the way off, 1 = the fingertip at `length`.
import React from "react";
import { C } from "../theme/palette";

export const Hand: React.FC<{ reach?: number; length?: number; curl?: number }> = ({ reach = 1, length = 620, curl = 0 }) => {
  const x = -length * (1 - reach); // the whole arm slides along its axis
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* the sleeve, long enough to reach past any frame edge */}
      <path d={`M-1400,-62 L${length - 210},-58 Q${length - 196},0 ${length - 210},58 L-1400,62 Z`} fill={C.sleeve} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M-1400,-30 L${length - 260},-28`} stroke={C.sleeveShade} strokeWidth={8} opacity={0.6} />
      {/* cuff */}
      <rect x={length - 236} y={-66} width={44} height={132} rx={10} fill={C.sleeveShade} stroke={C.ink} strokeWidth={7} />
      <circle cx={length - 214} cy={30} r={7} fill={C.creamShade} stroke={C.ink} strokeWidth={3} />
      {/* hand: a back of the hand, three tucked fingers, an extended index finger and a thumb */}
      <g transform={`translate(${length - 192}, 0)`}>
        <path d="M0,-46 Q60,-54 96,-30 Q110,0 96,30 Q60,52 0,44 Z" fill={C.skin} stroke={C.ink} strokeWidth={7} strokeLinejoin="round" />
        {/* three curled fingers: rounded knuckle lobes under the index */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={74 - i * 4} y={-12 + i * 18} width={44 - curl * 12} height={20} rx={10} fill={C.skin} stroke={C.ink} strokeWidth={6} />
        ))}
        <path d={`M92,-30 L${190 - curl * 70},${-28 + curl * 30}`} stroke={C.ink} strokeWidth={34} strokeLinecap="round" />
        <path d={`M92,-30 L${190 - curl * 70},${-28 + curl * 30}`} stroke={C.skin} strokeWidth={22} strokeLinecap="round" />
        <path d="M30,-44 Q56,-82 86,-74" fill="none" stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
        <path d="M30,-44 Q56,-82 86,-74" fill="none" stroke={C.skin} strokeWidth={15} strokeLinecap="round" />
      </g>
    </g>
  );
};
