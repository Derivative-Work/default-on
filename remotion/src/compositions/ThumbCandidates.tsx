// Thumbnail candidates (the human's request, 2026-11-10: "the more clickable (or even clickbait-adjacent) the
// better"). Same rules as `Thumbnail`: the film's own characters and sets, no child, no real hand, no generation
// screen or timeline, no company names, logos or product UI. Each is a still at 1920x1080.
import React from "react";
import { Film } from "../film/Film";
import { Bg } from "../shots/common";
import { Night } from "../shots/Chorus";
import { ContinuePhone } from "../shots/Quiz";
import { Hand, TIP_Y } from "../rigs/Hand";
import { PADDLE, Switch, SwitchProps } from "../rigs/Switch";
import { Sunburst } from "../components/sets";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W, lw } from "../theme/palette";

// big thumbnail text: bubble letters, thick ink outline and a drop shadow, so it reads at phone size
const Big: React.FC<{ x: number; y: number; size: number; text: string; fill?: string; rot?: number; anchor?: "start" | "middle" | "end" }> = ({
  x, y, size, text, fill = C.cream, rot = 0, anchor = "middle",
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
    <text x={size * 0.06} y={size * 0.07} textAnchor={anchor} fontFamily={BUBBLE} fontSize={size} fill={C.ink} opacity={0.55}>{text}</text>
    <text textAnchor={anchor} fontFamily={BUBBLE} fontSize={size} fill={fill} stroke={C.ink} strokeWidth={size * 0.09} paintOrder="stroke">{text}</text>
  </g>
);

// the hand-drawn red ring: two loose passes that don't quite close
const Ring: React.FC<{ x: number; y: number; rx: number; ry: number; rot?: number }> = ({ x, y, rx, ry, rot = -8 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rot})`} fill="none" stroke={C.red} strokeLinecap="round">
    <path d={`M${rx * 0.9},${-ry * 0.5} C${rx * 1.15},${ry * 0.6} ${rx * 0.2},${ry * 1.1} ${-rx * 0.5},${ry * 0.9} C${-rx * 1.2},${ry * 0.6} ${-rx * 1.05},${-ry * 0.8} ${-rx * 0.2},${-ry * 1.02} C${rx * 0.5},${-ry * 1.15} ${rx * 1.05},${-ry * 0.7} ${rx * 1.02},${-ry * 0.1}`} strokeWidth={16} />
    <path d={`M${rx * 0.95},${-ry * 0.3} C${rx * 1.05},${ry * 0.7} ${-rx * 0.4},${ry * 1.05} ${-rx * 0.95},${ry * 0.3}`} strokeWidth={7} opacity={0.8} />
  </g>
);

// a fat red arrow, its tip at (x, y), pointing along `deg`
const Arrow: React.FC<{ x: number; y: number; deg: number; len?: number }> = ({ x, y, deg, len = 260 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${deg})`}>
    <path d={`M0,0 L-90,-70 L-80,-26 L${-len},-34 Q${-len - 12},0 ${-len},30 L-80,22 L-90,70 Z`} fill={C.red} stroke={C.ink} strokeWidth={lw(9)} strokeLinejoin="round" />
  </g>
);

const SwitchAt: React.FC<{ x: number; y: number; s: number } & SwitchProps> = ({ x, y, s, ...p }) => (
  <g transform={`translate(${x}, ${y}) scale(${s})`}><Switch blink={0} {...p} /></g>
);

// the grey hand from the left edge, its fingertip on Switch's paddle (bottom half: pushing him back ON)
const HandTo: React.FC<{ x: number; y: number; s: number; press?: number; half?: "top" | "bottom" }> = ({ x, y, s, press = 0.6, half = "bottom" }) => {
  const tipY = y + PADDLE[half].y * s;
  return <g transform={`translate(-40, ${tipY - TIP_Y * s}) scale(${s})`}><Hand reach={1} length={(x - 8 + 40) / s} press={press} /></g>;
};

const Burst: React.FC<{ id: string; a: string; b: string; cx?: number; cy?: number; children: React.ReactNode }> = ({ id, a, b, cx, cy, children }) => (
  <Bg id={id} base={a}>
    <Sunburst cx={cx} cy={cy} a={a} b={b} rays={28} />
    {children}
  </Bg>
);

// A: "THERE'S NO OFF": Switch huge and screaming on a red sunburst, the grey finger on his paddle, the paddle ringed
export const ThumbA: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Burst id="ta" a={C.orange} b={C.red} cx={1350} cy={560}>
      <SwitchAt x={1350} y={600} s={2.15} pose="startled" toggle={0.85} mouth="D" look={[-0.7, 0.3]} />
      <HandTo x={1350} y={600} s={2.15} />
      <Ring x={1350} y={630} rx={220} ry={230} />
      <Big x={40} y={330} size={210} text="THERE'S" anchor="start" rot={-6} />
      <Big x={60} y={590} size={250} text="NO OFF" anchor="start" fill={C.mustard} rot={-6} />
    </Burst>
  </Film>
);

// B: before / after: OFF and content on the left, ON and horrified on the right, the finger caught in the act
export const ThumbB: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Night id="tb" g={0}>
      <rect x={0} y={0} width={W / 2} height={H} fill="#0d1222" opacity={0.25} />
      <SwitchAt x={480} y={560} s={1.45} pose="relaxed" toggle={0} mouth="B" />
      <defs><clipPath id="tb-right"><rect x={W / 2} y={0} width={W / 2} height={H} /></clipPath></defs>
      <g clipPath="url(#tb-right)">
        <SwitchAt x={1450} y={560} s={1.45} pose="startled" toggle={1} mouth="E" look={[-0.8, 0.2]} />
        <HandTo x={1450} y={560} s={1.45} />
      </g>
      <rect x={W / 2 - 14} y={-20} width={28} height={H + 40} fill={C.cream} stroke={C.ink} strokeWidth={lw(8)} />
      <Big x={480} y={200} size={190} text="OFF" fill={C.avocado} rot={-4} />
      <Big x={1450} y={200} size={190} text="ON?!" fill={C.red} rot={4} />
      <Big x={480} y={1000} size={86} text="11:58 PM" rot={-2} />
      <Big x={1450} y={1000} size={86} text="12:00 AM" fill={C.mustard} rot={2} />
    </Night>
  </Film>
);

// C: "YOU CHOSE THIS": the broccoli's stamp, slammed across a horrified Switch
export const ThumbC: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Burst id="tc" a={C.mustard} b="#f5c95a">
      <SwitchAt x={960} y={560} s={2.0} pose="startled" toggle={1} mouth="E" look={[0, -0.2]} />
      {/* the pre-ticked box he never ticked */}
      <g transform="translate(330, 360) rotate(-8)">
        <rect x={-110} y={-110} width={220} height={220} rx={18} fill={C.cream} stroke={C.ink} strokeWidth={lw(12)} />
        <path d="M-70,0 L-20,60 L90,-80" fill="none" stroke={C.avocado} strokeWidth={42} strokeLinecap="round" strokeLinejoin="round" />
        <text y={190} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={50} fill={C.ink}>pre-selected</text>
      </g>
      <Arrow x={470} y={350} deg={200} len={240} />
      <g transform="translate(1010, 760) rotate(-9)">
        <rect x={-760} y={-125} width={1520} height={210} rx={14} fill={C.cream} stroke={C.red} strokeWidth={16} opacity={0.97} />
        <rect x={-735} y={-102} width={1470} height={164} rx={8} fill="none" stroke={C.red} strokeWidth={6} />
        <text x={0} y={42} textAnchor="middle" fontFamily={BUBBLE} fontSize={150} fill={C.red} letterSpacing={6}>YOU CHOSE THIS</text>
      </g>
      {[[230, 680], [1800, 640], [300, 920], [1720, 930], [1500, 600]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={10 + (i % 3) * 5} fill={C.red} opacity={0.8} />)}
    </Burst>
  </Film>
);

// D: "WHERE'S THE 'NO'?": the one-button phone, an empty ringed gap where "No" should be, Switch pointing at it
export const ThumbD: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Burst id="td" a={C.teal} b="#4fa3cf" cx={1250} cy={560}>
      <g transform="translate(1290, 560) scale(1.12) rotate(4)"><ContinuePhone /></g>
      {/* the empty strip under "Continue", where a "No" would go */}
      <Ring x={1285} y={915} rx={150} ry={52} rot={4} />
      <Big x={1285} y={945} size={78} text="?" fill={C.red} />
      <SwitchAt x={440} y={700} s={1.55} pose="startled" toggle={1} mouth="E" look={[0.9, 0.3]} armR={70} />
      <Big x={40} y={250} size={150} text="WHERE'S" anchor="start" rot={-5} />
      <Big x={70} y={420} size={150} text="THE &quot;NO&quot;?" anchor="start" fill={C.mustard} rot={-5} />
    </Burst>
  </Film>
);

// E: horror: a tiny Switch in the dark, an enormous grey arm reaching in from the edge
export const ThumbE: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Night id="te" g={0} dim={1}>
      <rect x={-20} y={-20} width={W + 40} height={H + 40} fill="#0d1222" opacity={0.35} />
      <SwitchAt x={1500} y={620} s={1.05} pose="startled" toggle={0.4} mouth="E" look={[-1, 0]} />
      {/* the arm, three times his size, its fingertip stopping just short of the paddle */}
      <g transform={`translate(-60, ${620 + PADDLE.bottom.y * 1.05 - TIP_Y * 3.1}) scale(3.1)`}><Hand reach={1} length={(1500 - 150) / 3.1} curl={0.15} /></g>
      <Big x={960} y={200} size={140} text="SOMEONE KEEPS" rot={-2} />
      <Big x={960} y={360} size={150} text="DOING THIS" fill={C.red} rot={-2} />
    </Night>
  </Film>
);

// F: "FIND THE OFF SWITCH": a pile of settings windows, one tiny switch ringed, an arrow at it
const Win: React.FC<{ x: number; y: number; w: number; h: number; title: string; rot: number; rows?: number }> = ({ x, y, w, h, title, rot, rows = 3 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
    <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} rx={14} fill={C.ink} opacity={0.35} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={C.paper} stroke={C.ink} strokeWidth={lw(8)} />
    <rect x={-w / 2} y={-h / 2} width={w} height={54} rx={14} fill={C.teal} stroke={C.ink} strokeWidth={lw(8)} />
    <text x={-w / 2 + 22} y={-h / 2 + 38} fontFamily={SANS} fontWeight={700} fontSize={30} fill={C.cream}>{title}</text>
    {Array.from({ length: rows }, (_, i) => (
      <g key={i} transform={`translate(0, ${-h / 2 + 100 + i * 52})`}>
        <rect x={-w / 2 + 24} y={-10} width={w * 0.5} height={20} rx={8} fill={C.creamShade} />
        <rect x={w / 2 - 96} y={-16} width={64} height={32} rx={16} fill={C.avocado} stroke={C.ink} strokeWidth={lw(4)} />
        <circle cx={w / 2 - 48} cy={0} r={13} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
      </g>
    ))}
  </g>
);
export const ThumbF: React.FC = () => (
  <Film strength={1} splices={[]}>
    <Burst id="tf" a="#e9e0cf" b="#f3ead9" cx={1200} cy={600}>
      <Win x={1000} y={560} w={560} h={330} title="Settings" rot={-7} rows={4} />
      <Win x={1370} y={470} w={520} h={300} title="Privacy" rot={5} />
      <Win x={1180} y={760} w={540} h={300} title="More settings" rot={-2} />
      <Win x={1560} y={740} w={460} h={280} title="Advanced" rot={8} />
      <Win x={1500} y={260} w={480} h={260} title="Other" rot={-4} rows={2} />
      {/* the one that matters: a speck of a switch in a corner */}
      <g transform="translate(1790, 975)">
        <rect x={-22} y={-11} width={44} height={22} rx={11} fill={C.avocado} stroke={C.ink} strokeWidth={lw(3)} />
        <circle cx={11} r={8} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
      </g>
      <Ring x={1790} y={975} rx={80} ry={56} />
      <Arrow x={1700} y={940} deg={25} len={300} />
      <SwitchAt x={300} y={720} s={1.35} pose="curious" toggle={1} mouth="E" look={[0.9, 0.4]} />
      <Big x={40} y={200} size={150} text="FIND THE" anchor="start" rot={-4} />
      <Big x={60} y={370} size={150} text="OFF SWITCH" anchor="start" fill={C.red} rot={-4} />
    </Burst>
  </Film>
);
