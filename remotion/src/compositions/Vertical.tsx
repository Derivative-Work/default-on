// M5: the vertical shorts, 1080x1920. The 16:9 picture is shown whole, not cropped (the karaoke lines, captions and
// most staging use the full width), at full width on the S00 card's paper, under the film layer as in the cut; the
// title sits above it and the line being sung below it in large type, for phones watched on mute (Switch's lines
// labelled, as in the captions). Then a "Full video" card while the music fades. The audio is the final master over
// the same span.
//   Vertical       brief: S09-S17 (pre-chorus and chorus 1), ending after the sticker reveal
//   VerticalSchool the human's request (2026-11-09): the school story to the end of the final chorus (S48-S57c). Its
//                  on-screen citations would shrink to about 21 px at this scale, so each is repeated in large type
//                  under the line while it is on screen (the same words, the same shots)
import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Film } from "../film/Film";
import { CORRCAP, QUOTECAP, SCHOOLCAP } from "../shots/End";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { at, lines, sections, shot, shots } from "../timing";
import { ShotAt } from "./Cut";

export const V_W = 1080, V_H = 1920;
export const CARD = 90; // the "Full video" card, 3 s
const SCALE = V_W / W;
const endOf = (id: string) => shots.find((s) => s.id === id)!.end;

type Cite = { from: number; to: number; text: string };
type Spec = { from: number; to: number; titleY: number; picY: number; cites?: Cite[] };

const Title: React.FC<{ y: number }> = ({ y }) => (
  <div style={{ position: "absolute", top: y, width: V_W, textAlign: "center" }}>
    <div style={{ fontFamily: BUBBLE, fontSize: 132, color: C.cream, WebkitTextStroke: `10px ${C.ink}`, paintOrder: "stroke", letterSpacing: 4 }}>DEFAULT ON</div>
    <div style={{ fontFamily: SANS, fontSize: 38, color: C.inkSoft, marginTop: 16 }}>A cartoon for grown-ups about tech settings</div>
  </div>
);

const make = ({ from, to, titleY, picY, cites = [] }: Spec): React.FC => () => {
  const f = useCurrentFrame();
  const g = Math.min(from + f, to - 1); // the cut's frame; holds the last one under the card
  const card = f >= to - from;
  const ln = lines.find((l) => g >= l.frame_start && g < l.frame_end + 6);
  const on = cites.filter((c) => g >= c.from && g < c.to);
  const below = picY + H * SCALE;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: C.paper }} />
      <Title y={titleY} />
      <div style={{ position: "absolute", left: 0, top: picY, width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: "0 0",
        outline: `${6 / SCALE}px solid ${C.ink}`, opacity: card ? 0.25 : 1 }}>
        <Film strength={1}><ShotAt g={g} /></Film>
      </div>
      {!card && ln && (
        <div style={{ position: "absolute", top: below + 60, width: V_W, padding: "0 70px", boxSizing: "border-box", textAlign: "center",
          fontFamily: SANS, fontWeight: 600, fontSize: 58, lineHeight: 1.3, color: ln.singer === "switch" ? C.teal : C.ink }}>
          {ln.singer === "switch" && <div style={{ fontSize: 34, letterSpacing: 3, marginBottom: 8 }}>SWITCH</div>}
          {ln.text.replace("... ...", "… click! …")}
        </div>
      )}
      {!card && on.length > 0 && (
        <div style={{ position: "absolute", bottom: 120, width: V_W, padding: "0 70px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 18 }}>
          {on.map((c) => (
            <div key={c.text} style={{ background: C.cream, border: `3px solid ${C.ink}`, borderRadius: 12, padding: "14px 22px",
              fontFamily: SANS, fontWeight: 600, fontSize: 34, lineHeight: 1.3, color: C.ink, textAlign: "center" }}>{c.text}</div>
          ))}
        </div>
      )}
      {card && (
        <div style={{ position: "absolute", top: picY + 40, width: V_W, textAlign: "center", fontFamily: SANS, color: C.ink,
          opacity: interpolate(f - (to - from), [0, 8], [0, 1], { extrapolateRight: "clamp" }) }}>
          <div style={{ fontFamily: BUBBLE, fontSize: 110, color: C.mustard, WebkitTextStroke: `8px ${C.ink}`, paintOrder: "stroke" }}>Full video</div>
          <div style={{ fontSize: 46, marginTop: 30, fontWeight: 600 }}>Default On</div>
          <div style={{ fontSize: 36, marginTop: 14, color: C.inkSoft }}>on this channel</div>
        </div>
      )}
      <Audio src={staticFile("track.wav")} startFrom={from - at(0)}
        volume={(af) => interpolate(af, [0, 6, to - from, to - from + CARD], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </AbsoluteFill>
  );
};

// the pre-chorus and chorus 1
const A = { from: shot("S09").frame, to: endOf("S17") };
export const Vertical = make({ ...A, titleY: 290, picY: 680 });
export const V_LEN = A.to - A.from + CARD;

// the school story to the end of the final chorus. The citations hold where the cut holds them: the VP's on S50-S52,
// the correction on S53-S56, and the quote's source from the moment S55's label plate is on (its `tighten` passes
// 0.6: ez(f, 4, 0.7 len) is a smoothstep, which reaches 0.6 at 0.5655 of its span) through S56
const s55 = shot("S55"), s55len = endOf("S55") - s55.frame;
const plateOn = s55.frame + Math.round(4 + 0.5655 * (0.7 * s55len - 4));
const B = { from: shot("S48").frame, to: sections.find((s) => s.name === "Outro and reveal")!.frame_start };
export const VerticalSchool = make({
  ...B, titleY: 150, picY: 470,
  cites: [
    { from: shot("S50").frame, to: endOf("S52"), text: SCHOOLCAP },
    { from: plateOn, to: endOf("S56"), text: QUOTECAP },
    { from: shot("S53").frame, to: endOf("S56"), text: CORRCAP },
  ],
});
export const VS_LEN = B.to - B.from + CARD;
