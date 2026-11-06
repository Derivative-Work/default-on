// Seven mouth shapes shared by both rigs, named as Rhubarb Lip Sync names its basic set (M4 drives them from the
// Narrator stem and the Switch comp): X rest, A closed (M B P), B slightly open (most consonants, EE), C open (EH),
// D wide open (AA), E rounded (AO, ER), F puckered (OO, W).
import React from "react";
import { C } from "../theme/palette";

export type MouthShape = "X" | "A" | "B" | "C" | "D" | "E" | "F";
export const MOUTHS: MouthShape[] = ["X", "A", "B", "C", "D", "E", "F"];

// drawn at the origin, about `w` wide; `smile` bends the rest and closed shapes up (+) or down (-)
export const Mouth: React.FC<{ shape: MouthShape; w?: number; smile?: number; fill?: string }> = ({
  shape, w = 60, smile = 0.4, fill = "#7a2e22",
}) => {
  const h = w / 2;
  const k = smile * w * 0.18;
  const st = { stroke: C.ink, strokeWidth: w * 0.07, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const tongue = "#c76a5a";
  switch (shape) {
    case "X":
      return <path d={`M${-h * 0.8},0 Q0,${k * 1.4} ${h * 0.8},0`} fill="none" {...st} />;
    case "A":
      return <path d={`M${-h * 0.75},0 Q0,${k} ${h * 0.75},0`} fill="none" {...st} strokeWidth={w * 0.09} />;
    case "B":
      return (
        <g>
          <path d={`M${-h * 0.8},0 Q0,${-w * 0.04} ${h * 0.8},0 Q0,${w * 0.2 + k} ${-h * 0.8},0 Z`} fill={fill} {...st} />
          <path d={`M${-h * 0.55},${w * 0.03} L${h * 0.55},${w * 0.03}`} stroke={C.white} strokeWidth={w * 0.06} />
        </g>
      );
    case "C":
      return (
        <g>
          <path d={`M${-h * 0.8},0 Q0,${-w * 0.1} ${h * 0.8},0 Q0,${w * 0.42 + k} ${-h * 0.8},0 Z`} fill={fill} {...st} />
          <ellipse cx={0} cy={w * 0.2} rx={w * 0.2} ry={w * 0.06} fill={tongue} />
        </g>
      );
    case "D":
      return (
        <g>
          <path d={`M${-h * 0.9},${-w * 0.02} Q0,${-w * 0.16} ${h * 0.9},${-w * 0.02} Q${h * 0.7},${w * 0.62} 0,${w * 0.64} Q${-h * 0.7},${w * 0.62} ${-h * 0.9},${-w * 0.02} Z`} fill={fill} {...st} />
          <ellipse cx={0} cy={w * 0.44} rx={w * 0.24} ry={w * 0.1} fill={tongue} />
          <path d={`M${-h * 0.6},${-w * 0.04} L${h * 0.6},${-w * 0.04}`} stroke={C.white} strokeWidth={w * 0.07} />
        </g>
      );
    case "E":
      return <ellipse cx={0} cy={w * 0.14} rx={w * 0.26} ry={w * 0.24} fill={fill} {...st} />;
    case "F":
      return (
        <g>
          <ellipse cx={0} cy={w * 0.06} rx={w * 0.16} ry={w * 0.13} fill={fill} {...st} />
          <path d={`M${-w * 0.24},${-w * 0.02} Q${-w * 0.3},${w * 0.07} ${-w * 0.22},${w * 0.16}`} fill="none" {...st} strokeWidth={w * 0.04} />
          <path d={`M${w * 0.24},${-w * 0.02} Q${w * 0.3},${w * 0.07} ${w * 0.22},${w * 0.16}`} fill="none" {...st} strokeWidth={w * 0.04} />
        </g>
      );
  }
};
