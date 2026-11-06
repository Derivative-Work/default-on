// Watercolour backgrounds, built in code (no image model): washes are shapes pushed through turbulence displacement
// and a soft blur, with darker pooled edges, over a paper texture. Each wash takes a seed, so a background is the
// same on every frame (the old shorts repeated their backgrounds on loops).
import React from "react";
import { C, H, W } from "../theme/palette";

export const PaperDefs: React.FC<{ id: string; seed?: number }> = ({ id, seed = 3 }) => (
  <defs>
    {/* the bleed: displaces a wash's edge and softens it */}
    <filter id={`${id}-bleed`} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves={3} seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={38} xChannelSelector="R" yChannelSelector="G" result="d" />
      <feGaussianBlur in="d" stdDeviation={2.2} result="b" />
      {/* pigment pools at the edge: the blurred alpha minus a tighter one, darkened */}
      <feMorphology in="b" operator="erode" radius={5} result="inner" />
      <feComposite in="b" in2="inner" operator="out" result="edge" />
      <feColorMatrix in="edge" type="matrix" values="0.75 0 0 0 0  0 0.72 0 0 0  0 0 0.7 0 0  0 0 0 0.55 0" result="pool" />
      {/* pigment settles unevenly: broad, soft variations in density, never fine noise */}
      <feTurbulence type="fractalNoise" baseFrequency="0.0045" numOctaves={3} seed={seed + 7} result="blotch" />
      <feColorMatrix in="blotch" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.75 1.12" result="mask" />
      <feComposite in="b" in2="mask" operator="in" result="mottled" />
      <feMerge><feMergeNode in="mottled" /><feMergeNode in="pool" /></feMerge>
    </filter>
    {/* paper tooth */}
    <filter id={`${id}-tooth`}>
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={3} seed={seed + 11} />
      <feColorMatrix type="matrix" values="0 0 0 0 0.24  0 0 0 0 0.15  0 0 0 0 0.09  0 0 0 0.07 0" />
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
    {base && <Wash id={id} color={base} opacity={0.9}><rect x={-40} y={-40} width={W + 80} height={H + 80} /></Wash>}
    {children}
    <Tooth id={id} />
  </svg>
);
