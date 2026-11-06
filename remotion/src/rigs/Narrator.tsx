// The Narrator: a hand-drawn host in a brown cardigan and a wide collar, seen from the waist up; relaxed and slightly
// rumpled (brief, Characters). He never looks at the off-screen hand. A cutout rig drawn around the base of his
// neck: the body, the head, two arms with set poses, and the shared mouth shapes. About 540 units tall from waist to
// crown. The face is drawn in the same cartoon language as Switch (big round eyes, simple shapes); head turns are
// discrete drawings (front, or three-quarter left/right) swapped on a cut, as limited animation did, never features
// sliding across the face.
import React from "react";
import { C, PEN, lw } from "../theme/palette";
import { Mouth, MouthShape } from "./Mouth";

const pen = PEN;

export type ArmPose = "down" | "point" | "tap" | "open" | "pull";

export type NarratorProps = {
  mouth?: MouthShape;
  head?: number; // head view: below -0.5 three-quarter to screen left, above 0.5 to screen right, else front
  nod?: number; // degrees of head tilt
  blink?: number;
  brows?: number; // + raised, - furrowed
  armL?: ArmPose; // screen-left arm
  armR?: ArmPose;
  look?: [number, number];
  sheepish?: number; // 0..1: a sideways grimace and a hand at the collar (the redub)
};

const ARMS: Record<ArmPose, { sh: number; el: number }> = {
  down: { sh: 8, el: 30 }, // resting on his lap
  point: { sh: 120, el: 10 }, // raised, out to the side
  tap: { sh: 70, el: 60 },
  open: { sh: 45, el: 50 }, // the explaining palm
  pull: { sh: 150, el: 20 }, // reaching up for a pull-down screen
};

const Arm: React.FC<{ side: -1 | 1; pose: ArmPose }> = ({ side, pose }) => {
  const { sh, el } = ARMS[pose];
  const up = 150, fore = 130;
  const a = (side * sh * Math.PI) / 180;
  const ex = Math.sin(a) * up, ey = Math.cos(a) * up;
  const b = a + (side * el * Math.PI) / 180 * (sh > 90 ? -1 : 1);
  const hx = ex + Math.sin(b) * fore, hy = ey + Math.cos(b) * fore;
  return (
    <g transform={`translate(${side * 134}, 34)`}>
      <path d={`M0,0 L${ex},${ey} L${hx},${hy}`} fill="none" stroke={C.ink} strokeWidth={61} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M0,0 L${ex},${ey} L${hx},${hy}`} fill="none" stroke={C.cardigan} strokeWidth={54} strokeLinecap="round" strokeLinejoin="round" />
      {/* pen detail: crease lines at the elbow */}
      <path d={`M${ex - 14},${ey - 8} q10,6 20,0 M${ex - 10},${ey + 6} q8,5 16,0`} {...pen} />
      {/* cuff and hand */}
      <g transform={`translate(${hx}, ${hy}) rotate(${(-b * 180) / Math.PI})`}>
        <rect x={-30} y={-6} width={60} height={20} rx={8} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />
        {[-18, -6, 6, 18].map((x) => <line key={x} x1={x} y1={-4} x2={x} y2={12} {...pen} />)}
        <path d="M-12,38 q6,4 12,0 M2,46 q6,4 12,0" {...pen} />
        <path d="M-24,12 Q-30,52 -6,58 L18,58 Q32,40 24,12 Z" fill={C.skin} stroke={C.ink} strokeWidth={lw(5)} strokeLinejoin="round" />
        {pose === "point" && <path d="M-4,52 L-6,92" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />}
        {pose === "point" && <path d="M-4,52 L-6,92" stroke={C.skin} strokeWidth={13} strokeLinecap="round" />}
      </g>
    </g>
  );
};

export const Narrator: React.FC<NarratorProps> = ({
  mouth = "X", head = 0, nod = 0, blink = 0, brows = 0, armL = "down", armR = "open", look = [0, 0], sheepish = 0,
}) => {
  const view = head > 0.5 ? 1 : head < -0.5 ? -1 : 0; // a discrete drawing, never a blend
  const fx = view * 30; // features sit toward the side he faces
  return (
    <g>
      {/* torso: cardigan over a wide-collared shirt, slightly rumpled hem */}
      <path d="M-150,40 Q-175,180 -165,330 L165,330 Q175,180 150,40 Q80,-6 0,-4 Q-80,-6 -150,40 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} strokeLinejoin="round" />
      {/* pen detail on the cardigan: cable knit either side, a stitched pocket, folds under the arms */}
      {[-84, 84].map((x) => Array.from({ length: 9 }, (_, i) => (
        <path key={`${x}${i}`} d={`M${x - 12},${70 + i * 26} l12,10 l12,-10`} {...pen} />
      )))}
      <path d="M62,214 h70 v58 q-35,8 -70,0 Z" {...pen} strokeDasharray="6 6" />
      <path d="M-140,70 q14,40 6,90 M140,70 q-14,40 -6,90 M-120,250 q30,14 50,8 M120,250 q-30,14 -50,8" {...pen} />
      <path d="M-40,-2 L0,150 L40,-2 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
      {/* the wide collar points */}
      <path d="M-44,-6 L-96,70 L-12,30 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
      <path d="M44,-6 L96,70 L12,30 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
      {/* collar stitching and a fold in the shirt */}
      <path d="M-40,2 L-86,66 M40,2 L86,66 M-6,60 q6,40 4,80" {...pen} strokeDasharray="5 6" />
      {/* cardigan placket and buttons, one done up wrong */}
      <path d="M-26,150 L-20,330 M26,150 L20,330" stroke={C.cardiganShade} strokeWidth={10} />
      {[190, 240, 290].map((y, i) => <circle key={y} cx={-22 + (i === 1 ? 4 : 0)} cy={y} r={8} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3.5)} />)}
      {/* knit ribbing at the hem */}
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={-150 + i * 23} y1={302} x2={-150 + i * 23} y2={328} stroke={C.cardiganShade} strokeWidth={5} />)}
      <path d="M-162,298 Q0,306 162,298" {...pen} />
      <Arm side={-1} pose={armL} />
      <Arm side={1} pose={armR} />
      {/* neck */}
      <path d="M-34,-70 L-30,10 L30,10 L34,-70 Z" fill={C.skinShade} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
      <rect x={-32} y={-70} width={64} height={40} fill="url(#pen-hatch)" opacity={0.8} />
      <path d="M-14,-24 q-4,20 0,30 M14,-24 q4,20 0,30" {...pen} />
      <g transform={`translate(0, -190) rotate(${nod})`}>
        {/* ears: both from the front; only the far-side one in three-quarter */}
        {view !== 1 && <ellipse cx={view === -1 ? 96 : -104} cy={18} rx={20} ry={30} fill={C.skin} stroke={C.ink} strokeWidth={lw(6)} />}
        {view !== -1 && <ellipse cx={view === 1 ? -96 : 104} cy={18} rx={20} ry={30} fill={C.skin} stroke={C.ink} strokeWidth={lw(6)} />}
        {/* a big rounded head, broad in the jaw */}
        <path d="M-100,-10 Q-104,-128 0,-130 Q104,-128 100,-10 Q100,96 54,124 Q0,146 -54,124 Q-100,96 -100,-10 Z" fill={C.skin} stroke={C.ink} strokeWidth={lw(7)} />
        {/* shaggy hair, parted toward the side he faces, with sideburns down to the ears */}
        <path d={`M-108,24 Q-122,-96 -40,-138 Q20,-160 86,-126 Q126,-86 108,24 L94,22 Q98,-40 ${70 + fx * 0.5},-70 Q${20 + fx},-92 ${-30 + fx * 0.6},-74 Q-80,-60 -94,22 Z`}
          fill={C.hair} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
        {/* pen detail: hair strands, an ear's curl, laugh lines, a nostril, moustache bristles, a forehead line */}
        {[-70, -40, -8, 24, 56].map((x, i) => <path key={i} d={`M${x + fx * 0.3},${-120 + Math.abs(x) * 0.25} q${10 + i * 2},28 ${4 + i * 3},64`} {...pen} />)}
        {view !== 1 && <path d={`M${view === -1 ? 92 : -110},6 q-8,10 0,24 q6,6 2,12`} {...pen} />}
        {view !== -1 && <path d={`M${view === 1 ? -100 : 110},6 q8,10 0,24 q-6,6 -2,12`} {...pen} />}
        <path d={`M${-60 + fx},${60} q-8,22 6,40 M${60 + fx * 1.4},${60} q8,22 -6,40`} {...pen} />
        <path d={`M${fx * 1.5 - 8},${44} q6,4 12,0`} {...pen} />
        <path d={`M${-50 + fx},${-70} q50,-8 100,0`} {...pen} opacity={0.5} />
        {/* cheeks */}
        <ellipse cx={-56 + fx * 0.8} cy={52} rx={20} ry={12} fill={C.orange} opacity={0.25} />
        <ellipse cx={56 + fx * 1.1} cy={52} rx={20} ry={12} fill={C.orange} opacity={0.25} />
        {/* eyes: round, like Switch's; the far eye a little narrower in three-quarter */}
        {[-1, 1].map((side) => {
          const far = view !== 0 && side !== view;
          const rx = (far ? 0.78 : 1) * 24, ry = 27;
          const lid = Math.max(0.14, blink, sheepish * 0.35); // a relaxed resting lid
          return (
            <g key={side} transform={`translate(${side * 40 + fx}, -18)`}>
              <ellipse rx={rx} ry={ry} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
              <circle cx={look[0] * 8 + view * 5} cy={look[1] * 7 + 3} r={13} fill={C.ink} />
              {lid > 0 && <path d={`M${-rx},${-ry} H${rx} V${-ry + 2 * ry * lid} H${-rx} Z`} fill={C.skin} stroke={C.ink} strokeWidth={lw(4)} />}
              <path d={`M${-rx - 4},${-ry - 14 - brows * 8 + (side === 1 ? -sheepish * 8 : 0)} Q0,${-ry - 26 - brows * 10} ${rx + 4},${-ry - 14 - brows * 8 + (side === -1 ? -sheepish * 8 : 0)}`}
                fill="none" stroke={C.hair} strokeWidth={10} strokeLinecap="round" />
            </g>
          );
        })}
        {/* a round bulb of a nose; in three-quarter it pushes toward the side he faces */}
        <ellipse cx={fx * 1.5} cy={34} rx={view ? 22 : 19} ry={18} fill={C.skinShade} stroke={C.ink} strokeWidth={lw(5)} />
        {/* mouth, then a bushy moustache over it */}
        <g transform={`translate(${fx * 1.2 + sheepish * 8}, 86) rotate(${sheepish * -8})`}><Mouth shape={mouth} w={58} smile={0.7 - sheepish} /></g>
        <path transform={`translate(${fx * 1.2}, 0)`} d="M-48,70 Q-28,48 0,60 Q28,48 48,70 Q30,80 0,72 Q-30,80 -48,70 Z" fill={C.hair} stroke={C.ink} strokeWidth={lw(4.5)} strokeLinejoin="round" />
        <g transform={`translate(${fx * 1.2}, 0)`}>{[-36, -24, -12, 12, 24, 36].map((x) => <path key={x} d={`M${x},${62 + Math.abs(x) * 0.12} l${x > 0 ? 3 : -3},10`} {...pen} />)}</g>
      </g>
    </g>
  );
};
