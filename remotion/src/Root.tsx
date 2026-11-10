import React from "react";
import { Composition } from "remotion";
import "./theme/fonts";
import { RigSheet } from "./compositions/RigSheet";
import { HandSheet } from "./compositions/HandSheet";
import { Thumbnail } from "./compositions/Thumbnail";
import { Vertical, VerticalSchool, VS_LEN, V_H, V_LEN, V_W } from "./compositions/Vertical";
import { StyleBoard, BOARD } from "./compositions/StyleBoard";
import { MotionTest, MOTION_TEST } from "./compositions/MotionTest";
import { Animatic } from "./compositions/Animatic";
import { Cut } from "./compositions/Cut";
import { SpotCheck } from "./compositions/SpotCheck";
import { shots } from "./timing";
import { END, FPS, sections } from "./timing";
import { H, W } from "./theme/palette";

export const Root: React.FC = () => (
  <>
    <Composition id="RigSheet" component={RigSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="HandSheet" component={HandSheet} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="Thumbnail" component={Thumbnail} durationInFrames={1} fps={FPS} width={W} height={H} />
    <Composition id="Vertical" component={Vertical} durationInFrames={V_LEN} fps={FPS} width={V_W} height={V_H} />
    <Composition id="VerticalSchool" component={VerticalSchool} durationInFrames={VS_LEN} fps={FPS} width={V_W} height={V_H} />
    <Composition id="StyleBoard" component={StyleBoard} durationInFrames={Math.max(1, BOARD.length)} fps={FPS} width={W} height={H} />
    <Composition id="MotionTest" component={MotionTest} durationInFrames={MOTION_TEST.frames} fps={FPS} width={W} height={H} />
    <Composition id="SpotCheck" component={SpotCheck} durationInFrames={shots.length} fps={FPS} width={960} height={540} />
    <Composition id="Animatic" component={Animatic} durationInFrames={END} fps={FPS} width={960} height={540} defaultProps={{ from: 0 }} />
    {/* one composition per section (brief, Pipeline: Graphics), at full size */}
    {sections.map((s, i) => {
      const end = i + 1 < sections.length ? sections[i + 1].frame_start : END;
      return <Composition key={s.name} id={`Sec${String(i + 1).padStart(2, "0")}-${s.name.replace(/[^A-Za-z0-9]+/g, "")}`} component={Cut}
        durationInFrames={end - s.frame_start} fps={FPS} width={W} height={H} defaultProps={{ from: s.frame_start }} />;
    })}
  </>
);
