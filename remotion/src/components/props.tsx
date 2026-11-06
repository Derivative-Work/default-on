// Props for the shots: every product is generic (brief, Content guardrails): no logos, wordmarks, brand colours or
// product UI. Each prop is drawn around its own origin in 1920x1080 units.
import React from "react";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { Mouth, MouthShape } from "../rigs/Mouth";

const ink = { stroke: C.ink, strokeWidth: 7, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// the answer box: a rounded card with a sparkle, little eyes and (optionally) legs; it sits on things
export const AnswerBox: React.FC<{ w?: number; legs?: number; squash?: number; mouth?: MouthShape; wave?: number; eyes?: boolean }> = ({
  w = 520, legs = 0, squash = 0, mouth = "X", wave = 0, eyes = true,
}) => {
  const h = w * 0.42;
  return (
    <g transform={`scale(${1 + squash * 0.12}, ${1 - squash * 0.12})`}>
      {legs > 0 && [-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${s * w * 0.22},${h / 2 - 4} l${s * 10},${legs * 70}`} {...ink} strokeWidth={12} />
          <ellipse cx={s * (w * 0.22 + 16)} cy={h / 2 + legs * 72} rx={26} ry={12} fill={C.ink} />
        </g>
      ))}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={C.white} {...ink} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.26} rx={26} fill={C.mustard} {...ink} />
      {/* a sparkle: the generic "smart" badge */}
      <path d={`M${-w / 2 + 44},${-h / 2 + 10} l8,18 l18,8 l-18,8 l-8,18 l-8,-18 l-18,-8 l18,-8 Z`} fill={C.orange} stroke={C.ink} strokeWidth={3} />
      {[0, 1, 2].map((i) => <rect key={i} x={-w / 2 + 40} y={-h / 2 + h * 0.38 + i * h * 0.17} width={w * (0.7 - i * 0.15)} height={h * 0.08} rx={6} fill={C.creamShade} />)}
      {eyes && (
        <g transform={`translate(${w / 2 - 90}, ${-h / 2 + h * 0.13})`}>
          {[-18, 18].map((x) => <g key={x}><circle cx={x} r={13} fill={C.white} stroke={C.ink} strokeWidth={4} /><circle cx={x + 2} cy={1} r={6} fill={C.ink} /></g>)}
          <g transform="translate(0, 30)"><Mouth shape={mouth} w={28} /></g>
        </g>
      )}
      {wave !== 0 && <path d={`M${w / 2 - 6},${-h / 4} q30,${-20 + wave * 20} 50,-40`} {...ink} strokeWidth={10} fill="none" />}
    </g>
  );
};

// a search box: a long pill with a magnifier and typed text
export const SearchBox: React.FC<{ text: string; w?: number; caret?: boolean }> = ({ text, w = 1100, caret = true }) => (
  <g>
    <rect x={-w / 2} y={-55} width={w} height={110} rx={55} fill={C.white} {...ink} />
    <circle cx={-w / 2 + 70} cy={-6} r={22} fill="none" {...ink} strokeWidth={8} />
    <path d={`M${-w / 2 + 86},10 l20,20`} {...ink} strokeWidth={10} />
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
    {lines.map((t, i) => (
      <text key={i} x={x + 50} y={y + 100 + i * size * 1.35} fontFamily={BUBBLE} fontSize={size} fill={C.white} opacity={0.88}>{t}</text>
    ))}
    <rect x={x + w - 160} y={y + h - 8} width={70} height={14} rx={4} fill={C.white} opacity={0.8} />
  </g>
);

export const Stool: React.FC = () => (
  <g>
    <ellipse cx={0} cy={0} rx={130} ry={26} fill={C.orange} {...ink} />
    {[-90, 90].map((x) => <path key={x} d={`M${x},10 L${x * 1.3},300`} {...ink} strokeWidth={14} />)}
    <path d="M-100,170 L100,170" {...ink} strokeWidth={10} />
  </g>
);

// a caption: plain sans on a cream band, bottom of frame (brief: captions in a plain sans)
export const Caption: React.FC<{ text: string; y?: number }> = ({ text, y = H - 96 }) => (
  <g>
    <rect x={W / 2 - text.length * 12.5 - 40} y={y - 46} width={text.length * 25 + 80} height={68} rx={10} fill={C.cream} stroke={C.ink} strokeWidth={4} opacity={0.94} />
    <text x={W / 2} y={y} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={38} fill={C.ink}>{text}</text>
  </g>
);

export const Envelope: React.FC<{ look?: [number, number]; mouth?: MouthShape }> = ({ look = [0, 0], mouth = "X" }) => (
  <g>
    <rect x={-170} y={-110} width={340} height={220} rx={14} fill={C.white} {...ink} />
    <path d="M-170,-110 L0,20 L170,-110" fill="none" {...ink} />
    {[-50, 50].map((x) => <g key={x} transform={`translate(${x}, -30)`}><circle r={28} fill={C.white} {...ink} strokeWidth={5} /><circle cx={look[0] * 12} cy={look[1] * 10} r={12} fill={C.ink} /></g>)}
    <g transform="translate(0, 60)"><Mouth shape={mouth} w={40} /></g>
  </g>
);

// a generic cartoon person from behind/side: round head, hair tuft, a shirt in one of the palette colours
export const Person: React.FC<{ shirt?: string; hair?: string; facing?: number }> = ({ shirt = C.teal, hair = C.hair, facing = 1 }) => (
  <g transform={`scale(${facing}, 1)`}>
    <path d="M-150,320 Q-160,120 0,110 Q160,120 150,320 Z" fill={shirt} {...ink} />
    <circle cx={0} cy={20} r={95} fill={C.skin} {...ink} />
    <path d="M-95,10 Q-90,-90 0,-78 Q90,-90 95,10 Q60,-30 0,-34 Q-60,-30 -95,10 Z" fill={hair} {...ink} />
    <ellipse cx={92} cy={24} rx={16} ry={24} fill={C.skin} {...ink} strokeWidth={5} />
  </g>
);

// a generic cartoon kid, front view, varied by `seed`; never drawn to resemble anyone real (brief)
export const Kid: React.FC<{ seed: number; mouth?: MouthShape; look?: [number, number] }> = ({ seed, mouth = "X", look = [0, 0] }) => {
  const shirts = [C.teal, C.orange, C.avocado, C.mustard, C.red];
  const hairs = [C.hair, "#2e1d12", "#a8622e", "#d9a33a", "#7a4a2a"];
  const skins = ["#f0c49b", "#c98b5e", "#8d5a3a", "#e9b98f", "#b07a52"];
  const k = (n: number) => (seed * 7 + n * 3) % 5;
  return (
    <g>
      <path d="M-90,230 Q-96,110 0,104 Q96,110 90,230 Z" fill={shirts[k(1)]} {...ink} />
      <circle cx={0} cy={20} r={80} fill={skins[k(2)]} {...ink} />
      {seed % 3 === 0 && <path d="M-80,0 Q-90,-80 0,-66 Q90,-80 80,0 Q50,-40 0,-42 Q-50,-40 -80,0 Z" fill={hairs[k(3)]} {...ink} />}
      {seed % 3 === 1 && <g>{[-1, 1].map((s) => <circle key={s} cx={s * 78} cy={-10} r={30} fill={hairs[k(3)]} {...ink} />)}<path d="M-78,-4 Q-70,-76 0,-64 Q70,-76 78,-4 Q40,-36 0,-36 Q-40,-36 -78,-4 Z" fill={hairs[k(3)]} {...ink} /></g>}
      {seed % 3 === 2 && <path d="M-60,-46 l14,-34 l18,26 l16,-34 l16,32 l20,-26 l8,40 Q0,-70 -60,-46 Z" fill={hairs[k(3)]} {...ink} />}
      {[-28, 28].map((x) => <g key={x}><circle cx={x} cy={14} r={16} fill={C.white} stroke={C.ink} strokeWidth={4} /><circle cx={x + look[0] * 6} cy={16 + look[1] * 5} r={7} fill={C.ink} /></g>)}
      <g transform="translate(0, 58)"><Mouth shape={mouth} w={34} /></g>
    </g>
  );
};

// a small rocker switch, the kind on the kids' desks and under the title
export const MiniRocker: React.FC<{ on: number; s?: number }> = ({ on, s = 1 }) => (
  <g transform={`scale(${s})`}>
    <rect x={-40} y={-56} width={80} height={112} rx={12} fill={C.cream} {...ink} strokeWidth={5} />
    <rect x={-22} y={-34} width={44} height={68} rx={6} fill="#c4ab7c" stroke={C.ink} strokeWidth={4} />
    <rect x={-18} y={on > 0.5 ? 2 : -30} width={36} height={28} fill={C.white} />
    <circle cx={0} cy={-44} r={5} fill={on > 0.5 ? C.mustard : "#c4ab7c"} stroke={C.ink} strokeWidth={2} />
  </g>
);

export const TV: React.FC<{ w?: number; children?: React.ReactNode; night?: boolean }> = ({ w = 900, children, night }) => {
  const h = w * 0.58;
  return (
    <g>
      <rect x={-w / 2 - 30} y={-h / 2 - 30} width={w + 60} height={h + 60} rx={30} fill={C.cardigan} {...ink} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={16} fill={night ? C.night : C.paper} {...ink} />
      <svg x={-w / 2} y={-h / 2} width={w} height={h} viewBox={`0 0 ${W} ${W * 0.58}`}>{children}</svg>
      {[-1, 1].map((s) => <path key={s} d={`M${s * w * 0.3},${h / 2 + 30} l${s * 40},70`} {...ink} strokeWidth={14} />)}
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
        {[-1, 1].map((x) => <g key={x}><circle cx={x * size * 0.18} cy={-size * 0.08} r={size * 0.09} fill={C.white} stroke={C.ink} strokeWidth={3} />
          {!(x === 1 && wink > 0.5) && <circle cx={x * size * 0.18} cy={-size * 0.08} r={size * 0.04} fill={C.ink} />}
          {x === 1 && wink > 0.5 && <path d={`M${size * 0.1},${-size * 0.08} h${size * 0.16}`} stroke={C.ink} strokeWidth={4} />}</g>)}
        <path d={`M${-size * 0.15},${size * 0.14} Q0,${size * 0.26} ${size * 0.15},${size * 0.14}`} fill="none" stroke={C.ink} strokeWidth={4} />
      </g>
    )}
  </g>
);

export const Phone: React.FC<{ w?: number; children?: React.ReactNode }> = ({ w = 380, children }) => {
  const h = w * 2;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.14} fill={C.cardiganShade} {...ink} />
      <rect x={-w / 2 + 20} y={-h / 2 + 40} width={w - 40} height={h - 80} rx={w * 0.08} fill={C.paper} {...ink} strokeWidth={4} />
      <svg x={-w / 2 + 20} y={-h / 2 + 40} width={w - 40} height={h - 80} viewBox="0 0 400 860">{children}</svg>
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
      <circle cx={w - 40} cy={-h / 2} r={14} fill={C.creamShade} {...ink} strokeWidth={4} />
    </g>
    <rect x={-w / 2 + 20} y={-h - 110} width={w - 40} height={70} rx={10} fill={C.cream} {...ink} strokeWidth={5} />
    <text x={0} y={-h - 60} textAnchor="middle" fontFamily={BUBBLE} fontSize={44} fill={C.ink}>{label}</text>
  </g>
);

export const PriceTag: React.FC<{ text: string; s?: number; color?: string }> = ({ text, s = 1, color = C.mustard }) => (
  <g transform={`scale(${s})`}>
    <path d="M-150,-70 L120,-70 L180,0 L120,70 L-150,70 Z" fill={color} {...ink} />
    <circle cx={128} cy={0} r={12} fill={C.paper} {...ink} strokeWidth={4} />
    <text x={-20} y={22} textAnchor="middle" fontFamily={BUBBLE} fontSize={70} fill={C.ink}>{text}</text>
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
    <rect x={-w / 2} y={-90} width={w} height={180} rx={12} fill={color} {...ink} strokeWidth={8} />
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
