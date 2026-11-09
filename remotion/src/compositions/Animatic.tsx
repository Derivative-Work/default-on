// M3 animatic: the whole cut at low resolution (960x540, the 1920x1080 frame scaled by half), with burn-ins: the
// shot and its cue top left, the frame and audio time bottom right, and Switch's slots as text slates (brief, M3:
// "Switch's slots show the line as a text slate") over the frames where his take will go.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cut } from "./Cut";
import { SANS } from "../theme/fonts";
import { FPS, PREROLL, at, shots } from "../timing";
import map from "../../../timing/map.json";

export const SCALE = 0.5;

const SLOTS = map.switch_slots.map((s) => {
  const spans = s.take;
  return { id: s.id, text: s.text, room: s.room_len, a: at(spans[0][0]), b: at(spans[spans.length - 1][1]) };
});

const tc = (g: number) => {
  const t = g / FPS - PREROLL;
  const sign = t < 0 ? "-" : "";
  const a = Math.abs(t);
  return `${sign}${Math.floor(a / 60)}:${(a % 60).toFixed(2).padStart(5, "0")}`;
};

export const Burn: React.FC<{ from?: number }> = ({ from = 0 }) => {
  const g = useCurrentFrame() + from;
  const s = [...shots].reverse().find((x) => g >= x.frame) ?? shots[0];
  const sl = SLOTS.find((x) => g >= x.a && g < x.b);
  const box = { position: "absolute" as const, background: "rgba(29,23,18,0.78)", color: "#f1e3c2", fontFamily: SANS, padding: "8px 16px", borderRadius: 8 };
  return (
    <AbsoluteFill>
      <div style={{ ...box, left: 16, top: 16, fontSize: 30, maxWidth: 1400 }}><b>{s.id}</b> {s.cue.slice(0, 90)}</div>
      <div style={{ ...box, right: 16, bottom: 16, fontSize: 28, fontVariantNumeric: "tabular-nums" }}>f{g} · {tc(g)}</div>
      {sl && (
        <div style={{ ...box, right: 16, top: 16, fontSize: 36, background: "rgba(128,137,58,0.92)", border: "3px solid #f1e3c2" }}>
          <b>SWITCH {sl.id}</b> · “{sl.text}” <span style={{ opacity: 0.8 }}>({sl.room.toFixed(2)} s room)</span>
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Animatic: React.FC<{ from?: number }> = ({ from = 0 }) => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <div style={{ width: 1920, height: 1080, transform: `scale(${SCALE})`, transformOrigin: "0 0", position: "absolute" }}>
      <Cut from={from} />
      <Burn from={from} />
    </div>
  </AbsoluteFill>
);
