// S19-S34: the Lesson (opt-in, opt-out, default; there'll be a test) and verse 2 (the inbox, the settings door, the TV
// tile). S26-S28 carry the brief's caption, "Alleged in a lawsuit. Google denies changing settings."
import React from "react";
import { Wash } from "../film/Paper";
import { Caption, Chalkboard, Door, Envelope, Person, Kid, Slate, TV, Tile } from "../components/props";
import { Floorboards, Grain, Lamp, Picture, Plant, Rug, Window } from "../components/sets";
import { Narrator } from "../rigs/Narrator";
import { Hand } from "../rigs/Hand";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, PEN, W, lw } from "../theme/palette";
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
      {/* someone asks: a hand in a teal sleeve (not the grey off-screen one) offers a cookie on its fingertip */}
      <g transform={`translate(${W + 40}, 600) scale(-1, 1)`}>
        <Hand reach={0.45 + offer * 0.45} length={W + 40 - 840} sleeve={[C.teal, "#2b6f96"]} curl={0.15} />
        <g transform={`translate(${-(W + 40 - 840) * (1 - (0.45 + offer * 0.45)) + (W + 40 - 840) - 30}, -58)`}>
          <circle r={44} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} />
          {[[-14, -10], [12, 8], [-6, 18], [16, -16]].map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={6} fill={C.cardigan} />)}
        </g>
      </g>
      {offer > 0.6 && f < 46 && <g transform="translate(1180, 380)">
        <path d="M-150,-60 h300 a30,30 0 0 1 30,30 v60 a30,30 0 0 1 -30,30 h-170 l-40,40 l6,-40 h-96 a30,30 0 0 1 -30,-30 v-60 a30,30 0 0 1 30,-30 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
        <text x={0} y={16} textAnchor="middle" fontFamily={BUBBLE} fontSize={54} fill={C.ink}>Cookie?</text>
      </g>}
    </Board>
  );
};

// S20: V05 "And 'opt-out' means that no one asked you…": the kid already has a cookie stuck to his hand and wanders a
// maze of menus looking for the exit. The maze is a grid of settings windows that never overlap, each titled clearly
// on its own title bar, with arrows that send you round in circles; the kid's path winds and doubles back (dotted
// trail); EXIT? is greyed out and its arrow points back to the start (the human's note, 2026-11-06)
const MENUS = [
  ["Settings", "More ›"], ["Privacy", "See all ›"], ["More…", "‹ Back"], ["Advanced", "More ›"],
  ["Personalize", "‹ Back"], ["Data & AI", "Manage ›"], ["Manage", "Settings ›"], ["Other", "Help ›"],
  ["Help", "Privacy ›"], ["See all", "‹ Back"], ["Account", "More ›"], ["Smart features", "managed for you"],
];
const MX = 190, MY = 300, CW = 250, CH = 120, GX = 70, GY = 44; // the grid on the board (inside it, EXIT? included)
const cell = (i: number) => [MX + (i % 4) * (CW + GX), MY + Math.floor(i / 4) * (CH + GY)];
// the kid's route through the gaps (gap centres), winding and doubling back
const ROUTE: [number, number][] = [
  [MX - 34, MY + CH + GY / 2 + 300], [MX - 34, MY + CH + GY / 2], [MX + CW + GX / 2, MY + CH + GY / 2], [MX + CW + GX / 2, MY - 26],
  [MX + 2 * CW + GX * 1.5, MY - 26], [MX + 2 * CW + GX * 1.5, MY + 2 * (CH + GY) - GY / 2], [MX + CW + GX / 2, MY + 2 * (CH + GY) - GY / 2],
  [MX + CW + GX / 2, MY + CH + GY / 2], [MX + 3 * CW + GX * 2.5, MY + CH + GY / 2], [MX + 3 * CW + GX * 2.5, MY + 3 * (CH + GY) - GY / 2 + 10],
];
const routeAt = (u: number): [number, number] => {
  const seg = Math.min(ROUTE.length - 2, Math.floor(u * (ROUTE.length - 1)));
  const v = u * (ROUTE.length - 1) - seg;
  return [ROUTE[seg][0] + (ROUTE[seg + 1][0] - ROUTE[seg][0]) * v, ROUTE[seg][1] + (ROUTE[seg + 1][1] - ROUTE[seg][1]) * v];
};
export const S20: ShotC = ({ f, g, len }) => {
  const u = ez(f, 6, len - 6);
  const [kx, ky] = routeAt(u);
  const trail = Array.from({ length: 40 }, (_, k) => routeAt((u * k) / 40));
  return (
    <Board word="OPT-OUT" g={g} f={f}>
      {MENUS.map(([title, link], i) => {
        const [x, y] = cell(i);
        const managed = link === "managed for you";
        return (
          <g key={title} transform={`translate(${x}, ${y})`}>
            <rect width={CW} height={CH} rx={10} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
            <rect width={CW} height={38} rx={10} fill={managed ? C.creamShade : C.teal} stroke={C.ink} strokeWidth={lw(4)} />
            <text x={14} y={28} fontFamily={SANS} fontWeight={600} fontSize={25} fill={managed ? C.ink : C.white}>{title}</text>
            {[0, 1].map((r) => <rect key={r} x={14} y={52 + r * 22} width={CW - 90 - r * 40} height={10} rx={4} fill={C.creamShade} />)}
            {managed
              ? <text x={14} y={108} fontFamily={SANS} fontStyle="italic" fontSize={16} fill={C.inkSoft}>This setting is managed for you</text>
              : <text x={CW - 12} y={108} textAnchor="end" fontFamily={SANS} fontWeight={600} fontSize={19} fill={C.teal}>{link}</text>}
            {!managed && <g transform={`translate(${CW - 30}, 62)`}><rect width={22} height={22} rx={4} fill={C.avocado} stroke={C.ink} strokeWidth={lw(2.5)} /></g>}
          </g>
        );
      })}
      {/* arrows between windows that loop: More → Back → Settings → More */}
      <g stroke={C.white} strokeWidth={4} fill="none" opacity={0.75} strokeDasharray="10 8">
        <path d={`M${cell(0)[0] + CW},${cell(0)[1] + CH * 0.8} q35,20 70,0`} />
        <path d={`M${cell(2)[0] + CW / 2},${cell(2)[1] + CH} q-40,40 -${CW + GX},${GY + 10}`} />
        <path d={`M${cell(6)[0]},${cell(6)[1] + CH / 2} q-200,-180 -${2 * (CW + GX) - 40},-${CH + GY}`} />
      </g>
      {/* the trail and the kid, cookie stuck to his hand */}
      {trail.map(([x, y], k) => k % 2 === 0 && <circle key={k} cx={x} cy={y} r={4} fill={C.white} opacity={0.6} />)}
      <g transform={`translate(${kx}, ${ky - 60}) scale(0.42)`}><Kid seed={1} look={[Math.sin(f / 9), 0]} mouth={f % 50 < 25 ? "E" : "X"} /></g>
      <circle cx={kx + 34} cy={ky - 6} r={16} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
      {/* EXIT?, greyed out, its arrow pointing back to the start */}
      <g transform={`translate(${MX + 3 * (CW + GX) + 30}, ${MY + 3 * (CH + GY) + 10})`}>
        <rect x={-60} y={-40} width={190} height={70} rx={8} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(4)} opacity={0.75} />
        <text x={35} y={10} textAnchor="middle" fontFamily={BUBBLE} fontSize={40} fill={C.inkSoft}>EXIT?</text>
        <path d="M-70,0 q-120,30 -260,0" stroke={C.white} strokeWidth={4} fill="none" opacity={0.75} />
        <path d="M-330,0 l16,-10 M-330,0 l16,10" stroke={C.white} strokeWidth={4} opacity={0.75} />
      </g>
      <g transform="translate(1380, 770) scale(0.28)"><Switch pose="proud" mouth={mouthAt(g, "switch")} blink={blink(g, 3)} /></g>
    </Board>
  );
};

// S21: "And 'default' is the setting that they picked…": a lunch tray glides in by itself, a plate already piled with
// steaming broccoli, a CHEF'S PICK flag, a milk carton, a spoon, and a tag whose checkbox is already ticked
// ("pre-selected"); the kid scoots in on a chair, looks it over and frowns
// S22: "…they'll say you picked the same.": the kid pushes the tray away, it slides right back, the stamp slams down
// YOU CHOSE THIS on the plate (the frame shakes, ink flecks), and the kid slumps
const Tray: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <rect x={-330} y={-40} width={660} height={130} rx={18} fill={C.orange} stroke={C.ink} strokeWidth={lw(6)} />
    <rect x={-310} y={-26} width={620} height={102} rx={12} {...PEN} />
    {/* the plate and its broccoli, with steam */}
    <ellipse cx={-40} cy={20} rx={190} ry={46} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
    <ellipse cx={-40} cy={20} rx={150} ry={32} {...PEN} opacity={0.5} />
    {Array.from({ length: 11 }, (_, i) => {
      const bx = -170 + (i % 6) * 50 + (i > 5 ? 25 : 0), by = i > 5 ? -46 : -14;
      return <g key={i} transform={`translate(${bx}, ${by})`}>
        <rect x={-8} y={4} width={16} height={34} rx={6} fill="#a8c46a" stroke={C.ink} strokeWidth={lw(3)} />
        {[[-16, 0], [0, -10], [16, 0], [-6, 6], [8, 6]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r={16} fill={C.avocado} stroke={C.ink} strokeWidth={lw(3)} />)}
        <path d="M-8,-4 q4,-4 8,0" {...PEN} opacity={0.6} />
      </g>;
    })}
    {[0, 1, 2].map((k) => <path key={k} d={`M${-120 + k * 70},-80 q-14,-24 0,-44 q14,-20 0,-40`} fill="none" stroke={C.white} strokeWidth={5} opacity={0.4 + 0.3 * Math.sin(f / 7 + k)} />)}
    {/* the flag */}
    <line x1={40} y1={-50} x2={40} y2={-150} stroke={C.ink} strokeWidth={4} />
    <path d="M40,-150 L150,-130 L40,-110 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(3)} />
    <text x={48} y={-124} fontFamily={SANS} fontWeight={600} fontSize={15} fill={C.white}>CHEF'S PICK</text>
    {/* milk carton and spoon */}
    <g transform="translate(240, -30)">
      <path d="M-34,-80 L34,-80 L34,40 L-34,40 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
      <path d="M-34,-80 L0,-112 L34,-80 Z" fill={C.teal} stroke={C.ink} strokeWidth={lw(4)} />
      <text x={0} y={-30} textAnchor="middle" fontFamily={BUBBLE} fontSize={22} fill={C.teal}>MILK</text>
    </g>
    <g transform="translate(-260, 40) rotate(-20)"><ellipse rx={24} ry={14} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(3)} /><rect x={18} y={-5} width={90} height={10} rx={5} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(3)} /></g>
    {/* the tag: the box is already ticked */}
    <g transform="translate(140, 70) rotate(6)">
      <line x1={-40} y1={-30} x2={0} y2={0} stroke={C.ink} strokeWidth={2} />
      <rect x={0} y={-6} width={190} height={56} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />
      <rect x={12} y={8} width={26} height={26} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
      <path d="M16,20 l8,9 l14,-20" stroke={C.red} strokeWidth={5} fill="none" strokeLinecap="round" />
      <text x={48} y={30} fontFamily={SANS} fontWeight={600} fontSize={19} fill={C.ink}>pre-selected</text>
    </g>
  </g>
);
const DefaultScene: React.FC<{ f: number; g: number; len: number; stamp?: boolean }> = ({ f, g, len, stamp }) => {
  // S21: the tray glides in, the kid scoots in; S22: push away and back, then the stamp
  const trayIn = stamp ? 1 : ez(f, 0, 22);
  const push = stamp ? ez(f, 0, 6) * (1 - ez(f, 8, 14)) : 0;
  const kidIn = stamp ? 1 : ez(f, 12, 30);
  const st0 = stamp ? Math.max(16, len * 0.45) : 1e9;
  const s = ez(f, st0, st0 + 6) * (1 - ez(f, st0 + 14, st0 + 26));
  const printed = f >= st0 + 6;
  const shake = printed ? Math.sin(f * 3) * 8 * bump(f, st0 + 7, 8) : 0;
  const slump = printed ? ez(f, st0 + 10, st0 + 24) : 0;
  return (
    <Board word="DEFAULT" g={g} f={stamp ? 99 : f}>
      <g transform={`translate(${shake}, 0)`}>
        {/* the kid on a chair, scooting in from the left */}
        <g transform={`translate(${380 + kidIn * 260}, ${440 + slump * 20})`}>
          {/* the chair: back behind him, seat under his lap, four legs to the floor */}
          <rect x={-110} y={-40} width={220} height={330} rx={14} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(5)} />
          <Grain x={-100} y={-30} w={200} h={300} n={3} seed={3} vertical />
          <rect x={-120} y={284} width={240} height={30} rx={8} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />
          {[-104, 104].map((x) => <line key={x} x1={x} y1={314} x2={x} y2={480} stroke={C.ink} strokeWidth={9} />)}
          <g transform={`rotate(${slump * -5}, 0, 290)`}>
            <Kid seed={1} seated mouth={printed ? "E" : f > 34 ? "A" : "X"} look={[0.6, 0.8]}
              arms={push > 0.05 ? [{ x: 130 + push * 90, y: 250 }, { x: 170 + push * 90, y: 270 }] : printed ? [{ x: -50, y: 300 }, { x: 50, y: 300 }] : [{ x: 60, y: 255 }, { x: 140, y: 262, point: f > 34 }]} />
          </g>
          {!stamp && f > 34 && <text x={60} y={-90} fontFamily={BUBBLE} fontSize={70} fill={C.white} opacity={0.9}>?</text>}
          {printed && <g transform="translate(-20, -110)" opacity={1 - ez(f, st0 + 30, st0 + 40)}>{[0, 1, 2].map((k) => <circle key={k} cx={-k * 26} cy={-k * 8} r={12 + k * 4} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />)}</g>}
        </g>
        {/* the tray, gliding in from the right by itself */}
        <g transform={`translate(${1060 + (1 - trayIn) * 700 + push * 300}, 700)`}><Tray f={f} /></g>
        {stamp && (
          <g transform={`translate(1020, ${300 + s * 360})`}>
            <rect x={-40} y={-200} width={80} height={140} rx={20} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
            <rect x={-150} y={-60} width={300} height={70} rx={10} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
          </g>
        )}
        {/* the stamp's impression: red letters in a red frame on a cream patch, legible over the broccoli */}
        {printed && <g transform="translate(1020, 728) rotate(-6)">
          <rect x={-250} y={-52} width={500} height={78} rx={8} fill={C.cream} stroke={C.red} strokeWidth={7} opacity={0.96} />
          <rect x={-238} y={-42} width={476} height={58} rx={4} fill="none" stroke={C.red} strokeWidth={2.5} />
          <text x={0} y={2} textAnchor="middle" fontFamily={BUBBLE} fontSize={52} fill={C.red} letterSpacing={2}>YOU CHOSE THIS</text>
        </g>}
        {printed && [[800, 690], [1240, 700], [860, 770], [1200, 770], [1080, 660]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={6 + (i % 3) * 3} fill={C.red} opacity={0.7} />)}
      </g>
    </Board>
  );
};
export const S21: ShotC = ({ f, g, len }) => <DefaultScene f={f} g={g} len={len} />;
export const S22: ShotC = ({ f, g, len }) => <DefaultScene f={f} g={g} len={len} stamp />;

// S23: "Got that? Opt-in, opt-out, default. There'll be a test.": the Narrator taps the three words; a stack of test
// papers thuds onto the desk
export const S23: ShotC = ({ f, g, len }) => {
  const thud = len - 22;
  const up = ez(f, thud + 4, thud + 12); // the cover sheet springs up off the stack to face us, like a sign
  const X = 1120, Y = 832; // on the desk's left end
  return (
    <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="tap" size={80}>
      <g transform={`translate(${X}, ${f < thud ? -300 : Y - bump(f, thud + 2, 4) * 20})`}>
        {Array.from({ length: 7 }, (_, i) => <rect key={i} x={-150 + (i % 2) * 8} y={-20 - i * 16} width={300} height={18} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />)}
      </g>
      {up > 0 && (
        <g transform={`translate(${X}, ${Y - 130 - up * 140}) scale(${0.3 + up * 0.7}) rotate(${(1 - up) * 20 - 4})`}>
          <rect x={-200} y={-150} width={400} height={300} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
          {[30, 70, 110].map((y) => <line key={y} x1={-180} x2={180} y1={y} y2={y} stroke={C.teal} strokeWidth={2} opacity={0.4} />)}
          <text x={0} y={-30} textAnchor="middle" fontFamily={BUBBLE} fontSize={120} fill={C.red} stroke={C.ink} strokeWidth={4} paintOrder="stroke" letterSpacing={6}>TEST</text>
          <text x={-176} y={26} fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.ink}>Name: ____________</text>
          <text x={-176} y={66} fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.ink}>Score: ____ / 100</text>
          <path d="M-196,-146 l26,0 M-196,-146 l0,26" stroke={C.sleeve} strokeWidth={6} />
        </g>
      )}
      {f > thud && f < thud + 16 && [-1, 1].map((k) => [0, 1].map((j) => (
        <circle key={`${k}${j}`} cx={X + k * (180 + (f - thud) * 8 + j * 40)} cy={Y - 10 - j * 20 - (f - thud) * 2} r={26 - j * 8} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} opacity={1 - (f - thud) / 16} />
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

// S31-S33: on the TV's own home screen, filling the frame inside its bezel (the human's note, 2026-11-06: the hide
// didn't read): S31 Switch drags the winking new tile toward a "Delete" bin in the corner; S32 the bin card-flips into a
// "Hide" box ("Can't delete this app. Hide it instead?"); S33 Switch lifts the box's lid and the tile is inside, waving
const Bin: React.FC<{ flip: number; lid: number; f: number; inside: boolean }> = ({ flip, lid, f, inside }) => {
  const hide = flip > 0.5;
  const sx = Math.abs(Math.cos(flip * Math.PI)); // a card flip: squash to nothing and back as the face changes
  return (
    <g transform={`scale(${Math.max(0.04, sx)}, 1)`}>
      {!hide ? (
        <g>
          <path d="M-110,-110 L110,-110 L90,130 L-90,130 Z" fill={C.sleeve} stroke={C.ink} strokeWidth={lw(6)} />
          {[-50, 0, 50].map((x) => <line key={x} x1={x} y1={-80} x2={x * 0.85} y2={110} stroke={C.ink} strokeWidth={lw(4)} />)}
          <rect x={-128} y={-146} width={256} height={36} rx={10} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(5)} />
          <rect x={-30} y={-166} width={60} height={22} rx={6} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(4)} />
          <text y={190} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={42} fill={C.ink}>Delete</text>
        </g>
      ) : (
        <g>
          <rect x={-130} y={-110} width={260} height={240} rx={10} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} />
          <path d="M-70,10 Q0,-60 70,10 Q0,80 -70,10 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
          <circle cx={0} cy={10} r={20} fill={C.ink} />
          <line x1={-80} y1={70} x2={80} y2={-50} stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
          <g transform={`translate(-140, -110) rotate(${-lid * 75})`}><rect x={0} y={-34} width={280} height={34} rx={6} fill={C.orange} stroke={C.ink} strokeWidth={lw(5)} /></g>
          {inside && lid > 0.5 && <g transform={`translate(0, ${-150 - lid * 20})`}>
            <Tile color={C.mustard} glyph="spark" size={150} wink={0} />
            <path d={`M70,-30 q30,${Math.sin(f / 3) * 20 - 20} 50,-40`} stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
          </g>}
          <text y={190} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={42} fill={C.ink}>Hide</text>
        </g>
      )}
    </g>
  );
};
const HideScreen: React.FC<{ f: number; g: number; phase: 1 | 2 | 3 }> = ({ f, g, phase }) => {
  const drag = phase === 1 ? ez(f, 4, 34) : 1;
  const flip = phase === 2 ? ez(f, 2, 14) : phase === 3 ? 1 : 0;
  const lid = phase === 3 ? ez(f, 4, 14) : 0;
  const tileIn = phase === 2 ? ez(f, 12, 18) : phase === 3 ? 1 : 0; // the tile drops into the box
  const BX = 1500, BY = 640; // the bin, lower right of the screen
  const tx = 560 + drag * (BX - 560 - 40), ty = 640 + drag * (BY - 640 - 120) - Math.sin(drag * Math.PI) * 120;
  return (
    <Bg id="hide" seed={31} base={C.cardigan}>
      <rect x={30} y={20} width={W - 60} height={H - 40} rx={40} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
      <Grain x={40} y={26} w={W - 80} h={30} n={2} seed={2} />
      <rect x={80} y={70} width={W - 160} height={H - 140} rx={18} fill={C.paper} stroke={C.ink} strokeWidth={lw(6)} />
      <rect x={80} y={70} width={W - 160} height={100} rx={18} fill={C.teal} />
      <text x={130} y={140} fontFamily={SANS} fontWeight={600} fontSize={52} fill={C.cream}>Home</text>
      <g transform="translate(1700, 120)"><Clock t={(6 * 60 + 47) * 60 + g / 30} r={30} /></g>
      {[C.teal, C.orange, C.avocado, C.red].map((c, i) => <g key={i} transform={`translate(${340 + i * 330}, 330)`}><Tile color={c} glyph={(["play", "note", "star", "play"] as const)[i]} size={230} /></g>)}
      {drag > 0.2 && <rect x={445} y={525} width={230} height={230} rx={24} fill="none" stroke={C.inkSoft} strokeWidth={4} strokeDasharray="14 10" />}
      {phase === 2 && f > 8 && (
        <g transform="translate(860, 780)">
          <rect x={-330} y={-48} width={660} height={80} rx={14} fill={C.white} stroke={C.ink} strokeWidth={lw(4)} />
          <text y={6} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={32} fill={C.ink}>Can't delete this app. Hide it instead?</text>
        </g>
      )}
      <g transform={`translate(${BX}, ${BY})`}><Bin flip={flip} lid={lid} f={f} inside={phase === 3} /></g>
      {tileIn < 1 && <g transform={`translate(${tx}, ${ty + tileIn * 120}) scale(${1 - tileIn * 0.5})`} opacity={1 - tileIn}><Tile color={C.mustard} glyph="spark" size={230} wink={phase === 1 && f < 6 ? 1 : 0} /></g>}
      <g transform={`translate(${phase === 1 ? 420 + drag * 820 : 1240}, ${phase === 1 ? 900 - Math.sin(drag * Math.PI) * 40 : 900}) scale(0.62)`}>
        <Switch pose={phase === 3 ? "sad" : phase === 2 ? "startled" : "curious"} mouth={mouthAt(g, "switch")} look={phase === 3 ? [0.8, -0.6] : [1, -0.5]}
          armR={phase === 1 ? 150 : phase === 3 ? 120 : 60} armL={phase === 1 ? 140 : 30} blink={blink(g, 4)} />
      </g>
    </Bg>
  );
};
export const S31: ShotC = ({ f, g }) => <HideScreen f={f} g={g} phase={1} />;
export const S32: ShotC = ({ f, g }) => <HideScreen f={f} g={g} phase={2} />;
export const S33: ShotC = ({ f, g }) => <HideScreen f={f} g={g} phase={3} />;

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
