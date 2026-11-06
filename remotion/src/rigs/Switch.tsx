// Switch: a cream wall plate with a toggle for a nose, big round eyes, stubby arms and no legs (brief, Characters).
// A cutout rig: the pose sets eyes, brows and arm angles; `toggle` (0 down/OFF .. 1 up/ON) and `mouth` are driven
// separately so the click and the lip sync can move on their own. Drawn around the plate's centre, 240 x 360 units.
import React from "react";
import { C } from "../theme/palette";
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

const Arm: React.FC<{ side: -1 | 1; angle: number; wave?: number }> = ({ side, angle, wave = 0 }) => {
  // shoulder at the plate's edge, mid-height; a short bent tube and a round mitten
  const a = (side * (angle + wave) * Math.PI) / 180;
  const len = 92;
  const ex = Math.sin(a) * len * 0.55, ey = Math.cos(a) * len * 0.55;
  const hx = Math.sin(a * 1.15) * len, hy = Math.cos(a * 1.15) * len;
  return (
    <g transform={`translate(${side * (PLATE.w / 2 - 6)}, 20)`}>
      <path d={`M0,0 Q${ex + side * 10},${ey} ${hx},${hy}`} fill="none" stroke={C.ink} strokeWidth={26} strokeLinecap="round" />
      <path d={`M0,0 Q${ex + side * 10},${ey} ${hx},${hy}`} fill="none" stroke={C.cream} strokeWidth={15} strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={21} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      <path d={`M${hx - side * 4},${hy - 12} q${side * 10},-6 ${side * 14},4`} fill="none" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};

const Eye: React.FC<{ x: number; spec: PoseSpec; look: [number, number]; blink: number; side: -1 | 1 }> = ({
  x, spec, look, blink, side,
}) => {
  const r = 50 * spec.eyeScale;
  const lid = Math.min(1, spec.lid + blink * (1 - spec.lid));
  const [lx, ly] = look;
  const clip = `eye${React.useId().replace(/:/g, "")}`;
  return (
    <g transform={`translate(${x}, -92)`}>
      <clipPath id={clip}><circle r={r} /></clipPath>
      <circle r={r} fill={C.white} stroke={C.ink} strokeWidth={6} />
      <g clipPath={`url(#${clip})`}>
        <circle cx={lx * r * 0.42} cy={ly * r * 0.42} r={r * 0.42} fill={C.ink} />
        <circle cx={lx * r * 0.42 + r * 0.14} cy={ly * r * 0.42 - r * 0.16} r={r * 0.12} fill={C.white} />
        {/* upper lid, a cream curtain from the top */}
        <rect x={-r - 2} y={-r - 2} width={2 * r + 4} height={(2 * r + 4) * lid} fill={C.cream} />
        {lid > 0.02 && <line x1={-r} x2={r} y1={-r - 2 + (2 * r + 4) * lid} y2={-r - 2 + (2 * r + 4) * lid} stroke={C.ink} strokeWidth={5} />}
        {spec.lower > 0 && <rect x={-r} y={r - 2 * r * spec.lower} width={2 * r} height={2 * r} fill={C.cream} stroke={C.ink} strokeWidth={5} />}
      </g>
      <circle r={r} fill="none" stroke={C.ink} strokeWidth={6} />
      {/* brow */}
      <path d={`M${-r * 0.75},0 Q0,-8 ${r * 0.75},0`} fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round"
        transform={`translate(0, ${-r - 16 - spec.browY}) rotate(${side * spec.brow})`} />
    </g>
  );
};

export type SwitchProps = {
  pose?: SwitchPose;
  toggle?: number; // 0 OFF (down) .. 1 ON (up); defaults from the pose
  mouth?: MouthShape;
  blink?: number;
  look?: [number, number]; // pupils, -1..1 each way
  wave?: number; // degrees added to the right arm, for waving
  armL?: number; // override the pose's arm angles
  armR?: number;
  tilt?: number; // degrees; the redrawn, crooked Switch of S17
  arms?: boolean;
  outline?: number; // 0..1: how much of the outline is drawn (S16's pencil)
};

export const Switch: React.FC<SwitchProps> = ({
  pose = "neutral", toggle, mouth = "X", blink = 0, look = [0, 0], wave = 0, armL, armR, tilt = 0, arms = true,
}) => {
  const spec = POSES[pose];
  const on = toggle ?? (pose === "relaxed" || pose === "sad" ? 0 : 1);
  // the lever: a tapered block from the slot, swung up (ON) or down (OFF); foreshortened through the middle
  const swing = (on - 0.5) * 2; // -1 down .. 1 up
  const lev = 50 * Math.abs(swing) + 8;
  const dir = swing >= 0 ? -1 : 1;
  return (
    <g transform={`rotate(${tilt})`}>
      {arms && <Arm side={-1} angle={armL ?? spec.armL} />}
      {arms && <Arm side={1} angle={armR ?? spec.armR} wave={wave} />}
      {/* plate: a soft-cornered rectangle with a bevel */}
      <rect x={-PLATE.w / 2} y={-PLATE.h / 2} width={PLATE.w} height={PLATE.h} rx={34} fill={C.cream} stroke={C.ink} strokeWidth={8} />
      <rect x={-PLATE.w / 2 + 16} y={-PLATE.h / 2 + 16} width={PLATE.w - 32} height={PLATE.h - 32} rx={22} fill="none" stroke={C.creamShade} strokeWidth={6} />
      {/* screws */}
      {[-1, 1].map((s) => (
        <g key={s} transform={`translate(0, ${s * (PLATE.h / 2 - 30)})`}>
          <circle r={10} fill={C.creamShade} stroke={C.ink} strokeWidth={4} />
          <line x1={-6} y1={-3} x2={6} y2={3} stroke={C.ink} strokeWidth={3.5} />
        </g>
      ))}
      <Eye x={-58} spec={spec} look={look} blink={blink} side={-1} />
      <Eye x={58} spec={spec} look={look} blink={blink} side={1} />
      {/* the toggle: slot, then lever */}
      <rect x={-22} y={-14} width={44} height={56} rx={8} fill={C.inkSoft} stroke={C.ink} strokeWidth={5} />
      <g transform="translate(0, 14)">
        <path d={`M-15,0 L-11,${dir * lev} Q0,${dir * (lev + 9)} 11,${dir * lev} L15,0 Z`} fill={C.white} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M-8,${dir * lev * 0.3} L-6,${dir * lev * 0.85}`} stroke={C.creamShade} strokeWidth={4} strokeLinecap="round" />
      </g>
      <g transform="translate(0, 122)">
        <Mouth shape={mouth} w={74} smile={spec.smile} />
      </g>
    </g>
  );
};
