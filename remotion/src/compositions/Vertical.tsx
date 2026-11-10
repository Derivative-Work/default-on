// M5: the vertical cut (brief: S09-S17, pre-chorus and chorus 1, ending on the sticker reveal, with a "Full video"
// card). 1080x1920. The 16:9 picture is shown whole, not cropped (the chorus's karaoke lines and most staging use the
// full width), at full width in the middle of the S00 card's paper, under the film layer as in the cut; the title sits
// above it and the line being sung below it in large type, for phones watched on mute (Switch's lines labelled, as in
// the captions). Then a "Full video" card while the music fades. The audio is the final master over the same span.
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { at, lines, shot, shots } from "../timing";
import { ShotAt } from "./Cut";

export const V_W = 1080, V_H = 1920;
const FROM = shot("S09").frame;
const TO = shots.find((s) => s.id === "S17")!.end;
export const CARD = 90; // the "Full video" card, 3 s
export const V_LEN = TO - FROM + CARD;
const SCALE = V_W / W, PIC_Y = 680;

const Title: React.FC = () => (
  <div style={{ position: "absolute", top: 290, width: V_W, textAlign: "center" }}>
    <div style={{ fontFamily: BUBBLE, fontSize: 132, color: C.cream, WebkitTextStroke: `10px ${C.ink}`, paintOrder: "stroke", letterSpacing: 4 }}>DEFAULT ON</div>
    <div style={{ fontFamily: SANS, fontSize: 38, color: C.inkSoft, marginTop: 16 }}>A cartoon for grown-ups about tech settings</div>
  </div>
);

export const Vertical: React.FC = () => {
  const f = useCurrentFrame();
  const g = Math.min(FROM + f, TO - 1); // the cut's frame; holds the last one under the card
  const card = f >= TO - FROM;
  const ln = lines.find((l) => g >= l.frame_start && g < l.frame_end + 6);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: C.paper }} />
      <AbsoluteFill style={{ width: V_W, height: V_H }}>
        <Title />
        <div style={{ position: "absolute", left: 0, top: PIC_Y, width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: "0 0",
          outline: `${6 / SCALE}px solid ${C.ink}`, opacity: card ? 0.25 : 1 }}>
          <Film strength={1}><ShotAt g={g} /></Film>
        </div>
        {!card && ln && (
          <div style={{ position: "absolute", top: PIC_Y + H * SCALE + 70, width: V_W, padding: "0 70px", boxSizing: "border-box", textAlign: "center",
            fontFamily: SANS, fontWeight: 600, fontSize: 58, lineHeight: 1.3, color: ln.singer === "switch" ? C.teal : C.ink }}>
            {ln.singer === "switch" && <div style={{ fontSize: 34, letterSpacing: 3, marginBottom: 8 }}>SWITCH</div>}
            {ln.text.replace("... ...", "… click! …")}
          </div>
        )}
        {card && (
          <div style={{ position: "absolute", top: PIC_Y + 40, width: V_W, textAlign: "center", fontFamily: SANS, color: C.ink,
            opacity: interpolate(f - (TO - FROM), [0, 8], [0, 1], { extrapolateRight: "clamp" }) }}>
            <div style={{ fontFamily: BUBBLE, fontSize: 110, color: C.mustard, WebkitTextStroke: `8px ${C.ink}`, paintOrder: "stroke" }}>Full video</div>
            <div style={{ fontSize: 46, marginTop: 30, fontWeight: 600 }}>Default On</div>
            <div style={{ fontSize: 36, marginTop: 14, color: C.inkSoft }}>on this channel</div>
          </div>
        )}
      </AbsoluteFill>
      <Audio src={staticFile("track.wav")} startFrom={FROM - at(0)} volume={(af) => interpolate(af, [0, 6, TO - FROM, V_LEN], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </AbsoluteFill>
  );
};
