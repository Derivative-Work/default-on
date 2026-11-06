// The Narrator: a hand-drawn host in a brown cardigan and a wide collar, seen from the waist up; relaxed and slightly
// rumpled (brief, Characters). He never looks at the off-screen hand. A cutout rig drawn around the base of his
// neck: the body, the head (turnable), two arms with set poses, and the shared mouth shapes. About 520 units tall
// from waist to crown.
import React from "react";
import { C } from "../theme/palette";
import { Mouth, MouthShape } from "./Mouth";

export type ArmPose = "down" | "point" | "tap" | "open" | "pull";

export type NarratorProps = {
  mouth?: MouthShape;
  head?: number; // head turn, -1 (his right, screen left) .. 1; 0 faces us
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
      <path d={`M0,0 L${ex},${ey} L${hx},${hy}`} fill="none" stroke={C.ink} strokeWidth={66} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M0,0 L${ex},${ey} L${hx},${hy}`} fill="none" stroke={C.cardigan} strokeWidth={54} strokeLinecap="round" strokeLinejoin="round" />
      {/* cuff and hand */}
      <g transform={`translate(${hx}, ${hy}) rotate(${(-b * 180) / Math.PI})`}>
        <rect x={-30} y={-6} width={60} height={20} rx={8} fill={C.cardiganShade} stroke={C.ink} strokeWidth={5} />
        <path d="M-24,12 Q-30,52 -6,58 L18,58 Q32,40 24,12 Z" fill={C.skin} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
        {pose === "point" && <path d="M-4,52 L-6,92" stroke={C.ink} strokeWidth={22} strokeLinecap="round" />}
        {pose === "point" && <path d="M-4,52 L-6,92" stroke={C.skin} strokeWidth={13} strokeLinecap="round" />}
      </g>
    </g>
  );
};

export const Narrator: React.FC<NarratorProps> = ({
  mouth = "X", head = 0, nod = 0, blink = 0, brows = 0, armL = "down", armR = "open", look = [0, 0], sheepish = 0,
}) => {
  const hx = head * 26; // the face slides across the head as he turns
  const lid = Math.max(blink, 0.2);
  return (
    <g>
      {/* torso: cardigan over a wide-collared shirt, slightly rumpled hem */}
      <path d="M-150,40 Q-175,180 -165,330 L165,330 Q175,180 150,40 Q80,-6 0,-4 Q-80,-6 -150,40 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M-40,-2 L0,150 L40,-2 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      {/* the wide collar points */}
      <path d="M-44,-6 L-96,70 L-12,30 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M44,-6 L96,70 L12,30 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
      {/* cardigan placket and buttons, one done up wrong */}
      <path d="M-26,150 L-20,330 M26,150 L20,330" stroke={C.cardiganShade} strokeWidth={10} />
      {[190, 240, 290].map((y, i) => <circle key={y} cx={-22 + (i === 1 ? 4 : 0)} cy={y} r={8} fill={C.mustard} stroke={C.ink} strokeWidth={3.5} />)}
      {/* knit ribbing at the hem */}
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={-150 + i * 23} y1={302} x2={-150 + i * 23} y2={328} stroke={C.cardiganShade} strokeWidth={5} />)}
      <Arm side={-1} pose={armL} />
      <Arm side={1} pose={armR} />
      {/* neck */}
      <rect x={-30} y={-60} width={60} height={70} fill={C.skinShade} stroke={C.ink} strokeWidth={6} />
      {/* head */}
      <g transform={`translate(0, -170) rotate(${nod})`}>
        {/* ears */}
        {/* turning, the far ear slips behind the head and the near one comes round */}
        <ellipse cx={-92 + hx * 0.5} cy={10} rx={18} ry={28} fill={C.skin} stroke={C.ink} strokeWidth={6} opacity={1 - Math.max(0, -head)} />
        <ellipse cx={92 + hx * 0.5} cy={10} rx={18} ry={28} fill={C.skin} stroke={C.ink} strokeWidth={6} opacity={1 - Math.max(0, head)} />
        <path d="M-88,-30 Q-96,90 -40,122 Q0,138 40,122 Q96,90 88,-30 Q80,-118 0,-122 Q-80,-118 -88,-30 Z" fill={C.skin} stroke={C.ink} strokeWidth={7} />
        {/* shaggy hair and sideburns */}
        <path d="M-96,10 Q-112,-90 -40,-128 Q20,-150 78,-118 Q118,-80 98,8 L86,4 Q84,-58 52,-82 Q8,-58 -40,-84 Q-80,-60 -84,6 Z" fill={C.hair} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
        {/* sideburns, inside the face's edge, sliding with the turn */}
        <path d={`M${-84 + hx * 0.5},4 Q${-86 + hx * 0.5},40 ${-76 + hx * 0.5},64 L${-66 + hx * 0.5},60 L${-70 + hx * 0.5},4 Z`} fill={C.hair} opacity={1 - Math.max(0, -head)} />
        <path d={`M${84 + hx * 0.5},4 Q${86 + hx * 0.5},40 ${76 + hx * 0.5},64 L${66 + hx * 0.5},60 L${70 + hx * 0.5},4 Z`} fill={C.hair} opacity={1 - Math.max(0, head)} />
        <g transform={`translate(${hx}, 0)`}>
          {/* eyes with heavy lids, the relaxed look */}
          {[-36, 36].map((x) => (
            <g key={x} transform={`translate(${x}, -4)`}>
              <ellipse rx={16} ry={14} fill={C.white} stroke={C.ink} strokeWidth={4.5} />
              <circle cx={look[0] * 7} cy={look[1] * 5 + 2} r={7} fill={C.ink} />
              <path d={`M-17,${-14 + 28 * lid} L17,${-14 + 28 * lid}`} stroke={C.ink} strokeWidth={4.5} />
              <rect x={-17} y={-16} width={34} height={28 * lid + 2} fill={C.skinShade} />
              <path d={`M-18,${-26 - brows * 6} Q0,${-34 - brows * 8} 18,${-26 - brows * 6 + (x > 0 ? -sheepish * 6 : sheepish * 6)}`} fill="none" stroke={C.hair} strokeWidth={8} strokeLinecap="round" />
            </g>
          ))}
          {/* nose */}
          <path d="M2,6 Q-12,40 4,48 Q16,50 18,42" fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
          {/* mouth, then the moustache over it */}
          <g transform={`translate(${sheepish * 10}, 76) rotate(${sheepish * -8})`}><Mouth shape={mouth} w={58} smile={0.6 - sheepish} /></g>
          <path d="M-46,64 Q-24,48 0,58 Q24,48 46,64 Q30,72 0,66 Q-30,72 -46,64 Z" fill={C.hair} stroke={C.ink} strokeWidth={4.5} strokeLinejoin="round" />
        </g>
      </g>
    </g>
  );
};
