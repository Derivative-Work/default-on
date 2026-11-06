// M2 style board: the brief's five key frames, one per frame of this composition (render with --frame=<i>). Each
// shows its shot at a chosen local frame, under the film layer.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import { S04, S16, S28, S53, S61 } from "../scenes/KeyFrames";

export const BOARD: { id: string; f: number; Scene: React.FC<{ f: number }> }[] = [
  { id: "S04", f: 92, Scene: S04 }, // the ON label just popped (on "on")
  { id: "S16", f: 18, Scene: S16 }, // mid-peel, the ball on "pic-"
  { id: "S28", f: 10, Scene: S28 },
  { id: "S53", f: 12, Scene: S53 },
  { id: "S61", f: 24, Scene: S61 }, // the hand stopped, hesitating
];

export const StyleBoard: React.FC = () => {
  const i = useCurrentFrame();
  const { Scene, f } = BOARD[i];
  return <Film><Scene f={f} /></Film>;
};
