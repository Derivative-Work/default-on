// Review aid: one frame from the middle of every shot, in shot order (frame i = shot i), with the burn-ins.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import { ShotAt } from "./Cut";
import { shots } from "../timing";
import { SANS } from "../theme/fonts";

export const SpotCheck: React.FC = () => {
  const s = shots[useCurrentFrame()];
  const g = Math.floor((s.frame + s.end) / 2);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <div style={{ width: 1920, height: 1080, transform: "scale(0.5)", transformOrigin: "0 0", position: "absolute" }}>
        <Film><ShotAt g={g} /></Film>
        <div style={{ position: "absolute", left: 16, top: 16, background: "rgba(29,23,18,0.8)", color: "#f1e3c2", fontFamily: SANS, fontSize: 44, padding: "6px 16px", borderRadius: 8 }}><b>{s.id}</b> f{g}</div>
      </div>
    </AbsoluteFill>
  );
};
