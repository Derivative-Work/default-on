// S48-S67: the bridge (the school, the giant, the rewind and the redub), the final chorus, and the outro and reveal.
// S65-S67 are real material (R screen capture, H footage); until the human supplies it they show a stand-in.
import React from "react";
import { Wash } from "../film/Paper";
import { AnswerBox, Contract, MiniRocker, Slate, Spotlight, TV, Tile, Kid } from "../components/props";
import { Hand } from "../rigs/Hand";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { BUBBLE, SANS } from "../theme/fonts";
import { C, H, PEN, W, lw } from "../theme/palette";
import { at, events, line, mouthAt, slot } from "../timing";
import { S61 as S61Key } from "../scenes/KeyFrames";
import { NarratorSet } from "./Intro";
import { Living } from "./Lesson";
import { Bookshelf, Clock, Floorboards, Grain, Wallpaper, Window } from "../components/sets";
import { Lyric } from "./Chorus";
import { Bg, ShotC, Stand, blink, bump, ez } from "./common";

// S48: "Now the school's the place for learning…": a one-room schoolhouse at dusk, slow pan (Rhodes only): clapboard
// siding and shingles in pen, a bell in the tower, a picket fence and a path, trees, glowing windows, the first stars,
// a pair of birds heading home
export const S48: ShotC = ({ f, len }) => (
  <Bg id="s48" seed={48} base={C.orange}>
    <Wash id="s48" color={C.night} opacity={0.55}><rect x={-40} y={-40} width={W + 80} height={520} /></Wash>
    {[[220, 120], [520, 70], [1500, 90], [1760, 180], [980, 50]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2 + (Math.sin(f / 9 + i) + 1) * 1.5} fill={C.cream} opacity={ez(f, i * 12, i * 12 + 30)} />)}
    {[0, 1].map((k) => <path key={k} transform={`translate(${300 + f * 1.6 + k * 50}, ${220 - k * 20})`} d={`M0,0 q12,${-10 + Math.sin(f / 3 + k) * 6} 24,0 q12,${-10 + Math.sin(f / 3 + k) * 6} 24,0`} fill="none" stroke={C.ink} strokeWidth={2.4} />)}
    <Wash id="s48" color={C.avocado} opacity={0.8}><path d="M-40,760 Q600,700 1100,740 Q1600,780 1960,720 L1960,1120 L-40,1120 Z" /></Wash>
    {[180, 1640, 1820].map((x, i) => <g key={x} transform={`translate(${x - ez(f, 0, len) * 140}, 760)`}><rect x={-14} y={-160} width={28} height={160} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(4)} /><circle cy={-220} r={110 - i * 20} fill="#5f7d3a" stroke={C.ink} strokeWidth={lw(5)} /><path d="M-60,-240 q20,-20 40,0 M10,-200 q20,-20 40,0 M-30,-170 q16,-14 32,0" {...PEN} /></g>)}
    <g transform={`translate(${1100 - ez(f, 0, len) * 260}, 760)`}>
      <rect x={-260} y={-300} width={520} height={300} fill={C.red} stroke={C.ink} strokeWidth={lw(8)} />
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={-258} x2={258} y1={-278 + i * 26} y2={-278 + i * 26} {...PEN} opacity={0.6} />)}
      <path d="M-300,-300 L0,-500 L300,-300 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} strokeLinejoin="round" />
      <path d="M-300,-300 L0,-500 L300,-300 Z" fill="url(#pen-cross)" opacity={0.5} />
      <rect x={-40} y={-620} width={80} height={140} fill={C.cream} stroke={C.ink} strokeWidth={lw(6)} />
      <path d="M-22,-560 q22,-30 44,0 l-6,20 h-32 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
      <path d="M-40,-620 L0,-680 L40,-620 Z" fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
      <rect x={-50} y={-160} width={100} height={160} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(6)} />
      <Grain x={-46} y={-156} w={92} h={150} n={3} seed={2} vertical />
      {[-170, 170].map((x) => <g key={x}><rect x={x - 50} y={-230} width={100} height={90} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} /><path d={`M${x},-230 v90 M${x - 50},-185 h100`} stroke={C.ink} strokeWidth={lw(4)} /></g>)}
      <path d="M-30,0 Q-60,120 -200,330 M30,0 Q60,120 140,330" stroke={C.ink} strokeWidth={lw(4)} fill="none" />
      {Array.from({ length: 14 }, (_, i) => <g key={i} transform={`translate(${-640 + i * 46}, 40)`}><path d="M-8,0 v-50 l8,-12 l8,12 v50 Z" fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} /></g>)}
      <line x1={-660} x2={-20} y1={10} y2={10} stroke={C.ink} strokeWidth={lw(4)} />
    </g>
  </Bg>
);

// S49: "So the school said, 'No AI, please'…": a teacher's desk at dusk with a polite handwritten note on it, an ink
// pot and pen, a pencil cup, an apple, a stack of exercise books; the chalkboard's corner and a dusky window behind
export const S49: ShotC = ({ g }) => (
  <Bg id="s49" seed={49} base={C.avocado}>
    <Wallpaper id="s49" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    <rect x={-40} y={60} width={620} height={420} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={22} />
    <g transform="translate(1600, 280)"><Window w={300} h={340} sky="#e8a070" sun="sun" curtain={C.teal} /></g>
    <g transform="translate(1180, 120)"><Clock t={(16 * 60 + 52) * 60 + g / 30} r={50} /></g>
    <rect x={0} y={640} width={W} height={440} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
    <Grain x={0} y={650} w={W} h={420} n={7} seed={6} />
    <g transform="translate(960, 640) rotate(-4)">
      <rect x={-320} y={-200} width={640} height={300} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
      {[-120, -40, 40].map((y) => <line key={y} x1={-300} x2={300} y1={y} y2={y} stroke={C.teal} strokeWidth={2} opacity={0.4} />)}
      <text x={-270} y={-90} fontFamily={SANS} fontStyle="italic" fontSize={72} fill={C.inkSoft}>No AI, please.</text>
      <text x={-270} y={10} fontFamily={SANS} fontStyle="italic" fontSize={52} fill={C.inkSoft}>Thank you! — the school</text>
      <path d="M140,40 q20,-20 40,0 q20,20 40,0" {...PEN} />
    </g>
    <g transform="translate(1500, 560)"><circle r={60} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} /><path d="M0,-60 q10,-30 30,-30" stroke={C.ink} strokeWidth={lw(6)} fill="none" /><path d="M-30,-20 q10,-14 24,-10" stroke={C.white} strokeWidth={5} fill="none" opacity={0.6} /></g>
    <g transform="translate(420, 600)"><rect x={-40} y={-50} width={80} height={60} rx={10} fill={C.night} stroke={C.ink} strokeWidth={lw(5)} /><line x1={10} y1={-50} x2={50} y2={-150} stroke={C.ink} strokeWidth={6} /></g>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={1600 - i * 4} y={600 - i * 24} width={220} height={24} fill={[C.teal, C.mustard, C.orange, C.red][i]} stroke={C.ink} strokeWidth={lw(4)} />)}
  </Bg>
);

// S50 / S51: "And the giant said, 'We hear you!'…": a giant pinstriped cuff (not the grey sleeve), with a cufflink,
// slides a contract across the desk; "Take the robot with your search…": the contract close up, its two boxes and fine
// print
const Giant: React.FC<{ slide: number; boxes: string[] }> = ({ slide, boxes }) => (
  <Bg id="s50" seed={50} base={C.avocado}>
    <Wallpaper id="s50" kind="stripe" a={C.avocado} b={C.cream} opacity={0.18} />
    <rect x={0} y={640} width={W} height={440} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
    <Grain x={0} y={650} w={W} h={420} n={7} seed={6} />
    <g transform="translate(400, 640) rotate(-6) scale(0.8)" opacity={0.9}>
      <rect x={-320} y={-200} width={640} height={300} fill={C.white} stroke={C.ink} strokeWidth={lw(6)} />
      <text x={-270} y={-90} fontFamily={SANS} fontStyle="italic" fontSize={72} fill={C.inkSoft}>No AI, please.</text>
    </g>
    <g transform={`translate(${1500 - slide * 560}, 640) rotate(-3)`}><g transform="scale(0.9)"><Contract boxes={boxes} /></g></g>
    <g transform={`translate(${2400 - slide * 560}, 560)`}>
      <rect x={-200} y={-120} width={1200} height={240} fill="#3b3f52" stroke={C.ink} strokeWidth={lw(8)} />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-200 + i * 120} y1={-120} x2={-200 + i * 120} y2={120} stroke={C.cream} strokeWidth={3} opacity={0.5} />)}
      <path d="M-100,-120 q20,120 0,240 M200,-120 q-14,120 6,240" {...PEN} stroke={C.cream} opacity={0.4} />
      <rect x={-260} y={-130} width={80} height={260} rx={10} fill={C.white} stroke={C.ink} strokeWidth={lw(7)} />
      <rect x={-236} y={-20} width={30} height={40} rx={6} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />
      <path d="M-260,-90 Q-420,-110 -440,0 Q-420,100 -260,90 Z" fill={C.skin} stroke={C.ink} strokeWidth={lw(7)} />
      <path d="M-380,-60 q-20,10 -16,30 M-380,10 q-20,10 -16,30" {...PEN} />
    </g>
  </Bg>
);
export const S50: ShotC = ({ f, len }) => <Giant slide={ez(f, 0, len * 0.7)} boxes={["Search + AI", "No search"]} />;
export const S51: ShotC = ({ f }) => (
  <Bg id="s51" seed={51} base={C.cardigan}>
    <Grain x={0} y={0} w={W} h={H} n={9} seed={8} />
    <g transform={`translate(960, 560) scale(${1.4 + f * 0.002})`}>
      <Contract boxes={["Search + AI", "No search"]} />
      {Array.from({ length: 5 }, (_, i) => <rect key={i} x={-280} y={180 + i * 12} width={520 - i * 30} height={4} fill={C.inkSoft} opacity={0.5} />)}
      <text x={-280} y={250} fontFamily={SANS} fontSize={18} fill={C.inkSoft}>Sign here: ______________</text>
    </g>
  </Bg>
);

// S52: [record scratch, tape rewind]: the film burns from the centre, the frame jitters, and the shot rewinds at speed
export const S52: ShotC = ({ f, len }) => {
  const burn = ez(f, 0, len * 0.4);
  const rew = ez(f, len * 0.35, len);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${Math.sin(f * 3.1) * 14}px, ${Math.cos(f * 2.3) * 10}px)` }}>
        <Giant slide={1 - rew} boxes={["Search + AI", "No search"]} />
      </div>
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="burn" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff6dc" />
            <stop offset="0.6" stopColor={C.orange} />
            <stop offset="0.85" stopColor={C.ink} />
            <stop offset="1" stopColor={C.ink} stopOpacity={0} />
          </radialGradient>
        </defs>
        {burn > 0 && rew < 0.3 && <ellipse cx={W / 2} cy={H / 2} rx={burn * 700} ry={burn * 520} fill="url(#burn)" />}
        {rew > 0 && Array.from({ length: 5 }, (_, i) => <rect key={i} x={0} y={((f * 61 + i * 233) % H)} width={W} height={10} fill={C.cream} opacity={0.5} />)}
        {rew > 0 && <text x={W - 80} y={120} textAnchor="end" fontFamily={SANS} fontWeight={600} fontSize={80} fill={C.cream}>◀◀</text>}
      </svg>
    </>
  );
};

// S53: "Correction, boys and girls!…" ("Ahem!" isn't sung): the Narrator redubs at his desk, his mouth shapes visibly
// out of sync (8 frames late); a CORRECTION slate; the contract now has a third box, written in by hand; tape wobble
export const S53: ShotC = ({ f, g }) => {
  const jitter = Math.sin(f * 2.3) * 6;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${jitter}px)` }}>
      <NarratorSet g={g - 8} board={["SEARCH + AI?"]} arm="tap" head={0} size={60}>
        <g transform="translate(560, 760) rotate(-4) scale(0.75)"><Contract boxes={["Search + AI", "No search", "Search, chatbot off"]} highlight={2} /></g>
        <g transform="translate(1520, 230) rotate(6)"><Slate text="CORRECTION" w={600} /></g>
      </NarratorSet>
      <div style={{ position: "absolute", left: 0, right: 0, top: (f * 37) % H, height: 26, background: "linear-gradient(rgba(255,250,235,0), rgba(255,250,235,0.45), rgba(255,250,235,0))" }} />
    </div>
  );
};

// S54: V16 "And the answer box on top?": tilt up: the answer box is bolted to the top of the frame, unchanged
// S55: "…That one's 'deeply integrated.'": the bolts tighten themselves; a small label plate reads "deeply integrated"
const Bolted: React.FC<{ g: number; tilt: number; tighten?: number }> = ({ g, tilt, tighten = 0 }) => (
  <Bg id="s54" seed={54} base={C.avocado}>
    <g transform={`translate(0, ${(1 - tilt) * -380})`}>
      {/* the classroom's ceiling: beams with grain, a hanging school light */}
      <rect x={-20} y={-20} width={W + 40} height={120} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
      <Grain x={0} y={-10} w={W} h={100} n={3} seed={4} />
      {[200, 1720].map((x) => <g key={x}><line x1={x} y1={100} x2={x} y2={300} stroke={C.ink} strokeWidth={4} /><path d={`M${x - 90},300 h180 l-30,60 h-120 Z`} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} /></g>)}
      <Wallpaper id="s54" kind="stripe" a={C.avocado} b={C.cream} x={-40} y={100} w={W + 80} h={1300} opacity={0.18} />
      <g transform="translate(960, 260)">
        <AnswerBox w={760} />
        {[-330, 330].map((x) => (
          <g key={x} transform={`translate(${x}, -150)`}>
            <rect x={-14} y={-200} width={28} height={200} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(5)} />
            <g transform={`rotate(${tighten * 360})`}><circle r={30} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(6)} /><path d="M-18,0 H18 M0,-18 V18" stroke={C.ink} strokeWidth={lw(6)} /></g>
          </g>
        ))}
        {tighten > 0.6 && (
          <g transform="translate(0, 220)">
            <rect x={-230} y={-34} width={460} height={68} rx={10} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
            <text textAnchor="middle" y={14} fontFamily={SANS} fontWeight={600} fontSize={38} fill={C.ink}>deeply integrated</text>
          </g>
        )}
      </g>
      <g transform="translate(960, 1100) scale(0.6)"><Switch pose="curious" mouth={mouthAt(g, "switch")} look={[0, -1]} blink={blink(g, 7)} /></g>
      <g transform="translate(1500, 1160) scale(0.6)"><Bookshelf w={300} shelves={3} seed={7} /></g>
    </g>
  </Bg>
);
export const S54: ShotC = ({ f, g, len }) => <Bolted g={g} tilt={ez(f, 0, len * 0.6)} />;
export const S55: ShotC = ({ f, g, len }) => <Bolted g={g} tilt={1} tighten={ez(f, 4, len * 0.7)} />;

// S56: V17 "What's that mean?" / "It means it stays.": in the classroom, Switch, on the desk, looks up at the
// Narrator; the Narrator looks away
export const S56: ShotC = ({ f, g, len }) => {
  const away = f > len * 0.45;
  return (
    <NarratorSet g={g} board={["DEEPLY", "INTEGRATED?"]} arm="down" head={away ? 1 : 0} size={80}>
      <g transform="translate(980, 700) scale(0.42)"><Switch pose="curious" mouth={mouthAt(g, "switch")} look={[0.9, -0.8]} blink={blink(g, 8)} /></g>
      {away && <text x={1560} y={240} fontFamily={BUBBLE} fontSize={56} fill={C.ink} opacity={0.7}>ahem…</text>}
    </NarratorSet>
  );
};

// the final-chorus classroom: rows of generic cartoon kids, each with a rocker on the desk flicking ON on the beat
const Classroom: React.FC<{ f: number; g: number; lineId?: string }> = ({ f, g, lineId }) => (
  <Bg id="s57" seed={57} base={C.mustard}>
    <Wallpaper id="s57" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
    {/* an alphabet strip over the board, a clock, a window each side, a floor */}
    {"ABCDEFGHIJ".split("").map((ch, i) => <g key={ch} transform={`translate(${250 + i * 150}, 22)`}><rect width={120} height={36} rx={4} fill={[C.teal, C.orange, C.avocado, C.red, C.cream][i % 5]} stroke={C.ink} strokeWidth={lw(3)} /><text x={60} y={28} textAnchor="middle" fontFamily={BUBBLE} fontSize={26} fill={C.ink}>{ch}{ch.toLowerCase()}</text></g>)}
    <g transform="translate(1840, 180)"><Clock t={(10 * 60 + 15) * 60 + g / 30} r={46} /></g>
    {[90, 1830].map((x) => <g key={x} transform={`translate(${x}, 470)`}><Window w={150} h={300} /></g>)}
    <rect x={-20} y={880} width={W + 40} height={220} fill="#b98a5a" stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={880} h={200} boards={2} />
    <rect x={160} y={60} width={1600} height={220} rx={10} fill={C.chalk} stroke={C.cardiganShade} strokeWidth={18} />
    <text x={960} y={210} textAnchor="middle" fontFamily={BUBBLE} fontSize={110} fill={C.white} opacity={0.9}>DEFAULT ON</text>
    {[0, 1].map((row) => Array.from({ length: 5 }, (_, i) => {
      const x = 300 + i * 330 + (row ? 165 : 0), y = row ? 560 : 760, s = row ? 0.7 : 0.85;
      const seed = row * 5 + i + 2;
      if (row === 0 && i === 2) return (
        <g key={`${row}${i}`} transform={`translate(${x}, ${y - 40}) scale(0.42)`}><Switch pose="neutral" mouth={mouthAt(g, "narrator")} blink={blink(g, 9)} /></g>
      );
      return (
        <g key={`${row}${i}`}>
          <g transform={`translate(${x}, ${y - 120}) scale(${s})`}><Kid seed={seed} mouth={mouthAt(g + seed * 2, "narrator")} /></g>
          <rect x={x - 150 * s} y={y + 60 * s} width={300 * s} height={40} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(5)} />
          <Grain x={x - 146 * s} y={y + 62 * s} w={292 * s} h={36} n={2} seed={seed} />
          <g transform={`translate(${x + 90 * s}, ${y + 30 * s})`}><MiniRocker on={f > 8 + seed * 9 ? 1 : 0} s={0.45} /></g>
        </g>
      );
    }))}
    {lineId && <Lyric id={lineId} f={f} g={g} y={1020} size={58} />}
  </Bg>
);

// S57: the final chorus's first line, "Default on! Default on!": the whole classroom
export const S57: ShotC = ({ f, g }) => <Classroom f={f} g={g} lineId="L61" />;

// a row of desks seen low and close: three kids and their rockers; `gag` stages S57b's attempts to switch them off
const Desks: React.FC<{ f: number; g: number; len: number; lineId: string; gag?: boolean }> = ({ f, g, len, lineId, gag }) => (
  <Bg id="s57a" seed={57} base={C.mustard}>
    <Wallpaper id="s57a" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
    {"KLMNOPQ".split("").map((ch, i) => <g key={ch} transform={`translate(${100 + i * 270}, 30)`}><rect width={220} height={60} rx={6} fill={[C.teal, C.orange, C.avocado, C.red][i % 4]} stroke={C.ink} strokeWidth={lw(3)} /><text x={110} y={46} textAnchor="middle" fontFamily={BUBBLE} fontSize={42} fill={C.ink}>{ch}{ch.toLowerCase()}</text></g>)}
    {[0, 1, 2].map((i) => {
      const x = 380 + i * 580, seed = 3 + i * 2;
      const beat = (len / 3) * i; // S57a: rockers rock ON one after another; S57b: one gag per kid, in turn
      const t = f - beat;
      const covered = gag && t > 6 && t < len / 3 - 10;
      const on = gag ? !covered || t > len / 3 - 14 : f > beat + 6;
      return (
        <g key={i}>
          <g transform={`translate(${x}, 420) scale(1.25)`}><Kid seed={seed} mouth={mouthAt(g + seed * 2, "narrator")} look={gag ? [0.4, 0.9] : [0, 0]} /></g>
          <rect x={x - 260} y={700} width={520} height={60} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(7)} />
          <Grain x={x - 256} y={704} w={512} h={52} n={2} seed={seed} />
          <rect x={x - 230} y={790} width={200} height={14} rx={4} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} transform={`rotate(-4, ${x - 130}, 797)`} />
          <rect x={x - 240} y={760} width={480} height={330} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(7)} />
          <g transform={`translate(${x + 120}, ${640 - (on && !gag ? bump(t, 6, 5) * 24 : 0)})`}><MiniRocker on={on ? 1 : 0} s={1.1} /></g>
          {/* S57b's three gags: a book over it, a hand over it, tucked into the desk; each pops back ON */}
          {gag && covered && i === 0 && <rect x={x + 30} y={560} width={190} height={150} rx={8} fill={C.teal} stroke={C.ink} strokeWidth={lw(6)} transform={`rotate(-6, ${x + 120}, 640)`} />}
          {gag && covered && i === 1 && <ellipse cx={x + 120} cy={630} rx={90} ry={70} fill={(["#f0c49b", "#c98b5e", "#8d5a3a"])[i]} stroke={C.ink} strokeWidth={lw(6)} />}
          {gag && covered && i === 2 && <rect x={x + 40} y={590} width={160} height={110} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />}
          {gag && !covered && t > len / 3 - 14 && t < len / 3 - 4 && <text x={x + 120} y={520} textAnchor="middle" fontFamily={BUBBLE} fontSize={60} fill={C.orange} stroke={C.ink} strokeWidth={lw(4)} paintOrder="stroke">ON!</text>}
        </g>
      );
    })}
    <Lyric id={lineId} f={f} g={g} y={1030} size={58} />
  </Bg>
);
// S57a: "It was there when we woke up…": low and close along a row of desks; the rockers rock ON one after another
export const S57a: ShotC = ({ f, g, len }) => <Desks f={f} g={g} len={len} lineId="L62" />;
// S57b: "We can hide it, we can mute it…": the kids try the chorus gags on their own switches; each rocks back ON
export const S57b: ShotC = ({ f, g, len }) => <Desks f={f} g={g} len={len} lineId="L63" gag />;

// S57c: "But the switch is just a picture…": close on Switch in the front row, mouthing along; a corner of his plate
// lifts like a sticker, and he presses it flat again
export const S57c: ShotC = ({ f, g, len }) => {
  const lift = ez(f, len * 0.35, len * 0.5) * (1 - ez(f, len * 0.7, len * 0.8));
  const d = 20 + lift * 90;
  const fx = 125, fy = 195;
  return (
    <Bg id="s57c" seed={57} base={C.mustard}>
      <Wallpaper id="s57c" kind="stripe" a={C.mustard} b={C.cream} opacity={0.2} />
      <rect x={0} y={860} width={W} height={220} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(8)} />
      <Grain x={0} y={866} w={W} h={200} n={4} seed={3} />
      {[260, 1660].map((x, i) => <g key={x} transform={`translate(${x}, 560) scale(1.1)`} opacity={0.85}><Kid seed={8 + i} mouth={mouthAt(g + i * 3, "narrator")} /></g>)}
      <g transform="translate(960, 520) scale(1.25)">
        <clipPath id="s57c-peel"><path d={`M-600,-600 L600,-600 L600,${fx + fy - d - 600} L${fx + fy - d - 600},600 L-600,600 Z`} /></clipPath>
        <g clipPath="url(#s57c-peel)"><Switch pose={lift > 0.3 ? "startled" : "neutral"} mouth={mouthAt(g, "narrator")} armR={lift > 0.5 ? 60 : 25} look={lift > 0.3 ? [0.6, 0.7] : [0, 0]} blink={blink(g, 11)} /></g>
        <path d={`M${fx},${fy - d} L${fx - d},${fy} L${fx - d},${fy - d} Z`} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} strokeLinejoin="round" />
      </g>
      <Lyric id="L64" f={f} g={g} y={1030} size={58} />
    </Bg>
  );
};

// S58: last "Default on!": pull back; the classroom is on the TV in the living room from S29-S30 (same room, by day),
// and the new tile from S30 winks from the screen's corner
export const S58: ShotC = ({ f, g, len }) => {
  const back = ez(f, 0, len * 0.6);
  const TVX = 760, TVY = 520, SW = 760, SH = 760 * 0.58; // the TV's screen in the living room (Lesson.tsx S30)
  // the classroom layer maps from the full frame to the screen's rectangle as the camera pulls back
  const sx = 1 - back * (1 - SW / W), sy = 1 - back * (1 - SH / H);
  const cx = W / 2 + (TVX - W / 2) * back, cy = H / 2 + (TVY - H / 2) * back;
  return (
    <>
      <Living id="s58" night={false} g={g}>
        <g transform={`translate(${TVX}, ${TVY})`}><TV w={SW}><rect width={W} height={W * 0.58} fill={C.ink} /></TV></g>
      </Living>
      <div style={{ position: "absolute", left: cx - (W * sx) / 2, top: cy - (H * sy) / 2, width: W, height: H,
        transform: `scale(${sx}, ${sy})`, transformOrigin: "0 0", overflow: "hidden" }}>
        <Classroom f={f + 200} g={g} />
      </div>
      {back > 0.7 && (
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <g transform={`translate(${TVX + SW / 2 - 70}, ${TVY + SH / 2 - 60})`}><Tile color={C.mustard} glyph="spark" size={90} wink={f > len * 0.8 ? 1 : 0} /></g>
        </svg>
      )}
    </>
  );
};

// S59: V18 "I've got two sides.": Switch alone on a black wall under a spotlight
const Alone: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Bg id="s61" seed={61} base={C.dark}>
    <Wallpaper id="s61a" kind="daisy" a="#3a3236" b="#2a2427" opacity={0.5} />
    <rect x={-20} y={880} width={W + 40} height={200} fill="#151214" stroke={C.ink} strokeWidth={lw(6)} />
    <rect x={-10} y={860} width={W + 20} height={22} fill="#2e282b" stroke={C.ink} strokeWidth={lw(4)} />
    <Spotlight />
    <ellipse cx={W / 2} cy={880} rx={260} ry={30} fill={C.cream} opacity={0.08} />
    {children}
  </Bg>
);
export const S59: ShotC = ({ g }) => (
  <Alone><g transform={`translate(${W / 2}, 540)`}><Switch pose="sad" toggle={1} mouth={mouthAt(g, "switch")} blink={blink(g, 10)} /></g></Alone>
);

// S60: [click] ×3: he flips himself off three times and springs back on each time; on the third the hand enters
export const S60: ShotC = ({ f, g }) => {
  const clicks = events.clicks_outro.map((t) => at(t) - (g - f));
  const k = clicks.filter((c) => f >= c).length; // clicks so far
  const pressed = k > 0 && f - clicks[k - 1] < 4; // the OFF moment before he springs back
  return (
    <Alone>
      <g transform={`translate(${W / 2}, 540)`}><Switch pose={pressed ? "relaxed" : "sad"} toggle={pressed ? 0 : 1} armL={pressed ? 70 : 20} armR={pressed ? 70 : 20} /></g>
      {k >= 3 && <g transform="translate(-40, 520) rotate(4)"><Hand reach={ez(f, clicks[2], clicks[2] + 8) * 0.86} length={720} /></g>}
    </Alone>
  );
};

export const S61: ShotC = ({ f }) => <S61Key f={f} />;

// S62: "And that's how an opt-out works! Join us next week…": the Narrator wraps up at his desk; an end slate starts
// to slide in
export const S62: ShotC = ({ f, g, len }) => (
  <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="open" size={80}>
    <g transform={`translate(${W + 400 - ez(f, len * 0.5, len) * 760}, 380)`}><Slate text="NEXT WEEK:" w={640} color={C.teal} /></g>
  </NarratorSet>
);

// S63: [pop-up chime] / "Who asked for that?": a "Summary of this song" box pops up over everything; its close button
// runs from the cursor. S64: V19 "Hey, who wrote this song, anyway?": Switch shoves the summary box out of frame
const Summary: React.FC<{ x: number; f: number; pop: number }> = ({ x, f, pop }) => {
  const bx = 340 + Math.sin(f / 5) * 40, by = -230 + Math.cos(f / 4) * 20; // the fleeing close button
  return (
    <g transform={`translate(${x}, 520) scale(${pop})`}>
      <rect x={-460} y={-280} width={920} height={560} rx={24} fill={C.white} stroke={C.ink} strokeWidth={lw(8)} />
      <rect x={-460} y={-280} width={920} height={90} rx={24} fill={C.mustard} stroke={C.ink} strokeWidth={lw(8)} />
      <path d="M-420,-258 l8,18 l18,8 l-18,8 l-8,18 l-8,-18 l-18,-8 l18,-8 Z" fill={C.orange} stroke={C.ink} strokeWidth={lw(3)} />
      <text x={-380} y={-218} fontFamily={SANS} fontWeight={600} fontSize={40} fill={C.ink}>Summary of this song</text>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-400} y={-140 + i * 70} width={800 - i * 90} height={26} rx={8} fill={C.creamShade} />)}
      <g transform={`translate(${bx}, ${by})`}><circle r={26} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} /><path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke={C.ink} strokeWidth={lw(5)} /></g>
      <g transform={`translate(${bx - 70 + Math.sin(f / 5 - 0.6) * 40}, ${by + 60})`}><path d="M0,0 L0,44 L12,32 L22,54 L30,50 L20,28 L36,28 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(4)} /></g>
    </g>
  );
};
export const S63: ShotC = ({ f, g }) => (
  <>
    <S62 f={f + 60} g={g} len={60} />
    <svg width={W} height={H} style={{ position: "absolute" }}><Summary x={W / 2} f={f} pop={ez(f, 0, 6) + bump(f, 6, 4) * 0.08} /></svg>
  </>
);
export const S64: ShotC = ({ f, g, len }) => {
  const shove = ez(f, len * 0.55, len * 0.85);
  return (
    <NarratorSet g={g} board={["OPT-IN", "OPT-OUT", "DEFAULT"]} arm="down" head={-1} size={80}>
      <Summary x={W / 2 - shove * 1600} f={f} pop={1} />
      <g transform={`translate(${W / 2 + 560 - shove * 1600}, 560) scale(0.6)`}><Switch pose="proud" mouth={mouthAt(g, "switch")} armL={95} armR={95} look={[-1, 0]} /></g>
    </NarratorSet>
  );
};

// FG: fact card G, after S67's hold (M5 builds the cards; this marks its place and length)
export const FG: ShotC = () => (
  <Bg id="fg" seed={70}>
    <text x={W / 2} y={470} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={60} fill={C.ink}>Fact card G</text>
    <text x={W / 2} y={560} textAnchor="middle" fontFamily={SANS} fontSize={40} fill={C.inkSoft}>Who wrote this, and Anthropic's own default-on toggle (built in M5)</text>
  </Bg>
);

// S68: the creator's disclosure, real footage the human shoots, with its caption (brief rev 61)
export const S68: ShotC = () => (
  <Stand label="S68 · REAL FOOTAGE · TOP-DOWN, ~5 s" note="Google and Microsoft swag laid out neatly on a plain surface, Noogler hat on top. Caption: “Made by a former Google and Microsoft employee, who holds no stock in either. Nothing here comes from the inside: every claim is from public reporting, sourced on the cards that follow.”" />
);

// S65-S67: real material. Until it lands, stand-ins say what goes there; the film layer is off from S65 (Cut.tsx)
export const S65: ShotC = () => <Stand label="S65 · REAL SCREEN CAPTURE" note="The generation screen: style prompt, lyrics, take list (the human supplies it)" />;
export const S66: ShotC = () => (
  <div style={{ position: "absolute", inset: 0, display: "flex" }}>
    <div style={{ flex: 1, position: "relative" }}><Stand label="S66 · LEFT" note="The generation screen" /></div>
    <div style={{ flex: 1, position: "relative", borderLeft: `6px solid ${C.cream}` }}><Stand label="S66 · RIGHT" note="The editing timeline: the Switch track, 'Switch: recorded at home', its waveform playing" /></div>
  </div>
);
export const S67: ShotC = ({ g }) => {
  const v21 = slot("V21");
  const p = (v21 as { proposed: number[] }).proposed;
  const flip = g >= at(events.last_note);
  const label = g < at(p[0]) ? "a light switch on a plain wall" : !flip ? "a small hand reaches in and waits (V21)" : "the hand flips it OFF on the band's last note; it stays off";
  return <Stand label={`S67 · REAL FOOTAGE · ${flip ? "OFF" : "ON"}`} note={label} />;
};
