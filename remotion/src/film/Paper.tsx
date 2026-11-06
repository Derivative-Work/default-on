// Backgrounds, built in code: flat cel-style colour fields with slightly irregular edges over a paper texture (the
// first M2 look was mottled watercolour; flattened 2026-11-06 toward the reference shorts). Each takes a seed, so a
// background is the same on every frame.
import React from "react";
import { C, H, W } from "../theme/palette";

export const PaperDefs: React.FC<{ id: string; seed?: number }> = ({ id, seed = 3 }) => (
  <defs>
    {/* a colour field: flat, like a painted cel background, with only a slightly irregular hand-cut edge */}
    <filter id={`${id}-bleed`} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G" />
    </filter>
    {/* pen hatching, shared by every shot (ids repeat across svgs; their content is identical): diagonal lines,
        cross-hatching, and a stipple, all in the ink */}
    <pattern id="pen-hatch" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
      <line x1={0} y1={0} x2={0} y2={9} stroke={C.ink} strokeWidth={1.6} opacity={0.6} />
    </pattern>
    <pattern id="pen-cross" width={10} height={10} patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
      <line x1={0} y1={0} x2={0} y2={10} stroke={C.ink} strokeWidth={1.4} opacity={0.55} />
      <line x1={0} y1={0} x2={10} y2={0} stroke={C.ink} strokeWidth={1.4} opacity={0.55} />
    </pattern>
    <pattern id="pen-dots" width={12} height={12} patternUnits="userSpaceOnUse">
      <circle cx={3} cy={3} r={1.3} fill={C.ink} opacity={0.5} /><circle cx={9} cy={8} r={1.1} fill={C.ink} opacity={0.4} />
    </pattern>
    {/* paper tooth */}
    <filter id={`${id}-tooth`}>
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={3} seed={seed + 11} />
      <feColorMatrix type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.34  0 0 0 0.05 0" />
    </filter>
    {/* hand-drawn ink: a slight wobble on any stroked shape */}
    <filter id={`${id}-ink`} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={seed + 5} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={4} xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
);

// a wash: any SVG shape(s), painted in one colour with the bleed
export const Wash: React.FC<{ id: string; color: string; opacity?: number; children: React.ReactNode }> = ({
  id, color, opacity = 0.85, children,
}) => (
  <g filter={`url(#${id}-bleed)`} fill={color} opacity={opacity}>{children}</g>
);

export const Tooth: React.FC<{ id: string }> = ({ id }) => (
  <rect width={W} height={H} filter={`url(#${id}-tooth)`} />
);

// a full-frame paper background with an optional base wash colour
export const Paper: React.FC<{ id: string; seed?: number; base?: string; children?: React.ReactNode }> = ({
  id, seed = 3, base, children,
}) => (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
    <PaperDefs id={id} seed={seed} />
    <rect width={W} height={H} fill={C.paper} />
    {/* the base: a pale pastel tint of its colour (strong colour is kept for characters and props, as in the
        reference shorts); night and the dark wall stay deep */}
    {base && <Wash id={id} color={base} opacity={base === C.night || base === C.dark ? 0.85 : 0.4}><rect x={-40} y={-40} width={W + 80} height={H + 80} /></Wash>}
    {children}
    <Tooth id={id} />
  </svg>
);
