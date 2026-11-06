// M2 review aid: every rig pose and mouth shape on one sheet, on paper, under the film layer.
import React from "react";
import { Film } from "../film/Film";
import { Paper } from "../film/Paper";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { Hand } from "../rigs/Hand";
import { MOUTHS, Mouth } from "../rigs/Mouth";
import { Narrator } from "../rigs/Narrator";
import { Switch, SwitchPose } from "../rigs/Switch";

const POSES: SwitchPose[] = ["neutral", "curious", "proud", "sad", "startled", "relaxed"];

export const RigSheet: React.FC = () => (
  <Film>
    <Paper id="rig" seed={9} />
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
      <text x={40} y={70} fontFamily={BUBBLE} fontSize={44} fill={C.ink}>RIG SHEET</text>
      {POSES.map((p, i) => (
        <g key={p} transform={`translate(${150 + i * 200}, 290) scale(0.52)`}>
          <Switch pose={p} />
          <text y={300} textAnchor="middle" fontFamily={SANS} fontSize={44} fill={C.ink}>{p}</text>
        </g>
      ))}
      {MOUTHS.map((m, i) => (
        <g key={m} transform={`translate(${110 + i * 110}, 560)`}>
          <circle r={48} fill={C.cream} stroke={C.ink} strokeWidth={4} />
          <g transform="translate(0,-10)"><Mouth shape={m} w={60} /></g>
          <text y={86} textAnchor="middle" fontFamily={SANS} fontSize={26} fill={C.ink}>{m}</text>
        </g>
      ))}
      <g transform="translate(1700, 640) scale(0.6)"><Narrator mouth="C" armR="point" /></g>
      <g transform="translate(1300, 640) scale(0.6)"><Narrator mouth="E" head={0.8} armL="tap" armR="down" sheepish={1} /></g>
      <g transform="translate(-60, 900) rotate(-6) scale(0.8)"><Hand reach={1} length={760} /></g>
    </svg>
  </Film>
);
