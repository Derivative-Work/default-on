import React from "react";
import { Composition } from "remotion";
import "./theme/fonts";
import { RigSheet } from "./compositions/RigSheet";
import { StyleBoard, BOARD } from "./compositions/StyleBoard";
import { MotionTest, MOTION_TEST } from "./compositions/MotionTest";
import { FPS } from "./timing";
import { H, W } from "./theme/palette";

export const Root: React.FC = () => (
  <>
    <Composition id="RigSheet" component={RigSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="StyleBoard" component={StyleBoard} durationInFrames={Math.max(1, BOARD.length)} fps={FPS} width={W} height={H} />
    <Composition id="MotionTest" component={MotionTest} durationInFrames={MOTION_TEST.frames} fps={FPS} width={W} height={H} />
  </>
);
