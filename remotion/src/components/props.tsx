// Props for the shots: every product is generic (brief, Content guardrails): no logos, wordmarks, brand colours or
// product UI. Each prop is drawn around its own origin in 1920x1080 units.
import React from "react";
import { Hand4 } from "../rigs/Hand4";
import { measure } from "./kit";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, PEN, W, lw } from "../theme/palette";
import { Mouth, MouthShape } from "../rigs/Mouth";
import { Grain } from "./sets";

const ink = { stroke: C.ink, strokeWidth: lw(7), strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// the answer box: a rounded card with a sparkle, little eyes and (optionally) legs; it sits on things
export const AnswerBox: React.FC<{ w?: number; legs?: number; squash?: number; mouth?: MouthShape; wave?: number; eyes?: boolean }> = ({
  w = 520, legs = 0, squash = 0, mouth = "X", wave = 0, eyes = true,
}) => {
  const h = w * 0.42;
  return (
    <g transform={`scale(${1 + squash * 0.12}, ${1 - squash * 0.12})`}>
      {legs > 0 && [-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${s * w * 0.22},${h / 2 - 4} l${s * 10},${legs * 70}`} {...ink} strokeWidth={lw(12)} />
          <ellipse cx={s * (w * 0.22 + 16)} cy={h / 2 + legs * 72} rx={26} ry={12} fill={C.ink} />
        </g>
      ))}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={C.white} {...ink} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.26} rx={26} fill={C.mustard} {...ink} />
      {/* a sparkle: the generic "smart" badge */}
      <path d={`M${-w / 2 + 44},${-h / 2 + 10} l8,18 l18,8 l-18,8 l-8,18 l-8,-18 l-18,-8 l18,-8 Z`} fill={C.orange} stroke={C.ink} strokeWidth={lw(3)} />
      {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 40} y={-h / 2 + h * 0.38 + i * h * 0.17} width={w * (0.7 - i * 0.15)} height={h * 0.08} rx={6} fill={C.creamShade} />)}
      {eyes && (
        <g transform={`translate(${w / 2 - 90}, ${-h / 2 + h * 0.13})`}>
          {[-18, 18].map((x) => <g key={x}><circle cx={x} r={13} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} /><circle cx={x + 2} cy={1} r={6} fill={C.ink} /></g>)}
          <g transform="translate(0, 30)"><Mouth shape={mouth} w={28} /></g>
        </g>
      )}
      {wave !== 0 && <path d={`M${w / 2 - 6},${-h / 4} q30,${-20 + wave * 20} 50,-40`} {...ink} strokeWidth={lw(10)} fill="none" />}
    </g>
  );
};

// a search box: a long pill with a magnifier and typed text
export const SearchBox: React.FC<{ text: string; w?: number; caret?: boolean }> = ({ text, w = 1100, caret = true }) => (
  <g>
    <rect x={-w / 2} y={-55} width={w} height={110} rx={55} fill={C.white} {...ink} />
    <circle cx={-w / 2 + 70} cy={-6} r={22} fill="none" {...ink} strokeWidth={lw(8)} />
    <path d={`M${-w / 2 + 86},10 l20,20`} {...ink} strokeWidth={lw(10)} />
    <text x={-w / 2 + 130} y={16} fontFamily={SANS} fontSize={46} fill={C.ink}>{text}{caret ? "|" : ""}</text>
  </g>
);

// the list of links under the answer box (squashable)
export const Links: React.FC<{ n?: number; w?: number; squash?: number }> = ({ n = 4, w = 900, squash = 0 }) => (
  <g transform={`scale(1, ${1 - squash * 0.75})`}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${-w / 2}, ${i * 90})`}>
        <rect width={w * (0.5 - (i % 2) * 0.1)} height={22} rx={8} fill={C.teal} opacity={0.8} />
        <rect y={36} width={w * 0.85} height={14} rx={6} fill={C.creamShade} />
      </g>
    ))}
  </g>
);

export const Chalkboard: React.FC<{ x?: number; y?: number; w?: number; h?: number; lines?: string[]; size?: number }> = ({
  x = 160, y = 110, w = 900, h = 520, lines = [], size = 60,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={22} />
    <rect x={x - 11} y={y - 11} width={w + 22} height={h + 22} rx={14} fill="none" stroke={C.ink} strokeWidth={lw(4)} />
    <rect x={x + 11} y={y + 11} width={w - 22} height={h - 22} rx={4} fill="none" stroke={C.ink} strokeWidth={lw(3)} />
    {[0.3, 0.62].map((k) => <path key={k} d={`M${x + w * k},${y + h * 0.6} q60,-20 140,6 q-50,30 -130,10`} fill={C.white} opacity={0.07} />)}
    {lines.map((t, i) => (
      <text key={i} x={x + 50} y={y + 100 + i * size * 1.35} fontFamily={BUBBLE} fontSize={size} fill={C.white} opacity={0.88}>{t}</text>
    ))}
    <rect x={x + w - 160} y={y + h - 8} width={70} height={14} rx={4} fill={C.white} opacity={0.8} />
  </g>
);

export const Stool: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={130} ry={26} fill={C.orange} {...ink} />
    {[-90, 90].map((x) => <path key={x} d={`M${x},10 L${x * 1.3},300`} {...ink} strokeWidth={lw(14)} />)}
    <path d="M-100,170 L100,170" {...ink} strokeWidth={lw(10)} />
  </g>
);

// a caption: plain sans on a cream band, bottom of frame (brief: captions in a plain sans). A caption too long for one
// line (over 62 characters) breaks at the space nearest its middle into two, the band growing upward
export const Caption: React.FC<{ text: string; y?: number }> = ({ text, y = H - 96 }) => {
  let rows = [text];
  if (text.length > 62) {
    const mid = text.length / 2;
    let k = -1;
    for (let i = 0; i < text.length; i++) if (text[i] === " " && (k < 0 || Math.abs(i - mid) < Math.abs(k - mid))) k = i;
    rows = [text.slice(0, k), text.slice(k + 1)];
  }
  const n = Math.max(...rows.map((r) => r.length)), lh = 50;
  return (
    <g>
      <rect x={W / 2 - n * 12.5 - 40} y={y - 46 - (rows.length - 1) * lh} width={n * 25 + 80} height={68 + (rows.length - 1) * lh} rx={10} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} opacity={0.94} />
      {rows.map((r, i) => <text key={i} x={W / 2} y={y - (rows.length - 1 - i) * lh} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={38} fill={C.ink}>{r}</text>)}
    </g>
  );
};

export const Envelope: React.FC<{ look?: [number, number]; mouth?: MouthShape }> = ({ look = [0, 0], mouth = "X" }) => (
  <g>
    <rect x={-170} y={-110} width={340} height={220} rx={14} fill={C.white} {...ink} />
    <path d="M-163,-103 L0,20 L163,-103" fill="none" {...ink} strokeLinecap="round" />{/* the flap starts inside the rounded corners (the human's note, 2026-11-09) */}
    {[-50, 50].map((x) => <g key={x} transform={`translate(${x}, -30)`}><circle r={28} fill={C.white} {...ink} strokeWidth={lw(5)} /><circle cx={look[0] * 12} cy={look[1] * 10} r={12} fill={C.ink} /></g>)}
    <g transform="translate(0, 60)"><Mouth shape={mouth} w={40} /></g>
  </g>
);

// a generic cartoon person from behind/side: round head, hair tuft, a shirt in one of the palette colours
// a cartoon person seen from BEHIND, at a screen (S25): the back of the head is all hair (a crown whorl, strands, a
// tapered nape hairline), both ears stick out at the sides, the neck shows above a jumper with a ribbed collar, raglan
// seams and a centre-back seam. Nothing of the face: it must read as facing away (the human's note, 2026-11-09)
export const Person: React.FC<{ shirt?: string; hair?: string; facing?: number }> = ({ shirt = C.teal, hair = C.hair, facing = 1 }) => (
  <g transform={`scale(${facing}, 1)`}>
    <path d="M-150,320 Q-160,120 0,110 Q160,120 150,320 Z" fill={shirt} {...ink} />
    <path d="M-150,250 Q-90,170 -52,120 M150,250 Q90,170 52,120" {...PEN} opacity={0.8} />
    <path d="M0,150 L0,320" {...PEN} strokeDasharray="6 7" opacity={0.6} />
    <path d="M-120,300 q10,-30 6,-60 M120,300 q-10,-30 -6,-60" {...PEN} opacity={0.6} />
    {/* the neck and the ribbed collar */}
    <path d="M-40,60 L-44,128 L44,128 L40,60 Z" fill={C.skinShade} {...ink} />
    <path d="M-64,124 Q0,104 64,124 Q66,140 60,146 Q0,128 -60,146 Q-66,140 -64,124 Z" fill={shirt} {...ink} />
    {Array.from({ length: 11 }, (_, i) => <line key={i} x1={-50 + i * 10} y1={120 - Math.sin((i / 10) * Math.PI) * 6} x2={-50 + i * 10} y2={138 - Math.sin((i / 10) * Math.PI) * 8} {...PEN} opacity={0.6} />)}
    {/* ears, both sides, set behind the head */}
    {[-1, 1].map((k) => <g key={k}><ellipse cx={k * 92} cy={22} rx={18} ry={27} fill={C.skin} {...ink} strokeWidth={lw(5)} /><path d={`M${k * 94},10 q${k * 6},12 0,24`} {...PEN} /></g>)}
    {/* the back of the head: hair all the way round, tapering to the nape */}
    <path d="M-92,10 Q-98,-84 0,-80 Q98,-84 92,10 Q90,62 46,84 Q20,72 0,76 Q-20,72 -46,84 Q-90,62 -92,10 Z" fill={hair} {...ink} />
    <path d="M-30,80 l6,-12 l6,10 l6,-12 l6,12 l6,-10 l6,10" fill="none" stroke={C.ink} strokeWidth={lw(3)} opacity={0.6} />
    {/* the crown whorl and strands */}
    <path d="M10,-40 q22,4 18,24 q-6,18 -26,10 q-14,-8 -4,-20" {...PEN} />
    {[[-60, -30, -50, 30], [-30, -60, -40, 10], [50, -40, 60, 20], [40, 0, 30, 50], [-10, 10, -30, 56], [70, -10, 70, 40]].map(([x1, y1, x2, y2], i) => <path key={i} d={`M${x1},${y1} Q${(x1 + x2) / 2 + 8},${(y1 + y2) / 2} ${x2},${y2}`} {...PEN} opacity={0.7} />)}
  </g>
);

// a generic cartoon kid, front view, varied by `seed`; never drawn to resemble anyone real (brief)
// a generic cartoon kid, front view, varied by `seed`; never drawn to resemble anyone real (brief). Optional `arms`
// (each a hand target in the kid's own coordinates, and whether it points) and a seated lower body (`seated`: shorts
// or trousers, knees, socks and shoes), for the shots where the kids act (S21-S22, S57a-b)
type ArmTarget = { x: number; y: number; point?: boolean };
const KidArm: React.FC<{ side: -1 | 1; t: ArmTarget; sleeve: string; skin: string }> = ({ side, t, sleeve, skin }) => {
  const sx = side * 78, sy = 140;
  const ex = (sx + t.x) / 2 + side * 34, ey = (sy + t.y) / 2 + 30; // the elbow bends out and down
  const ang = (Math.atan2(t.y - ey, t.x - ex) * 180) / Math.PI;
  return (
    <g>
      <path d={`M${sx},${sy} Q${ex},${ey} ${t.x},${t.y}`} fill="none" stroke={C.ink} strokeWidth={36} strokeLinecap="round" />
      <path d={`M${sx},${sy} Q${ex},${ey} ${t.x},${t.y}`} fill="none" stroke={sleeve} strokeWidth={28} strokeLinecap="round" />
      <g transform={`translate(${t.x}, ${t.y}) rotate(${ang})`}>
        <g transform="rotate(-90)"><Hand4 pose={t.point ? "point" : "rest"} side={side === 1 ? 1 : -1} s={0.5} fill={skin} /></g>
      </g>
    </g>
  );
};
// `armsOnly` draws just the arms, so a shot can put the body behind a desk and the arms in front of it
export const Kid: React.FC<{ seed: number; mouth?: MouthShape; look?: [number, number]; arms?: [ArmTarget, ArmTarget]; seated?: boolean; armsOnly?: boolean }> = ({
  seed, mouth = "X", look = [0, 0], arms, seated, armsOnly,
}) => {
  const shirts = [C.teal, C.orange, C.avocado, C.mustard, C.red];
  const hairs = [C.hair, "#2e1d12", "#a8622e", "#d9a33a", "#7a4a2a"];
  const skins = ["#f0c49b", "#c98b5e", "#8d5a3a", "#e9b98f", "#b07a52"];
  const trousers = [C.night, C.cardigan, "#5a6a8a", C.teal, C.avocado];
  const k = (n: number) => (seed * 7 + n * 3) % 5;
  const shorts = seed % 2 === 0;
  if (armsOnly) return <g>{arms && [-1, 1].map((sd, i) => <KidArm key={sd} side={sd as -1 | 1} t={arms[i]} sleeve={shirts[k(1)]} skin={skins[k(2)]} />)}</g>;
  return (
    <g>
      {seated && (
        <g>
          {/* lap and legs, seated: the thighs come toward us, so we see the lap, the knees, then the shins */}
          <path d="M-86,222 L86,222 L92,290 L-92,290 Z" fill={trousers[k(4)]} {...ink} />
          <line x1={0} y1={226} x2={0} y2={286} {...PEN} />
          {[-46, 46].map((x) => (
            <g key={x}>
              <path d={`M${x - 34},${shorts ? 290 : 286} L${x + 34},${shorts ? 290 : 286} L${x + 26},400 L${x - 26},400 Z`} fill={shorts ? skins[k(2)] : trousers[k(4)]} {...ink} />
              {shorts && <path d={`M${x - 34},286 L${x + 34},286 L${x + 32},306 L${x - 32},306 Z`} fill={trousers[k(4)]} {...ink} />}
              <rect x={x - 24} y={392} width={48} height={22} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
              <path d={`M${x - 30},414 L${x + 26},414 Q${x + 44},418 ${x + 40},440 L${x - 32},440 Z`} fill={[C.red, C.cardigan, C.night, C.ink, C.teal][k(5)]} {...ink} />
              <path d={`M${x - 20},414 l8,-6 M${x - 6},414 l8,-6`} {...PEN} />
            </g>
          ))}
        </g>
      )}
      <path d="M-90,230 Q-96,110 0,104 Q96,110 90,230 Z" fill={shirts[k(1)]} {...ink} />
      <path d="M-70,170 q8,30 2,60 M70,170 q-8,30 -2,60" {...PEN} />
      {/* the V-neck and a striped jumper's stripes are clipped to the jumper's own outline, so neither runs past it
          (the human's notes, 2026-11-09) */}
      <clipPath id={`kid-shirt-${seed}`}><path d="M-90,230 Q-96,110 0,104 Q96,110 90,230 Z" /></clipPath>
      <g clipPath={`url(#kid-shirt-${seed})`}>
        {seed % 4 === 1 && [146, 182, 218].map((y) => <rect key={y} x={-100} y={y - 5} width={200} height={10} fill={C.cream} opacity={0.6} />)}
        <path d="M-40,100 l40,30 l40,-30" {...PEN} />
      </g>
      <circle cx={0} cy={20} r={80} fill={skins[k(2)]} {...ink} />
      {seed % 3 === 0 && <path d="M-80,0 Q-90,-80 0,-66 Q90,-80 80,0 Q50,-40 0,-42 Q-50,-40 -80,0 Z" fill={hairs[k(3)]} {...ink} />}
      {seed % 3 === 1 && <g>{[-1, 1].map((s) => <circle key={s} cx={s * 78} cy={-10} r={30} fill={hairs[k(3)]} {...ink} />)}<path d="M-78,-4 Q-70,-76 0,-64 Q70,-76 78,-4 Q40,-36 0,-36 Q-40,-36 -78,-4 Z" fill={hairs[k(3)]} {...ink} /></g>}
      {seed % 3 === 2 && <path d="M-60,-46 l14,-34 l18,26 l16,-34 l16,32 l20,-26 l8,40 Q0,-70 -60,-46 Z" fill={hairs[k(3)]} {...ink} />}
      {[-28, 28].map((x) => <g key={x}><circle cx={x} cy={14} r={16} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} /><circle cx={x + look[0] * 6} cy={16 + look[1] * 5} r={7} fill={C.ink} /></g>)}
      <g transform="translate(0, 58)"><Mouth shape={mouth} w={34} /></g>
      {/* pen detail: a few hair strands, freckles or cheeks, an ear line */}
      {seed % 3 !== 2 && [-40, -10, 20].map((x) => <path key={x} d={`M${x},-60 q8,12 4,26`} {...PEN} />)}
      {seed % 2 === 0 ? [-40, -32, 32, 40].map((x, i) => <circle key={i} cx={x} cy={40 + (i % 2) * 6} r={2.4} fill={C.cardigan} />) : null}
      {arms && [-1, 1].map((sd, i) => <KidArm key={sd} side={sd as -1 | 1} t={arms[i]} sleeve={shirts[k(1)]} skin={skins[k(2)]} />)}
    </g>
  );
};

// a small rocker switch, the kind on the kids' desks and under the title
export const MiniRocker: React.FC<{ on: number; s?: number }> = ({ on, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-40} y={-56} width={80} height={112} rx={12} fill={C.cream} {...ink} strokeWidth={lw(5)} />
    <rect x={-22} y={-34} width={44} height={68} rx={6} fill="#c4ab7c" stroke={C.ink} strokeWidth={lw(4)} />
    {/* the raised (lit) half shows the state: top for ON, as on Switch */}
    <rect x={-18} y={on > 0.5 ? -30 : 2} width={36} height={28} fill={C.white} />
    <circle cx={0} cy={-44} r={5} fill={on > 0.5 ? C.mustard : "#c4ab7c"} stroke={C.ink} strokeWidth={lw(2)} />
  </g>
);

export const TV: React.FC<{ w?: number; children?: React.ReactNode; night?: boolean }> = ({ w = 900, children, night }) => {
  const h = w * 0.58;
  return (
    <g>
      <rect x={-w / 2 - 30} y={-h / 2 - 30} width={w + 60} height={h + 60} rx={30} fill={C.cardigan} {...ink} />
      <Grain x={-w / 2 - 26} y={-h / 2 - 28} w={w + 52} h={26} n={2} seed={3} />
      <Grain x={-w / 2 - 26} y={h / 2 + 2} w={w + 52} h={26} n={2} seed={4} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={night ? C.night : C.paper} {...ink} />
      <svg x={-w / 2} y={-h / 2} width={w} height={h} viewBox={`0 0 ${W} ${W * 0.58}`}>{children}</svg>
      {[-1, 1].map((s) => <path key={s} d={`M${s * w * 0.3},${h / 2 + 30} l${s * 40},70`} {...ink} strokeWidth={lw(14)} />)}
    </g>
  );
};

// a tile on the TV's home screen (generic: a coloured square with a simple glyph)
export const Tile: React.FC<{ color: string; glyph?: "star" | "play" | "note" | "spark"; size?: number; wink?: number }> = ({
  color, glyph = "play", size = 180, wink = 0,
}) => (
  <g>
    <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={24} fill={color} {...ink} />
    {glyph === "play" && <path d={`M${-size * 0.15},${-size * 0.2} L${size * 0.2},0 L${-size * 0.15},${size * 0.2} Z`} fill={C.cream} />}
    {glyph === "note" && <circle r={size * 0.18} fill={C.cream} />}
    {glyph === "star" && <path d={`M0,${-size * 0.25} L${size * 0.07},${-size * 0.07} L${size * 0.25},0 L${size * 0.07},${size * 0.07} L0,${size * 0.25} L${-size * 0.07},${size * 0.07} L${-size * 0.25},0 L${-size * 0.07},${-size * 0.07} Z`} fill={C.cream} />}
    {glyph === "spark" && (
      <g>
        {[-1, 1].map((x) => <g key={x}><circle cx={x * size * 0.18} cy={-size * 0.08} r={size * 0.09} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
          {!(x === 1 && wink > 0.5) && <circle cx={x * size * 0.18} cy={-size * 0.08} r={size * 0.04} fill={C.ink} />}
          {x === 1 && wink > 0.5 && <path d={`M${size * 0.1},${-size * 0.08} h${size * 0.16}`} stroke={C.ink} strokeWidth={lw(4)} />}</g>)}
        <path d={`M${-size * 0.15},${size * 0.14} Q0,${size * 0.26} ${size * 0.15},${size * 0.14}`} fill="none" stroke={C.ink} strokeWidth={lw(4)} />
      </g>
    )}
  </g>
);

// a phone: a bezel, and a screen whose proportions are exactly its content's (400 x 860 units), so the screen
// graphics fill it edge to edge and are clipped to its rounded corners (the human's note: they weren't cropping right)
let phoneId = 0;
export const Phone: React.FC<{ w?: number; children?: React.ReactNode }> = ({ w = 380, children }) => {
  const sw = w - 40, sh = (sw * 860) / 400, h = sh + 96;
  const id = `phone-${++phoneId}`;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.14} fill={C.cardiganShade} {...ink} />
      <rect x={-w * 0.12} y={-h / 2 + 18} width={w * 0.24} height={8} rx={4} fill={C.ink} opacity={0.7} />
      <circle cx={w * 0.2} cy={-h / 2 + 22} r={5} fill={C.ink} opacity={0.7} />
      <svg x={-sw / 2} y={-h / 2 + 44} width={sw} height={sh} viewBox="0 0 400 860" overflow="hidden">
        <defs><clipPath id={id}><rect x={0} y={0} width={400} height={860} rx={26} /></clipPath></defs>
        <g clipPath={`url(#${id})`}><rect width={400} height={860} fill={C.paper} />{children}</g>
      </svg>
      <rect x={-sw / 2} y={-h / 2 + 44} width={sw} height={sh} rx={(26 * sw) / 400} fill="none" stroke={C.ink} strokeWidth={lw(4)} />
      <path d={`M${w / 2 - 44},${-h / 2 + 80} l22,-22 M${w / 2 - 44},${-h / 2 + 112} l22,-22`} stroke={C.white} strokeWidth={4} strokeLinecap="round" opacity={0.5} />
      <rect x={-w * 0.16} y={h / 2 - 30} width={w * 0.32} height={8} rx={4} fill={C.ink} opacity={0.5} />
    </g>
  );
};

export const Door: React.FC<{ label: string; open?: number; color?: string; w?: number; h?: number }> = ({
  label, open = 0, color = C.orange, w = 360, h = 640,
}) => (
  <g>
    <rect x={-w / 2 - 20} y={-h - 20} width={w + 40} height={h + 20} fill={C.dark} {...ink} />
    <g transform={`translate(${-w / 2}, 0) scale(${1 - open * 0.85}, 1)`}>
      <rect x={0} y={-h} width={w} height={h} fill={color} {...ink} />
      <rect x={w * 0.14} y={-h * 0.92} width={w * 0.72} height={h * 0.36} rx={8} {...PEN} />
      <rect x={w * 0.14} y={-h * 0.48} width={w * 0.72} height={h * 0.4} rx={8} {...PEN} />
      <Grain x={w * 0.18} y={-h * 0.88} w={w * 0.64} h={h * 0.28} n={3} seed={5} vertical />
      <circle cx={w - 40} cy={-h / 2} r={14} fill={C.creamShade} {...ink} strokeWidth={lw(4)} />
    </g>
    <rect x={-w / 2 + 20} y={-h - 110} width={w - 40} height={70} rx={10} fill={C.cream} {...ink} strokeWidth={lw(5)} />
    <text x={0} y={-h - 60} textAnchor="middle" fontFamily={BUBBLE} fontSize={44} fill={C.ink}>{label}</text>
  </g>
);

export const PriceTag: React.FC<{ text: string; s?: number; color?: string }> = ({ text, s = 1, color = C.mustard }) => (
  <g transform={`scale(${s})`}>
    <path d="M-150,-70 L120,-70 L180,0 L120,70 L-150,70 Z" fill={color} {...ink} />
    <circle cx={128} cy={0} r={12} fill={C.paper} {...ink} strokeWidth={lw(4)} />
    {/* the lettering shrinks to fit inside the tag (the human's note: CLASSIC was cut off) */}
    <text x={-20} y={0} textAnchor="middle" dominantBaseline="central" fontFamily={BUBBLE} fontSize={Math.min(70, (70 * 240) / measure(text, 70))} fill={C.ink}>{text}</text>
  </g>
);

export const Contract: React.FC<{ boxes: string[]; w?: number; highlight?: number }> = ({ boxes, w = 640, highlight = -1 }) => (
  <g>
    <rect x={-w / 2} y={-260} width={w} height={520} fill={C.white} {...ink} />
    <text x={-w / 2 + 40} y={-190} fontFamily={BUBBLE} fontSize={44} fill={C.ink}>AGREEMENT</text>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-w / 2 + 40} y={-150 + i * 26} width={w * (0.75 - i * 0.1)} height={10} rx={4} fill={C.creamShade} />)}
    {boxes.map((t, i) => (
      <g key={t} transform={`translate(${-w / 2 + 40}, ${-20 + i * 92})`}>
        <rect width={52} height={52} fill={i === highlight ? C.cream : "none"} stroke={i === highlight ? C.orange : C.ink} strokeWidth={6} />
        <text x={80} y={40} fontFamily={SANS} fontWeight={600} fontSize={40} fill={i === highlight ? C.orange : C.ink}>{t}</text>
      </g>
    ))}
  </g>
);

// a pull-down screen or a slate with bubble text
export const Slate: React.FC<{ text: string; w?: number; color?: string; size?: number }> = ({ text, w = 600, color = C.red, size = 64 }) => (
  <g>
    <rect x={-w / 2} y={-90} width={w} height={180} rx={12} fill={color} {...ink} strokeWidth={lw(8)} />
    <rect x={-w / 2 + 20} y={-70} width={w - 40} height={140} rx={8} fill="none" stroke={C.cream} strokeWidth={4} />
    <text textAnchor="middle" y={size * 0.34} fontFamily={BUBBLE} fontSize={size} fill={C.cream} letterSpacing={2}>{text}</text>
  </g>
);

export const Spotlight: React.FC<{ x?: number; y?: number; dim?: number }> = ({ x = W / 2, y = 540, dim = 0 }) => (
  <g opacity={1 - dim * 0.45}>
    <defs>
      <radialGradient id="spot-pool" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={C.cream} stopOpacity={0.55} />
        <stop offset="0.7" stopColor={C.mustard} stopOpacity={0.16} />
        <stop offset="1" stopColor={C.mustard} stopOpacity={0} />
      </radialGradient>
    </defs>
    <path d={`M${x - 70},-20 L${x + 70},-20 L${x + 420},${H} L${x - 420},${H} Z`} fill={C.cream} opacity={0.06} />
    <ellipse cx={x} cy={y} rx={430} ry={400} fill="url(#spot-pool)" />
  </g>
);
