// S00-S08: the pre-roll card, the countdown and title, the Narrator's welcome, Switch, and verse 1.
import React from "react";
import { AbsoluteFill, spring } from "remotion";
import { Wash } from "../film/Paper";
import { AnswerBox, Chalkboard, Links, MiniRocker, SearchBox, Stool } from "../components/props";
import { Wall } from "../components/kit";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { FPS, mouthAt, wordAt } from "../timing";
import { S04 as S04Key } from "../scenes/KeyFrames";
import { Bg, ShotC, blink, bump, ez } from "./common";

// S00: "A cartoon for grown-ups about tech settings." Plain sans, warm ink, no characters: a label, not a title
export const S00: ShotC = () => (
  <Bg id="s00" seed={1}>
    <text x={W / 2} y={H / 2 + 14} textAnchor="middle" fontFamily={SANS} fontWeight={400} fontSize={56} fill={C.ink}>
      A cartoon for grown-ups about tech settings.
    </text>
  </Bg>
);

// S01: film-leader countdown (3, 2, 1, a frame each second), then the title on mustard; a small rocker under the
// title rocks itself from OFF to ON
export const S01: ShotC = ({ f, len }) => {
  const count = 90; // the countdown's frames, before the downbeat
  if (f < count) {
    const n = 3 - Math.floor(f / 30);
    const sweep = ((f % 30) / 30) * 360;
    return (
      <AbsoluteFill style={{ backgroundColor: "#cfc4ad" }}>
        <svg width={W} height={H}>
          <path d={`M${W / 2},${H / 2} L${W / 2},${H / 2 - 600} A600,600 0 ${sweep > 180 ? 1 : 0},1 ${W / 2 + 600 * Math.sin((sweep * Math.PI) / 180)},${H / 2 - 600 * Math.cos((sweep * Math.PI) / 180)} Z`} fill="#a89d86" />
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke={C.ink} strokeWidth={4} />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke={C.ink} strokeWidth={4} />
          {[300, 380].map((r) => <circle key={r} cx={W / 2} cy={H / 2} r={r} fill="none" stroke={C.cream} strokeWidth={8} />)}
          <text x={W / 2} y={H / 2 + 120} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={340} fill={C.ink}>{n}</text>
        </svg>
      </AbsoluteFill>
    );
  }
  const t = f - count;
  const s = spring({ frame: t, fps: FPS, config: { damping: 11 } });
  return (
    <Bg id="s01" seed={2} base={C.mustard}>
      <g transform={`translate(${W / 2}, 470) scale(${s})`}>
        <text textAnchor="middle" fontFamily={BUBBLE} fontSize={230} fill={C.cream} stroke={C.ink} strokeWidth={14} paintOrder="stroke" letterSpacing={6}>DEFAULT ON</text>
      </g>
      <g transform={`translate(${W / 2}, 720)`}><MiniRocker on={t > Math.min(40, len - count - 12) ? 1 : 0} s={1.3} /></g>
    </Bg>
  );
};

// the Narrator on his stool by the chalkboard: the intro and lesson set
export const NarratorSet: React.FC<{ g: number; board: string[]; arm?: "open" | "point" | "tap" | "down"; head?: number; x?: number; size?: number; children?: React.ReactNode }> = ({
  g, board, arm = "open", head = 0, x = 1340, size = 64, children,
}) => (
  <Bg id="narr" seed={20} base={C.avocado}>
    <Chalkboard lines={board} size={size} />
    <g transform={`translate(${x}, 760)`}><Stool /></g>
    <g transform={`translate(${x}, 600) scale(0.95)`}>
      <Narrator mouth={mouthAt(g, "narrator")} armR={arm} armL="down" head={head} blink={blink(g)} />
    </g>
    {children}
  </Bg>
);

// S02: "Hi, grown-ups! Today we're learning how an opt-out works."
export const S02: ShotC = ({ g }) => <NarratorSet g={g} board={["TODAY:", "HOW AN OPT-OUT", "WORKS"]} arm={g > wordAt("L01", 3) ? "point" : "open"} />;

// S03: "Say hello to Little Switch!": pan right along the wall to a wall plate; Switch's eyes open
export const S03: ShotC = ({ f, len }) => {
  const pan = ez(f, 0, len * 0.7);
  const open = ez(f, len * 0.75, len * 0.9);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: -W * pan, top: 0, width: W * 2, height: H }}>
        <svg width={W * 2} height={H} viewBox={`0 0 ${W * 2} ${H}`}>
          <rect width={W * 2} height={H} fill={C.paper} />
          <g><Wall id="s04" color={C.mustard} /></g>
          <g transform={`translate(${W}, 0)`}><Wall id="s04" color={C.mustard} /></g>
          <rect x={250} y={190} width={300} height={220} fill={C.teal} opacity={0.5} stroke={C.ink} strokeWidth={7} />
          <g transform={`translate(${W + W / 2}, 470)`}><Switch pose="neutral" toggle={0.5} blink={1 - open} /></g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

export const S04: ShotC = ({ f }) => <S04Key f={f} />;

// S05: "You typed a little question…": a big generic search box on a desk; letters type themselves
export const S05: ShotC = ({ f, len }) => {
  const q = "why is there a robot in my search";
  const n = Math.min(q.length, Math.floor((f / (len * 0.8)) * q.length));
  return (
    <Bg id="s05" seed={5} base={C.teal}>
      <Wash id="s05" color={C.cardigan} opacity={0.8}><rect x={-40} y={760} width={W + 80} height={400} /></Wash>
      <g transform={`translate(${W / 2}, 460)`}><SearchBox text={q.slice(0, n)} caret={f % 20 < 10} /></g>
    </Bg>
  );
};

// S06: "And an answer hopped on top of it…": an answer box with legs hops onto the links and sits on them
export const S06: ShotC = ({ f, len }) => {
  const land = len * 0.45;
  const p = ez(f, 0, land);
  const y = 160 + p * 280 - Math.sin(p * Math.PI) * 240;
  const sq = Math.min(1, Math.max(0, (f - land) / 4)) * (1 - bump(f, land + 8, 10) * 0.3);
  return (
    <Bg id="s06" seed={6} base={C.teal}>
      <g transform={`translate(${W / 2}, 230)`}><SearchBox text="why is there a robot in my search" caret={false} /></g>
      <g transform={`translate(${W / 2}, ${600 + sq * 40})`}><Links squash={sq} /></g>
      <g transform={`translate(${W / 2 - 300 + p * 300}, ${y + 200})`}>
        <AnswerBox legs={f < land ? 1 : 0.3} squash={bump(f, land, 5)} mouth={f > land + 10 ? "D" : "X"} />
      </g>
    </Bg>
  );
};

// S07: V02 "That's neat, but what if I would rather read the page myself?": Switch lifts a corner of the answer box
// and peeks at the squashed links
export const S07: ShotC = ({ f, g }) => {
  const lift = ez(f, 8, 26);
  return (
    <Bg id="s07" seed={7} base={C.teal}>
      <g transform={`translate(${W / 2}, 620)`}><Links squash={0.75} /></g>
      <g transform={`translate(${W / 2}, ${560 - lift * 30}) rotate(${-lift * 9}, 260, 100)`}><AnswerBox legs={0.3} /></g>
      <g transform={`translate(${W / 2 + 420}, 720) scale(0.62)`}>
        <Switch pose="curious" mouth={mouthAt(g, "switch")} look={[-0.9, 0.3]} armL={110 + lift * 30} blink={blink(g, 1)} />
      </g>
    </Bg>
  );
};

// S08: "Well, there's a tiny tab marked 'Web'…": Switch climbs a wobbling ladder to a tiny "Web" tab on a high shelf
export const S08: ShotC = ({ f, g, len }) => {
  const climb = ez(f, 6, len - 10);
  const wob = Math.sin(f / 3) * 3;
  return (
    <Bg id="s08" seed={8} base={C.mustard}>
      <rect x={1000} y={180} width={700} height={30} fill={C.cardigan} stroke={C.ink} strokeWidth={6} />
      <g transform="translate(1520, 150)">
        <rect x={-42} y={-30} width={84} height={34} rx={6} fill={C.white} stroke={C.ink} strokeWidth={4} />
        <text textAnchor="middle" y={-4} fontFamily={SANS} fontWeight={600} fontSize={24} fill={C.ink}>Web</text>
      </g>
      <g transform={`translate(1240, 1000) rotate(${wob - 8})`}>
        {[-70, 70].map((x) => <line key={x} x1={x} y1={0} x2={x * 0.7} y2={-840} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />)}
        {Array.from({ length: 8 }, (_, i) => <line key={i} x1={-66 + i * 2} y1={-60 - i * 100} x2={66 - i * 2} y2={-60 - i * 100} stroke={C.ink} strokeWidth={10} />)}
      </g>
      <g transform={`translate(${1240 + wob}, ${880 - climb * 560}) scale(0.5) rotate(${wob})`}>
        <Switch pose="curious" look={[0.6, -0.9]} armL={150} armR={150} blink={blink(g, 2)} />
      </g>
      <g transform="translate(560, 420) scale(0.8)"><Narrator mouth={mouthAt(g, "narrator")} armR="point" head={1} /></g>
    </Bg>
  );
};
