// S19-S34: the Lesson (opt-in, opt-out, default; there'll be a test) and verse 2 (the inbox, the settings door, the TV
// tile). S26-S28 carry the brief's caption, "Alleged in a lawsuit. Google denies changing settings."
import React from "react";
import { Wash } from "../film/Paper";
import { Caption, Chalkboard, Door, Envelope, Person, Kid, Slate, TV, Tile } from "../components/props";
import { Floorboards, Grain, Lamp, Picture, Plant, Rug, Window } from "../components/sets";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W, lw } from "../theme/palette";
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
      <rect x={-20} y={894} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
      <rect x={-20} y={940} width={W + 40} height={160} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
      <Floorboards y={940} h={160} boards={2} />
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
      <g transform="translate(1180, 780)"><ellipse rx={170} ry={40} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
        {[-90, -30, 30, 90, -60, 0, 60].map((x, i) => <g key={i} transform={`translate(${x}, ${i < 4 ? -14 : -44})`}><circle r={34} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />{[[-10, -8], [8, 6], [-4, 12]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={5} fill={C.cardigan} />)}</g>)}</g>
      <g transform={`translate(${1300 - offer * 260}, 560)`}>
        <path d="M120,30 L-40,30" stroke={C.sleeve} strokeWidth={60} strokeLinecap="round" />
        <circle cx={-70} cy={20} r={50} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} />
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
          <rect x={a as number} y={b as number} width={Math.max(w as number, 30)} height={Math.max(h as number, 30)} rx={10} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} opacity={0.92} />
          <text x={(a as number) + 12} y={(b as number) + ((w as number) > 0 ? 22 : 24)} fontFamily={SANS} fontSize={20} fontWeight={600} fill={C.inkSoft} transform={(w as number) > 0 ? undefined : `rotate(90, ${(a as number) + 12}, ${(b as number) + 24})`}>{t}</text>
        </g>
      ))}
      <g transform={`translate(${x}, ${y}) scale(0.5)`}><Kid seed={1} look={[1, 0]} /></g>
      <circle cx={x + 55} cy={y + 80} r={22} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />
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
      <g transform="translate(560, 730) rotate(-10)"><rect x={-20} y={-90} width={40} height={180} rx={8} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />{[-12, 0, 12].map((x) => <line key={x} x1={x} y1={-90} x2={x} y2={-140} stroke={C.ink} strokeWidth={lw(6)} />)}</g>
      <path d="M1180,700 l120,-20 l20,110 l-120,20 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(4)} opacity={0.85} />
      <g transform="translate(900, 720)">
        <ellipse rx={300} ry={70} fill={C.white} stroke={C.ink} strokeWidth={lw(7)} />
        {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-160 + i * 40} cy={-30 - (i % 3) * 22} r={34} fill={C.avocado} stroke={C.ink} strokeWidth={lw(5)} />)}
      </g>
      {stamp && (
        <g transform={`translate(900, ${300 + s * 400})`}>
          <rect x={-40} y={-200} width={80} height={140} rx={20} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
          <rect x={-150} y={-60} width={300} height={70} rx={10} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
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
        {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-180 + (i % 2) * 8} y={-i * 22} width={360} height={24} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />)}
        <text x={-100} y={-120} fontFamily={BUBBLE} fontSize={46} fill={C.ink}>TEST</text>
      </g>
      {f > thud && f < thud + 16 && [-1, 1].map((k) => [0, 1].map((j) => (
        <circle key={`${k}${j}`} cx={1500 + k * (200 + (f - thud) * 8 + j * 40)} cy={890 - j * 20 - (f - thud) * 2} r={26 - j * 8} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} opacity={1 - (f - thud) / 16} />
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
        <rect x={-70} y={-50} width={140} height={100} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
        {[0, 1, 2].map((r) => <rect key={r} x={-54} y={-30 + r * 22} width={100 - r * 20} height={8} fill={C.creamShade} />)}
      </g>;
    })}
    <rect x={0} y={760} width={W} height={320} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(7)} />
    <g transform="translate(960, 640) rotate(-8)"><Switch pose="relaxed" toggle={0.5} mouth={mouthAt(g, "switch")} armL={120} /></g>
    <g transform="translate(980, 840)">
      {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-260 + ((i * 37) % 30)} y={-i * 24} width={520} height={26} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} transform={`rotate(${((i * 13) % 7) - 3})`} />)}
    </g>
  </Bg>
);

// the inbox screen on the study desk (S25-S26): a generic mail client, a folder column and mail rows with unread
// dots and stars; nothing branded. `toggle` is the tiny "smart features" switch in its corner (0 off, 1 on)
const Inbox: React.FC<{ toggle?: number }> = ({ toggle = 0 }) => (
  <g>
    <rect x={-460} y={-270} width={920} height={540} rx={22} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
    <rect x={-430} y={-240} width={860} height={480} rx={10} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
    <rect x={-430} y={-240} width={860} height={56} fill={C.teal} />
    <text x={-400} y={-202} fontFamily={SANS} fontWeight={600} fontSize={30} fill={C.cream}>Inbox</text>
    <rect x={-430} y={-184} width={180} height={424} fill={C.cream} />
    {["Inbox", "Sent", "Drafts", "Later"].map((t, i) => <text key={t} x={-410} y={-140 + i * 50} fontFamily={SANS} fontSize={24} fontWeight={i ? 400 : 600} fill={C.inkSoft}>{t}</text>)}
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i} transform={`translate(-230, ${-160 + i * 66})`}>
        {i < 3 && <circle cx={10} cy={16} r={8} fill={C.teal} />}
        <path d="M30,6 l5,10 l11,1 l-8,7 l2,11 l-10,-6 l-10,6 l2,-11 l-8,-7 l11,-1 Z" fill={i % 3 === 1 ? C.mustard : "none"} stroke={C.inkSoft} strokeWidth={2} />
        <rect x={64} y={6} width={150} height={14} rx={5} fill={i < 3 ? C.ink : C.inkSoft} opacity={0.7} />
        <rect x={230} y={6} width={360 - (i % 3) * 60} height={14} rx={5} fill={C.creamShade} />
        <line x1={0} y1={50} x2={640} y2={50} stroke={C.creamShade} strokeWidth={2} />
      </g>
    ))}
    <g transform="translate(370, -212)">
      <rect x={-36} y={-16} width={72} height={32} rx={16} fill={toggle > 0.5 ? C.avocado : C.creamShade} stroke={C.ink} strokeWidth={lw(3)} />
      <circle cx={-18 + toggle * 36} r={13} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
    </g>
  </g>
);

// the study wall behind the inbox: diamond wallpaper, a window, a plant, a framed picture; a desk edge
const StudyWall: React.FC<{ id: string; g: number; picture?: boolean; children: React.ReactNode }> = ({ id, g, picture = true, children }) => (
  <Bg id={id} seed={25} base={C.teal}>
    <Wallpaper id={id} kind="diamond" a={C.cream} b={C.mustard} opacity={0.2} />
    <g transform="translate(1700, 300)"><Window w={260} h={320} /></g>
    {picture && <g transform="translate(220, 300)"><Picture kind="flowers" w={200} h={240} /></g>}
    <rect x={-20} y={930} width={W + 40} height={170} fill="#a8703e" stroke={C.ink} strokeWidth={lw(7)} />
    <Grain x={0} y={940} w={W} h={150} n={5} seed={1} />
    <g transform="translate(1780, 940)"><Plant sway={Math.sin(g / 50)} /></g>
    {children}
  </Bg>
);

// S25: "Now your inbox got a helper…" (replaced): an envelope with eyes reads over a cartoon person's shoulder (the
// lawsuit caption starts with S26, as the brief has it)
export const S25: ShotC = ({ f, g }) => (
  <StudyWall id="s25" g={g}>
    <g transform="translate(980, 520)"><Inbox /></g>
    <g transform="translate(520, 800) scale(1.3)"><Person shirt={C.orange} facing={1} /></g>
    <g transform={`translate(${1340 + Math.sin(f / 10) * 20}, ${200 + Math.sin(f / 7) * 10}) rotate(${Math.sin(f / 10) * 4}) scale(0.8)`}><Envelope look={[-0.6, 1]} mouth={mouthAt(g, "narrator") === "X" ? "B" : "X"} /></g>
  </StudyWall>
);

// S26: "A lawsuit says it flipped itself last fall…": a calendar flips from September to an autumn October, leaves
// drifting past; while everyone looks at it, the tiny switch in the inbox's corner flips ON. Caption held to S28
export const S26: ShotC = ({ f, g, len }) => {
  const flip = ez(f, 6, 20);
  const on = ez(f, len * 0.6, len * 0.62);
  return (
    <StudyWall id="s26" g={g} picture={false}>
      <g transform="translate(470, 470)">
        <rect x={-250} y={-280} width={500} height={560} rx={14} fill={C.white} stroke={C.ink} strokeWidth={lw(7)} />
        <rect x={-250} y={-280} width={500} height={120} rx={14} fill={flip > 0.5 ? C.orange : C.avocado} stroke={C.ink} strokeWidth={lw(7)} />
        <text y={-200} textAnchor="middle" fontFamily={BUBBLE} fontSize={60} fill={C.cream}>{flip > 0.5 ? "OCTOBER" : "SEPTEMBER"}</text>
        {Array.from({ length: 30 }, (_, d) => (
          <text key={d} x={-210 + (d % 7) * 66} y={-110 + Math.floor(d / 7) * 72} fontFamily={SANS} fontSize={28} fill={d === 9 && flip > 0.5 ? C.red : C.inkSoft} fontWeight={d === 9 && flip > 0.5 ? 600 : 400}>{d + 1}</text>
        ))}
        {flip > 0.5 && <circle cx={-210 + 2 * 66 + 14} cy={-110 + 72 - 10} r={30} fill="none" stroke={C.red} strokeWidth={4} />}
        <path d={`M-250,-160 L250,-160 L250,${-160 + (1 - flip) * 440} L-250,${-160 + (1 - flip) * 440} Z`} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} opacity={1 - flip} />
      </g>
      {flip > 0.5 && [0, 1, 2, 3].map((k) => {
        const t = ((f + k * 19) % 70) / 70;
        return <path key={k} transform={`translate(${200 + k * 260 + Math.sin(t * 7 + k) * 60}, ${t * 900}) rotate(${t * 300 + k * 40})`} d="M0,-20 q20,10 0,40 q-20,-30 0,-40 Z" fill={[C.orange, C.red, C.mustard, C.orange][k]} stroke={C.ink} strokeWidth={lw(3)} />;
      })}
      <g transform="translate(1250, 520) scale(0.75)"><Inbox toggle={on} /></g>
      <g transform="translate(1250, 520) scale(0.75)">
        <g transform="translate(-40, 40) scale(0.6)"><Envelope look={[-1, -0.4]} /></g>
      </g>
      {on > 0 && on < 1 && <circle cx={1250 + 370 * 0.75} cy={520 - 212 * 0.75} r={40} fill={C.mustard} opacity={0.4} />}
      <Caption text={LAWSUIT} />
    </StudyWall>
  );
};

// the hallway with the SETTINGS door (S27): striped wallpaper, a wainscot, a runner rug, a coat rack and a picture
// S27: V07 "And what's the company say?": Switch knocks on a door marked "SETTINGS"; the door rattles
export const S27: ShotC = ({ f, g }) => {
  const knock = f % 12 < 4;
  return (
    <Bg id="s27" seed={27} base={C.mustard}>
      <Wallpaper id="s27" kind="stripe" a={C.mustard} b={C.cream} opacity={0.22} />
      <Wash id="s27" color={C.avocado} opacity={0.6}><rect x={-40} y={620} width={W + 80} height={280} /></Wash>
      <rect x={-20} y={854} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
      <rect x={-20} y={900} width={W + 40} height={200} fill="#b98a5a" stroke={C.ink} strokeWidth={lw(6)} />
      <Floorboards y={900} h={200} boards={3} />
      <path d="M200,1080 L560,910 L1700,910 L1900,1080 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(5)} opacity={0.8} />
      <g transform="translate(340, 300)"><Picture kind="hills" w={240} h={180} /></g>
      <g transform="translate(1680, 900)">
        <line x1={0} y1={0} x2={0} y2={-560} stroke={C.cardigan} strokeWidth={16} />
        {[-1, 1].map((k) => <line key={k} x1={0} y1={-520} x2={k * 70} y2={-560} stroke={C.cardigan} strokeWidth={10} />)}
        <path d="M-60,-500 Q-90,-380 -70,-260 L10,-260 Q20,-380 -10,-500 Z" fill={C.teal} stroke={C.ink} strokeWidth={lw(5)} />
        <ellipse cx={0} cy={0} rx={70} ry={16} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />
      </g>
      <g transform={`translate(${1100 + (knock ? 3 : 0)}, 900)`}><Door label="SETTINGS" /></g>
      <g transform={`translate(700, 700) scale(0.62)`}><Switch pose="curious" mouth={mouthAt(g, "switch")} armR={70 + Math.abs(Math.sin(f / 3)) * 30} look={[1, 0]} blink={blink(g, 6)} /></g>
      {knock && <text x={860} y={520} fontFamily={BUBBLE} fontSize={56} fill={C.ink} transform="rotate(-6, 860, 520)">knock</text>}
      <Caption text={LAWSUIT} />
    </Bg>
  );
};

// S28: "That they didn't, and here's the door: / Just a menu, then a menu…" (replaced): the menu tunnel
export const S28: ShotC = ({ f }) => (
  <>
    <S28Key f={f} />
    <svg width={W} height={H} style={{ position: "absolute" }}><Caption text={LAWSUIT} y={H - 120} /></svg>
  </>
);

// the living room (S29-S33): striped wallpaper, a window (moon, or sunrise with sunbeams), a sofa with a cat on it
// (asleep at night, sitting up by day), a floor lamp, a plant, a rug, a clock, the TV on a low cabinet
export const Living: React.FC<{ id: string; night: boolean; g: number; children: React.ReactNode }> = ({ id, night, g, children }) => (
  <Bg id={id} seed={29} base={night ? C.night : C.mustard}>
    <Wallpaper id={id} kind="stripe" a={night ? "#2c3d63" : C.mustard} b={night ? C.night : C.cream} opacity={night ? 0.35 : 0.22} />
    <g transform="translate(1620, 320)"><Window w={300} h={360} sky={night ? "#16203a" : "#f2c98a"} sun={night ? "moon" : "sun"} curtain={night ? "#4a3a5a" : C.orange} /></g>
    {!night && <path d="M1500,420 L1180,1080 L1500,1080 L1760,500 Z" fill={C.cream} opacity={0.12} />}
    <g transform="translate(1220, 160)" opacity={night ? 0.7 : 1}><Clock t={night ? (2 * 60 + 40) * 60 + g / 30 : (6 * 60 + 45) * 60 + g / 30} r={50} /></g>
    <rect x={-20} y={834} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
    <rect x={-20} y={880} width={W + 40} height={220} fill={night ? "#1b2440" : "#b98a5a"} stroke={C.ink} strokeWidth={lw(7)} />
    <Floorboards y={880} h={220} boards={3} />
    <g transform="translate(760, 990)"><Rug w={980} color={night ? "#4a3a5a" : C.orange} /></g>
    {/* the sofa, right of the TV, and the cat */}
    <g transform="translate(1560, 820)">
      <rect x={-260} y={-150} width={520} height={130} rx={40} fill={night ? "#5a3a3a" : C.red} stroke={C.ink} strokeWidth={lw(7)} />
      <rect x={-280} y={-40} width={560} height={110} rx={30} fill={night ? "#5a3a3a" : C.red} stroke={C.ink} strokeWidth={lw(7)} />
      {[-1, 1].map((k) => <rect key={k} x={k * 260 - 40} y={-90} width={80} height={170} rx={30} fill={night ? "#4a2e2e" : C.orange} stroke={C.ink} strokeWidth={lw(6)} />)}
      <g transform={`translate(-100, -70) scale(1, ${night ? breath(g, 7) * 0.95 : 1})`}>
        <ellipse cx={0} cy={0} rx={70} ry={night ? 34 : 44} fill={C.inkSoft} stroke={C.ink} strokeWidth={lw(5)} />
        <circle cx={night ? 56 : 40} cy={night ? -6 : -40} r={30} fill={C.inkSoft} stroke={C.ink} strokeWidth={lw(5)} />
        {[-1, 1].map((k) => <path key={k} d={`M${(night ? 56 : 40) + k * 16},${(night ? -6 : -40) - 22} l${k * 8},-22 l${-k * 18},10 Z`} fill={C.inkSoft} stroke={C.ink} strokeWidth={lw(4)} />)}
        {night ? <text x={90} y={-40} fontFamily={BUBBLE} fontSize={34} fill={C.cream} opacity={0.5 + 0.5 * Math.sin(g / 15)}>z</text>
          : [-1, 1].map((k) => <circle key={k} cx={40 + k * 11} cy={-44} r={5} fill={C.mustard} />)}
        <path d="M-70,10 q-50,0 -40,-40" fill="none" stroke={C.ink} strokeWidth={lw(8)} strokeLinecap="round" />
      </g>
    </g>
    <g transform="translate(120, 640)" opacity={night ? 0.6 : 1}><Lamp on={!night} /></g>
    <g transform="translate(240, 900)"><Plant sway={Math.sin(g / 50)} s={0.9} /></g>
    {/* the TV cabinet */}
    <rect x={260} y={820} width={1000} height={80} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(6)} />
    {night && <rect x={-20} y={-20} width={W + 40} height={H + 40} fill="#0d1222" opacity={0.25} />}
    {children}
  </Bg>
);

// S29: "Then the TV got an update in the middle of the night,": the TV glows with a progress bar; the moon outside
export const S29: ShotC = ({ f, g, len }) => (
  <Living id="s29" night g={g}>
    <path d="M760,560 L320,1080 L1200,1080 Z" fill="#9ab0d8" opacity={0.08} />
    <g transform="translate(760, 520)">
      <TV night w={760}>
        <rect x={460} y={500} width={1000} height={70} rx={35} fill="none" stroke={C.cream} strokeWidth={10} />
        <rect x={470} y={510} width={980 * ez(f, 0, len)} height={50} rx={25} fill={C.mustard} />
        <text x={960} y={440} textAnchor="middle" fontFamily={BUBBLE} fontSize={80} fill={C.cream}>UPDATING…</text>
        <text x={960} y={680} textAnchor="middle" fontFamily={SANS} fontSize={44} fill={C.cream} opacity={0.7}>Do not turn off your TV</text>
      </TV>
    </g>
  </Living>
);

// the TV home screen: a row of generic tiles plus the new one
const Home: React.FC<{ wink: number; tile?: boolean }> = ({ wink, tile = true }) => (
  <>
    <rect x={0} y={0} width={1920} height={110} fill={C.teal} opacity={0.9} />
    <text x={80} y={76} fontFamily={SANS} fontWeight={600} fontSize={54} fill={C.cream}>Home</text>
    {[C.teal, C.orange, C.avocado, C.red].map((c, i) => <g key={i} transform={`translate(${360 + i * 400}, 400)`}><Tile color={c} glyph={(["play", "note", "star", "play"] as const)[i]} size={300} /></g>)}
    {tile && <g transform="translate(560, 800)"><Tile color={C.mustard} glyph="spark" size={300} wink={wink} /></g>}
  </>
);

// S30: "And a brand-new tile was waiting…": sunrise; a new tile sits among the others, and winks
export const S30: ShotC = ({ f, g, len }) => (
  <Living id="s30" night={false} g={g}>
    <g transform="translate(760, 520)"><TV w={760}><Home wink={f > len * 0.6 && f < len * 0.75 ? 1 : 0} /></TV></g>
    {f > len * 0.6 && f < len * 0.8 && <text x={760} y={240} textAnchor="middle" fontFamily={BUBBLE} fontSize={64} fill={C.ink}>✦ new! ✦</text>}
  </Living>
);

// S31-S33: in front of the TV: Switch drags the tile out toward a trash can, which turns into a HIDE box; the tile
// waves from inside it
const Trash: React.FC<{ f: number; g: number; phase: 1 | 2 | 3 }> = ({ f, g, phase }) => {
  const drag = phase === 1 ? ez(f, 0, 30) : 1;
  const morph = phase === 2 ? ez(f, 4, 14) : phase === 3 ? 1 : 0;
  const lid = phase === 3 ? ez(f, 4, 14) : 0;
  return (
    <Living id="s31" night={false} g={g}>
      <g transform="translate(760, 520)"><TV w={760}><Home wink={0} tile={false} /></TV></g>
      <g transform="translate(1180, 760)">
        {morph < 0.5 ? (
          <g transform={`scale(${1 - bump(f, 9, 5) * 0.1})`}><path d="M-110,-130 L110,-130 L90,140 L-90,140 Z" fill={C.sleeve} stroke={C.ink} strokeWidth={lw(7)} />
            {[-50, 0, 50].map((x) => <line key={x} x1={x} y1={-95} x2={x * 0.85} y2={110} stroke={C.ink} strokeWidth={lw(5)} />)}
            <rect x={-128} y={-166} width={256} height={36} rx={10} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(6)} /></g>
        ) : (
          <g><rect x={-150} y={-130} width={300} height={270} fill={C.mustard} stroke={C.ink} strokeWidth={lw(7)} />
            <text y={40} textAnchor="middle" fontFamily={BUBBLE} fontSize={68} fill={C.ink}>HIDE</text>
            <g transform={`translate(-160, -130) rotate(${-lid * 70})`}><rect x={0} y={-32} width={320} height={32} fill={C.orange} stroke={C.ink} strokeWidth={lw(6)} /></g>
            {lid > 0.5 && <g transform="translate(0, -140) scale(0.6)"><Tile color={C.mustard} glyph="spark" size={260} /><path d={`M120,-60 q30,${Math.sin(f / 3) * 20 - 30} 50,-50`} stroke={C.ink} strokeWidth={lw(10)} fill="none" strokeLinecap="round" /></g>}
          </g>
        )}
        {phase === 2 && f > 4 && f < 18 && [0, 1, 2, 3].map((k) => <path key={k} d={`M${Math.cos(k * 1.6) * 200},${Math.sin(k * 1.6) * 160 - 40} l${Math.cos(k * 1.6) * 40},${Math.sin(k * 1.6) * 30}`} stroke={C.ink} strokeWidth={lw(6)} strokeLinecap="round" />)}
      </g>
      {phase < 3 && <g transform={`translate(${560 + drag * 420}, ${600 + drag * 80}) scale(${0.62 - drag * 0.22})`}><Tile color={C.mustard} glyph="spark" size={260} /></g>}
      <g transform={`translate(${phase === 1 ? 400 + drag * 400 : 800}, 820) scale(0.5)`}>
        <Switch pose={phase === 3 ? "sad" : "curious"} mouth={mouthAt(g, "switch")} look={[1, -0.2]} armR={phase === 1 ? 120 : 40} blink={blink(g, 4)} />
      </g>
    </Living>
  );
};
export const S31: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={1} />;
export const S32: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={2} />;
export const S33: ShotC = ({ f, g }) => <Trash f={f} g={g} phase={3} />;

// S34: "…Next verse!": back in the classroom, the Narrator yanks down a pull-down screen; whip transition
export const S34: ShotC = ({ f, g, len }) => {
  const pull = ez(f, 2, 12);
  const whip = ez(f, len - 8, len);
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${-whip * W * 1.2}px)` }}>
      <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="point" size={80}>
        <rect x={140} y={60} width={940} height={30} rx={10} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
        <rect x={170} y={90} width={880} height={pull * 600} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
        <rect x={570} y={90 + pull * 600 - 6} width={80} height={24} rx={8} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(4)} />
        {pull > 0.9 && <g transform="translate(610, 380)"><Slate text="NEXT VERSE!" w={640} color={C.teal} /></g>}
      </NarratorSet>
      {whip > 0 && <div style={{ position: "absolute", inset: 0, background: C.cream, opacity: whip * 0.5 }} />}
    </div>
  );
};
