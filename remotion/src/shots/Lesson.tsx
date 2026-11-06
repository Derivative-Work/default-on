// S19-S34: the Lesson (opt-in, opt-out, default; there'll be a test) and verse 2 (the inbox, the settings door, the TV
// tile). S26-S28 carry the brief's caption, "Alleged in a lawsuit. Google denies changing settings."
import React from "react";
import { Wash } from "../film/Paper";
import { Caption, Chalkboard, Door, Envelope, Person, Kid, Slate, TV, Tile } from "../components/props";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { FPS, mouthAt } from "../timing";
import { ChalkTray, Clock, Pennant, Wallpaper, breath } from "../components/sets";
import { S28 as S28Key } from "../scenes/KeyFrames";
import { Bg, ShotC, blink, bump, ez } from "./common";
import { NarratorSet } from "./Intro";

const LAWSUIT = "Alleged in a lawsuit. Google denies changing settings.";

// the lesson board: the classroom wall (stripes, the clock, the pennant), a big chalkboard whose heading writes itself
// on in chalk (with a puff of chalk dust), and the Narrator at the right, chest-up, cropped by the frame's edge
const Board: React.FC<{ word: string; g: number; f?: number; children: React.ReactNode }> = ({ word, g, f = 99, children }) => {
  const write = ez(f, 0, 14);
  return (
    <Bg id="lesson" seed={19} base={C.avocado}>
      <Wallpaper id="lesson" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
      <g transform="translate(1600, 90)"><Clock t={g / FPS + 40} r={52} /></g>
      <g transform="translate(1690, 60) scale(0.6)"><Pennant text="CIVICS" color={C.red} /></g>
      <Chalkboard x={80} y={70} w={1420} h={780} lines={[]} />
      <ChalkTray x={80} y={852} w={1420} />
      <clipPath id="lesson-write"><rect x={140} y={100} width={30 + write * 900} height={180} /></clipPath>
      <text x={160} y={220} fontFamily={BUBBLE} fontSize={110} fill={C.white} opacity={0.9} clipPath="url(#lesson-write)">{word}</text>
      {write > 0 && write < 1 && <circle cx={170 + write * 900} cy={190} r={20} fill={C.white} opacity={0.25} />}
      <path d="M160,250 q300,-14 620,4" stroke={C.white} strokeWidth={5} fill="none" opacity={0.5 * write} />
      <ellipse cx={1150} cy={700} rx={180} ry={40} fill={C.white} opacity={0.06} />
      {children}
      <rect x={-20} y={940} width={W + 40} height={160} fill={C.cardigan} stroke={C.ink} strokeWidth={6} />
      <g transform={`translate(1730, ${880 - (breath(g) - 1) * 200}) scale(0.72)`}><Narrator mouth={mouthAt(g, "narrator")} armR="tap" armL="down" head={-1} blink={blink(g)} /></g>
    </Bg>
  );
};

// S19: "Now, 'opt-in' means somebody asks you…": a cartoon kid is offered a cookie and nods
export const S19: ShotC = ({ f, g }) => {
  const offer = ez(f, 10, 30);
  return (
    <Board word="OPT-IN" g={g} f={f}>
      <g transform={`translate(640, ${560 + Math.sin(f / 4) * (f > 40 ? 8 : 0)})`}><Kid seed={1} mouth={f > 40 ? "B" : "X"} look={[0.8, 0.3]} /></g>
      {f > 40 && <text x={760} y={400} fontFamily={BUBBLE} fontSize={60} fill={C.white} opacity={0.85}>sure!</text>}
      <g transform="translate(1180, 780)"><ellipse rx={170} ry={40} fill={C.white} stroke={C.ink} strokeWidth={5} />
        {[-90, -30, 30, 90, -60, 0, 60].map((x, i) => <g key={i} transform={`translate(${x}, ${i < 4 ? -14 : -44})`}><circle r={34} fill={C.mustard} stroke={C.ink} strokeWidth={4} />{[[-10, -8], [8, 6], [-4, 12]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={5} fill={C.cardigan} />)}</g>)}</g>
      <g transform={`translate(${1300 - offer * 260}, 560)`}>
        <path d="M120,30 L-40,30" stroke={C.sleeve} strokeWidth={60} strokeLinecap="round" />
        <circle cx={-70} cy={20} r={50} fill={C.mustard} stroke={C.ink} strokeWidth={6} />
        {[-88, -60, -76].map((x, i) => <circle key={i} cx={x} cy={8 + i * 12} r={6} fill={C.cardigan} />)}
      </g>
    </Board>
  );
};

// S20: V05 "And 'opt-out' means that no one asked you…": the kid already has a cookie stuck to his hand and wanders a
// maze of menus looking for the exit
export const S20: ShotC = ({ f, g }) => {
  const path = [[420, 700], [420, 420], [880, 420], [880, 640], [1240, 640], [1240, 360], [1540, 360]];
  const p = Math.min(path.length - 1.001, f / 28);
  const k = Math.floor(p), u = p - k;
  const x = path[k][0] + (path[k + 1][0] - path[k][0]) * u, y = path[k][1] + (path[k + 1][1] - path[k][1]) * u;
  return (
    <Board word="OPT-OUT" g={g} f={f}>
      {/* the maze's walls are menu panels, each labelled like a settings page */}
      {[[300, 300, 1100, 0, "Settings"], [300, 300, 0, 500, "Privacy"], [300, 780, 900, 0, "More"], [600, 520, 0, 260, "Advanced"], [1050, 300, 0, 420, "Personalize"], [1400, 330, 0, 470, "Other"], [600, 520, 300, 0, "Help"]].map(([a, b, w, h, t], i) => (
        <g key={i}>
          <rect x={a as number} y={b as number} width={Math.max(w as number, 30)} height={Math.max(h as number, 30)} rx={10} fill={C.white} stroke={C.ink} strokeWidth={5} opacity={0.92} />
          <text x={(a as number) + 12} y={(b as number) + ((w as number) > 0 ? 22 : 24)} fontFamily={SANS} fontSize={20} fontWeight={600} fill={C.inkSoft} transform={(w as number) > 0 ? undefined : `rotate(90, ${(a as number) + 12}, ${(b as number) + 24})`}>{t}</text>
        </g>
      ))}
      <g transform={`translate(${x}, ${y}) scale(0.5)`}><Kid seed={1} look={[1, 0]} /></g>
      <circle cx={x + 55} cy={y + 80} r={22} fill={C.mustard} stroke={C.ink} strokeWidth={4} />
      <text x={1300} y={280} fontFamily={BUBBLE} fontSize={44} fill={C.white} opacity={0.9}>EXIT?</text>
      <path d="M1300,300 l60,0 l-12,-12 M1360,300 l-12,12" stroke={C.white} strokeWidth={4} fill="none" opacity={0.8} />
      <g transform="translate(1380, 770) scale(0.3)"><Switch pose="proud" mouth={mouthAt(g, "switch")} blink={blink(g, 3)} /></g>
    </Board>
  );
};

// S21: "And 'default' is the setting that they picked…": the kid sits down to a plate already piled with broccoli
// S22: "…they'll say you picked the same.": a rubber stamp slams "YOU CHOSE THIS" onto the plate
const Plate: React.FC<{ f: number; g: number; stamp?: boolean }> = ({ f, g, stamp }) => {
  const s = stamp ? ez(f, 4, 10) * (1 - ez(f, 18, 30)) : 0; // down hard, then lifted away
  const printed = stamp && f >= 10;
  return (
    <Board word="DEFAULT" g={g} f={stamp ? 99 : f}>
      <g transform={`translate(${stamp ? Math.sin(f * 3) * 8 * bump(f, 10, 8) : 0}, 0)`}>
      <g transform="translate(900, 460)"><Kid seed={1} mouth={stamp ? "E" : "X"} look={[0, 1]} /></g>
      <g transform="translate(560, 730) rotate(-10)"><rect x={-20} y={-90} width={40} height={180} rx={8} fill={C.cream} stroke={C.ink} strokeWidth={4} />{[-12, 0, 12].map((x) => <line key={x} x1={x} y1={-90} x2={x} y2={-140} stroke={C.ink} strokeWidth={6} />)}</g>
      <path d="M1180,700 l120,-20 l20,110 l-120,20 Z" fill={C.red} stroke={C.ink} strokeWidth={4} opacity={0.85} />
      <g transform="translate(900, 720)">
        <ellipse rx={300} ry={70} fill={C.white} stroke={C.ink} strokeWidth={7} />
        {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-160 + i * 40} cy={-30 - (i % 3) * 22} r={34} fill={C.avocado} stroke={C.ink} strokeWidth={5} />)}
      </g>
      {stamp && (
        <g transform={`translate(900, ${300 + s * 400})`}>
          <rect x={-40} y={-200} width={80} height={140} rx={20} fill={C.cardigan} stroke={C.ink} strokeWidth={6} />
          <rect x={-150} y={-60} width={300} height={70} rx={10} fill={C.red} stroke={C.ink} strokeWidth={6} />
        </g>
      )}
      {printed && <text x={900} y={745} textAnchor="middle" fontFamily={BUBBLE} fontSize={54} fill={C.red} transform="rotate(-6, 900, 745)" opacity={0.92}>YOU CHOSE THIS</text>}
      {printed && [[640, 700], [1160, 720], [700, 790], [1120, 790], [980, 680]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 3} fill={C.red} opacity={0.7} />)}
      </g>
    </Board>
  );
};
export const S21: ShotC = ({ f, g }) => <Plate f={f} g={g} />;
export const S22: ShotC = ({ f, g }) => <Plate f={f} g={g} stamp />;

// S23: "Got that? Opt-in, opt-out, default. There'll be a test.": the Narrator taps the three words; a stack of test
// papers thuds onto the desk
export const S23: ShotC = ({ f, g, len }) => {
  const thud = len - 18;
  return (
    <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="tap" size={80}>
      <g transform={`translate(1500, ${f < thud ? -200 : 900 - bump(f, thud + 2, 4) * 20})`}>
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-180 + (i % 2) * 8} y={-i * 22} width={360} height={24} fill={C.white} stroke={C.ink} strokeWidth={4} />)}
        <text x={-100} y={-120} fontFamily={BUBBLE} fontSize={46} fill={C.ink}>TEST</text>
      </g>
      {f > thud && f < thud + 16 && [-1, 1].map((k) => [0, 1].map((j) => (
        <circle key={`${k}${j}`} cx={1500 + k * (200 + (f - thud) * 8 + j * 40)} cy={890 - j * 20 - (f - thud) * 2} r={26 - j * 8} fill={C.cream} stroke={C.ink} strokeWidth={3} opacity={1 - (f - thud) / 16} />
      )))}
    </NarratorSet>
  );
};

// S24: V06 "There's always a test.": Switch, half buried under the stack
export const S24: ShotC = ({ f, g }) => (
  <Bg id="s24" seed={24} base={C.avocado}>
    <Wallpaper id="s24" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    {[0, 1, 2].map((k) => {
      const t = ((f + k * 17) % 60) / 60;
      return <g key={k} transform={`translate(${700 + k * 260 + Math.sin(t * 6 + k) * 80}, ${200 + t * 560}) rotate(${Math.sin(t * 8 + k) * 40})`} opacity={1 - t * 0.5}>
        <rect x={-70} y={-50} width={140} height={100} fill={C.white} stroke={C.ink} strokeWidth={3} />
        {[0, 1, 2].map((r) => <rect key={r} x={-54} y={-30 + r * 22} width={100 - r * 20} height={8} fill={C.creamShade} />)}
      </g>;
    })}
    <rect x={0} y={760} width={W} height={320} fill={C.cardigan} stroke={C.ink} strokeWidth={7} />
    <g transform="translate(960, 640) rotate(-8)"><Switch pose="relaxed" toggle={0.5} mouth={mouthAt(g, "switch")} armL={120} /></g>
    <g transform="translate(980, 840)">
      {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-260 + ((i * 37) % 30)} y={-i * 24} width={520} height={26} fill={C.white} stroke={C.ink} strokeWidth={4} transform={`rotate(${((i * 13) % 7) - 3})`} />)}
    </g>
  </Bg>
);

// S25: "Now your inbox got a helper…" (replaced): an envelope with eyes reads over a cartoon person's shoulder
export const S25: ShotC = ({ f }) => (
  <Bg id="s25" seed={25} base={C.teal}>
    <rect x={540} y={540} width={840} height={420} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={7} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={600} y={600 + i * 70} width={680 - i * 80} height={26} rx={8} fill={C.creamShade} />)}
    <g transform="translate(560, 760) scale(1.2)"><Person shirt={C.orange} facing={1} /></g>
    <g transform={`translate(${1230 + Math.sin(f / 10) * 20}, ${330 + Math.sin(f / 7) * 10}) rotate(${Math.sin(f / 10) * 4})`}><Envelope look={[-0.4, 1]} mouth={f % 40 < 20 ? "B" : "X"} /></g>
  </Bg>
);

// S26: "A lawsuit says it flipped itself last fall…": a calendar flips to an autumn page; while everyone looks away, a
// tiny switch in the inbox's corner flips ON. Caption held through S28
export const S26: ShotC = ({ f, len }) => {
  const flip = ez(f, 6, 20);
  return (
    <Bg id="s26" seed={26} base={C.teal}>
      <g transform="translate(560, 480)">
        <rect x={-250} y={-280} width={500} height={560} rx={14} fill={C.white} stroke={C.ink} strokeWidth={7} />
        <rect x={-250} y={-280} width={500} height={120} rx={14} fill={flip > 0.5 ? C.orange : C.avocado} stroke={C.ink} strokeWidth={7} />
        <text y={-200} textAnchor="middle" fontFamily={BUBBLE} fontSize={60} fill={C.cream}>{flip > 0.5 ? "OCTOBER" : "SEPTEMBER"}</text>
        {flip > 0.5 && [[-120, 60], [80, 120], [-40, 200]].map(([x, y], i) => <path key={i} d={`M${x},${y} q20,-30 40,0 q-20,30 -40,0`} fill={C.orange} stroke={C.ink} strokeWidth={3} />)}
        <path d={`M-250,-160 L250,-160 L250,${-160 + (1 - flip) * 440} L-250,${-160 + (1 - flip) * 440} Z`} fill={C.white} stroke={C.ink} strokeWidth={5} opacity={1 - flip} />
      </g>
      <g transform="translate(1380, 480)">
        <rect x={-300} y={-220} width={600} height={440} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={7} />
        <g transform="translate(0, 20) scale(0.6)"><Envelope look={[-1, 0]} /></g>
        <g transform="translate(230, -150) scale(0.5)">
          <rect x={-50} y={-30} width={100} height={60} rx={30} fill={f > len * 0.6 ? C.avocado : C.creamShade} stroke={C.ink} strokeWidth={6} />
          <circle cx={f > len * 0.6 ? 20 : -20} r={22} fill={C.white} stroke={C.ink} strokeWidth={5} />
        </g>
      </g>
      <Caption text={LAWSUIT} />
    </Bg>
  );
};

// S27: V07 "And what's the company say?": Switch knocks on a door marked "SETTINGS"
export const S27: ShotC = ({ f, g }) => (
  <Bg id="s27" seed={27} base={C.mustard}>
    <rect x={-20} y={900} width={W + 40} height={200} fill={C.inkSoft} opacity={0.6} />
    <g transform="translate(1100, 900)"><Door label="SETTINGS" /></g>
    <g transform={`translate(700, 700) scale(0.62)`}><Switch pose="curious" mouth={mouthAt(g, "switch")} armR={70 + Math.abs(Math.sin(f / 3)) * 30} look={[1, 0]} /></g>
    {f % 12 < 4 && <text x={880} y={560} fontFamily={BUBBLE} fontSize={48} fill={C.ink}>knock</text>}
    <Caption text={LAWSUIT} />
  </Bg>
);

// S28: "That they didn't, and here's the door: / Just a menu, then a menu…" (replaced): the menu tunnel
export const S28: ShotC = ({ f }) => (
  <>
    <S28Key f={f} />
    <svg width={W} height={H} style={{ position: "absolute" }}><Caption text={LAWSUIT} y={H - 120} /></svg>
  </>
);

// the living room at night with the TV (S29); at sunrise with the new tile (S30)
const Living: React.FC<{ id: string; night: boolean; children: React.ReactNode }> = ({ id, night, children }) => (
  <Bg id={id} seed={29} base={night ? C.night : C.mustard}>
    <rect x={1460} y={140} width={320} height={380} fill={night ? "#2c3d63" : C.cream} stroke={C.ink} strokeWidth={10} />
    {night ? <circle cx={1660} cy={260} r={50} fill={C.cream} /> : <Wash id={id} color={C.orange} opacity={0.6}><circle cx={1620} cy={470} r={90} /></Wash>}
    <rect x={0} y={880} width={W} height={200} fill={C.cardigan} stroke={C.ink} strokeWidth={7} />
    {children}
  </Bg>
);

// S29: "Then the TV got an update in the middle of the night,": a TV with a progress bar, the moon in the window
export const S29: ShotC = ({ f, len }) => (
  <Living id="s29" night>
    <g transform="translate(760, 560)">
      <TV night w={900}>
        <rect x={460} y={500} width={1000} height={70} rx={35} fill="none" stroke={C.cream} strokeWidth={10} />
        <rect x={470} y={510} width={980 * ez(f, 0, len)} height={50} rx={25} fill={C.mustard} />
        <text x={960} y={440} textAnchor="middle" fontFamily={BUBBLE} fontSize={80} fill={C.cream}>UPDATING…</text>
      </TV>
    </g>
  </Living>
);

// the TV home screen: a row of generic tiles plus the new one
const Home: React.FC<{ wink: number; tile?: { x: number; y: number; s: number } }> = ({ wink, tile }) => (
  <>
    {[C.teal, C.orange, C.avocado, C.red].map((c, i) => <g key={i} transform={`translate(${360 + i * 400}, 380)`}><Tile color={c} glyph={(["play", "note", "star", "play"] as const)[i]} size={300} /></g>)}
    {!tile && <g transform="translate(560, 780)"><Tile color={C.mustard} glyph="spark" size={300} wink={wink} /></g>}
  </>
);

// S30: "And a brand-new tile was waiting…": sunrise; a new tile sits among the others, and winks
export const S30: ShotC = ({ f, len }) => (
  <Living id="s30" night={false}>
    <g transform="translate(760, 560)"><TV w={900}><Home wink={f > len * 0.6 && f < len * 0.75 ? 1 : 0} /></TV></g>
  </Living>
);

// S31-S33: the tile, the trash can that turns into a HIDE box, and the tile inside, waving
const Trash: React.FC<{ f: number; g: number; phase: 1 | 2 | 3 }> = ({ f, g, phase }) => {
  const drag = phase === 1 ? ez(f, 0, 30) : 1;
  const morph = phase === 2 ? ez(f, 4, 14) : phase === 3 ? 1 : 0;
  const lid = phase === 3 ? ez(f, 4, 14) : 0;
  return (
    <Bg id="s31" seed={31} base={C.cream}>
      <g transform="translate(1380, 700)">
        {morph < 0.5 ? (
          <g><path d="M-130,-150 L130,-150 L105,170 L-105,170 Z" fill={C.sleeve} stroke={C.ink} strokeWidth={7} />
            {[-60, 0, 60].map((x) => <line key={x} x1={x} y1={-110} x2={x * 0.85} y2={130} stroke={C.ink} strokeWidth={5} />)}
            <rect x={-150} y={-190} width={300} height={40} rx={10} fill={C.sleeveShade} stroke={C.ink} strokeWidth={6} /></g>
        ) : (
          <g><rect x={-170} y={-150} width={340} height={320} fill={C.mustard} stroke={C.ink} strokeWidth={7} />
            <text y={50} textAnchor="middle" fontFamily={BUBBLE} fontSize={76} fill={C.ink}>HIDE</text>
            <g transform={`translate(-180, -150) rotate(${-lid * 70})`}><rect x={0} y={-36} width={360} height={36} fill={C.orange} stroke={C.ink} strokeWidth={6} /></g>
            {lid > 0.5 && <g transform="translate(0, -150) scale(0.7)"><Tile color={C.mustard} glyph="spark" size={260} /><path d={`M120,-60 q30,${Math.sin(f / 3) * 20 - 30} 50,-50`} stroke={C.ink} strokeWidth={10} fill="none" strokeLinecap="round" /></g>}
          </g>
        )}
      </g>
      {phase < 3 && <g transform={`translate(${500 + drag * 700}, ${440 + drag * 160}) scale(${1 - drag * 0.35})`}><Tile color={C.mustard} glyph="spark" size={260} /></g>}
      <g transform={`translate(${phase === 1 ? 300 + drag * 620 : 860}, 760) scale(0.55)`}>
        <Switch pose={phase === 3 ? "sad" : "curious"} mouth={mouthAt(g, "switch")} look={[1, -0.2]} armR={phase === 1 ? 120 : 40} blink={blink(g, 4)} />
      </g>
    </Bg>
  );
};
export const S31: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={1} />;
export const S32: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={2} />;
export const S33: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={3} />;

// S34: "…Next verse!": the Narrator yanks down a pull-down screen; whip transition
export const S34: ShotC = ({ f, g, len }) => {
  const pull = ez(f, 2, 12);
  const whip = ez(f, len - 8, len);
  return (
    <Bg id="s34" seed={34} base={C.avocado}>
      <g transform={`translate(${-whip * W * 1.2}, 0)`}>
        <g transform="translate(1460, 700)"><Narrator mouth={mouthAt(g, "narrator")} armR="pull" armL="down" /></g>
        <rect x={200} y={60} width={900} height={30} rx={10} fill={C.cardigan} stroke={C.ink} strokeWidth={6} />
        <rect x={230} y={90} width={840} height={pull * 640} fill={C.white} stroke={C.ink} strokeWidth={6} />
        {pull > 0.9 && <g transform="translate(650, 420)"><Slate text="NEXT VERSE!" w={640} color={C.teal} /></g>}
      </g>
      {whip > 0 && <rect x={0} y={0} width={W} height={H} fill={C.cream} opacity={whip * 0.5} />}
    </Bg>
  );
};
