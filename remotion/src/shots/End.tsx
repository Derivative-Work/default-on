// S48-S67: the bridge (the school, the giant, the rewind and the redub), the final chorus, and the outro and reveal.
// S65-S67 are real material (R screen capture, H footage); S67's footage is in (2026-11-09), S65-S66 show stand-ins.
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Wash } from "../film/Paper";
import { AnswerBox, Caption, Contract, MiniRocker, Slate, Spotlight, TV, Tile, Kid } from "../components/props";
import { Hand } from "../rigs/Hand";
import { Digit, Hand4 } from "../rigs/Hand4";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, PEN, W, lw } from "../theme/palette";
import { at, events, line, mouthAt, shot, slot } from "../timing";
import { S61 as S61Key } from "../scenes/KeyFrames";
import { NarratorSet } from "./Intro";
import { Living } from "./Lesson";
import { Bookshelf, Clock, Floorboards, Grain, Wallpaper, Window } from "../components/sets";
import { FLIP_LEN, FLIP_Y, Lyric } from "./Chorus";
import { Bg, ShotC, Stand, blink, bump, ez } from "./common";

// S48: "Now the school's the place for learning…": a one-room schoolhouse at dusk, slow pan (Rhodes only), drawn in
// full (the human's note, 2026-11-06: "the school exterior could use a lot more detail"): sky, moon, clouds and stars;
// layered hills with tiny houses; the schoolhouse (chimney and smoke, scalloped shingles, belfry, bell and rope,
// weathervane, clapboard, trim, porch, steps, railing, panelled double doors, fanlight, SCHOOL plaque, shuttered lit
// windows with curtains and flower boxes, a stone foundation); the yard (picket fence and gate, stone path, flagpole
// with a plain pennant, bike rack and bicycle, a tree with a tire swing, a mailbox, shrubs, grass)
const Shrub: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${s})`}>
    <path d="M-60,0 q-10,-40 20,-50 q10,-30 40,-14 q30,-20 46,10 q30,4 14,54 Z" fill="#5f7d3a" stroke={C.ink} strokeWidth={lw(4)} />
    <path d="M-30,-20 q8,-8 16,0 M6,-34 q8,-8 16,0 M20,-10 q8,-8 16,0" {...PEN} />
  </g>
);
const Schoolhouse: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {/* chimney and smoke */}
    {/* the chimney runs down behind the roof, so it comes out of it (drawn before the roof) */}
    <rect x={150} y={-560} width={60} height={200} fill={C.red} stroke={C.ink} strokeWidth={lw(5)} />
    <rect x={142} y={-572} width={76} height={16} fill={C.red} stroke={C.ink} strokeWidth={lw(4)} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={150} x2={210} y1={-540 + i * 22} y2={-540 + i * 22} {...PEN} opacity={0.6} />)}
    {[0, 1, 2].map((k) => { const t = ((f + k * 30) % 90) / 90; return <circle key={k} cx={180 + t * 60} cy={-580 - t * 140} r={18 + t * 26} fill={C.cream} stroke={C.ink} strokeWidth={1.5} opacity={0.6 * (1 - t)} />; })}
    {/* roof: scalloped shingles in rows */}
    <path d="M-340,-300 L0,-520 L340,-300 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} strokeLinejoin="round" />
    <clipPath id="roof-clip"><path d="M-340,-300 L0,-520 L340,-300 Z" /></clipPath>
    <g clipPath="url(#roof-clip)">
      {Array.from({ length: 8 }, (_, r) => Array.from({ length: 24 }, (_, i) => (
        <path key={`${r}${i}`} d={`M${-360 + i * 32 + (r % 2) * 16},${-500 + r * 28} q16,20 32,0`} {...PEN} opacity={0.7} />
      )))}
    </g>
    {/* belfry, bell, rope, weathervane. It sits ON the roof: its walls run down to the roof line and its base is cut to
        the roof's pitch (y = -520 + 0.647|x|), with a trim skirt over the shingles (the human's note: it floated) */}
    <path d="M-46,-640 L46,-640 L46,-490 L0,-520 L-46,-490 Z" fill={C.cream} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
    <path d="M-60,-534 L60,-534 L60,-481 L0,-520 L-60,-481 Z" fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} strokeLinejoin="round" />
    <path d="M-60,-534 L60,-534" {...PEN} />
    {[-30, 0, 30].map((x) => <line key={x} x1={x} y1={-634} x2={x} y2={-540} {...PEN} opacity={0.35} />)}
    <path d="M-30,-640 v-0 q30,-30 60,0 v70 h-60 Z" fill="#3a3466" stroke={C.ink} strokeWidth={lw(4)} />
    <path d={`M-18,-600 q18,-30 36,0 l4,14 h-44 Z`} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} transform={`rotate(${Math.sin(f / 12) * 6}, 0, -620)`} />
    <path d="M-60,-640 L0,-700 L60,-640 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
    <line x1={0} y1={-700} x2={0} y2={-770} stroke={C.ink} strokeWidth={4} />
    <path d="M-34,-760 h60 l-10,-8 M26,-760 l-10,8 M-34,-760 l-10,-6 v12 Z" stroke={C.ink} strokeWidth={3} fill={C.ink} />
    {/* walls: clapboard and corner trim */}
    <rect x={-300} y={-300} width={600} height={300} fill={C.red} stroke={C.ink} strokeWidth={lw(8)} />
    {Array.from({ length: 13 }, (_, i) => <line key={i} x1={-296} x2={296} y1={-280 + i * 22} y2={-280 + i * 22} {...PEN} opacity={0.55} />)}
    {[-300, 282].map((x) => <rect key={x} x={x} y={-300} width={18} height={300} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />)}
    {/* windows: shutters, mullions, warm light, curtains, flower boxes */}
    {[-215, 215].map((x) => (
      <g key={x} transform={`translate(${x}, -170)`}>
        <rect x={-92} y={-62} width={24} height={124} fill={C.teal} stroke={C.ink} strokeWidth={lw(3)} />
        <rect x={68} y={-62} width={24} height={124} fill={C.teal} stroke={C.ink} strokeWidth={lw(3)} />
        {[-50, -10, 30].map((y) => <line key={y} x1={-88} x2={-72} y1={y} y2={y} {...PEN} />)}
        {/* the lit room, then curtains tied back at each side inside the glass, then the frame and its cross bars
            on top, so the window's edges stay straight (the human's note, 2026-11-09, round 7: one bowed stroke per
            curtain covered the frame and bent its sides) */}
        <rect x={-62} y={-62} width={124} height={124} fill="#f7d27a" />
        {[-1, 1].map((k) => (
          <g key={k} transform={`scale(${k}, 1)`}>
            <path d="M-62,-62 H-30 Q-34,-20 -50,14 Q-44,40 -46,62 H-62 Z" fill="#f2a65a" stroke={C.ink} strokeWidth={lw(2.5)} strokeLinejoin="round" />
            <path d="M-52,10 q6,4 4,10" stroke={C.ink} strokeWidth={lw(2.5)} fill="none" />
            <path d="M-46,-58 q-2,30 -10,60" {...PEN} opacity={0.5} />
          </g>
        ))}
        <rect x={-62} y={-62} width={124} height={124} fill="none" stroke={C.ink} strokeWidth={lw(5)} />
        <path d="M0,-62 v124 M-62,0 h124" stroke={C.ink} strokeWidth={lw(4)} />
        <rect x={-70} y={62} width={140} height={22} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(3)} />
        {[-50, -20, 10, 40].map((fx, k) => <circle key={fx} cx={fx} cy={58} r={9} fill={[C.red, C.mustard, C.orange, C.red][k]} stroke={C.ink} strokeWidth={lw(2)} />)}
      </g>
    ))}
    {/* porch: roof, posts, steps, railing; double doors with a fanlight; the plaque */}
    <path d="M-120,-200 L0,-262 L120,-200 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(5)} />
    <text x={0} y={-215} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={22} fill={C.cream}>SCHOOL</text>
    {[-104, 92].map((x) => <rect key={x} x={x} y={-200} width={12} height={200} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />)}
    <path d="M-60,-150 a60,40 0 0 1 120,0 Z" fill="#f7d27a" stroke={C.ink} strokeWidth={lw(4)} />
    {/* the fanlight's spokes end on its arch (they ran past it onto the wall: the human's note, 2026-11-09, round 7) */}
    {[35, 90, 145].map((a) => <line key={a} x1={0} y1={-150} x2={Math.cos((a * Math.PI) / 180) * 60 * 0.95} y2={-150 - Math.sin((a * Math.PI) / 180) * 40 * 0.95} {...PEN} />)}
    {[-1, 1].map((k) => <g key={k}><rect x={k < 0 ? -60 : 0} y={-150} width={60} height={150} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(4)} />
      <rect x={(k < 0 ? -60 : 0) + 12} y={-136} width={36} height={56} {...PEN} /><rect x={(k < 0 ? -60 : 0) + 12} y={-68} width={36} height={56} {...PEN} />
      <circle cx={k * 8} cy={-74} r={5} fill={C.mustard} stroke={C.ink} strokeWidth={lw(2)} /></g>)}
    {[0, 1, 2].map((k) => <rect key={k} x={-90 - k * 14} y={k * 18} width={180 + k * 28} height={18} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(3)} />)}
    {[-150, 150].map((x) => <g key={x}><line x1={x} y1={-60} x2={x} y2={0} stroke={C.cream} strokeWidth={8} />{[0, 1, 2, 3].map((k) => <line key={k} x1={x + (x < 0 ? 10 + k * 12 : -10 - k * 12)} y1={-56} x2={x + (x < 0 ? 10 + k * 12 : -10 - k * 12)} y2={0} stroke={C.cream} strokeWidth={4} />)}<line x1={x} y1={-60} x2={x < 0 ? -104 : 104} y2={-60} stroke={C.cream} strokeWidth={8} /></g>)}
    {/* stone foundation */}
    <rect x={-320} y={0} width={640} height={36} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(4)} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={-300 + i * 54} y1={0} x2={-296 + i * 54} y2={36} {...PEN} />)}
  </g>
);
export const S48: ShotC = ({ f, len }) => {
  const pan = ez(f, 0, len);
  return (
    <Bg id="s48" seed={48} base={C.orange}>
      <Wash id="s48" color={C.night} opacity={0.55}><rect x={-40} y={-40} width={W + 80} height={440} /></Wash>
      <Wash id="s48" color="#f2a65a" opacity={0.5}><rect x={-40} y={380} width={W + 80} height={240} /></Wash>
      <circle cx={1660 - pan * 40} cy={190 - pan * 30} r={56} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />
      {[[230, 110], [520, 60], [980, 40], [1380, 120], [760, 150]].map(([x, y], i) => (
        <path key={i} transform={`translate(${x}, ${y}) scale(${0.5 + 0.5 * ez(f, i * 10, i * 10 + 30)})`} d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill={C.cream} />
      ))}
      {[[400, 260], [1180, 220]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x + f * (0.3 + i * 0.2)}, ${y})`}>
          <path d="M-120,0 q0,-40 40,-40 q10,-40 60,-30 q30,-30 70,0 q50,-6 50,40 Z" fill="#e8b8a8" stroke={C.ink} strokeWidth={lw(3)} opacity={0.85} />
        </g>
      ))}
      {[0, 1].map((k) => <path key={k} transform={`translate(${300 + f * 1.6 + k * 50}, ${300 - k * 20})`} d={`M0,0 q12,${-10 + Math.sin(f / 3 + k) * 6} 24,0 q12,${-10 + Math.sin(f / 3 + k) * 6} 24,0`} fill="none" stroke={C.ink} strokeWidth={2.4} />)}
      <g transform={`translate(${-pan * 200}, 0)`}>
        {/* far hills and their tiny houses */}
        <Wash id="s48" color="#8aa86a" opacity={0.8}><path d="M-40,620 Q300,520 700,580 Q1100,520 1500,590 Q1900,540 2300,600 L2300,800 L-40,800 Z" /></Wash>
        {[[340, 560], [1300, 556], [1900, 572]].map(([x, y], i) => <g key={i} transform={`translate(${x}, ${y})`}><rect x={-14} y={-14} width={28} height={18} fill={C.cream} stroke={C.ink} strokeWidth={lw(2)} /><path d="M-18,-14 L0,-28 L18,-14 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(2)} /><rect x={-4} y={-8} width={8} height={8} fill="#f7d27a" /></g>)}
        <Wash id="s48" color={C.avocado} opacity={0.9}><path d="M-40,760 Q600,700 1100,740 Q1600,780 2300,720 L2300,1120 L-40,1120 Z" /></Wash>
        {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${60 + i * 74},${840 + (i % 4) * 40} l6,-14 l6,14 l6,-12`} {...PEN} opacity={0.6} />)}
        {/* the tree with a tire swing, left */}
        <g transform="translate(330, 800)">
          <path d="M-20,0 L-14,-260 L14,-260 L20,0 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(5)} />
          <path d="M-14,-200 q-60,-20 -110,-60" stroke={C.cardigan} strokeWidth={18} fill="none" strokeLinecap="round" />
          <circle cx={-10} cy={-330} r={150} fill="#5f7d3a" stroke={C.ink} strokeWidth={lw(5)} />
          {[[-80, -380], [20, -420], [60, -320], [-60, -280], [-10, -350]].map(([x, y], i) => <path key={i} d={`M${x},${y} q14,-14 28,0`} {...PEN} />)}
          {/* the tire swing: a rope from the branch to a hanging tire (a dark ring with a see-through hole and tread) */}
          <g transform={`rotate(${Math.sin(f / 15) * 5}, -110, -258)`}>
            <line x1={-110} y1={-258} x2={-110} y2={-124} stroke={C.cardiganShade} strokeWidth={5} />
            <path d="M-110,-124 m-40,52 a40,50 0 1,0 80,0 a40,50 0 1,0 -80,0 Z M-110,-124 m-18,52 a18,26 0 1,1 36,0 a18,26 0 1,1 -36,0 Z" fill="#2e2a2c" fillRule="evenodd" stroke={C.ink} strokeWidth={lw(4)} />
            {[-30, -10, 10, 30].map((a) => <path key={a} d={`M${-110 + Math.sin((a * Math.PI) / 90) * 34},${-72 - Math.cos((a * Math.PI) / 90) * 40} l4,8`} stroke={C.sleeve} strokeWidth={3} />)}
            <path d="M-140,-96 q-6,20 2,40" stroke={C.sleeve} strokeWidth={4} fill="none" opacity={0.7} />
          </g>
        </g>
        {/* flagpole with a plain pennant */}
        <g transform="translate(560, 800)">
          <line x1={0} y1={0} x2={0} y2={-420} stroke={C.sleeve} strokeWidth={8} />
          <circle cx={0} cy={-424} r={8} fill={C.mustard} stroke={C.ink} strokeWidth={lw(2)} />
          <path d={`M4,-414 Q60,${-404 + Math.sin(f / 6) * 8} 120,-390 Q60,${-376 + Math.sin(f / 6) * 8} 4,-366 Z`} fill={C.teal} stroke={C.ink} strokeWidth={lw(3)} />
        </g>
        {/* the schoolhouse */}
        <g transform="translate(1180, 800) scale(1.12)"><Schoolhouse f={f} /></g>
        <Shrub x={820} y={800} s={1.1} /><Shrub x={1540} y={800} /><Shrub x={1600} y={808} s={0.8} />
        {/* stone path and the picket fence with its gate */}
        {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={1180 + Math.sin(i) * 18} cy={860 + i * 34} rx={40 - i * 1} ry={12} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(2.5)} />)}
        {Array.from({ length: 34 }, (_, i) => {
          const x = 700 + i * 30; if (x > 1140 && x < 1220) return null;
          return <path key={i} d={`M${x - 8},902 v-56 l8,-12 l8,12 v56 Z`} fill={C.cream} stroke={C.ink} strokeWidth={lw(2.5)} />;
        })}
        <line x1={690} x2={1140} y1={866} y2={866} stroke={C.ink} strokeWidth={3} /><line x1={1220} x2={1720} y1={866} y2={866} stroke={C.ink} strokeWidth={3} />
        <g transform="translate(1140, 902) rotate(-28)"><rect x={0} y={-60} width={60} height={60} fill="none" stroke={C.cream} strokeWidth={6} /><line x1={0} y1={-60} x2={60} y2={0} stroke={C.cream} strokeWidth={5} /></g>
        {/* bike rack and bicycle, mailbox */}
        <g transform="translate(1660, 900)">
          {[0, 1, 2].map((k) => <path key={k} d={`M${k * 40},0 v-40 q16,-20 32,0 v40`} stroke={C.sleeve} strokeWidth={6} fill="none" />)}
          <circle cx={-10} cy={-24} r={26} fill="none" stroke={C.ink} strokeWidth={4} /><circle cx={70} cy={-24} r={26} fill="none" stroke={C.ink} strokeWidth={4} />
          <path d="M-10,-24 L20,-62 L56,-62 L70,-24 M20,-62 L40,-24 L-10,-24 M56,-62 L50,-78 h16 M20,-62 l-6,-12 h-14" stroke={C.red} strokeWidth={5} fill="none" strokeLinejoin="round" />
        </g>
        <g transform="translate(1930, 900)"><line x1={0} y1={0} x2={0} y2={-80} stroke={C.cardigan} strokeWidth={8} /><path d="M-30,-80 h50 a20,20 0 0 1 20,20 v20 h-70 Z" fill={C.teal} stroke={C.ink} strokeWidth={lw(3)} /><rect x={30} y={-100} width={6} height={30} fill={C.red} /></g>
      </g>
    </Bg>
  );
};

// the school's note: ruled paper with a red margin line; the handwriting fits the sheet and sits on the rules (the
// human's note, 2026-11-06: it overflowed and floated between the lines)
const Note: React.FC = () => (
  <g>
    <rect x={-320} y={-200} width={640} height={300} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
    {[-110, -34, 42].map((y) => <line key={y} x1={-310} x2={310} y1={y} y2={y} stroke={C.teal} strokeWidth={2} opacity={0.45} />)}
    <line x1={-260} x2={-260} y1={-196} y2={96} stroke={C.red} strokeWidth={2} opacity={0.5} />
    <text x={-246} y={-114} fontFamily={SANS} fontStyle="italic" fontSize={58} fill={C.inkSoft} textLength={430} lengthAdjust="spacingAndGlyphs">No AI, please.</text>
    <text x={-246} y={-38} fontFamily={SANS} fontStyle="italic" fontSize={40} fill={C.inkSoft} textLength={500} lengthAdjust="spacingAndGlyphs">Thank you! — the school</text>
    <path d="M150,30 q20,-20 40,0 q20,20 40,0" {...PEN} />
  </g>
);

// S49: "So the school said, 'No AI, please'…": a teacher's desk at dusk with a polite handwritten note on it, an ink
// pot with its pen, a pencil cup, an apple, a stack of exercise books; the chalkboard's corner and a dusky window behind.
// Detail pass (the human's note, 2026-11-09: the books and pen floated): the desktop now runs from its back edge at
// y 560, and everything on it stands on that surface, each with a contact shadow
const DESK_Y = 560;
const SchoolDesk: React.FC = () => (
  <g>
    <rect x={-20} y={DESK_Y} width={W + 40} height={H - DESK_Y + 20} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
    <rect x={-20} y={DESK_Y} width={W + 40} height={14} fill={C.cardiganShade} opacity={0.8} />
    <Grain x={0} y={DESK_Y + 20} w={W} h={H - DESK_Y - 20} n={7} seed={6} />
  </g>
);
export const S49: ShotC = ({ g }) => (
  <Bg id="s49" seed={49} base={C.avocado}>
    <Wallpaper id="s49" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    <rect x={-40} y={40} width={620} height={400} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={22} />
    <g transform="translate(1600, 260)"><Window w={300} h={320} sky="#e8a070" sun="sun" curtain={C.teal} /></g>
    <g transform="translate(1180, 120)"><Clock t={(16 * 60 + 52) * 60 + g / 30} r={50} /></g>
    <SchoolDesk />
    {/* the note, flat on the desk */}
    <ellipse cx={980} cy={940} rx={330} ry={24} fill={C.ink} opacity={0.18} />
    <g transform="translate(960, 800) rotate(-4)"><Note /></g>
    {/* an ink pot with the pen standing in it, and a pencil cup */}
    <g transform="translate(400, 760)">
      <ellipse cx={6} cy={4} rx={66} ry={12} fill={C.ink} opacity={0.25} />
      <path d="M-50,0 L-50,-50 Q-50,-64 -28,-66 L28,-66 Q50,-64 50,-50 L50,0 Z" fill={C.night} stroke={C.ink} strokeWidth={lw(5)} />
      <rect x={-22} y={-84} width={44} height={20} rx={4} fill={C.ink} />
      <path d="M-30,-40 q10,-12 22,-8" stroke={C.white} strokeWidth={5} fill="none" opacity={0.4} />
      <g transform="rotate(18, 0, -74)">
        <rect x={-7} y={-230} width={14} height={160} rx={5} fill={C.red} stroke={C.ink} strokeWidth={lw(3.5)} />
        <rect x={-8} y={-130} width={16} height={12} fill={C.mustard} stroke={C.ink} strokeWidth={lw(2.5)} />
      </g>
    </g>
    <g transform="translate(580, 770)">
      <ellipse cx={6} cy={4} rx={48} ry={10} fill={C.ink} opacity={0.25} />
      {[-14, 0, 14].map((dx, i) => <line key={dx} x1={dx} y1={-80} x2={dx + (i - 1) * 10} y2={-150} stroke={[C.mustard, C.teal, C.orange][i]} strokeWidth={9} strokeLinecap="round" />)}
      <path d="M-36,0 L-40,-90 L40,-90 L36,0 Z" fill={C.teal} stroke={C.ink} strokeWidth={lw(4.5)} />
    </g>
    {/* the apple, sitting on the desk */}
    <g transform="translate(1440, 700)">
      <ellipse cx={8} cy={52} rx={58} ry={12} fill={C.ink} opacity={0.25} />
      <circle r={56} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
      <path d="M0,-56 q10,-30 30,-30" stroke={C.ink} strokeWidth={lw(6)} fill="none" />
      <path d="M-30,-20 q10,-14 24,-10" stroke={C.white} strokeWidth={5} fill="none" opacity={0.6} />
    </g>
    {/* a stack of exercise books, squared up on the desk, page edges showing */}
    <g transform="translate(1690, 760)">
      <ellipse cx={10} cy={4} rx={150} ry={14} fill={C.ink} opacity={0.25} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${[0, -8, 6, -4][i]}, ${-i * 28})`}>
          <rect x={-120} y={-28} width={240} height={28} rx={3} fill={[C.teal, C.mustard, C.orange, C.red][i]} stroke={C.ink} strokeWidth={lw(4)} />
          <rect x={-100} y={-20} width={200} height={12} fill={C.white} stroke={C.ink} strokeWidth={lw(2)} />
        </g>
      ))}
    </g>
  </Bg>
);

// S50 / S51: "And the giant said, 'We hear you!'…": a giant pinstriped cuff (not the grey sleeve), with a cufflink,
// slides a contract across the desk; "Take the robot with your search…": the contract close up, its two boxes and fine
// print
// the school verse's sources, on screen (the human's note, 2026-11-09: "the most incisive (and potentially defamatory if
// not cited...) part of the entire video"), from the fact card's rows: "Google's VP for education told The New York
// Times that students at schools rejecting its AI would lose Search." (Fact, Nov 3, 2026), held S50-S52; and "Google
// then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed from Search.",
// held S53-S56
const SCHOOLCAP = "Google's VP for education, to The New York Times, Nov. 3, 2026";
const CORRCAP = "Google then said schools can turn Gemini off and keep Search, but AI Overviews and AI Mode can't be removed.";
// "deeply integrated" is a direct quote (the human asked, 2026-11-09, round 6): Chris Phillips, Google's VP for
// education, to The New York Times on Nov. 3, 2026, before the reversal (GovTech, Nov. 4, 2026; Decrypt, via Education
// Week). It was said to justify cutting off Search, so the caption keeps it before the reversal. Proposed for the fact
// card's correction row as a suggestion; shown from the label plate (S55) through S56
const QUOTE_Y = H - 96 - 126; // right above the correction caption, in S55 and S56 alike
const QUOTECAP = "Before the reversal, Google's VP for education told The New York Times that Search and AI are \"deeply integrated\" (Nov. 3, 2026).";
const Giant: React.FC<{ slide: number; boxes: string[] }> = ({ slide, boxes }) => {
  // the contract and the hand move as one, so the hand is plainly what slides it (the human's note, 2026-11-09)
  const cx = 1500 - slide * 560, cy = 800;
  return (
  <Bg id="s50" seed={50} base={C.avocado}>
    <Wallpaper id="s50" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    <SchoolDesk />
    <ellipse cx={420} cy={930} rx={270} ry={20} fill={C.ink} opacity={0.15} />
    <g transform="translate(400, 800) rotate(-6) scale(0.8)" opacity={0.9}><Note /></g>
    <ellipse cx={cx + 20} cy={cy + 222} rx={300} ry={20} fill={C.ink} opacity={0.2} />
    {/* the cuff and the hand go under the paper's edge: the fingers are tucked beneath the agreement (the paper hides
        them) and the thumb presses on top, so the hand is plainly gripping it as it pushes it on (the human's note,
        2026-11-09, round 5) */}
    <g transform={`translate(${cx + 650}, ${cy - 30})`}>
      <rect x={-200} y={-120} width={1200} height={240} fill="#3b3f52" stroke={C.ink} strokeWidth={lw(8)} />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-200 + i * 120} y1={-120} x2={-200 + i * 120} y2={120} stroke={C.cream} strokeWidth={3} opacity={0.5} />)}
      <path d="M-100,-120 q20,120 0,240 M200,-120 q-14,120 6,240" {...PEN} stroke={C.cream} opacity={0.4} />
      <g transform="translate(-262, 6) rotate(90) scale(2.6)"><Hand4 pose="rest" side={-1} thumb={false} /></g>
      <rect x={-260} y={-130} width={80} height={260} rx={10} fill={C.white} stroke={C.ink} strokeWidth={lw(7)} />
      <rect x={-236} y={-20} width={30} height={40} rx={6} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />
    </g>
    <g transform={`translate(${cx}, ${cy}) rotate(-3)`}><g transform="scale(0.9)"><Contract boxes={boxes} /></g></g>
    <g transform={`translate(${cx + 650}, ${cy - 30})`}>
      <g transform="translate(-292, -34) scale(2.6)"><Digit x={0} y={0} deg={-76} len={42} w={17} fill={C.skin} nail /></g>
    </g>
    <Caption text={SCHOOLCAP} />
  </Bg>
  );
};
export const S50: ShotC = ({ f, len }) => <Giant slide={ez(f, 0, len * 0.7)} boxes={["Search + AI", "No search"]} />;
// The crowd boos the deal (the human's booing, from the end of the giant's line into the redub): a row of
// silhouetted heads rises along the bottom, shaking, and bubble-letter BOOs pop up one after another
const BOOS = [[280, 250, -12, 0], [1690, 230, 10, 8], [290, 560, -6, 16], [1680, 540, 8, 26], [280, 820, -9, 36], [1690, 800, 12, 46]];
const Booing: React.FC<{ b: number }> = ({ b }) => {
  if (b < 0) return null;
  const rise = ez(b, 0, 10);
  return (
    <g>
      {Array.from({ length: 14 }, (_, i) => {
        const shake = Math.sin((b + i * 5) / 2.2) * 6;
        return <g key={i} transform={`translate(${70 + i * 136 + shake}, ${H + 150 - rise * 190 - (i % 2) * 18})`}>
          <ellipse cx={0} cy={60} rx={70} ry={60} fill="#3b2f3a" stroke={C.ink} strokeWidth={lw(4)} />
          <circle cx={0} cy={-40} r={42} fill="#3b2f3a" stroke={C.ink} strokeWidth={lw(4)} />
          {/* a thumb down, every third head */}
          {i % 3 === 1 && <g transform={`translate(64, ${-10 + Math.sin(b / 3 + i) * 6})`}>
            <rect x={-16} y={-24} width={34} height={40} rx={10} fill="#3b2f3a" stroke={C.ink} strokeWidth={lw(4)} />
            <rect x={-6} y={14} width={12} height={30} rx={6} fill="#3b2f3a" stroke={C.ink} strokeWidth={lw(4)} />
          </g>}
        </g>;
      })}
      {BOOS.map(([x, y, r, at0], i) => {
        const s = ez(b, at0, at0 + 4) * (1 + 0.15 * bump(b, at0 + 4, 3));
        return s > 0 && <text key={i} x={0} y={0} transform={`translate(${x}, ${y}) rotate(${r}) scale(${s})`} textAnchor="middle"
          fontFamily={BUBBLE} fontSize={i % 2 ? 110 : 140} fill={i % 2 ? C.cream : C.mustard} stroke={C.ink} strokeWidth={7} paintOrder="stroke">
          {i % 2 ? "BOO!" : "BOOO!"}</text>;
      })}
    </g>
  );
};

export const S51: ShotC = ({ f, g }) => {
  const b = g - at(events.booing[0]); // frames since the booing began
  const shudder = b > 0 ? Math.sin(b * 1.7) * 3 : 0;
  return (
    <Bg id="s51" seed={51} base={C.cardigan}>
      <Grain x={0} y={0} w={W} h={H} n={9} seed={8} />
      <g transform={`translate(${960 + shudder}, 560) scale(${1.4 + f * 0.002})`}>
        <Contract boxes={["Search + AI", "No search"]} />
        {Array.from({ length: 5 }, (_, i) => <rect key={i} x={-280} y={180 + i * 12} width={520 - i * 30} height={4} fill={C.inkSoft} opacity={0.5} />)}
        <text x={-280} y={250} fontFamily={SANS} fontSize={18} fill={C.inkSoft}>Sign here: ______________</text>
      </g>
      <Booing b={b} />
      <Caption text={SCHOOLCAP} />
    </Bg>
  );
};

// S52: [record scratch, tape rewind]: the film burns from the centre, the frame jitters, and the shot rewinds at speed;
// it starts on the human's scratch, with the booing still going underneath
export const S52: ShotC = ({ f, g, len }) => {
  const burn = ez(f, 0, len * 0.4);
  const rew = ez(f, len * 0.35, len);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${Math.sin(f * 3.1) * 14}px, ${Math.cos(f * 2.3) * 10}px)` }}>
        <Giant slide={1 - rew} boxes={["Search + AI", "No search"]} />
        <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}><Booing b={g - at(events.booing[0])} /></svg>
      </div>
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="burn" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff6dc" />
            <stop offset="0.6" stopColor={C.orange} />
            <stop offset="0.85" stopColor={C.ink} />
            <stop offset="1" stopColor={C.ink} stopOpacity={0} />
          </radialGradient>
        </defs>
        {burn > 0 && rew < 0.3 && <ellipse cx={W / 2} cy={H / 2} rx={burn * 700} ry={burn * 520} fill="url(#burn)" />}
        {rew > 0 && Array.from({ length: 5 }, (_, i) => <rect key={i} x={0} y={((f * 61 + i * 233) % H)} width={W} height={10} fill={C.cream} opacity={0.5} />)}
        {rew > 0 && <text x={W - 80} y={120} textAnchor="end" fontFamily={SANS} fontWeight={600} fontSize={80} fill={C.cream}>◀◀</text>}
      </svg>
    </>
  );
};

// S53: "Correction, boys and girls!…" ("Ahem!" isn't sung): the Narrator redubs at his desk, his mouth shapes visibly
// out of sync (8 frames late); a CORRECTION slate; the contract now has a third box, written in by hand; tape wobble
export const S53: ShotC = ({ f, g }) => {
  const jitter = Math.sin(f * 2.3) * 6;
  return (
    <>
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${jitter}px)` }}>
      <NarratorSet g={g - 8} board={["SEARCH + AI?"]} arm="tap" head={0} size={60}>
        <g transform="translate(560, 640) rotate(-4) scale(0.75)"><Contract boxes={["Search + AI", "No search", "Search, chatbot off"]} highlight={2} /></g>
        <g transform="translate(1520, 230) rotate(6)"><Slate text="CORRECTION" w={600} /></g>
      </NarratorSet>
      <div style={{ position: "absolute", left: 0, right: 0, top: (f * 37) % H, height: 26, background: "linear-gradient(rgba(255,250,235,0), rgba(255,250,235,0.45), rgba(255,250,235,0))" }} />
    </div>
    {/* the caption sits on its own steady layer above the wobbling tape and its scan bar (the human's note,
        2026-11-09, round 6: it shook with the picture) */}
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}><Caption text={CORRCAP} /></svg>
    </>
  );
};

// S54: V16 "And the answer box on top?": tilt up: the answer box is bolted to the top of the frame, unchanged
// S55: "…That one's 'deeply integrated.'": the bolts tighten themselves; a small label plate reads "deeply integrated"
const Bolted: React.FC<{ g: number; tilt: number; tighten?: number }> = ({ g, tilt, tighten = 0 }) => (
  <Bg id="s54" seed={54} base={C.avocado}>
    <g transform={`translate(0, ${(1 - tilt) * -380})`}>
      {/* the classroom's ceiling: beams with grain, a hanging school light */}
      <rect x={-20} y={-20} width={W + 40} height={120} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
      <Grain x={0} y={-10} w={W} h={100} n={3} seed={4} />
      {[200, 1720].map((x) => <g key={x}><line x1={x} y1={100} x2={x} y2={300} stroke={C.ink} strokeWidth={4} /><path d={`M${x - 90},300 h180 l-30,60 h-120 Z`} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} /></g>)}
      <Wallpaper id="s54" kind="stripe" a={C.avocado} b={C.cream} x={-40} y={100} w={W + 80} h={1300} opacity={0.18} />
      <g transform="translate(960, 260)">
        <AnswerBox w={760} />
        {[-330, 330].map((x) => (
          <g key={x} transform={`translate(${x}, -150)`}>
            <rect x={-14} y={-200} width={28} height={200} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(5)} />
            <g transform={`rotate(${tighten * 360})`}><circle r={30} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(6)} /><path d="M-18,0 H18 M0,-18 V18" stroke={C.ink} strokeWidth={lw(6)} /></g>
          </g>
        ))}
        {tighten > 0.6 && (
          <g transform="translate(0, 220)">
            <rect x={-230} y={-34} width={460} height={68} rx={10} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
            <text textAnchor="middle" y={14} fontFamily={SANS} fontWeight={600} fontSize={38} fill={C.ink}>deeply integrated</text>
          </g>
        )}
      </g>
      {/* Switch on the left, above the captions, looking up at the box (he peeked up from the bottom edge, where the
          captions now sit in every shot of the redub: the human's note, 2026-11-09, round 7) */}
      <g transform="translate(250, 640) scale(0.5)"><Switch pose="curious" mouth={mouthAt(g, "switch")} look={[0.8, -0.8]} blink={blink(g, 7)} /></g>
      <g transform="translate(1500, 1160) scale(0.6)"><Bookshelf w={300} shelves={3} seed={7} /></g>
    </g>
    {/* the captions keep one place through the redub (S53-S56): the correction at the bottom, the quote's source
        stacked right above it once the plate is on (and in S56) */}
    {tighten > 0.6 && <Caption text={QUOTECAP} y={QUOTE_Y} />}
    <Caption text={CORRCAP} />
  </Bg>
);
export const S54: ShotC = ({ f, g, len }) => <Bolted g={g} tilt={ez(f, 0, len * 0.6)} />;
export const S55: ShotC = ({ f, g, len }) => <Bolted g={g} tilt={1} tighten={ez(f, 4, len * 0.7)} />;

// S56: V17 "What's that mean?" / "It means it stays.": in the classroom, Switch, on the desk, looks up at the
// Narrator; the Narrator looks away
export const S56: ShotC = ({ f, g, len }) => {
  const away = f > len * 0.45;
  return (
    <NarratorSet g={g} board={["DEEPLY", "INTEGRATED?"]} arm="down" head={away ? 1 : 0} size={80}>
      <g transform="translate(980, 700) scale(0.42)"><Switch pose="curious" mouth={mouthAt(g, "switch")} look={[0.9, -0.8]} blink={blink(g, 8)} /></g>
      {away && <text x={1560} y={240} fontFamily={BUBBLE} fontSize={56} fill={C.ink} opacity={0.7}>ahem…</text>}
      <Caption text={QUOTECAP} y={QUOTE_Y} />
      <Caption text={CORRCAP} />
    </NarratorSet>
  );
};

// the final-chorus classroom: rows of generic cartoon kids, each with a rocker on the desk flicking ON on the beat
const Classroom: React.FC<{ f: number; g: number; lineId?: string }> = ({ f, g, lineId }) => (
  <Bg id="s57" seed={57} base={C.mustard}>
    <Wallpaper id="s57" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
    {/* an alphabet strip over the board, a clock, a window each side, a floor */}
    {"ABCDEFGHIJ".split("").map((ch, i) => <g key={ch} transform={`translate(${250 + i * 150}, 22)`}><rect width={120} height={36} rx={4} fill={[C.teal, C.orange, C.avocado, C.red, C.cream][i % 5]} stroke={C.ink} strokeWidth={lw(3)} /><text x={60} y={28} textAnchor="middle" fontFamily={BUBBLE} fontSize={26} fill={C.ink}>{ch}{ch.toLowerCase()}</text></g>)}
    <g transform="translate(1840, 180)"><Clock t={(10 * 60 + 15) * 60 + g / 30} r={46} /></g>
    {[90, 1830].map((x) => <g key={x} transform={`translate(${x}, 470)`}><Window w={150} h={300} /></g>)}
    <rect x={-20} y={880} width={W + 40} height={220} fill="#b98a5a" stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={880} h={200} boards={2} />
    <rect x={160} y={60} width={1600} height={220} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={18} />
    <text x={960} y={210} textAnchor="middle" fontFamily={BUBBLE} fontSize={110} fill={C.white} opacity={0.9}>DEFAULT ON</text>
    {[0, 1].map((row) => Array.from({ length: 5 }, (_, i) => {
      const x = 300 + i * 330 + (row ? 165 : 0), y = row ? 560 : 760, s = row ? 0.7 : 0.85;
      const seed = row * 5 + i + 2;
      if (row === 0 && i === 2) return (
        <g key={`${row}${i}`} transform={`translate(${x}, ${y - 40}) scale(0.42)`}><Switch pose="neutral" mouth={mouthAt(g, "narrator")} blink={blink(g, 9)} /></g>
      );
      return (
        <g key={`${row}${i}`}>
          <g transform={`translate(${x}, ${y - 120}) scale(${s})`}><Kid seed={seed} mouth={mouthAt(g + seed * 2, "narrator")} /></g>
          <rect x={x - 150 * s} y={y + 60 * s} width={300 * s} height={40} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(5)} />
          <Grain x={x - 146 * s} y={y + 62 * s} w={292 * s} h={36} n={2} seed={seed} />
          <g transform={`translate(${x + 90 * s}, ${y + 30 * s})`}><MiniRocker on={f > 8 + seed * 9 ? 1 : 0} s={0.45} /></g>
        </g>
      );
    }))}
    {lineId && <Lyric id={lineId} f={f} g={g} y={1020} size={58} />}
  </Bg>
);

// S57: the final chorus's first line, "Default on! Default on!": the whole classroom
export const S57: ShotC = ({ f, g }) => <Classroom f={f} g={g} lineId="L61" />;

// a row of desks seen low and close: three kids and their rockers. In S57b (`gag`) each kid tries, in turn, to switch
// theirs off, with their hands (the human's note, 2026-11-06): a finger pushes it OFF and it springs back ON; a heavy
// book is dropped on it and bounces off; an OFF sticky note is stuck over it and flutters away. Each ends ON.
const Desks: React.FC<{ f: number; g: number; len: number; lineId: string; gag?: boolean }> = ({ f, g, len, lineId, gag }) => (
  <Bg id="s57a" seed={57} base={C.mustard}>
    <Wallpaper id="s57a" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
    {"KLMNOPQ".split("").map((ch, i) => <g key={ch} transform={`translate(${100 + i * 270}, 30)`}><rect width={220} height={60} rx={6} fill={[C.teal, C.orange, C.avocado, C.red][i % 4]} stroke={C.ink} strokeWidth={lw(3)} /><text x={110} y={46} textAnchor="middle" fontFamily={BUBBLE} fontSize={42} fill={C.ink}>{ch}{ch.toLowerCase()}</text></g>)}
    {[0, 1, 2].map((i) => {
      const x = 380 + i * 580, seed = 3 + i * 2, S = 1.25;
      const beat = (len / 3) * i, t = f - beat, part = len / 3;
      const sw = { x, y: 612 }; // the rocker stands centred on the desktop, in front of the kid, big enough to read
      const local = (wx: number, wy: number) => ({ x: (wx - x) / S, y: (wy - 420) / S });
      // the gag's timeline for this kid: 0..1 within its third of the shot
      const u = gag ? Math.max(0, Math.min(1, t / part)) : 0;
      let on = gag ? 1 : f > beat + 6 ? 1 : 0;
      let arms: [{ x: number; y: number; point?: boolean }, { x: number; y: number; point?: boolean }] = [local(x - 120, 690), local(x + 120, 690)];
      let extra: React.ReactNode = null;
      let mouth = mouthAt(g + seed * 2, "narrator");
      const pop = gag && t >= 0 && t < part ? bump(u, 0.62, 0.12) : 0;
      if (gag && t >= 0 && t < part) {
        if (i === 0) { // a finger pushes it OFF; it springs back ON
          on = u > 0.3 && u < 0.6 ? 0 : 1;
          arms = [local(x - 120, 690), { ...local(sw.x - 70, sw.y + (u < 0.6 ? 30 : -30)), point: true }];
          mouth = u > 0.6 ? "E" : "A";
        } else if (i === 1) { // a heavy book dropped on it bounces off
          const drop = ez(u, 0.15, 0.35), fly = ez(u, 0.6, 0.85);
          on = u > 0.35 && u < 0.6 ? 0 : 1;
          arms = u < 0.35 ? [local(sw.x - 90, 560 + drop * 60), local(sw.x + 90, 560 + drop * 60)] : [local(x - 120, 690), local(x + 120, 690)];
          extra = <g transform={`translate(${sw.x + fly * 160}, ${560 + drop * 60 - fly * 220}) rotate(${fly * 140})`}>
            <rect x={-110} y={-40} width={220} height={80} rx={6} fill={C.teal} stroke={C.ink} strokeWidth={lw(5)} />
            <rect x={-110} y={22} width={220} height={18} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />
            <text x={0} y={8} textAnchor="middle" fontFamily={BUBBLE} fontSize={28} fill={C.cream}>BIG BOOK</text>
          </g>;
          mouth = u > 0.6 ? "D" : "X";
        } else { // an OFF sticky note stuck over it flutters away
          const stick = ez(u, 0.1, 0.3), off = ez(u, 0.6, 0.95);
          on = u > 0.3 && u < 0.6 ? 0 : 1;
          arms = u < 0.3 ? [local(x - 120, 690), local(sw.x + 30, sw.y - 40 + stick * 40)] : [local(x - 120, 690), local(x + 120, 690)];
          extra = u > 0.05 && <g transform={`translate(${sw.x + off * 140 + Math.sin(off * 12) * 30}, ${sw.y - off * 300}) rotate(${off * 200 - 6})`} opacity={1 - off * 0.6}>
            <rect x={-56} y={-56} width={112} height={112} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />
            <text x={0} y={16} textAnchor="middle" fontFamily={BUBBLE} fontSize={44} fill={C.ink}>OFF</text>
          </g>;
          mouth = u > 0.6 ? "D" : "B";
        }
      }
      return (
        <g key={i}>
          <g transform={`translate(${x}, 420) scale(${S})`}><Kid seed={seed} mouth={mouth} look={gag ? [0.6, 0.9] : [0, 0]} /></g>
          <rect x={x - 260} y={700} width={520} height={60} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(7)} />
          <Grain x={x - 256} y={704} w={512} h={52} n={2} seed={seed} />
          <rect x={x - 240} y={760} width={480} height={330} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(7)} />
          <rect x={x - 200} y={790} width={400} height={60} rx={6} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(4)} />
          {/* on the desk: an open notebook, a pencil, an eraser; an apple on one */}
          <g transform={`translate(${x - 150}, 690)`}><path d="M-70,0 L0,-14 L70,0 L70,8 L0,-6 L-70,8 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(3)} /><line x1={0} y1={-14} x2={0} y2={-6} {...PEN} /></g>
          <rect x={x - 40} y={684} width={90} height={10} rx={4} fill={C.mustard} stroke={C.ink} strokeWidth={lw(2)} transform={`rotate(-6, ${x}, 690)`} />
          <rect x={x + 210} y={680} width={30} height={18} rx={4} fill="#e8a0a0" stroke={C.ink} strokeWidth={lw(2)} />
          {i === 1 && <g transform={`translate(${x - 220}, 670)`}><circle r={22} fill={C.red} stroke={C.ink} strokeWidth={lw(3)} /><path d="M0,-22 q4,-10 10,-12" stroke={C.ink} strokeWidth={3} fill="none" /></g>}
          <g transform={`translate(${sw.x}, ${sw.y - pop * 30}) rotate(${pop * 8})`}><MiniRocker on={on} s={1.5} /></g>
          {/* the arms in front of the desk, so the hands are seen at work */}
          <g transform={`translate(${x}, 420) scale(${S})`}><Kid seed={seed} arms={arms} armsOnly /></g>
          {extra}
          {gag && t >= 0 && t < part && u > 0.6 && u < 0.85 && <text x={sw.x + 70} y={sw.y - 100} fontFamily={BUBBLE} fontSize={60} fill={C.orange} stroke={C.ink} strokeWidth={4} paintOrder="stroke">{i === 0 ? "boing!" : "ON!"}</text>}
        </g>
      );
    })}
    <Lyric id={lineId} f={f} g={g} y={1030} size={58} />
  </Bg>
);
// S57a: "It was there when we woke up…": low and close along a row of desks; the rockers rock ON one after another
export const S57a: ShotC = ({ f, g, len }) => <Desks f={f} g={g} len={len} lineId="L62" />;
// S57b: "We can hide it, we can mute it…": the kids try the chorus gags on their own switches; each rocks back ON
export const S57b: ShotC = ({ f, g, len }) => <Desks f={f} g={g} len={len} lineId="L63" gag />;

// S57c: "But the switch is just a picture…": close on Switch in the front row, mouthing along; a corner of his plate
// lifts like a sticker, and he presses it flat again
export const S57c: ShotC = ({ f, g, len }) => {
  const lift = ez(f, len * 0.35, len * 0.5) * (1 - ez(f, len * 0.7, len * 0.8));
  const d = 20 + lift * 90;
  const fx = 125, fy = 195;
  return (
    <Bg id="s57c" seed={57} base={C.mustard}>
      <Wallpaper id="s57c" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
      <rect x={0} y={860} width={W} height={220} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
      <Grain x={0} y={866} w={W} h={200} n={4} seed={3} />
      {[260, 1660].map((x, i) => <g key={x} transform={`translate(${x}, 560) scale(1.1)`} opacity={0.85}><Kid seed={8 + i} mouth={mouthAt(g + i * 3, "narrator")} /></g>)}
      <g transform="translate(960, 520) scale(1.25)">
        <clipPath id="s57c-peel"><path d={`M-600,-600 L600,-600 L600,${fx + fy - d - 600} L${fx + fy - d - 600},600 L-600,600 Z`} /></clipPath>
        <g clipPath="url(#s57c-peel)"><Switch pose={lift > 0.3 ? "startled" : "neutral"} mouth={mouthAt(g, "narrator")} armR={lift > 0.5 ? 60 : 25} look={lift > 0.3 ? [0.6, 0.7] : [0, 0]} blink={blink(g, 11)} flat /></g>
        <path d={`M${fx},${fy - d} L${fx - d},${fy} L${fx - d},${fy - d} Z`} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} strokeLinejoin="round" />
      </g>
      <Lyric id="L64" f={f} g={g} y={1030} size={58} />
    </Bg>
  );
};

// S58: last "Default on!": pull back; the classroom is on the TV in the living room from S29-S30 (same room, by day),
// and the new tile from S30 winks from the screen's corner
export const S58: ShotC = ({ f, g, len }) => {
  const back = ez(f, 0, len * 0.6);
  const TVX = 760, TVY = 520, SW = 760, SH = 760 * 0.58; // the TV's screen in the living room (Lesson.tsx S30)
  // the classroom layer maps from the full frame to the screen's rectangle as the camera pulls back
  const sx = 1 - back * (1 - SW / W), sy = 1 - back * (1 - SH / H);
  const cx = W / 2 + (TVX - W / 2) * back, cy = H / 2 + (TVY - H / 2) * back;
  return (
    <>
      <Living id="s58" night={false} g={g}>
        <g transform={`translate(${TVX}, ${TVY})`}><TV w={SW}><rect width={W} height={W * 0.58} fill={C.ink} /></TV></g>
      </Living>
      <div style={{ position: "absolute", left: cx - (W * sx) / 2, top: cy - (H * sy) / 2, width: W, height: H,
        transform: `scale(${sx}, ${sy})`, transformOrigin: "0 0", overflow: "hidden" }}>
        <Classroom f={f + 200} g={g} />
      </div>
      {back > 0.7 && (
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <g transform={`translate(${TVX + SW / 2 - 70}, ${TVY + SH / 2 - 60})`}><Tile color={C.mustard} glyph="spark" size={90} wink={f > len * 0.8 ? 1 : 0} /></g>
        </svg>
      )}
    </>
  );
};

// S59: V18 "I've got two sides.": Switch alone on a black wall under a spotlight
const Alone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Bg id="s61" seed={61} base={C.dark}>
    <Wallpaper id="s61a" kind="daisy" a="#3a3236" b="#2a2427" opacity={0.5} />
    <rect x={-20} y={880} width={W + 40} height={200} fill="#151214" stroke={C.ink} strokeWidth={lw(6)} />
    <rect x={-10} y={860} width={W + 20} height={22} fill="#2e282b" stroke={C.ink} strokeWidth={lw(4)} />
    <Spotlight />
    <ellipse cx={W / 2} cy={880} rx={260} ry={30} fill={C.cream} opacity={0.08} />
    {children}
  </Bg>
);
export const S59: ShotC = ({ g }) => (
  <Alone><g transform={`translate(${W / 2}, 540)`}><Switch pose="sad" toggle={1} mouth={mouthAt(g, "switch")} blink={blink(g, 10)} /></g></Alone>
);

// S60: [click] ×2 (the human's master): he flips himself off on each click and springs back; on the last the hand enters
export const S60: ShotC = ({ f, g }) => {
  const clicks = events.clicks_outro.map((t) => at(t) - (g - f));
  const k = clicks.filter((c) => f >= c).length; // clicks so far
  const pressed = k > 0 && f - clicks[k - 1] < 4; // the OFF moment before he springs back
  return (
    <Alone>
      <g transform={`translate(${W / 2}, 540)`}><Switch pose={pressed ? "relaxed" : "sad"} toggle={pressed ? 0 : 1} armL={pressed ? 70 : 20} armR={pressed ? 70 : 20} mouth={mouthAt(g, "switch")} /></g>
      {k >= clicks.length && <g transform={`translate(-40, ${FLIP_Y})`}><Hand reach={ez(f, clicks[clicks.length - 1], clicks[clicks.length - 1] + 8) * 0.84} length={FLIP_LEN} /></g>}
    </Alone>
  );
};

export const S61: ShotC = ({ f, g }) => <S61Key f={f} mouth={mouthAt(g, "switch")} />; // he sings V18's second half

// S62: "And that's how an opt-out works! Join us next week…": the Narrator wraps up at his desk; an end slate starts
// to slide in
export const S62: ShotC = ({ f, g, len }) => (
  <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="open" size={80}>
    <g transform={`translate(${W + 400 - ez(f, len * 0.5, len) * 760}, 380)`}><Slate text="NEXT WEEK:" w={640} color={C.teal} /></g>
  </NarratorSet>
);

// S63: [pop-up chime] / "Who asked for that?": a "Summary of this song" box pops up over everything; its close button
// runs from the cursor. S64: V19 "Hey, who wrote this song, anyway?": Switch shoves the summary box out of frame
const SUMMARY = [
  "This animated music video uses the style of a 1970s",
  "educational cartoon to explain how AI features are often",
  "switched on by default in everyday apps and devices. A",
  "narrator and a talking light switch walk through examples,",
  "including search results, email, smart TVs, chat apps,",
  "phone updates and software subscriptions, showing how",
  "hard these features can be to turn off. The video ends by",
  "revealing that the song itself was written by AI.",
];
// the close button runs from the pointer (the human's note, 2026-11-09: make the evading clearer): the pointer glides
// in on the button; just before it lands the button darts to another spot in the box, leaving speed lines; the pointer
// stops short where the button was, then sets off after it again. One chase every CHASE frames
const SPOTS = [[340, -232], [-140, 150], [370, 100], [-360, -110], [110, -232], [330, -40], [-300, 190]];
const CHASE = 20;
const chaseAt = (f: number) => {
  const i = Math.max(0, Math.floor(f / CHASE)), t = f - i * CHASE, n = SPOTS.length;
  const from = SPOTS[i % n], to = SPOTS[(i + 1) % n], prev = i > 0 ? SPOTS[(i - 1) % n] : [from[0] - 260, from[1] + 220];
  const dart = ez(t, 13, 17);
  const b = [from[0] + (to[0] - from[0]) * dart, from[1] + (to[1] - from[1]) * dart];
  const reach = ez(t, 0, 12);
  const cur = [prev[0] + 16 + (from[0] - prev[0]) * reach, prev[1] + 18 + (from[1] - prev[1]) * reach];
  return { b, cur, from, dart, t };
};
const Summary: React.FC<{ x: number; f: number; pop: number }> = ({ x, f, pop }) => {
  const { b, cur, from, dart } = chaseAt(f);
  const [bx, by] = b;
  return (
    <g transform={`translate(${x}, 520) scale(${pop})`}>
      <rect x={-460} y={-280} width={920} height={560} rx={24} fill={C.white} stroke={C.ink} strokeWidth={lw(8)} />
      <rect x={-460} y={-280} width={920} height={90} rx={24} fill={C.mustard} stroke={C.ink} strokeWidth={lw(8)} />
      <path d="M-420,-258 l8,18 l18,8 l-18,8 l-8,18 l-8,-18 l-18,-8 l18,-8 Z" fill={C.orange} stroke={C.ink} strokeWidth={lw(3)} />
      <text x={-380} y={-218} fontFamily={SANS} fontWeight={600} fontSize={40} fill={C.ink}>Summary of this song</text>
      {/* written the way an auto-generated video summary reads (the human's note, 2026-11-06) */}
      {SUMMARY.map((ln, i) => <text key={i} x={-410} y={-138 + i * 44} fontFamily={SANS} fontSize={29} fill={C.ink}>{ln}</text>)}
      <line x1={-430} x2={430} y1={196} y2={196} stroke={C.creamShade} strokeWidth={3} />
      <text x={-410} y={240} fontFamily={SANS} fontSize={24} fill={C.inkSoft}>AI-generated summary · Was this helpful?</text>
      {[0, 1].map((k) => <g key={k} transform={`translate(${130 + k * 64}, 230) rotate(${k ? 180 : 0})`}>
        <path d="M-14,-4 h8 v20 h-8 Z M-4,-4 q6,-14 10,-22 q8,0 6,12 l-2,8 h14 q8,2 4,10 l-6,14 q-2,4 -8,4 h-18 Z" fill="none" stroke={C.inkSoft} strokeWidth={2.5} strokeLinejoin="round" />
      </g>)}
      {/* speed lines from where the button was, while it darts */}
      {dart > 0 && dart < 1 && [-12, 0, 12].map((o) => {
        const dx = bx - from[0], dy = by - from[1], len = Math.hypot(dx, dy) || 1;
        return <line key={o} x1={from[0] - (dy / len) * o} y1={from[1] + (dx / len) * o} x2={bx - (dx / len) * 34 - (dy / len) * o} y2={by - (dy / len) * 34 + (dx / len) * o} stroke={C.ink} strokeWidth={lw(4)} strokeLinecap="round" opacity={0.6} />;
      })}
      <g transform={`translate(${bx}, ${by}) scale(${1 + 0.15 * Math.sin(dart * Math.PI)})`}><circle r={26} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} /><path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke={C.ink} strokeWidth={lw(5)} /></g>
      <g transform={`translate(${cur[0]}, ${cur[1]})`}><path d="M0,0 L0,44 L12,32 L22,54 L30,50 L20,28 L36,28 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(4)} /></g>
    </g>
  );
};
// S63 starts on the piano (the human's note); S62 carries on underneath it, its slate still sliding. In S63's last
// 24 frames Switch walks in from the right edge, and in S64 he finishes the walk before he shoves, so he never pops in
// (the human's note: he came in very suddenly)
const SWX = W / 2 + 560; // where Switch stands to shove
const walkIn = (k: number) => W + 260 - (W + 260 - SWX) * k; // k 0 (off the right edge) .. 1 (in place)
const WalkingSwitch: React.FC<{ x: number; f: number; g: number; walking: boolean; shove?: number }> = ({ x, f, g, walking, shove = 0 }) => (
  <g transform={`translate(${x}, ${560 - (walking ? Math.abs(Math.sin(f / 3)) * 18 : 0)}) rotate(${walking ? Math.sin(f / 3) * 4 : -shove * 8}) scale(0.6)`}>
    <Switch pose={walking ? "curious" : "proud"} mouth={mouthAt(g, "switch")} armL={walking ? 30 + Math.sin(f / 3) * 20 : 95} armR={walking ? 30 - Math.sin(f / 3) * 20 : 95} look={[-1, 0]} blink={blink(g, 6)} />
  </g>
);
export const S63: ShotC = ({ f, g, len }) => {
  const s62 = shot("S62").frame, s63 = shot("S63").frame;
  const k = ez(f, len - 24, len + 12) / ez(len, len - 24, len + 12); // the first two-thirds of his walk, ending on the cut
  return (
    <>
      <S62 f={g - s62} g={g} len={s63 - s62} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <Summary x={W / 2} f={f} pop={ez(f, 0, 6) + bump(f, 6, 4) * 0.08} />
        {f >= len - 24 && <WalkingSwitch x={walkIn(k * 0.66)} f={f} g={g} walking />}
      </svg>
    </>
  );
};
export const S64: ShotC = ({ f, g, len }) => {
  const walk = 0.66 + 0.34 * ez(f, 0, 12);
  const shove = ez(f, len * 0.55, len * 0.85);
  return (
    <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="down" head={-1} size={80}>
      <Summary x={W / 2 - shove * 1600} f={g - shot("S63").frame} pop={1} />{/* the close button keeps fleeing across the cut */}
      <WalkingSwitch x={walkIn(walk) - shove * 1600} f={f} g={g} walking={f < 12} shove={shove} />
    </NarratorSet>
  );
};

// FG and the other closing cards are in Cards.tsx (M5)

// S68 is retired (the human, 2026-11-09): the swag shot is cut; its disclosure becomes a credits card after fact
// card G (M5)

// S65-S67: real material. Until it lands, stand-ins say what goes there; the film layer is off from S65 (Cut.tsx)
export const S65: ShotC = () => <Stand label="S65 · REAL SCREEN CAPTURE" note="The generation screen: style prompt, lyrics, take list (the human supplies it)" />;
export const S66: ShotC = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex" }}>
    <div style={{ flex: 1, position: "relative" }}><Stand label="S66 · LEFT" note="The generation screen" /></div>
    <div style={{ flex: 1, position: "relative", borderLeft: `6px solid ${C.cream}` }}><Stand label="S66 · RIGHT" note="The editing timeline: the Switch track, 'Switch: recorded at home', its waveform playing" /></div>
  </div>
);
// S67: the human's real footage (assets/real/S67, cut and graded by scripts/s67_grade.sh into S67_graded.mp4): a
// light switch on a plain wall; a small hand reaches in and waits; on the band's last note it flips the switch and the
// room's light goes out, so the frame goes dark and stays dark through the hold. Shortly before the flip, Switch's
// disclosure in the human's words (the human's note, 2026-11-09); it goes dark with the room
const SWITCH_DISCLOSURE = "Switch is voiced by a child of two ex-Googlers and ex-Microsofties. No pitch correction was used on his solo singing.";
export const S67: ShotC = ({ f, g }) => {
  const cur = useCurrentFrame();
  const off = at(events.last_note) - (g - f); // the flip, in the shot's frames
  const cap = ez(f, off - 140, off - 132);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={cur - f}><OffthreadVideo src={staticFile("S67_graded.mp4")} muted style={{ width: W, height: H }} /></Sequence>
      {f < off && cap > 0 && <svg width={W} height={H} style={{ position: "absolute" }} opacity={cap}><Caption text={SWITCH_DISCLOSURE} /></svg>}
    </AbsoluteFill>
  );
};
