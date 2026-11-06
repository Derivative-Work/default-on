// S00-S08: the pre-roll card, the countdown and title, the Narrator's welcome, Switch, and verse 1.
import React from "react";
import { AbsoluteFill, spring } from "remotion";
import { PaperDefs, Wash } from "../film/Paper";
import { AnswerBox, Chalkboard, Links, MiniRocker, SearchBox, Stool } from "../components/props";
import { Pop, Wall } from "../components/kit";
import { Bookshelf, ChalkDoodles, ChalkTray, Clock, Globe, Lamp, Outlet, Pennant, Picture, Plant, Rug, Sunburst, Wallpaper, Window, breath, sway } from "../components/sets";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { FPS, mouthAt, wordAt } from "../timing";
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
  const onAt = Math.min(40, len - count - 12);
  const on = t > onAt;
  return (
    <Bg id="s01" seed={2} base={C.mustard}>
      <g opacity={0.5}><Sunburst a={C.mustard} b={C.orange} spin={t * 0.15} cy={470} /></g>
      {[[300, 220], [1600, 260], [420, 860], [1500, 840], [960, 120]].map(([x, y], i) => (
        <path key={i} transform={`translate(${x}, ${y}) scale(${0.8 + 0.25 * Math.sin((t + i * 9) / 6)})`}
          d="M0,-34 L9,-9 L34,0 L9,9 L0,34 L-9,9 L-34,0 L-9,-9 Z" fill={C.cream} stroke={C.ink} strokeWidth={4} />
      ))}
      <g transform={`translate(${W / 2}, 470) scale(${s})`}>
        <text textAnchor="middle" x={12} y={14} fontFamily={BUBBLE} fontSize={230} fill={C.ink} opacity={0.35} letterSpacing={6}>DEFAULT ON</text>
        <text textAnchor="middle" fontFamily={BUBBLE} fontSize={230} fill={C.cream} stroke={C.ink} strokeWidth={14} paintOrder="stroke" letterSpacing={6}>DEFAULT ON</text>
      </g>
      <g transform={`translate(${W / 2}, ${720 - bump(t, onAt + 1, 4) * 14})`}><MiniRocker on={on ? 1 : 0} s={1.3} /></g>
      <Pop f={t} start={onAt + 1} x={W / 2 + 190} y={680} text="ON" size={60} fps={FPS} />
    </Bg>
  );
};

// the Narrator's classroom set (S02, S23): avocado wall with faint stripes, the chalkboard with its tray and doodles,
// a clock that ticks, a curtained window, a bookshelf with a globe, a plant, a pennant; a floor and a rug; the
// Narrator on his stool, breathing and gesturing on his words
export const NarratorSet: React.FC<{ g: number; board: string[]; arm?: "open" | "point" | "tap" | "down"; head?: number; x?: number; size?: number; children?: React.ReactNode }> = ({
  g, board, arm = "open", head = 0, x = 1340, size = 64, children,
}) => (
  <Bg id="narr" seed={20} base={C.avocado}>
    <Wallpaper id="narr" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    <Wash id="narr" color={C.cardigan} opacity={0.85}><rect x={-40} y={880} width={W + 80} height={240} /></Wash>
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-40 + i * 260} y1={880} x2={-120 + i * 300} y2={H} stroke={C.ink} strokeWidth={3} opacity={0.35} />)}
    <rect x={-10} y={866} width={W + 20} height={22} fill={C.cardiganShade} stroke={C.ink} strokeWidth={5} />
    <Chalkboard lines={board} size={size} />
    <ChalkTray x={160} y={632} w={900} />
    {board.length < 3 && <ChalkDoodles x={560} y={420} />}
    <g transform="translate(1262, 54) scale(0.8)"><Pennant text="CIVICS" color={C.red} /></g>
    <g transform="translate(1180, 150)"><Clock t={g / FPS + 33} r={64} /></g>
    <g transform="translate(1720, 330)"><Window w={300} h={380} /></g>
    <g transform="translate(250, 1000)"><Bookshelf w={300} shelves={2} seed={3} /></g>
    <g transform="translate(330, 650) scale(0.6)"><Globe spin={g * 0.3} /></g>
    <g transform="translate(1810, 870)"><Plant sway={Math.sin(g / 50)} s={1.1} /></g>
    <g transform={`translate(${x}, 1010)`}><Rug w={760} /></g>
    <g transform={`translate(${x}, ${600 - (breath(g) - 1) * 300}) scale(0.95, ${0.95 * breath(g)}) rotate(${sway(g) * 0.6})`}>
      <Narrator mouth={mouthAt(g, "narrator")} armR={arm} armL="down" head={head} blink={blink(g)} brows={mouthAt(g, "narrator") === "D" ? 0.6 : 0} />
    </g>
    <g transform={`translate(${x}, 830)`}><TeacherDesk /></g>
    {children}
  </Bg>
);

// the teacher's desk in front of the Narrator: it hides where the waist-up rig ends
const TeacherDesk: React.FC = () => (
  <g>
    <rect x={-330} y={0} width={660} height={44} rx={8} fill={C.cardigan} stroke={C.ink} strokeWidth={7} />
    <rect x={-310} y={44} width={620} height={220} fill={C.cardiganShade} stroke={C.ink} strokeWidth={7} />
    <rect x={-270} y={80} width={240} height={70} rx={6} fill={C.cardigan} stroke={C.ink} strokeWidth={5} />
    <circle cx={-150} cy={115} r={9} fill={C.mustard} stroke={C.ink} strokeWidth={3} />
    {/* an apple, a stack of books and a pencil cup */}
    <g transform="translate(-220, -34)"><circle r={34} fill={C.red} stroke={C.ink} strokeWidth={5} /><path d="M0,-34 q6,-18 18,-20" stroke={C.ink} strokeWidth={5} fill="none" /><ellipse cx={14} cy={-44} rx={12} ry={6} fill={C.avocado} stroke={C.ink} strokeWidth={3} /></g>
    {[0, 1, 2].map((i) => <rect key={i} x={140 - i * 6} y={-24 - i * 22} width={150} height={24} fill={[C.teal, C.mustard, C.orange][i]} stroke={C.ink} strokeWidth={4} />)}
    <g transform="translate(20, -50)"><rect x={-26} y={0} width={52} height={50} fill={C.teal} stroke={C.ink} strokeWidth={4} />
      {[-12, 0, 12].map((dx, i) => <line key={dx} x1={dx} y1={0} x2={dx + (i - 1) * 6} y2={-46} stroke={[C.mustard, C.red, C.ink][i]} strokeWidth={7} strokeLinecap="round" />)}</g>
  </g>
);

// S02: "Hi, grown-ups! Today we're learning how an opt-out works."
export const S02: ShotC = ({ g }) => <NarratorSet g={g} board={["TODAY:", "HOW AN OPT-OUT", "WORKS"]} arm={g > wordAt("L01", 3) ? "point" : "open"} />;

// the wall Switch lives on (S03 pans along it to him; S04 is set on it): daisy wallpaper over mustard, an avocado
// wainscot, a skirting board; a lamp on a side table, two framed pictures, an outlet; Switch at x = 2880
const LivingWall: React.FC<{ g: number }> = ({ g }) => (
  <g>
    <Wall id="sw" color={C.mustard} band={C.avocado} w={W * 2} />
    <Wallpaper id="sw" kind="daisy" a={C.cream} b={C.orange} x={-40} y={-40} w={W * 2 + 80} h={720} opacity={0.35} />
    <g transform="translate(420, 330)"><Picture kind="boat" /></g>
    <g transform="translate(980, 600)">
      <rect x={-160} y={60} width={320} height={30} fill={C.cardigan} stroke={C.ink} strokeWidth={6} />
      {[-130, 130].map((lx) => <line key={lx} x1={lx} y1={90} x2={lx} y2={240} stroke={C.ink} strokeWidth={10} />)}
      <g transform="translate(-40, -140)"><Lamp /></g>
      <g transform="translate(90, 30) scale(0.45)"><Plant sway={Math.sin(g / 60)} /></g>
    </g>
    <g transform="translate(1560, 380)"><Picture kind="flowers" w={240} h={300} /></g>
    <g transform="translate(2140, 760)"><Outlet /></g>
    <g transform="translate(2330, 300)"><Picture kind="hills" w={280} h={200} /></g>
  </g>
);

// S03: "Say hello to Little Switch!": pan right along the wall to a wall plate; Switch's eyes open
export const S03: ShotC = ({ f, g, len }) => {
  const pan = ez(f, 0, len * 0.7);
  const open = ez(f, len * 0.75, len * 0.9);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: -W * pan, top: 0, width: W * 2, height: H }}>
        <svg width={W * 2} height={H} viewBox={`0 0 ${W * 2} ${H}`}>
          <PaperDefs id="sw" seed={4} />
          <rect width={W * 2} height={H} fill={C.paper} />
          <LivingWall g={g} />
          <g transform={`translate(${W + W / 2}, 470)`}><Switch pose="neutral" toggle={0.5} blink={1 - open} /></g>
          <rect width={W * 2} height={H} filter="url(#sw-tooth)" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// S04: V01 "Hi! I've got two sides: on, and off!": Switch waves on "Hi!", then demonstrates: the paddle rocks to ON
// on "on" with a little hop (anticipation, squash) and an "ON" pops; it rocks back on "off", "OFF" pops, and he
// settles, pleased with himself
export const S04: ShotC = ({ f, g }) => {
  const g0 = g - f;
  const fOn = wordAt("L03", 5) - g0, fOff = wordAt("L03", 7) - g0;
  const up = ez(f, fOn - 3, fOn + 2) * (1 - ez(f, fOff - 3, fOff + 2));
  const waving = f < wordAt("L03", 1) - g0 + 6;
  const hop = bump(f, fOn + 2, 5) * 26 + bump(f, fOff + 2, 5) * 16;
  const squash = 1 - bump(f, fOn - 2, 3) * 0.06 - bump(f, fOff - 2, 3) * 0.05;
  return (
    <AbsoluteFill>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
        <PaperDefs id="sw" seed={4} />
        <rect width={W} height={H} fill={C.paper} />
        <g transform={`translate(${-W}, 0)`}><LivingWall g={g} /></g>
        <g transform={`translate(${W / 2}, ${470 - hop})`}>
          <ellipse cx={8} cy={210 + hop} rx={150 - hop} ry={14} fill={C.ink} opacity={0.12} />
          <g transform={`scale(${2 - squash}, ${squash * breath(g, 2)})`}>
            <Switch pose={f >= fOff ? "relaxed" : up > 0.5 ? "proud" : "neutral"} toggle={f < fOn - 3 ? 0.5 : up}
              mouth={mouthAt(g, "switch")} wave={waving ? Math.sin(f / 3) * 22 : 0} armR={waving ? 140 : undefined} blink={blink(g, 2)} />
          </g>
        </g>
        {f < fOff && <Pop f={f} start={fOn} x={W / 2 + 330} y={300} text="ON" fps={FPS} />}
        <Pop f={f} start={fOff} x={W / 2 + 330} y={300} text="OFF" color={C.teal} fps={FPS} />
        <rect width={W} height={H} filter="url(#sw-tooth)" />
      </svg>
    </AbsoluteFill>
  );
};

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
