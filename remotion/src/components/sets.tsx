// Set dressing for the M4 detail pass: the furniture and wall decoration of a 1970s classroom and living room, all
// generic, all drawn in the house ink. Each piece is drawn around its own origin in 1920x1080 units.
import React from "react";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, PEN, W, lw } from "../theme/palette";

const ink = { stroke: C.ink, strokeWidth: lw(6), strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// wallpaper: a repeating pattern over a rectangle; "stripe" (two-tone), "daisy" (small flowers) or "diamond"
export const Wallpaper: React.FC<{ id: string; kind: "stripe" | "daisy" | "diamond"; a: string; b: string; x?: number; y?: number; w?: number; h?: number; opacity?: number }> = ({
  id, kind, a, b, x = -40, y = -40, w = W + 80, h = H + 80, opacity = 0.32,
}) => (
  <g>
    <defs>
      {/* the print's colour, faint */}
      <pattern id={`wp-${id}`} width={kind === "stripe" ? 80 : 120} height={kind === "stripe" ? 80 : 120} patternUnits="userSpaceOnUse">
        {kind === "stripe" && <><rect width={40} height={80} fill={a} /><rect x={40} width={40} height={80} fill={b} /></>}
        {kind === "daisy" && <>{[[30, 30], [90, 90]].map(([cx, cy]) => <g key={cx} transform={`translate(${cx}, ${cy})`}>
          {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cx={0} cy={-11} rx={6} ry={11} fill={a} transform={`rotate(${r})`} />)}
          <circle r={6} fill={b} /></g>)}</>}
        {kind === "diamond" && <><path d="M60,0 L120,60 L60,120 L0,60 Z" fill="none" stroke={a} strokeWidth={6} /><circle cx={60} cy={60} r={8} fill={b} /></>}
      </pattern>
      {/* the same print drawn with the pen: thin ink outlines over the colour */}
      <pattern id={`wpi-${id}`} width={kind === "stripe" ? 80 : 120} height={kind === "stripe" ? 80 : 120} patternUnits="userSpaceOnUse">
        {kind === "stripe" && <><line x1={40} y1={0} x2={40} y2={80} stroke={C.ink} strokeWidth={1.3} /><line x1={46} y1={0} x2={46} y2={80} stroke={C.ink} strokeWidth={0.9} /></>}
        {kind === "daisy" && <>{[[30, 30], [90, 90]].map(([cx, cy]) => <g key={cx} transform={`translate(${cx}, ${cy})`}>
          {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cx={0} cy={-11} rx={6} ry={11} fill="none" stroke={C.ink} strokeWidth={1.2} transform={`rotate(${r})`} />)}
          <circle r={2} fill={C.ink} /></g>)}
          <path d="M60,60 q8,-6 16,0 M0,60 q8,6 16,0" stroke={C.ink} strokeWidth={1} fill="none" /></>}
        {kind === "diamond" && <><path d="M60,0 L120,60 L60,120 L0,60 Z" fill="none" stroke={C.ink} strokeWidth={1.2} /><circle cx={60} cy={60} r={3} fill={C.ink} /></>}
      </pattern>
    </defs>
    <rect x={x} y={y} width={w} height={h} fill={`url(#wp-${id})`} opacity={opacity * 0.5} />
    <rect x={x} y={y} width={w} height={h} fill={`url(#wpi-${id})`} opacity={0.32} />
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
    <path d="M0,-80 Q-40,0 0,80 M0,-80 Q40,0 0,80 M-78,-20 Q0,-6 78,-20 M-78,20 Q0,34 78,20" {...PEN} opacity={0.6} />
    <circle r={80} fill="none" {...ink} />
  </g>
);

// A potted plant (the human's note: the old stalks-and-blobs plant didn't read): a terracotta pot with a rolled rim
// and a saucer, dark soil, and a cluster of broad pointed leaves on arching stems, each leaf a filled shape with a
// midrib and side veins, in two greens so the near leaves stand off the far ones; `sway` moves the tips a little
export const Plant: React.FC<{ sway?: number; s?: number }> = ({ sway = 0, s = 1 }) => {
  const LEAVES: [number, number, number, number][] = [ // [base angle, length, size, shade]
    [-62, 130, 1, 1], [-34, 160, 1.1, 0], [-8, 175, 1.15, 1], [16, 168, 1.1, 0], [40, 150, 1.05, 1], [66, 120, 0.95, 0],
    [-48, 100, 0.85, 0], [28, 108, 0.85, 1],
  ];
  return (
    <g transform={`scale(${s})`}>
      {LEAVES.map(([a, len, sz, shade], i) => {
        const r = ((a + sway * (4 + (i % 3))) * Math.PI) / 180;
        const tx = Math.sin(r) * len, ty = -Math.cos(r) * len * 0.95 - 6;
        const mx = tx * 0.45, my = ty * 0.7 - 20; // the stem arches up, then out
        const ang = (Math.atan2(ty - my, tx - mx) * 180) / Math.PI;
        return (
          <g key={i}>
            <path d={`M${(i - 4) * 4},-4 Q${mx},${my} ${tx},${ty}`} fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
            <path d={`M${(i - 4) * 4},-4 Q${mx},${my} ${tx},${ty}`} fill="none" stroke="#6f9a3e" strokeWidth={4.5} strokeLinecap="round" />
            <g transform={`translate(${tx}, ${ty}) rotate(${ang}) scale(${sz})`}>
              <path d="M0,0 Q22,-22 62,-4 Q70,0 62,4 Q22,22 0,0 Z" fill={shade ? C.avocado : "#5f8a34"} stroke={C.ink} strokeWidth={lw(4)} strokeLinejoin="round" />
              <path d="M2,0 L60,0" {...PEN} strokeWidth={1.6} />
              {[16, 30, 44].map((x) => <path key={x} d={`M${x},0 l8,-7 M${x},0 l8,7`} {...PEN} strokeWidth={1.2} opacity={0.7} />)}
            </g>
          </g>
        );
      })}
      {/* soil, pot, rim, saucer */}
      <ellipse cx={0} cy={-2} rx={52} ry={10} fill="#4a3424" stroke={C.ink} strokeWidth={lw(3)} />
      <path d="M-52,6 L52,6 L40,92 L-40,92 Z" fill={C.orange} {...ink} />
      <path d="M-30,30 q4,30 2,56 M18,28 q2,30 -2,58" {...PEN} opacity={0.5} />
      <rect x={-60} y={-8} width={120} height={22} rx={6} fill="#d9632a" {...ink} strokeWidth={lw(5)} />
      <path d="M-58,92 L58,92 L52,104 L-52,104 Z" fill="#d9632a" {...ink} strokeWidth={lw(4)} />
    </g>
  );
};

// books in a few palette colours, of varied heights; `n` per shelf, `shelves` stacked
export const Bookshelf: React.FC<{ w?: number; shelves?: number; seed?: number }> = ({ w = 360, shelves = 3, seed = 1 }) => {
  const cols = [C.red, C.teal, C.mustard, C.avocado, C.orange, C.cream, C.cardiganShade];
  return (
    <g>
      <rect x={-w / 2 - 14} y={-shelves * 130 - 14} width={w + 28} height={shelves * 130 + 28} fill={C.cardigan} {...ink} />
      <rect x={-w / 2} y={-shelves * 130} width={w} height={shelves * 130} fill="url(#pen-hatch)" opacity={0.6} />
      <Grain x={-w / 2 - 14} y={-shelves * 130 - 14} w={14} h={shelves * 130 + 28} n={1} vertical />
      {Array.from({ length: shelves }, (_, r) => {
        let x = -w / 2;
        const books = [];
        for (let i = 0; x < w / 2 - 30; i++) {
          const bw = 22 + ((seed * 13 + r * 7 + i * 11) % 22), bh = 80 + ((seed * 5 + r * 3 + i * 17) % 34);
          const lean = (seed + r + i) % 9 === 0;
          books.push(<g key={i} transform={lean ? `rotate(12, ${x}, ${-r * 130 - 6})` : undefined}>
            <rect x={x} y={-r * 130 - bh - 6} width={bw} height={bh} fill={cols[(seed + r * 3 + i) % cols.length]} stroke={C.ink} strokeWidth={lw(3)} />
            <line x1={x + 3} x2={x + bw - 3} y1={-r * 130 - bh + 10} y2={-r * 130 - bh + 10} {...PEN} />
            <line x1={x + 3} x2={x + bw - 3} y1={-r * 130 - 22} y2={-r * 130 - 22} {...PEN} />
            {bw > 30 && <line x1={x + bw / 2} x2={x + bw / 2} y1={-r * 130 - bh + 20} y2={-r * 130 - 34} {...PEN} opacity={0.5} />}
          </g>);
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
    <path d={`M${-w * 0.36},${-h * 0.3} l40,-40 M${-w * 0.3},${-h * 0.2} l26,-26 M${w * 0.12},${h * 0.18} l40,-40`} stroke={C.white} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
    <line x1={0} y1={-h / 2} x2={0} y2={h / 2} stroke={C.ink} strokeWidth={lw(8)} />
    <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke={C.ink} strokeWidth={lw(8)} />
    {[-1, 1].map((s) => (
      <path key={s} d={`M${s * (w / 2 + 30)},${-h / 2 - 20} L${s * (w / 2 - 50)},${-h / 2 - 20} Q${s * (w / 2 - 10)},0 ${s * (w / 2 - 30)},${h / 2 + 30} L${s * (w / 2 + 40)},${h / 2 + 30} Z`}
        fill={curtain} {...ink} />
    ))}
    {[-1, 1].map((s) => [0.3, 0.6].map((k) => <path key={`${s}${k}`} d={`M${s * (w / 2 + 30 - k * 60)},${-h / 2 - 14} q${s * 10},${h * 0.5} ${s * -6},${h + 36}`} {...PEN} />))}
    <rect x={-w / 2 - 60} y={-h / 2 - 34} width={w + 120} height={20} rx={10} fill={C.cardigan} {...ink} strokeWidth={lw(4)} />
    <rect x={-w / 2 - 20} y={h / 2} width={w + 40} height={24} fill={C.creamShade} {...ink} strokeWidth={lw(5)} />
  </g>
);

export const Rug: React.FC<{ w?: number; color?: string }> = ({ w = 900, color = C.orange }) => (
  <g>
    <ellipse rx={w / 2} ry={w / 9} fill={color} {...ink} />
    <ellipse rx={w / 2 - 40} ry={w / 9 - 14} fill="none" stroke={C.mustard} strokeWidth={10} />
    <ellipse rx={w / 2 - 80} ry={w / 9 - 28} fill="none" stroke={C.cream} strokeWidth={6} opacity={0.7} />
    {[-1, 1].map((s) => Array.from({ length: 9 }, (_, i) => <line key={`${s}${i}`} x1={s * (w / 2 - 2)} y1={-w / 18 + i * (w / 72)} x2={s * (w / 2 + 16)} y2={-w / 18 + i * (w / 72) + 3} {...PEN} />))}
  </g>
);

export const Pennant: React.FC<{ text: string; color?: string }> = ({ text, color = C.teal }) => (
  <g>
    <path d="M0,0 L320,50 L0,100 Z" fill={color} {...ink} />
    {/* on the pennant's centre line, small enough to stay inside the taper */}
    <text x={24} y={59} fontFamily={BUBBLE} fontSize={27} fill={C.cream} textLength={Math.min(170, text.length * 24)} lengthAdjust="spacingAndGlyphs">{text}</text>
  </g>
);

// A floor lamp, drawn from its foot: the origin is where the base meets the floor, so a shot places it on the floor
// line (the human's note: lamps must read as standing on the floor). A weighted dome base with a contact shadow and a
// cord trailing off along the boards, a pole with a collar, a pleated drum shade, a pull chain; `h` = pole height.
export const FloorLamp: React.FC<{ on?: boolean; h?: number }> = ({ on = true, h = 520 }) => (
  <g>
    {on && <path d={`M-80,${-h} L80,${-h} L240,0 L-240,0 Z`} fill={C.cream} opacity={0.12} />}
    <ellipse cx={10} cy={6} rx={120} ry={20} fill={C.ink} opacity={0.22} />
    <path d="M30,-6 q90,24 200,10 t220,8" fill="none" stroke={C.ink} strokeWidth={lw(5)} strokeLinecap="round" />
    <path d="M-78,0 Q-74,-40 0,-44 Q74,-40 78,0 Z" fill={C.cardigan} {...ink} />
    <path d="M-50,-14 Q0,-30 50,-14" {...PEN} opacity={0.7} />
    <rect x={-7} y={-h} width={14} height={h - 40} fill={C.ink} />
    <rect x={-14} y={-h * 0.55} width={28} height={22} rx={6} fill={C.mustard} {...ink} strokeWidth={lw(4)} />
    <path d={`M-84,${-h - 110} L84,${-h - 110} L120,${-h} L-120,${-h} Z`} fill={C.mustard} {...ink} />
    {[-60, -30, 0, 30, 60].map((x) => <line key={x} x1={x} y1={-h - 106} x2={x * 1.45} y2={-h - 4} {...PEN} />)}
    <path d={`M-120,${-h} L120,${-h}`} stroke={C.orange} strokeWidth={10} />
    <line x1={50} y1={-h} x2={50} y2={-h + 70} stroke={C.ink} strokeWidth={lw(3)} strokeDasharray="3 5" />
    <circle cx={50} cy={-h + 76} r={6} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
  </g>
);

// A table lamp: a ginger-jar base and a pleated shade, its origin where it stands on the table, with a contact shadow
export const TableLamp: React.FC<{ on?: boolean; s?: number; color?: string }> = ({ on = true, s = 1, color = C.teal }) => (
  <g transform={`scale(${s})`}>
    {on && <path d="M-60,-220 L60,-220 L190,0 L-190,0 Z" fill={C.cream} opacity={0.14} />}
    <ellipse cx={8} cy={4} rx={80} ry={14} fill={C.ink} opacity={0.22} />
    <path d="M-36,0 Q-70,-50 -44,-100 Q-30,-120 0,-120 Q30,-120 44,-100 Q70,-50 36,0 Z" fill={color} {...ink} />
    <path d="M-40,-70 Q0,-56 40,-70 M-46,-40 Q0,-26 46,-40" {...PEN} opacity={0.6} />
    <circle cx={-20} cy={-90} r={8} fill={C.white} opacity={0.5} />
    <rect x={-6} y={-158} width={12} height={40} fill={C.ink} />
    <path d="M-70,-240 L70,-240 L100,-156 L-100,-156 Z" fill={C.mustard} {...ink} />
    {[-48, -24, 0, 24, 48].map((x) => <line key={x} x1={x} y1={-236} x2={x * 1.4} y2={-160} {...PEN} />)}
  </g>
);

// a framed picture: a painted landscape (hills, sun) or a sailboat
export const Picture: React.FC<{ w?: number; h?: number; kind?: "hills" | "boat" | "flowers" }> = ({ w = 300, h = 220, kind = "hills" }) => (
  <g>
    <rect x={-w / 2 - 18} y={-h / 2 - 18} width={w + 36} height={h + 36} fill={C.cardigan} {...ink} />
    <path d={`M${-w / 2 - 18},${-h / 2 - 18} l18,18 M${w / 2 + 18},${-h / 2 - 18} l-18,18 M${-w / 2 - 18},${h / 2 + 18} l18,-18 M${w / 2 + 18},${h / 2 + 18} l-18,-18`} {...PEN} />
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

// a cast-iron radiator under a window: columns, a valve, a shadow on the wall
export const Radiator: React.FC<{ w?: number; h?: number }> = ({ w = 300, h = 150 }) => (
  <g>
    <rect x={-w / 2 + 10} y={8} width={w} height={h} rx={10} fill={C.ink} opacity={0.12} />
    {Array.from({ length: Math.floor(w / 26) }, (_, i) => (
      <rect key={i} x={-w / 2 + i * 26} y={0} width={22} height={h} rx={10} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(4)} />
    ))}
    <rect x={-w / 2 - 6} y={h - 26} width={w + 12} height={12} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(3)} />
    <circle cx={w / 2 + 20} cy={h - 20} r={12} fill={C.red} stroke={C.ink} strokeWidth={lw(3)} />
    <path d={`M${w / 2 - 4},${h - 20} h16`} stroke={C.ink} strokeWidth={6} />
  </g>
);

// a wall-mounted pencil sharpener with its crank and a shavings drawer
export const Sharpener: React.FC = () => (
  <g>
    <rect x={-30} y={-26} width={60} height={52} rx={8} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(4)} />
    <circle cx={-30} cy={0} r={10} fill={C.ink} />
    <path d="M30,0 h22 v30" fill="none" stroke={C.ink} strokeWidth={lw(6)} strokeLinecap="round" />
    <rect x={44} y={28} width={16} height={22} rx={6} fill={C.red} stroke={C.ink} strokeWidth={lw(3)} />
    <rect x={-26} y={14} width={52} height={10} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(2)} />
  </g>
);

// a tear-off wall calendar: a red header, a grid of days with a few crossed off
export const WallCalendar: React.FC<{ month?: string }> = ({ month = "OCT" }) => (
  <g>
    <rect x={-70} y={-90} width={140} height={180} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
    <rect x={-70} y={-90} width={140} height={44} fill={C.red} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={0} y={-58} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={26} fill={C.cream}>{month}</text>
    {/* a week to a row, centred with even margins (the human's note, 2026-11-09: the spacing was off) */}
    {"SMTWTFS".split("").map((d, i) => <text key={i} x={-54 + i * 18} y={-31} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={11} fill={C.inkSoft}>{d}</text>)}
    {Array.from({ length: 31 }, (_, i) => i + 3).filter((k) => k < 35).map((k, i) => (
      <g key={k} transform={`translate(${-62 + (k % 7) * 18}, ${-24 + Math.floor(k / 7) * 22})`}>
        <rect width={16} height={18} fill="none" stroke={C.inkSoft} strokeWidth={1} opacity={0.6} />
        {i < 9 && <path d="M3,3 L13,15 M13,3 L3,15" stroke={C.red} strokeWidth={1.6} opacity={0.8} />}
      </g>
    ))}
    <circle cx={0} cy={-96} r={6} fill={C.ink} />
  </g>
);

// a wire wastebasket with a crumpled sheet or two
export const Wastebasket: React.FC = () => (
  <g>
    <ellipse cx={6} cy={4} rx={70} ry={12} fill={C.ink} opacity={0.2} />
    <path d="M-56,-130 L56,-130 L44,0 L-44,0 Z" fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />
    {[-40, -20, 0, 20, 40].map((x) => <line key={x} x1={x} y1={-128} x2={x * 0.8} y2={-2} stroke={C.ink} strokeWidth={2} opacity={0.5} />)}
    <ellipse cx={0} cy={-130} rx={58} ry={12} fill="#3d2b20" stroke={C.ink} strokeWidth={lw(4)} />
    {[[-20, -138], [18, -142]].map(([x, y], i) => <path key={i} d={`M${x - 22},${y} q6,-22 22,-20 q18,-4 22,14 q2,16 -20,18 q-20,4 -24,-12 Z`} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />)}
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

// wood grain: wavy pen lines across a rectangle (x, y, w, h), deterministic per seed
export const Grain: React.FC<{ x: number; y: number; w: number; h: number; n?: number; seed?: number; vertical?: boolean }> = ({ x, y, w, h, n = 4, seed = 1, vertical }) => (
  <g opacity={0.55}>
    {Array.from({ length: n }, (_, i) => {
      const t = (i + 0.5) / n, a = ((seed * 13 + i * 7) % 10) - 5;
      return vertical
        ? <path key={i} d={`M${x + w * t},${y + 4} q${a},${h * 0.3} 0,${h * 0.5} t0,${h * 0.45}`} {...PEN} />
        : <path key={i} d={`M${x + 4},${y + h * t} q${w * 0.25},${a} ${w * 0.5},0 t${w * 0.48},0`} {...PEN} />;
    })}
    {seed % 2 === 0 && <ellipse cx={x + w * 0.66} cy={y + h * 0.5} rx={Math.min(18, w * 0.08)} ry={Math.min(7, h * 0.2)} {...PEN} />}
  </g>
);

// floorboards: plank lines and nail heads across a floor band starting at y
export const Floorboards: React.FC<{ y: number; h?: number; boards?: number }> = ({ y, h = H - y, boards = 4 }) => (
  <g opacity={0.6}>
    {Array.from({ length: boards }, (_, r) => {
      const by = y + ((r + 1) / (boards + 1)) * h;
      return (
        <g key={r}>
          <line x1={-20} y1={by} x2={W + 20} y2={by} {...PEN} />
          {Array.from({ length: 6 }, (_, k) => {
            const jx = ((k + (r % 2) * 0.5) / 6) * W + 120;
            return <g key={k}><line x1={jx} y1={by - h / (boards + 1)} x2={jx} y2={by} {...PEN} /><circle cx={jx - 14} cy={by - 10} r={2} fill={C.ink} /></g>;
          })}
        </g>
      );
    })}
  </g>
);

// a hatched contact shadow under something standing on the floor
export const CastShadow: React.FC<{ cx: number; cy: number; rx: number; ry?: number }> = ({ cx, cy, rx, ry = rx * 0.14 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#pen-hatch)" />
);
