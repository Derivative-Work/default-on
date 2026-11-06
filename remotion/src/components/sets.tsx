// Set dressing for the M4 detail pass: the furniture and wall decoration of a 1970s classroom and living room, all
// generic, all drawn in the house ink. Each piece is drawn around its own origin in 1920x1080 units.
import React from "react";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W, lw } from "../theme/palette";

const ink = { stroke: C.ink, strokeWidth: lw(6), strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// wallpaper: a repeating pattern over a rectangle; "stripe" (two-tone), "daisy" (small flowers) or "diamond"
export const Wallpaper: React.FC<{ id: string; kind: "stripe" | "daisy" | "diamond"; a: string; b: string; x?: number; y?: number; w?: number; h?: number; opacity?: number }> = ({
  id, kind, a, b, x = -40, y = -40, w = W + 80, h = H + 80, opacity = 0.32,
}) => (
  <g opacity={opacity * 0.5}>
    <defs>
      <pattern id={`wp-${id}`} width={kind === "stripe" ? 80 : 120} height={kind === "stripe" ? 80 : 120} patternUnits="userSpaceOnUse">
        {kind === "stripe" && <><rect width={40} height={80} fill={a} /><rect x={40} width={40} height={80} fill={b} /><rect x={36} width={8} height={80} fill={C.cream} opacity={0.5} /></>}
        {kind === "daisy" && <>{[[30, 30], [90, 90]].map(([cx, cy]) => <g key={cx} transform={`translate(${cx}, ${cy})`}>
          {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cx={0} cy={-11} rx={6} ry={11} fill={a} transform={`rotate(${r})`} />)}
          <circle r={6} fill={b} /></g>)}</>}
        {kind === "diamond" && <><path d="M60,0 L120,60 L60,120 L0,60 Z" fill="none" stroke={a} strokeWidth={6} /><circle cx={60} cy={60} r={8} fill={b} /></>}
      </pattern>
    </defs>
    <rect x={x} y={y} width={w} height={h} fill={`url(#wp-${id})`} />
  </g>
);

// a 70s sunburst: alternating rays from a centre
export const Sunburst: React.FC<{ cx?: number; cy?: number; a: string; b: string; rays?: number; spin?: number }> = ({
  cx = W / 2, cy = H / 2, a, b, rays = 24, spin = 0,
}) => (
  <g transform={`translate(${cx}, ${cy}) rotate(${spin})`}>
    <circle r={1600} fill={a} />
    {Array.from({ length: rays }, (_, i) => {
      const t0 = (i / rays) * Math.PI * 2, t1 = ((i + 0.5) / rays) * Math.PI * 2;
      return <path key={i} d={`M0,0 L${Math.cos(t0) * 1600},${Math.sin(t0) * 1600} L${Math.cos(t1) * 1600},${Math.sin(t1) * 1600} Z`} fill={b} />;
    })}
  </g>
);

// a school clock with a ticking second hand (time in seconds drives the hands)
export const Clock: React.FC<{ t: number; r?: number }> = ({ t, r = 70 }) => {
  const sec = Math.floor(t) % 60, min = (t / 60 + 17) % 60;
  return (
    <g>
      <circle r={r} fill={C.white} {...ink} strokeWidth={lw(8)} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r * 0.82} x2={0} y2={-r * 0.68} stroke={C.ink} strokeWidth={i % 3 ? 3 : 6} transform={`rotate(${i * 30})`} />)}
      <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={C.ink} strokeWidth={lw(8)} strokeLinecap="round" transform={`rotate(${(10 + min / 60) * 30})`} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.7} stroke={C.ink} strokeWidth={lw(5)} strokeLinecap="round" transform={`rotate(${min * 6})`} />
      <line x1={0} y1={r * 0.15} x2={0} y2={-r * 0.75} stroke={C.red} strokeWidth={3} transform={`rotate(${sec * 6})`} />
      <circle r={6} fill={C.ink} />
    </g>
  );
};

export const Globe: React.FC<{ spin?: number }> = ({ spin = 0 }) => (
  <g>
    <path d="M-50,150 L50,150 L20,120 L-20,120 Z" fill={C.cardigan} {...ink} />
    <line x1={0} y1={120} x2={0} y2={80} stroke={C.ink} strokeWidth={lw(10)} />
    <path d="M-95,-30 A100,100 0 1 0 60,-95" fill="none" stroke={C.mustard} strokeWidth={10} />
    <circle r={80} fill={C.teal} {...ink} />
    <clipPath id="globe-clip"><circle r={78} /></clipPath>
    <g clipPath="url(#globe-clip)">
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${((spin * 2) % 320) - 160 + k * 320 - 160}, 0)`}>
          <path d="M-40,-50 Q-10,-70 20,-40 Q30,-10 0,0 Q-30,20 -50,-10 Z M60,10 Q90,0 100,30 Q80,60 60,40 Z M-20,30 Q0,20 10,50 Q-10,70 -30,50 Z" fill={C.avocado} stroke={C.ink} strokeWidth={lw(3)} />
        </g>
      ))}
    </g>
    <circle r={80} fill="none" {...ink} />
  </g>
);

export const Plant: React.FC<{ sway?: number; s?: number }> = ({ sway = 0, s = 1 }) => (
  <g transform={`scale(${s})`}>
    {[-50, -20, 10, 40, 60].map((a, i) => (
      <path key={i} d={`M0,0 Q${a * 0.6 + sway * 6},-60 ${a + sway * 10},${-110 - (i % 2) * 30}`} fill="none" stroke={C.avocado} strokeWidth={14} strokeLinecap="round" />
    ))}
    {[-50, 10, 60].map((a, i) => <ellipse key={i} cx={a + sway * 10} cy={-110 - (i % 2) * 30} rx={22} ry={12} fill={C.avocado} stroke={C.ink} strokeWidth={lw(4)} transform={`rotate(${a}, ${a + sway * 10}, ${-110 - (i % 2) * 30})`} />)}
    <path d="M-55,0 L55,0 L42,90 L-42,90 Z" fill={C.orange} {...ink} />
    <rect x={-62} y={-10} width={124} height={22} rx={6} fill={C.red} {...ink} strokeWidth={lw(5)} />
  </g>
);

// books in a few palette colours, of varied heights; `n` per shelf, `shelves` stacked
export const Bookshelf: React.FC<{ w?: number; shelves?: number; seed?: number }> = ({ w = 360, shelves = 3, seed = 1 }) => {
  const cols = [C.red, C.teal, C.mustard, C.avocado, C.orange, C.cream, C.cardiganShade];
  return (
    <g>
      <rect x={-w / 2 - 14} y={-shelves * 130 - 14} width={w + 28} height={shelves * 130 + 28} fill={C.cardigan} {...ink} />
      {Array.from({ length: shelves }, (_, r) => {
        let x = -w / 2;
        const books = [];
        for (let i = 0; x < w / 2 - 30; i++) {
          const bw = 22 + ((seed * 13 + r * 7 + i * 11) % 22), bh = 80 + ((seed * 5 + r * 3 + i * 17) % 34);
          const lean = (seed + r + i) % 9 === 0;
          books.push(<rect key={i} x={x} y={-r * 130 - bh - 6} width={bw} height={bh} fill={cols[(seed + r * 3 + i) % cols.length]}
            stroke={C.ink} strokeWidth={lw(3)} transform={lean ? `rotate(12, ${x}, ${-r * 130 - 6})` : undefined} />);
          x += bw + (lean ? 18 : 2);
        }
        return <g key={r}>{books}<rect x={-w / 2 - 14} y={-r * 130 - 6} width={w + 28} height={14} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(3)} /></g>;
      })}
    </g>
  );
};

// a window with curtains; `sky` and an optional sun or moon
export const Window: React.FC<{ w?: number; h?: number; sky?: string; sun?: "sun" | "moon" | null; curtain?: string }> = ({
  w = 340, h = 420, sky = "#bcd3c9", sun = "sun", curtain = C.orange,
}) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={sky} {...ink} strokeWidth={lw(10)} />
    {sun === "sun" && <circle cx={w * 0.15} cy={-h * 0.15} r={46} fill={C.mustard} opacity={0.9} />}
    {sun === "moon" && <circle cx={w * 0.15} cy={-h * 0.15} r={40} fill={C.cream} />}
    <path d={`M${-w / 2 + 40},${h * 0.3} q60,-40 120,0 t120,0`} fill="none" stroke={C.white} strokeWidth={10} opacity={0.6} />
    <line x1={0} y1={-h / 2} x2={0} y2={h / 2} stroke={C.ink} strokeWidth={lw(8)} />
    <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke={C.ink} strokeWidth={lw(8)} />
    {[-1, 1].map((s) => (
      <path key={s} d={`M${s * (w / 2 + 30)},${-h / 2 - 20} L${s * (w / 2 - 50)},${-h / 2 - 20} Q${s * (w / 2 - 10)},0 ${s * (w / 2 - 30)},${h / 2 + 30} L${s * (w / 2 + 40)},${h / 2 + 30} Z`}
        fill={curtain} {...ink} />
    ))}
    <rect x={-w / 2 - 60} y={-h / 2 - 34} width={w + 120} height={20} rx={10} fill={C.cardigan} {...ink} strokeWidth={lw(4)} />
    <rect x={-w / 2 - 20} y={h / 2} width={w + 40} height={24} fill={C.creamShade} {...ink} strokeWidth={lw(5)} />
  </g>
);

export const Rug: React.FC<{ w?: number; color?: string }> = ({ w = 900, color = C.orange }) => (
  <g>
    <ellipse rx={w / 2} ry={w / 9} fill={color} {...ink} />
    <ellipse rx={w / 2 - 40} ry={w / 9 - 14} fill="none" stroke={C.mustard} strokeWidth={10} />
    <ellipse rx={w / 2 - 80} ry={w / 9 - 28} fill="none" stroke={C.cream} strokeWidth={6} opacity={0.7} />
  </g>
);

export const Pennant: React.FC<{ text: string; color?: string }> = ({ text, color = C.teal }) => (
  <g>
    <path d="M0,0 L320,50 L0,100 Z" fill={color} {...ink} />
    <text x={30} y={62} fontFamily={BUBBLE} fontSize={32} fill={C.cream} transform="rotate(4, 30, 62)">{text}</text>
  </g>
);

export const Lamp: React.FC<{ on?: boolean }> = ({ on = true }) => (
  <g>
    {on && <path d="M-80,-160 L80,-160 L220,200 L-220,200 Z" fill={C.cream} opacity={0.12} />}
    <path d="M-80,-260 L80,-260 L120,-160 L-120,-160 Z" fill={C.mustard} {...ink} />
    <line x1={0} y1={-160} x2={0} y2={180} stroke={C.ink} strokeWidth={lw(10)} />
    <ellipse cx={0} cy={190} rx={70} ry={18} fill={C.cardigan} {...ink} />
  </g>
);

// a framed picture: a painted landscape (hills, sun) or a sailboat
export const Picture: React.FC<{ w?: number; h?: number; kind?: "hills" | "boat" | "flowers" }> = ({ w = 300, h = 220, kind = "hills" }) => (
  <g>
    <rect x={-w / 2 - 18} y={-h / 2 - 18} width={w + 36} height={h + 36} fill={C.cardigan} {...ink} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#cfe0d4" stroke={C.ink} strokeWidth={lw(4)} />
    {kind === "hills" && <><circle cx={w * 0.2} cy={-h * 0.15} r={h * 0.14} fill={C.mustard} /><path d={`M${-w / 2},${h * 0.2} Q${-w * 0.2},${-h * 0.15} 0,${h * 0.15} Q${w * 0.25},${-h * 0.1} ${w / 2},${h * 0.18} L${w / 2},${h / 2} L${-w / 2},${h / 2} Z`} fill={C.avocado} /></>}
    {kind === "boat" && <><rect x={-w / 2} y={h * 0.1} width={w} height={h * 0.4} fill={C.teal} /><path d={`M${-w * 0.15},${h * 0.1} L${w * 0.15},${h * 0.1} L${w * 0.1},${h * 0.2} L${-w * 0.1},${h * 0.2} Z`} fill={C.red} /><path d={`M0,${h * 0.08} L0,${-h * 0.32} L${w * 0.14},${h * 0.05} Z`} fill={C.cream} stroke={C.ink} strokeWidth={lw(2)} /></>}
    {kind === "flowers" && <>{[-0.25, 0, 0.25].map((k) => <g key={k} transform={`translate(${k * w}, ${h * 0.05})`}><line x1={0} y1={0} x2={0} y2={h * 0.45} stroke={C.avocado} strokeWidth={6} />{[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx={0} cy={-14} rx={9} ry={14} fill={k ? C.orange : C.red} transform={`rotate(${r})`} />)}<circle r={8} fill={C.mustard} /></g>)}</>}
  </g>
);

export const Outlet: React.FC = () => (
  <g>
    <rect x={-36} y={-56} width={72} height={112} rx={10} fill={C.cream} {...ink} strokeWidth={lw(4)} />
    {[-24, 24].map((y) => <g key={y} transform={`translate(0, ${y})`}><rect x={-14} y={-8} width={6} height={16} fill={C.ink} /><rect x={8} y={-8} width={6} height={16} fill={C.ink} /></g>)}
  </g>
);

// chalk on the board: a little drawing of a rocker switch, an arrow, and some smudges
export const ChalkDoodles: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`} stroke={C.white} fill="none" strokeWidth={5} strokeLinecap="round" opacity={0.75}>
    <rect x={0} y={0} width={80} height={120} rx={10} />
    <rect x={20} y={25} width={40} height={70} rx={4} />
    <path d="M25,60 h30" />
    <path d="M110,40 q40,-30 80,0" />
    <path d="M180,30 l12,10 l-14,6" />
    <text x={120} y={110} fontFamily={SANS} fontSize={40} fill={C.white} stroke="none">ON / OFF</text>
    <ellipse cx={260} cy={-10} rx={60} ry={14} fill={C.white} stroke="none" opacity={0.15} />
  </g>
);

export const ChalkTray: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <g>
    <rect x={x} y={y} width={w} height={22} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(4)} />
    {[0.1, 0.16, 0.6].map((k, i) => <rect key={i} x={x + w * k} y={y - 10} width={44} height={12} rx={5} fill={i === 2 ? C.mustard : C.white} stroke={C.ink} strokeWidth={lw(2)} />)}
    <rect x={x + w * 0.75} y={y - 26} width={120} height={28} rx={6} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(4)} />
    <rect x={x + w * 0.75} y={y - 8} width={120} height={10} fill={C.creamShade} />
  </g>
);

// limited-animation idle: a slow breath (a tiny vertical squash) and sway, per character
export const breath = (g: number, seed = 0) => 1 + Math.sin((g + seed * 17) / 22) * 0.008;
export const sway = (g: number, seed = 0) => Math.sin((g + seed * 29) / 41) * 1.2;
