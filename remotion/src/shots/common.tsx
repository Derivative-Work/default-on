// What every shot component receives, and the background wrapper they share.
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Paper } from "../film/Paper";

export type ShotProps = { f: number; g: number; len: number }; // local frame, global frame, frames on screen
export type ShotC = React.FC<ShotProps>;

export const Bg: React.FC<{ id: string; seed?: number; base?: string; children?: React.ReactNode }> = ({ id, seed = 3, base, children }) => (
  <AbsoluteFill><Paper id={id} seed={seed} base={base}>{children}</Paper></AbsoluteFill>
);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
// 0..1 between local frames a and b, eased
export const ez = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: (t) => t * t * (3 - 2 * t) });
// a quick in-and-out bounce for a hop or a thud, peaking at frame p
export const bump = (f: number, p: number, w = 6) => Math.max(0, 1 - Math.abs(f - p) / w);
// blink every ~3 s
export const blink = (g: number, seed = 0) => ((g + seed * 37) % 96 > 92 ? 1 : 0);

// a stand-in for a shot built from real material the human supplies (R screen capture, H footage)
export const Stand: React.FC<{ label: string; note: string }> = ({ label, note }) => (
  <AbsoluteFill style={{ backgroundColor: "#1d1712", color: "#f1e3c2", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", fontFamily: "'Work Sans', sans-serif" }}>
    <div style={{ fontSize: 72, fontWeight: 600 }}>{label}</div>
    <div style={{ fontSize: 36, marginTop: 24, opacity: 0.8, maxWidth: 1400, textAlign: "center" }}>{note}</div>
  </AbsoluteFill>
);
