// The closing cards (brief, End card and fact cards; M5): fact card G, the creator's disclosure, one card per row of
// the Default On fact card in table order, then the end card. Plain type in the warm ink on the S00 card's cream paper,
// no film layer (it is off from S65), no characters. The words come from closing.json, copied from the song doc's fact
// card; nothing here rewords them. Each card fades up from the paper over a few frames; its length is the map's.
import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import closing from "../closing.json";
import { C } from "../theme/palette";
import { SANS } from "../theme/fonts";
import { post } from "../timing";
import { Bg, ShotC } from "./common";

type Source = { name: string; url: string };
const bare = (u: string) => u.replace(/^https?:\/\/(www\.)?/, "");
const fade = (f: number, len: number) =>
  Math.min(interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" }), interpolate(f, [len - 6, len], [1, 0], { extrapolateLeft: "clamp" }));

const Page: React.FC<{ id: string; f: number; len: number; children: React.ReactNode }> = ({ id, f, len, children }) => (
  <AbsoluteFill>
    <Bg id={id} seed={71} />
    <AbsoluteFill style={{ opacity: fade(f, len), padding: "110px 170px", display: "flex", flexDirection: "column", justifyContent: "center",
      fontFamily: SANS, color: C.ink }}>
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

// the body's size steps down for the longer rows so every card fits without crowding
const bodySize = (txt: string) => (txt.length > 380 ? 38 : txt.length > 220 ? 44 : 50);

const Sources: React.FC<{ list: Source[] }> = ({ list }) => (
  <div style={{ marginTop: 44, fontSize: 24, lineHeight: 1.45, color: C.inkSoft }}>
    <div style={{ fontWeight: 600, letterSpacing: 2, fontSize: 20, marginBottom: 6 }}>{list.length > 1 ? "SOURCES" : "SOURCE"}</div>
    {list.map((s) => <div key={s.url}><span style={{ fontWeight: 600 }}>{s.name}</span> · {bare(s.url)}</div>)}
  </div>
);

// allegations say so (brief): an alleged row's status is set in red, a fact's in the soft ink
const Status: React.FC<{ text: string }> = ({ text }) => {
  const alleged = /^alleged/i.test(text);
  return (
    <div style={{ marginTop: 34, alignSelf: "flex-start", border: `3px solid ${alleged ? C.red : C.inkSoft}`, borderRadius: 10,
      padding: "8px 18px", fontSize: 28, fontWeight: 600, color: alleged ? C.red : C.inkSoft, maxWidth: 1500 }}>{text}</div>
  );
};

export const FG: ShotC = ({ f, len }) => {
  const c = closing.G;
  return (
    <Page id="fg" f={f} len={len}>
      <div style={{ fontSize: 66, fontWeight: 600, marginBottom: 30 }}>{c.heading}</div>
      <div style={{ fontSize: bodySize(c.body), lineHeight: 1.4 }}>{c.body}</div>
      <Sources list={c.sources} />
    </Page>
  );
};

export const FD: ShotC = ({ f, len }) => (
  <Page id="fd" f={f} len={len}>
    <div style={{ fontSize: 54, lineHeight: 1.45, textAlign: "center", padding: "0 60px" }}>{closing.D.body}</div>
  </Page>
);

const Row: React.FC<{ i: number; f: number; len: number }> = ({ i, f, len }) => {
  const r = closing.rows[i];
  return (
    <Page id={`f${i + 1}`} f={f} len={len}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: C.inkSoft, marginBottom: 26 }}>
        <span>In the song: <span style={{ fontStyle: "italic" }}>{r.lyric}</span></span>
        <span>{i + 1} of {closing.rows.length}</span>
      </div>
      <div style={{ fontSize: bodySize(r.body), lineHeight: 1.4 }}>{r.body}</div>
      <Status text={r.status} />
      <Sources list={r.sources} />
    </Page>
  );
};
export const F1: ShotC = (p) => <Row i={0} {...p} />;
export const F2: ShotC = (p) => <Row i={1} {...p} />;
export const F3: ShotC = (p) => <Row i={2} {...p} />;
export const F4: ShotC = (p) => <Row i={3} {...p} />;
export const F5: ShotC = (p) => <Row i={4} {...p} />;
export const F6: ShotC = (p) => <Row i={5} {...p} />;
export const F7: ShotC = (p) => <Row i={6} {...p} />;
export const F8: ShotC = (p) => <Row i={7} {...p} />;
export const F9: ShotC = (p) => <Row i={8} {...p} />;

export const FE: ShotC = ({ f, len }) => {
  const e = closing.end;
  const n = post.find((p) => p.id === e.id)?.interventions;
  return (
    <Page id="fe" f={f} len={len}>
      <div style={{ fontSize: 60, fontWeight: 600, marginBottom: 40, textAlign: "center" }}>Default On</div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", rowGap: 18, columnGap: 36, fontSize: 34, lineHeight: 1.35 }}>
        {e.credits.map(([k, v]) => (
          <React.Fragment key={k}>
            <div style={{ fontWeight: 600, textAlign: "right", color: C.inkSoft }}>{k}</div>
            <div>{v}</div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 30, textAlign: "center", color: C.inkSoft }}>
        <div>{n} human interventions, each one logged at</div>
        <div style={{ fontSize: 26, marginTop: 6 }}>{e.log_url}</div>
      </div>
    </Page>
  );
};
