// Switch: a cream flat-plate (rocker) wall switch with big round eyes, stubby arms and no legs (brief, Characters;
// a flat paddle, not a lever, at the human's request on 2026-11-06). The paddle sits flush in the middle of the plate
// and rocks: top pressed in = ON, bottom pressed in = OFF; a small pilot light at its top glows when ON. A cutout rig:
// the pose sets eyes, brows and arm angles; `toggle` (0 OFF .. 1 ON) and `mouth` are driven separately so the click
// and the lip sync move on their own. Drawn around the plate's centre, 250 x 390 units.
import React from "react";
import { Hand4 } from "./Hand4";
import { C, PEN, lw } from "../theme/palette";
import { Mouth, MouthShape } from "./Mouth";

export type SwitchPose = "neutral" | "curious" | "proud" | "sad" | "startled" | "relaxed";

type PoseSpec = {
  lid: number; // upper eyelid: 0 open .. 1 shut
  lower: number; // lower lid (a squint or a smile)
  brow: number; // brow tilt: + worried (inner ends up), - cross
  browY: number; // brow height: + raised
  eyeScale: number;
  armL: number; // arm angles, degrees from hanging straight down (+ = raised outward)
  armR: number;
  smile: number;
};

const POSES: Record<SwitchPose, PoseSpec> = {
  neutral: { lid: 0.12, lower: 0, brow: 0, browY: 0, eyeScale: 1, armL: 20, armR: 20, smile: 0.5 },
  curious: { lid: 0.05, lower: 0, brow: -6, browY: 8, eyeScale: 1.05, armL: 25, armR: 70, smile: 0.1 },
  proud: { lid: 0.3, lower: 0.25, brow: 0, browY: 6, eyeScale: 1, armL: 110, armR: 110, smile: 1 },
  sad: { lid: 0.45, lower: 0, brow: 16, browY: -2, eyeScale: 0.95, armL: 8, armR: 8, smile: -0.8 },
  startled: { lid: 0, lower: 0, brow: 8, browY: 18, eyeScale: 1.18, armL: 135, armR: 135, smile: -0.2 },
  relaxed: { lid: 0.62, lower: 0.1, brow: 2, browY: -2, eyeScale: 1, armL: 12, armR: 12, smile: 0.6 },
};

export const PLATE = { w: 250, h: 390 };
// where a fingertip meets the paddle, relative to the plate's centre: the middle of each half
export const PADDLE = { top: { x: 0, y: 14 - 34 }, bottom: { x: 0, y: 14 + 34 } };
const PRESSED = "#c4ab7c"; // the pressed half of the paddle, in shadow

const Arm: React.FC<{ side: -1 | 1; angle: number; wave?: number }> = ({ side, angle, wave = 0 }) => {
  // shoulder at the plate's edge, mid-height; a short bent tube and a round mitten
  const a = (side * (angle + wave) * Math.PI) / 180;
  const len = 92;
  const ex = Math.sin(a) * len * 0.55, ey = Math.cos(a) * len * 0.55;
  const hx = Math.sin(a * 1.15) * len, hy = Math.cos(a * 1.15) * len;
  return (
    <g transform={`translate(${side * (PLATE.w / 2 - 6)}, 20)`}>
      <path d={`M0,0 Q${ex + side * 10},${ey} ${hx},${hy}`} fill="none" stroke={C.ink} strokeWidth={21} strokeLinecap="round" />
      <path d={`M0,0 Q${ex + side * 10},${ey} ${hx},${hy}`} fill="none" stroke={C.cream} strokeWidth={16} strokeLinecap="round" />
      {/* a little four-fingered glove (the human's note: no fingerless balls) */}
      <g transform={`translate(${hx}, ${hy}) rotate(${(-a * 1.15 * 180) / Math.PI})`}><Hand4 pose="rest" side={side === 1 ? -1 : 1} s={0.46} fill={C.cream} /></g>
    </g>
  );
};

const Eye: React.FC<{ x: number; spec: PoseSpec; look: [number, number]; blink: number; side: -1 | 1 }> = ({
  x, spec, look, blink, side,
}) => {
  const r = 46 * spec.eyeScale;
  const lid = Math.min(1, spec.lid + blink * (1 - spec.lid));
  const [lx, ly] = look;
  const clip = `eye${React.useId().replace(/:/g, "")}`;
  return (
    <g transform={`translate(${x}, -108)`}>
      <clipPath id={clip}><circle r={r} /></clipPath>
      <circle r={r} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
      <g clipPath={`url(#${clip})`}>
        <circle cx={lx * r * 0.42} cy={ly * r * 0.42} r={r * 0.42} fill={C.ink} />
        <circle cx={lx * r * 0.42 + r * 0.14} cy={ly * r * 0.42 - r * 0.16} r={r * 0.12} fill={C.white} />
        {/* upper lid, a cream curtain from the top */}
        <rect x={-r - 2} y={-r - 2} width={2 * r + 4} height={(2 * r + 4) * lid} fill={C.cream} />
        {lid > 0.02 && lid < 0.9 && <line x1={-r} x2={r} y1={-r - 2 + (2 * r + 4) * lid} y2={-r - 2 + (2 * r + 4) * lid} stroke={C.ink} strokeWidth={lw(5)} />}
        {spec.lower > 0 && <rect x={-r} y={r - 2 * r * spec.lower} width={2 * r} height={2 * r} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} />}
      </g>
      <circle r={r} fill="none" stroke={C.ink} strokeWidth={lw(6)} />
      {/* shut: a curved lid line with three lashes */}
      {lid >= 0.9 && (
        <g stroke={C.ink} strokeWidth={lw(6)} strokeLinecap="round" fill="none">
          <path d={`M${-r * 0.8},${r * 0.05} Q0,${r * 0.45} ${r * 0.8},${r * 0.05}`} />
          {[-0.45, 0, 0.45].map((k) => <path key={k} d={`M${k * r},${r * 0.27 - Math.abs(k) * r * 0.1} l${k * 10},${r * 0.2}`} />)}
        </g>
      )}
      {/* brow */}
      <path d={`M${-r * 0.75},0 Q0,-8 ${r * 0.75},0`} fill="none" stroke={C.ink} strokeWidth={lw(7)} strokeLinecap="round"
        transform={`translate(0, ${-r - 16 - spec.browY}) rotate(${side * spec.brow})`} />
    </g>
  );
};

export type SwitchProps = {
  pose?: SwitchPose;
  toggle?: number; // 0 OFF (bottom in) .. 1 ON (top in); defaults from the pose
  mouth?: MouthShape;
  blink?: number;
  look?: [number, number]; // pupils, -1..1 each way
  wave?: number; // degrees added to the right arm, for waving
  armL?: number; // override the pose's arm angles
  armR?: number;
  tilt?: number; // degrees; the redrawn, crooked Switch of S17
  arms?: boolean;
  outline?: number; // 0..1: how much of the outline is drawn (S16's pencil)
  flat?: boolean; // a sticker: no plate thickness or edge shadow (the peels, S16/S38/S57c)
};

export const Switch: React.FC<SwitchProps> = ({
  pose = "neutral", toggle, mouth = "X", blink = 0, look = [0, 0], wave = 0, armL, armR, tilt = 0, arms = true, flat = false,
}) => {
  const spec = POSES[pose];
  const on = toggle ?? (pose === "relaxed" || pose === "sad" ? 0 : 1);
  // the paddle reads as it looks: ON shows the top half raised and lit, the bottom pressed in (the human's note,
  // 2026-11-06: the first version read backwards); `rock` is the pressed half: +1 bottom pressed (ON), -1 top (OFF)
  const rock = (on - 0.5) * 2;
  return (
    <g transform={`rotate(${tilt})`}>
      {arms && <Arm side={-1} angle={armL ?? spec.armL} />}
      {arms && <Arm side={1} angle={armR ?? spec.armR} wave={wave} />}
      {/* plate: a soft-cornered rectangle with a bevel */}
      {!flat && (<>
      {/* the plate's thickness: a hatched edge to the right and below, like a raised plate on the wall */}
      <path d={`M${PLATE.w / 2 - 20},${-PLATE.h / 2 + 8} Q${PLATE.w / 2 + 14},${-PLATE.h / 2 + 4} ${PLATE.w / 2 + 12},${-PLATE.h / 2 + 40} L${PLATE.w / 2 + 12},${PLATE.h / 2 - 6} Q${PLATE.w / 2 + 10},${PLATE.h / 2 + 12} ${PLATE.w / 2 - 30},${PLATE.h / 2 + 12} L${-PLATE.w / 2 + 30},${PLATE.h / 2 + 12} Z`} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(6)} />
      <path d={`M${PLATE.w / 2 - 20},${-PLATE.h / 2 + 8} Q${PLATE.w / 2 + 14},${-PLATE.h / 2 + 4} ${PLATE.w / 2 + 12},${-PLATE.h / 2 + 40} L${PLATE.w / 2 + 12},${PLATE.h / 2 - 6} Q${PLATE.w / 2 + 10},${PLATE.h / 2 + 12} ${PLATE.w / 2 - 30},${PLATE.h / 2 + 12} L${-PLATE.w / 2 + 30},${PLATE.h / 2 + 12} Z`} fill="url(#pen-hatch)" />
      </>)}
      <rect x={-PLATE.w / 2} y={-PLATE.h / 2} width={PLATE.w} height={PLATE.h} rx={34} fill={C.cream} stroke={C.ink} strokeWidth={lw(8)} />
      {/* pen detail: a highlight along the bevel, two faint scuffs */}
      <path d={`M${-PLATE.w / 2 + 26},${-PLATE.h / 2 + 60} Q${-PLATE.w / 2 + 22},${-PLATE.h / 2 + 22} ${-PLATE.w / 2 + 62},${-PLATE.h / 2 + 20}`} stroke={C.white} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M78,90 l14,-6 M84,100 l10,-4 M-92,40 l10,6" {...PEN} opacity={0.5} />
      <rect x={-PLATE.w / 2 + 16} y={-PLATE.h / 2 + 16} width={PLATE.w - 32} height={PLATE.h - 32} rx={22} fill="none" stroke={C.creamShade} strokeWidth={6} />
      {/* screws */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(0, ${s * (PLATE.h / 2 - 24)})`}>
          <circle r={8} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(3.5)} />
          <path d="M-6,4 A8,8 0 0 0 6,4" {...PEN} />
          <line x1={-5} y1={-2} x2={5} y2={2} stroke={C.ink} strokeWidth={lw(3)} />
        </g>
      ))}
      <Eye x={-58} spec={spec} look={look} blink={blink} side={-1} />
      <Eye x={58} spec={spec} look={look} blink={blink} side={1} />
      {/* the rocker paddle: a flush rounded rectangle split at the pivot; the pressed half is shaded and sits
          in, the raised half is lit and shows a sliver of its side */}
      <g transform="translate(0, 14)">
        <rect x={-58} y={-70} width={116} height={140} rx={16} fill={PRESSED} stroke={C.ink} strokeWidth={lw(6)} />
        <path d={`M-48,-60 h96 v${60 + rock * 4} h-96 Z`} fill={rock > 0 ? C.white : PRESSED} />
        <path d={`M-48,${rock * 4} h96 v${60 - rock * 4} h-96 Z`} fill={rock > 0 ? PRESSED : C.white} />
        {/* the raised half's edge casts a little shadow onto the pressed half */}
        <rect x={-48} y={rock > 0 ? rock * 4 : rock * 4 - 8} width={96} height={8 * Math.abs(rock)} fill={C.ink} opacity={0.25} />
        <line x1={-48} x2={48} y1={rock * 4} y2={rock * 4} stroke={C.ink} strokeWidth={lw(4)} />
        {/* printed marks: ON on the top half, OFF on the bottom; the raised half's mark is the one that reads */}
        <text x={0} y={-8} textAnchor="middle" fontFamily="'Work Sans', sans-serif" fontWeight={600} fontSize={20} fill={C.ink} opacity={rock > 0 ? 0.85 : 0.3}>ON</text>
        <text x={0} y={46} textAnchor="middle" fontFamily="'Work Sans', sans-serif" fontWeight={600} fontSize={18} fill={C.ink} opacity={rock > 0 ? 0.3 : 0.85}>OFF</text>
        <rect x={-58} y={-70} width={116} height={140} rx={16} fill="none" stroke={C.ink} strokeWidth={lw(6)} />
        {/* pilot light */}
        <circle cx={0} cy={-46} r={7} fill={on > 0.5 ? C.mustard : PRESSED} stroke={C.ink} strokeWidth={lw(3)} />
        {on > 0.5 && <circle cx={0} cy={-46} r={14} fill={C.mustard} opacity={0.3} />}
      </g>
      <g transform="translate(0, 132)">
        <Mouth shape={mouth} w={66} smile={spec.smile} />
      </g>
    </g>
  );
};
