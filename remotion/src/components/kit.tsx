// Shared pieces for the shots: a wall, a bubble-letter label that pops, the bouncing-ball lyric line, fine print.
import React from "react";
import { interpolate, spring } from "remotion";
import { Wash } from "../film/Paper";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W, lw } from "../theme/palette";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// a painted wall: a wash of `color`, a darker band at the bottom (a wainscot) and a skirting board
export const Wall: React.FC<{ id: string; color: string; band?: string; floor?: number; w?: number }> = ({
  id, color, band = C.avocado, floor = 860, w = W,
}) => (
  <g>
    <Wash id={id} color={color} opacity={0.4}><rect x={-60} y={-60} width={w + 120} height={floor + 60} /></Wash>
    <Wash id={id} color={band} opacity={0.45}><rect x={-60} y={floor - 170} width={w + 120} height={150} /></Wash>
    <rect x={-10} y={floor - 22} width={w + 20} height={26} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
    <Wash id={id} color={C.inkSoft} opacity={0.55}><rect x={-60} y={floor + 4} width={w + 120} height={H - floor + 60} /></Wash>
  </g>
);

// a word in bubble letters that pops in on a spring from local frame `start`, with a little starburst behind it
export const Pop: React.FC<{ f: number; start: number; x: number; y: number; text: string; color?: string; size?: number; fps?: number }> = ({
  f, start, x, y, text, color = C.orange, size = 120, fps = 30,
}) => {
  const s = spring({ frame: f - start, fps, config: { damping: 9, stiffness: 160 } });
  if (f < start) return null;
  const rays = 12;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s}) rotate(${(1 - s) * -20})`}>
      <path d={Array.from({ length: rays * 2 }, (_, i) => {
        const a = (i / (rays * 2)) * Math.PI * 2, r = i % 2 ? size * 0.75 : size * 1.15;
        return `${i ? "L" : "M"}${Math.cos(a) * r * 1.5},${Math.sin(a) * r * 0.85}`;
      }).join(" ") + "Z"} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
      <text textAnchor="middle" dominantBaseline="central" fontFamily={BUBBLE} fontSize={size} fill={color}
        stroke={C.ink} strokeWidth={size * 0.06} paintOrder="stroke" letterSpacing={4}>{text}</text>
    </g>
  );
};

let ctx: CanvasRenderingContext2D | null = null;
export const measure = (text: string, size: number, face = BUBBLE) => {
  ctx = ctx ?? document.createElement("canvas").getContext("2d");
  ctx!.font = `${size}px ${face}`;
  return ctx!.measureText(text).width;
};

// a lyric line in bubble letters with a bouncing ball; `syl` are the syllables with their local start frames
export const BallLyric: React.FC<{ f: number; syl: { t: string; at: number }[]; y?: number; size?: number; color?: string }> = ({
  f, syl, y = 960, size: want = 74, color = C.cream,
}) => {
  // shrink a long line to fit the frame with a margin
  const natural = syl.reduce((a, s) => a + measure(s.t, want), 0);
  const size = natural > W - 160 ? (want * (W - 160)) / natural : want;
  // lay the syllables out on one centred line, measured in the loaded face (the fonts module holds every frame
  // until Titan One is ready)
  const widths = syl.map((s) => measure(s.t, size));
  const total = widths.reduce((a, b) => a + b, 0);
  let x = (W - total) / 2;
  const pos = widths.map((w) => { const c = x + w / 2; x += w; return c; });
  // the ball arcs from syllable to syllable, landing on each one's start
  let k = syl.findIndex((s, i) => f >= s.at && (i === syl.length - 1 || f < syl[i + 1].at));
  if (f < syl[0].at) k = -1;
  let bx = pos[0], by = y - size * 1.1;
  if (k >= 0 && k < syl.length - 1) {
    const p = (f - syl[k].at) / (syl[k + 1].at - syl[k].at);
    bx = interpolate(p, [0, 1], [pos[k], pos[k + 1]]);
    by = y - size * 1.1 - Math.sin(p * Math.PI) * size * 1.2;
  } else if (k === syl.length - 1) {
    bx = pos[k];
  }
  return (
    <g>
      {syl.map((s, i) => (
        <text key={i} x={pos[i] - (measure(s.t, size) - measure(s.t.trimEnd(), size)) / 2} y={y} textAnchor="middle" fontFamily={BUBBLE} fontSize={size}
          fill={k >= i ? C.orange : color} stroke={C.ink} strokeWidth={size * 0.07} paintOrder="stroke">{s.t.trim()}</text>
      ))}
      <ellipse cx={bx} cy={by} rx={size * 0.24} ry={size * 0.22} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
    </g>
  );
};

// fine print that scrolls past too fast to read
export const FinePrint: React.FC<{ f: number; y: number; text: string; speed?: number; size?: number }> = ({
  f, y, text, speed = 38, size = 20,
}) => {
  const line = Array.from({ length: 8 }, () => text).join("   ·   ");
  return (
    <text x={W - f * speed} y={y} fontFamily={SANS} fontSize={size} fill={C.inkSoft} opacity={0.85}>{line}</text>
  );
};

export const ease = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: (t) => t * t * (3 - 2 * t) });
