// The off-screen hand: only a grey cuff and fingers, entering from the frame edge; the same sleeve every time, no
// face ever attached (brief, Characters). Drawn pointing along +x; the fingertip of the extended index finger is at
// (length, TIP_Y) when `reach` is 1, so a shot puts the hand's origin at the frame edge and sets `length` to reach
// its target. `reach` 0 = all the way off. `press` 0..1 bends the index finger a little as it pushes.
// Redrawn 2026-11-06 (the human's note: "the finger that turns the switch is not reading right"): one hand shape with
// three curled knuckles, a thumb along them, and an extended index finger with a nail.
import React from "react";
import { C, PEN, lw } from "../theme/palette";

export const TIP_Y = -24; // the fingertip's height relative to the sleeve's axis

const Skin: React.FC<{ d: string }> = ({ d }) => (
  <path d={d} fill={C.skin} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
);

const Sleeve: React.FC<{ end: number; color?: string; shade?: string }> = ({ end, color = C.sleeve, shade = C.sleeveShade }) => (
  <g>
    {/* the sleeve, long enough to reach past any frame edge, with folds; then the cuff and its button */}
    <path d={`M-1400,-62 L${end},-58 Q${end + 14},0 ${end},58 L-1400,62 Z`} fill={color} stroke={C.ink} strokeWidth={lw(8)} strokeLinejoin="round" />
    <path d={`M-1400,-30 L${end - 50},-28`} stroke={shade} strokeWidth={8} opacity={0.6} />
    {[0.25, 0.5, 0.75].map((k) => <path key={k} d={`M${-1400 + (end + 1400) * k},-56 q-14,40 6,108`} {...PEN} opacity={0.7} />)}
    <rect x={end - 26} y={-66} width={44} height={132} rx={10} fill={shade} stroke={C.ink} strokeWidth={lw(7)} />
    <circle cx={end - 4} cy={30} r={7} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(3)} />
    <path d={`M${end - 20},-60 V60 M${end + 12},-60 V60`} {...PEN} strokeDasharray="4 5" />
  </g>
);

// `sleeve` is for anyone else's hand (S19's cookie): the off-screen hand is always the grey one
export const Hand: React.FC<{ reach?: number; length?: number; curl?: number; press?: number; sleeve?: [string, string] }> = ({ reach = 1, length = 620, curl = 0, press = 0, sleeve }) => {
  const x = -length * (1 - reach); // the whole arm slides along its axis
  const hx = length - 204; // the hand's own origin, so the fingertip lands at (length, TIP_Y)
  const bend = curl * 40 + press * 14; // degrees the index finger folds down at its base
  return (
    <g transform={`translate(${x}, 0)`}>
      <Sleeve end={hx - 14} color={sleeve?.[0]} shade={sleeve?.[1]} />
      <g transform={`translate(${hx}, 0)`}>
        {/* the hand: back of the hand, three curled fingers as knuckle bumps underneath */}
        <Skin d="M0,-44 Q50,-50 88,-38 L92,-12 Q122,-14 124,4 Q126,18 110,20 Q124,24 120,36 Q114,48 98,42 Q104,56 88,58 Q70,60 60,48 Q30,56 0,46 Z" />
        <path d="M112,6 q6,4 4,10 M104,34 q6,4 2,9" {...PEN} />
        {/* the extended index finger, with a nail, folding at its base */}
        <g transform={`rotate(${bend}, 90, -24)`}>
          <Skin d="M84,-38 L194,-36 Q214,-24 194,-12 L86,-12 Z" />
          <path d="M182,-35 q12,1 12,10 q-9,4 -15,0 Z" fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />
          <path d="M140,-36 q-4,12 0,24 M150,-36 q-4,12 0,24" {...PEN} />
        </g>
        {/* the thumb, lying along the curled fingers */}
        <Skin d="M28,2 Q70,-10 108,-4 Q118,4 106,12 Q68,16 30,18 Z" />
        <path d="M96,-6 q8,8 2,16" {...PEN} />
        <path d="M18,-24 q24,8 46,0" {...PEN} opacity={0.6} />
      </g>
    </g>
  );
};

// A hand holding a pencil, for drawing (S18): the pencil's tip is at the origin, the pencil runs down and to the right
// at `angle` degrees, pinched between thumb and index; the fist and the grey sleeve continue past the frame edge.
export const PencilHand: React.FC<{ angle?: number }> = ({ angle = 50 }) => (
  <g transform={`rotate(${angle})`}>
    {/* the sleeve and cuff, along the pencil's axis, well behind the grip */}
    <g transform="translate(330, 34)">
      <path d="M0,-62 L1400,-62 L1400,62 L0,58 Q-14,0 0,-62 Z" fill={C.sleeve} stroke={C.ink} strokeWidth={lw(8)} strokeLinejoin="round" />
      {[160, 420].map((k) => <path key={k} d={`M${k},-56 q-14,40 6,108`} {...PEN} opacity={0.7} />)}
      <rect x={-18} y={-66} width={44} height={132} rx={10} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(7)} />
    </g>
    {/* the pencil: graphite tip, sharpened wood, a hexagonal yellow barrel, a ferrule and an eraser */}
    <path d="M0,0 L26,-7 L26,7 Z" fill={C.ink} />
    <path d="M26,-7 L60,-13 L60,13 L26,7 Z" fill="#e8c9a0" stroke={C.ink} strokeWidth={lw(3)} strokeLinejoin="round" />
    <rect x={60} y={-13} width={300} height={26} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
    <line x1={60} y1={-4} x2={360} y2={-4} {...PEN} opacity={0.5} />
    <line x1={60} y1={5} x2={360} y2={5} {...PEN} opacity={0.5} />
    {/* the grip: index finger on top of the pencil, thumb under it, the other fingers curled below */}
    <g transform="translate(150, 0)">
      <Skin d="M70,-20 Q120,-60 200,-44 Q250,-30 250,10 Q250,60 200,74 Q140,86 96,62 Q70,48 60,22 Z" />
      <path d="M150,58 q8,8 4,16 M180,52 q8,8 4,16 M206,40 q8,8 4,14" {...PEN} />
      <Skin d="M0,-26 Q50,-34 110,-30 Q130,-22 116,-12 L10,-12 Q-6,-18 0,-26 Z" />
      <path d="M2,-24 q10,-2 12,6 q-8,4 -12,0 Z" fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />
      <path d="M60,-30 q-3,9 0,18" {...PEN} />
      <Skin d="M30,14 Q70,8 120,16 Q132,26 118,34 L40,32 Q22,26 30,14 Z" />
    </g>
  </g>
);
