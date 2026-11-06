// The film layer (brief, "Film layer"): one shared module over every shot. Grain, slight gate weave, a soft
// vignette, occasional dust specks and hairs, colour faded toward yellow, and a two-frame splice flash where each
// section opens. `strength` stays at 1 through the song and drops to 0 for the real-world outro (S65-S67).
import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C, H, W } from "../theme/palette";

const WEAVE_HOLD = 2; // the gate weave moves every 2 frames (15 Hz), like a projector's pull-down

// a smooth-ish random walk per frame: sum of a few sines with random phases, deterministic
const wobble = (f: number, seed: string, amp: number) => {
  let v = 0;
  for (let k = 1; k <= 3; k++) {
    v += Math.sin(f * (0.07 * k + random(`${seed}f${k}`) * 0.05) + random(`${seed}p${k}`) * 6.28) / k;
  }
  return (v / 1.83) * amp + (random(`${seed}${f}`) - 0.5) * amp * 0.35;
};

const Dust: React.FC<{ frame: number }> = ({ frame }) => {
  // about one frame in four carries a speck or two; one in thirty a hair
  const specks = [];
  const n = random(`dust-n-${frame}`) < 0.25 ? 1 + Math.floor(random(`dust-k-${frame}`) * 3) : 0;
  for (let i = 0; i < n; i++) {
    const x = random(`dx${frame}-${i}`) * W;
    const y = random(`dy${frame}-${i}`) * H;
    const r = 1.5 + random(`dr${frame}-${i}`) * 4;
    const light = random(`dl${frame}-${i}`) < 0.3;
    specks.push(<ellipse key={i} cx={x} cy={y} rx={r} ry={r * (0.6 + random(`de${frame}-${i}`) * 0.6)}
      fill={light ? C.white : C.ink} opacity={0.55} />);
  }
  if (random(`hair-${frame}`) < 0.033) {
    const x = random(`hx${frame}`) * W, y = random(`hy${frame}`) * H;
    specks.push(<path key="hair" d={`M${x},${y} q${30},${-40} ${70},${-20} t${50},${30}`} stroke={C.ink}
      strokeWidth={1.6} fill="none" opacity={0.5} />);
  }
  return <svg width={W} height={H} style={{ position: "absolute" }}>{specks}</svg>;
};

export const Film: React.FC<{ strength?: number; splices?: number[]; children: React.ReactNode }> = ({
  strength = 1, splices = [], children,
}) => {
  const frame = useCurrentFrame();
  const s = strength;
  const wf = Math.floor(frame / WEAVE_HOLD);
  const dx = wobble(wf, "wx", 2.2) * s;
  const dy = wobble(wf, "wy", 1.6) * s;
  const flicker = 1 + (random(`flicker${frame}`) - 0.5) * 0.04 * s;
  const splice = splices.find((f) => frame >= f && frame < f + 2);
  return (
    <AbsoluteFill style={{ backgroundColor: C.dark, overflow: "hidden" }}>
      <AbsoluteFill style={{
        transform: `translate(${dx}px, ${dy}px) scale(${1 + 0.004 * s})`,
        filter: `sepia(${0.22 * s}) saturate(${1 - 0.12 * s}) contrast(${1 - 0.06 * s}) brightness(${flicker})`,
      }}>
        {children}
      </AbsoluteFill>
      {s > 0 && (
        <>
          {/* grain: a fresh noise field every frame, overlaid */}
          <svg width={W} height={H} style={{ position: "absolute", mixBlendMode: "overlay", opacity: 0.5 * s }}>
            <filter id={`grain${frame}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={frame % 997} />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width={W} height={H} filter={`url(#grain${frame})`} />
          </svg>
          {/* faded toward yellow: a warm wash, multiplied */}
          <AbsoluteFill style={{ backgroundColor: "#f0d79a", mixBlendMode: "multiply", opacity: 0.16 * s }} />
          <AbsoluteFill style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(40,22,10,0.55) 100%)",
            opacity: s,
          }} />
          <div style={{ position: "absolute", inset: 0, opacity: s }}><Dust frame={frame} /></div>
        </>
      )}
      {splice !== undefined && (
        // a reel join: a bright overexposed frame, then a frame with the splice tape's edge across it
        <AbsoluteFill style={{ backgroundColor: frame === splice ? "rgba(255,246,220,0.85)" : "transparent" }}>
          {frame === splice + 1 && (
            <div style={{ position: "absolute", left: 0, right: 0, top: H * 0.38, height: 10,
              background: "rgba(255,250,235,0.7)", borderTop: `2px solid rgba(61,38,23,0.4)` }} />
          )}
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
