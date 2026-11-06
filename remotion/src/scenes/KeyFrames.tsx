// The M2 style board's five shots (brief: S04, S16, S28, S53, S61), each a component of its local frame `f` so M3's
// animatic can play them; the board renders one chosen frame of each.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Paper, Wash } from "../film/Paper";
import { BallLyric, FinePrint, Pop, Wall, ease } from "../components/kit";
import { Hand } from "../rigs/Hand";
import { Narrator } from "../rigs/Narrator";
import { PLATE, Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, W } from "../theme/palette";
import { FPS, at, line, shot } from "../timing";
import { MouthShape } from "../rigs/Mouth";
import { Wallpaper } from "../components/sets";

type Scene = React.FC<{ f: number }>;

// placeholder lip flap until M4's lip sync: inside an aligned word the mouth alternates open shapes, else rests
export const flap = (f: number, shotId: string, lineId: string): MouthShape => {
  const t0 = shot(shotId).frame;
  const w = line(lineId).words.find((x) => f + t0 >= at(x.start) && f + t0 < at(x.end));
  if (!w) return "X";
  return (["C", "B", "D", "B", "E"] as MouthShape[])[Math.floor((f + t0 - at(w.start)) / 3) % 5];
};
const wordFrame = (shotId: string, lineId: string, n: number) => at(line(lineId).words[n].start) - shot(shotId).frame;

// S04, V01 "Hi! I've got two sides: on, and off!": Switch waves on "Hi!", then demonstrates: toggle up on "on" and
// an "ON" label pops; toggle down on "off" and "OFF" pops
export const S04: Scene = ({ f }) => {
  const fOn = wordFrame("S04", "L03", 5), fOff = wordFrame("S04", "L03", 7);
  const up = ease(f, fOn - 3, fOn + 2) * (1 - ease(f, fOff - 3, fOff + 2));
  const waving = f < wordFrame("S04", "L03", 1) + 6;
  return (
    <AbsoluteFill>
      <Paper id="s04" seed={4}>
        <Wall id="s04" color={C.mustard} band={C.avocado} />
        {/* a picture frame and a plant: the room around him */}
        <Wash id="s04" color={C.teal} opacity={0.6}><rect x={250} y={190} width={300} height={220} /></Wash>
        <rect x={250} y={190} width={300} height={220} fill="none" stroke={C.ink} strokeWidth={7} filter="url(#s04-ink)" />
        <Wash id="s04" color={C.orange} opacity={0.55}><circle cx={400} cy={330} r={70} /></Wash>
        <g transform={`translate(${W / 2}, 470)`}>
          <ellipse cx={8} cy={PLATE.h / 2 + 8} rx={150} ry={14} fill={C.ink} opacity={0.12} />
          <Switch pose={f >= fOff ? "relaxed" : up > 0.5 ? "proud" : "neutral"} toggle={f < fOn - 3 ? 0.5 : up}
            mouth={flap(f, "S04", "L03")} wave={waving ? Math.sin(f / 3) * 22 : 0} armR={waving ? 140 : undefined}
            blink={f % 70 > 66 ? 1 : 0} />
        </g>
        {f < fOff && <Pop f={f} start={fOn} x={W / 2 + 330} y={300} text="ON" fps={FPS} />}
        <Pop f={f} start={fOff} x={W / 2 + 330} y={300} text="OFF" color={C.teal} fps={FPS} />
      </Paper>
    </AbsoluteFill>
  );
};

// S16, "But the switch is just a picture…": Switch peels off the wall and turns out to be a sticker; a pencil
// finishes drawing him back on
export const S16: Scene = ({ f }) => {
  const peel = ease(f, 0, 30);
  const d = 70 + peel * 190; // the fold's distance from the bottom-right corner, along both edges
  const cx = W / 2 - 220, cy = 470;
  return (
    <AbsoluteFill>
      <Paper id="s16" seed={16} base={C.mustard}>
        <Wallpaper id="s16" kind="daisy" a={C.cream} b={C.orange} opacity={0.3} />
        <rect x={-10} y={860} width={W + 20} height={26} fill={C.creamShade} stroke={C.ink} strokeWidth={5} />
        {/* the redrawn Switch on the wall, half finished in pencil */}
        <g transform={`translate(${cx + 470}, ${cy})`} opacity={0.9}>
          <rect x={-PLATE.w / 2} y={-PLATE.h / 2} width={PLATE.w} height={PLATE.h} rx={34} fill="none" stroke={C.inkSoft}
            strokeWidth={5} strokeDasharray={`${1200 * (0.4 + 0.6 * peel)} 2000`} filter="url(#s16-ink)" />
          <circle cx={-58} cy={-92} r={50} fill="none" stroke={C.inkSoft} strokeWidth={4} strokeDasharray={`${320 * peel} 400`} />
        </g>
        {/* a generic yellow pencil, at the end of its line */}
        <g transform={`translate(${cx + 470 + PLATE.w / 2}, ${cy - PLATE.h / 2 + 300 * peel}) rotate(-35)`}>
          <rect x={0} y={-18} width={300} height={36} fill={C.mustard} stroke={C.ink} strokeWidth={6} />
          <rect x={300} y={-18} width={40} height={36} fill={C.orange} stroke={C.ink} strokeWidth={6} />
          <path d="M0,-18 L-50,0 L0,18 Z" fill={C.cream} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          <path d="M-36,-5 L-50,0 L-36,5 Z" fill={C.ink} />
        </g>
        {/* Switch the sticker: the plate with its bottom-right corner curling away to show the white backing */}
        <g transform={`translate(${cx}, ${cy}) rotate(-4)`}>
          {/* the fold runs across the corner, x + y = c; the corner beyond it is gone, and its mirror image (the
              sticker's white backing) lies folded over the front */}
          {(() => {
            const c = PLATE.w / 2 + PLATE.h / 2 - d, R = 600;
            const fx = PLATE.w / 2, fy = PLATE.h / 2;
            return (
              <>
                <clipPath id="s16-peel"><path d={`M${-R},${-R} L${R},${-R} L${R},${c - R} L${c - R},${R} L${-R},${R} Z`} /></clipPath>
                <g clipPath="url(#s16-peel)"><Switch pose="startled" mouth="E" look={[0.6, 0.6]} /></g>
                <path d={`M${fx},${fy - d} L${fx - d},${fy} L${fx - d + 14},${fy - d + 14} Z`} fill={C.ink} opacity={0.18} transform="translate(-10, -6)" />
                <path d={`M${fx},${fy - d} L${fx - d},${fy} Q${fx - d * 0.92},${fy - d * 0.9} ${fx - d},${fy - d} Q${fx - d * 0.9},${fy - d * 0.92} ${fx},${fy - d} Z`}
                  fill={C.white} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
                <path d={`M${fx - d * 0.3},${fy - d * 0.8} L${fx - d * 0.8},${fy - d * 0.3}`} stroke={C.creamShade} strokeWidth={6} strokeLinecap="round" />
              </>
            );
          })()}
        </g>
        <BallLyric f={f} y={950} syl={[
          { t: "But the ", at: -30 }, { t: "switch ", at: -20 }, { t: "is just a ", at: -10 }, { t: "pic-", at: 2 }, { t: "ture", at: 14 },
        ]} />
      </Paper>
    </AbsoluteFill>
  );
};

// a generic settings menu: a title bar and rows of toggles, nothing branded
const Menu: React.FC<{ x: number; y: number; w: number; title: string; seed: number }> = ({ x, y, w, title, seed }) => {
  const h = w * 0.62, rows = 5;
  return (
    <g transform={`translate(${x - w / 2}, ${y - h / 2})`}>
      <rect width={w} height={h} rx={w * 0.03} fill={C.white} stroke={C.ink} strokeWidth={Math.max(2, w * 0.008)} />
      <rect width={w} height={h * 0.16} rx={w * 0.03} fill={C.teal} stroke={C.ink} strokeWidth={Math.max(2, w * 0.008)} />
      <text x={w * 0.05} y={h * 0.11} fontFamily={BUBBLE} fontSize={h * 0.08} fill={C.cream}>{title}</text>
      {Array.from({ length: rows }, (_, i) => {
        const ry = h * (0.27 + i * 0.15);
        const on = (seed + i) % 3 !== 0;
        return (
          <g key={i}>
            <rect x={w * 0.06} y={ry - h * 0.025} width={w * (0.35 + ((seed * 7 + i * 13) % 20) / 100)} height={h * 0.05} rx={h * 0.025} fill={C.creamShade} />
            <rect x={w * 0.78} y={ry - h * 0.04} width={w * 0.14} height={h * 0.08} rx={h * 0.04} fill={on ? C.avocado : C.creamShade} stroke={C.ink} strokeWidth={Math.max(1.5, w * 0.005)} />
            <circle cx={w * (on ? 0.88 : 0.82)} cy={ry} r={h * 0.032} fill={C.white} stroke={C.ink} strokeWidth={Math.max(1.5, w * 0.005)} />
          </g>
        );
      })}
      {/* the "more" row that opens the next menu */}
      <text x={w * 0.06} y={h * 0.95} fontFamily={SANS} fontWeight={600} fontSize={h * 0.06} fill={C.inkSoft}>More settings ›</text>
    </g>
  );
};

// S28, "That it's fine, and here's the door: / Just a menu, then a menu…": the door opens on a menu, which opens
// on a menu, and another, zooming in each time; fine print scrolls past too fast to read
export const S28: Scene = ({ f }) => {
  const z = Math.pow(1.6, (f % 24) / 24); // a continuous zoom into the next menu, every 24 frames
  const titles = ["Settings", "More settings", "Advanced", "Privacy & more", "Smart features", "Other"];
  return (
    <AbsoluteFill>
      <Paper id="s28" seed={28} base={C.teal}>
        <g transform={`translate(${W / 2}, ${H / 2 - 20}) scale(${z}) translate(${-W / 2}, ${-(H / 2 - 20)})`}>
          {titles.map((t, i) => (
            <Menu key={t} x={W / 2 + i * 14} y={H / 2 - 20 + i * 18} w={1100 / Math.pow(1.6, i)} title={t} seed={i} />
          ))}
        </g>
        {/* the doorway, in the foreground, with its plaque */}
        <path d={`M0,0 L${W},0 L${W},${H} L0,${H} Z M360,${H} L360,150 L1560,150 L1560,${H} Z`} fill={C.orange} fillRule="evenodd" opacity={0.9} />
        <rect x={360} y={150} width={1200} height={H} fill="none" stroke={C.ink} strokeWidth={10} filter="url(#s28-ink)" />
        <g transform="translate(960, 90)">
          <rect x={-190} y={-44} width={380} height={80} rx={14} fill={C.cream} stroke={C.ink} strokeWidth={7} />
          <text textAnchor="middle" y={14} fontFamily={BUBBLE} fontSize={52} fill={C.ink}>SETTINGS</text>
        </g>
        {/* the open door, swung in against the frame */}
        <path d="M360,150 L170,110 L170,1080 L360,1080 Z" fill={C.mustard} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
        <circle cx={210} cy={640} r={16} fill={C.creamShade} stroke={C.ink} strokeWidth={5} />
        {/* Switch at the threshold, looking in */}
        <g transform="translate(1660, 820) scale(0.6)"><Switch pose="curious" mouth="X" look={[-0.8, -0.3]} armL={60} /></g>
        <rect x={0} y={1010} width={W} height={46} fill={C.cream} opacity={0.85} />
        <FinePrint f={f} y={1040} text="Smart features were turned on for your account on or about October 10. Some features may remain available." />
      </Paper>
    </AbsoluteFill>
  );
};

// S53, "Correction, boys and girls!…": the Narrator redubs, out of sync; a CORRECTION slate; the contract now has a
// third box
export const S53: Scene = ({ f }) => {
  const jitter = Math.sin(f * 2.3) * 6;
  return (
    <AbsoluteFill>
      <Paper id="s53" seed={53} base={C.avocado}>
        {/* chalkboard behind him */}
        <rect x={160} y={110} width={900} height={520} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={22} />
        <text x={210} y={220} fontFamily={BUBBLE} fontSize={56} fill={C.white} opacity={0.85}>SEARCH + AI?</text>
        <path d="M210,250 Q400,236 600,252" stroke={C.white} strokeWidth={5} fill="none" opacity={0.6} />
        <g transform={`translate(560, ${720 + jitter * 0.3})`}><Narrator mouth="D" head={0.5} armL="tap" armR="down" sheepish={0.8} brows={0.6} /></g>
        {/* the desk and the contract */}
        <rect x={0} y={880} width={W} height={220} fill={C.cardigan} stroke={C.ink} strokeWidth={8} />
        <g transform="translate(1250, 640) rotate(-4)">
          <rect x={-300} y={-220} width={600} height={430} fill={C.white} stroke={C.ink} strokeWidth={7} />
          <text x={-260} y={-160} fontFamily={BUBBLE} fontSize={40} fill={C.ink}>AGREEMENT</text>
          {["Search + AI", "No search", "Search, chatbot off"].map((t, i) => (
            <g key={t} transform={`translate(-250, ${-80 + i * 92})`}>
              <rect width={52} height={52} fill={i === 2 ? C.cream : "none"} stroke={i === 2 ? C.orange : C.ink} strokeWidth={6} />
              <text x={80} y={40} fontFamily={SANS} fontWeight={600} fontSize={40} fill={i === 2 ? C.orange : C.ink}>{t}</text>
            </g>
          ))}
          {/* the new box is scribbled in by hand */}
          <path d="M-268,118 Q-160,96 110,112" stroke={C.orange} strokeWidth={4} fill="none" />
        </g>
        {/* the slate */}
        <g transform="translate(1520, 230) rotate(6)">
          <rect x={-300} y={-90} width={600} height={180} rx={12} fill={C.red} stroke={C.ink} strokeWidth={8} />
          <rect x={-280} y={-70} width={560} height={140} rx={8} fill="none" stroke={C.cream} strokeWidth={4} />
          <text textAnchor="middle" y={22} fontFamily={BUBBLE} fontSize={64} fill={C.cream} letterSpacing={2}>CORRECTION</text>
        </g>
      </Paper>
      {/* rewound tape: a soft horizontal tear rolling through the frame */}
      <div style={{ position: "absolute", left: 0, right: 0, top: (f * 37) % H, height: 26,
        background: "linear-gradient(rgba(255,250,235,0), rgba(255,250,235,0.45), rgba(255,250,235,0))", transform: `translateX(${jitter}px)` }} />
    </AbsoluteFill>
  );
};

// S61, "…Guess one of 'em was just for show.": the grey hand stops mid-frame, hesitates, withdraws; Switch is
// still ON, looking where it was
export const S61: Scene = ({ f }) => {
  const reach = f < 18 ? 0.86 : 0.86 - ease(f, 30, 70) * 0.86;
  const curl = ease(f, 6, 22) * 0.7;
  return (
    <AbsoluteFill>
      <Paper id="s61" seed={61} base={C.dark}>
        {/* the spotlight: a soft cone and a pool on the wall */}
        <defs>
          <radialGradient id="s61-pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={C.cream} stopOpacity={0.55} />
            <stop offset="0.7" stopColor={C.mustard} stopOpacity={0.18} />
            <stop offset="1" stopColor={C.mustard} stopOpacity={0} />
          </radialGradient>
        </defs>
        <path d={`M${W / 2 - 70},-20 L${W / 2 + 70},-20 L${W / 2 + 420},${H} L${W / 2 - 420},${H} Z`} fill={C.cream} opacity={0.06} />
        <ellipse cx={W / 2} cy={560} rx={430} ry={400} fill="url(#s61-pool)" />
        <g transform={`translate(${W / 2}, 540)`}>
          <Switch pose="sad" toggle={1} mouth="X" look={[-0.9, 0.1]} armL={30} armR={8} />
        </g>
        <g transform="translate(-40, 520) rotate(4)"><Hand reach={reach} length={720} curl={curl} /></g>
      </Paper>
    </AbsoluteFill>
  );
};
