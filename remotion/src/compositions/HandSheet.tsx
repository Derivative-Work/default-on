// Review aid: the shared hand (Hand4) large, every pose, both sides, on paper under the film layer.
import React from "react";
import { Film } from "../film/Film";
import { Paper } from "../film/Paper";
import { SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { Hand4, HandPose } from "../rigs/Hand4";

const POSES: HandPose[] = ["rest", "open", "point", "fist"];

export const HandSheet: React.FC = () => (
  <Film>
    <Paper id="hands" seed={4} />
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
      {POSES.map((p, i) => [1, -1].map((side, j) => (
        <g key={`${p}${side}`} transform={`translate(${200 + i * 460 + j * 200}, 160)`}>
          <rect x={-40} y={-70} width={80} height={70} fill={C.teal} />
          <Hand4 pose={p} side={side as 1 | -1} s={2.6} />
          <text y={420} textAnchor="middle" fontFamily={SANS} fontSize={30} fill={C.ink}>{p} {side}</text>
        </g>
      )))}
      {POSES.map((p, i) => (
        <g key={p} transform={`translate(${200 + i * 460}, 820) rotate(-90)`}>
          <Hand4 pose={p} s={1.2} />
        </g>
      ))}
    </svg>
  </Film>
);
