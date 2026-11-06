// S09-S18 (pre-chorus 1 and chorus 1) and S35-S39 (pre-chorus 2 and chorus 2), which restage them.
import React from "react";
import { Wash } from "../film/Paper";
import { BallLyric } from "../components/kit";
import { AnswerBox, MiniRocker, Spotlight } from "../components/props";
import { Hand, PencilHand, TIP_Y } from "../rigs/Hand";
import { PADDLE, PLATE, Switch } from "../rigs/Switch";
import { C, H, W, lw } from "../theme/palette";
import { BUBBLE, SANS } from "../theme/fonts";
import { Bookshelf, Clock, Floorboards, Grain, Lamp, Plant, Rug, Sunburst, Wallpaper, Window, breath } from "../components/sets";
import { at, downbeats, line, mouthAt } from "../timing";
import { Bg, ShotC, blink, bump, ez } from "./common";

// the flip: the hand comes in from frame left along one line and its fingertip presses Switch's bottom half (the half
// that goes in when he turns ON); Switch stands at (W/2, 540) in every flip shot (S10-S12, S35-S36, S60-S61)
export const FLIP_Y = 540 + PADDLE.bottom.y - TIP_Y;
export const FLIP_LEN = W / 2 + 40;

// one lyric line as bouncing-ball words, timed from the aligned words (local frames of the shot starting at g0)
export const Lyric: React.FC<{ id: string; f: number; g: number; y?: number; size?: number }> = ({ id, f, g, y, size }) => {
  const g0 = g - f;
  const syl = line(id).words.map((w) => ({ t: w.w + " ", at: at(w.start) - g0 }));
  return <BallLyric f={f} syl={syl} y={y} size={size} />;
};

// the pre-chorus set: the living room at night, night blue: a curtained window with the moon and twinkling stars,
// a dark bookshelf, a lamp switched off, a clock reading late, the floor; one spotlight on Switch, with a moth
// circling it; `dim` for the second time round (S35-S36)
const Night: React.FC<{ id: string; dim?: number; g?: number; children: React.ReactNode }> = ({ id, dim = 0, g = 0, children }) => (
  <Bg id={id} seed={9} base={C.night}>
    <Wallpaper id={`${id}n`} kind="stripe" a={C.night} b="#2c3d63" opacity={0.4} />
    <g transform="translate(330, 330)" opacity={0.85}>
      <Window w={300} h={360} sky="#16203a" sun="moon" curtain="#4a3a5a" />
      {[[-90, -120], [60, -60], [-40, 40], [100, 110], [-110, 120]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3 + (Math.sin(g / 7 + i * 2) + 1) * 2} fill={C.cream} opacity={0.8} />
      ))}
    </g>
    <g transform="translate(1790, 1000)" opacity={0.5}><Bookshelf w={240} shelves={4} seed={9} /></g>
    <g transform="translate(1560, 620)" opacity={0.5}><Lamp on={false} /></g>
    <g transform="translate(700, 180)" opacity={0.7}><Clock t={(23 * 60 + 47) * 60 + g / 30} r={54} /></g>
    <rect x={-20} y={854} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
    <rect x={-20} y={900} width={W + 40} height={200} fill="#1b2440" stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={900} h={200} boards={3} />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 280} y1={900} x2={i * 300 - 120} y2={H} stroke={C.ink} strokeWidth={lw(3)} opacity={0.5} />)}
    {/* the dark: everything outside the spotlight falls away, so he is alone on the wall */}
    <defs>
      <radialGradient id={`${id}-dark`} cx="0.5" cy="0.5" r="0.62">
        <stop offset="0.22" stopColor="#0d1222" stopOpacity={0} />
        <stop offset="0.75" stopColor="#0d1222" stopOpacity={0.7 + dim * 0.1} />
        <stop offset="1" stopColor="#0d1222" stopOpacity={0.88} />
      </radialGradient>
    </defs>
    <rect x={-20} y={-20} width={W + 40} height={H + 40} fill={`url(#${id}-dark)`} />
    <Spotlight dim={dim} />
    <g transform={`translate(${W / 2 + Math.cos(g / 9) * 260}, ${150 + Math.sin(g / 5) * 60})`} opacity={0.8}>
      <path d={`M0,0 q-14,${-10 - Math.abs(Math.sin(g)) * 10} -22,0 q8,8 22,0 q14,${-10 - Math.abs(Math.sin(g)) * 10} 22,0 q-8,8 -22,0 Z`} fill={C.cream} stroke={C.ink} strokeWidth={lw(2)} />
    </g>
    {children}
  </Bg>
);

// S09 / S35: V03 / V10 "I've only got two sides…": Switch alone, singing slowly; in S35 the hand already waits
const Lament: React.FC<{ g: number; f: number; dim?: number; hand?: boolean }> = ({ g, f, dim = 0, hand }) => (
  <Night id="pc" dim={dim} g={g}>
    <g transform={`translate(${W / 2}, 540) rotate(${Math.sin(f / 22) * 2}) scale(1, ${breath(g, 4)})`}>
      <Switch pose="sad" toggle={1} mouth={mouthAt(g, "switch")} look={[0, -0.3]} blink={blink(g, 3)} />
    </g>
    {hand && <g transform={`translate(-40, ${FLIP_Y})`}><Hand reach={0.16} length={FLIP_LEN} curl={0.3} /></g>}
  </Night>
);
export const S09: ShotC = ({ f, g }) => <Lament f={f} g={g} />;
export const S35: ShotC = ({ f, g }) => <Lament f={f} g={g} dim={1} hand />;

// S10: "You push me down for off…": he pulls himself down to OFF, exhales, closes his eyes
// In its last half second the grey sleeve starts reaching in, so S11's flip (8 frames) lands on the click
export const S10: ShotC = ({ f, g, len }) => {
  const off = ez(f, 4, 16);
  const reach = ez(f, len - 15, len) * 0.82;
  const sigh = ez(f, 16, 40);
  return (
    <Night id="pc" g={g}>
      {sigh > 0 && sigh < 1 && <g transform={`translate(${W / 2 + 40 + sigh * 120}, ${700 - sigh * 60})`} opacity={1 - sigh}>
        {[0, 1, 2].map((k) => <circle key={k} cx={k * 34} cy={-k * 10} r={18 + k * 6} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />)}
      </g>}
      <g transform={`translate(${W / 2}, ${540 + off * 8})`}>
        <Switch pose={off > 0.5 ? "relaxed" : "sad"} toggle={1 - off} mouth={mouthAt(g, "switch")} armL={60 - off * 50} armR={60 - off * 50} blink={off > 0.9 ? 1 : 0} />
      </g>
      {reach > 0 && <g transform={`translate(-40, ${FLIP_Y})`}><Hand reach={reach} length={FLIP_LEN} /></g>}
    </Night>
  );
};

// S11 / S36: [click]: the grey sleeve flips him back up on the click. In S11 (8 frames) the hand is already reaching
// (S10) and the flip lands on frame 0; S12 carries the withdrawal. S36, the faster second time, enters and flips here
const Flip: React.FC<{ f: number; g: number; len: number; fast?: boolean }> = ({ f, g, len, fast }) => {
  const reach = fast ? ez(f, 0, 3) * (1 - ez(f, len - 3, len)) : 0.82 + 0.18 * ez(f, 0, 2);
  const flipped = fast ? f >= 2 : true;
  return (
    <Night id="pc" dim={fast ? 1 : 0} g={g}>
      <g transform={`translate(${W / 2}, 540)`}><Switch pose={flipped ? "startled" : "relaxed"} toggle={flipped ? 1 : 0} blink={flipped ? 0 : 1} /></g>
      {flipped && <text x={W / 2 + 200} y={330} fontFamily={BUBBLE} fontSize={90} fill={C.mustard} stroke={C.ink} strokeWidth={lw(5)} paintOrder="stroke" transform={`rotate(-10, ${W / 2 + 200}, 330)`}>click!</text>}
      <g transform={`translate(-40, ${FLIP_Y})`}><Hand reach={reach} length={FLIP_LEN} press={flipped ? 1 - ez(f, 2, 6) : 0} /></g>
    </Night>
  );
};
export const S11: ShotC = ({ f, g, len }) => <Flip f={f} g={g} len={len} />;
export const S36: ShotC = ({ f, g, len }) => <Flip f={f} g={g} len={len} fast />;

// S12: "…so how'd I just return?": the hand slips away (S11's withdrawal); he looks left and right; nobody's there
export const S12: ShotC = ({ f, g }) => {
  const reach = 1 - ez(f, 0, 8);
  return (
    <Night id="pc" g={g}>
      {f > 12 && [0, 1].map((k) => (
        <text key={k} x={W / 2 - 60 + k * 120} y={300 - k * 30 - Math.min(20, f - 12) * 2} fontFamily={BUBBLE} fontSize={90 - k * 20} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} paintOrder="stroke" opacity={Math.min(1, (f - 12 - k * 6) / 6)}>?</text>
      ))}
      <g transform={`translate(${W / 2}, 540)`}>
        <Switch pose={f < 8 ? "startled" : "curious"} toggle={1} mouth={mouthAt(g, "switch")} look={f < 10 ? [-1, 0] : [Math.sin(f / 9) > 0 ? -1 : 1, 0]} />
      </g>
      {reach > 0 && <g transform={`translate(-40, ${FLIP_Y})`}><Hand reach={reach} length={FLIP_LEN} /></g>}
    </Night>
  );
};

// S13: "Default on! Default on!": bright mustard over a slowly turning sunburst; bubble-letter lyrics with a bouncing
// ball; five rockers bounce and flick ON on the downbeats; music notes drift up
export const S13: ShotC = ({ f, g }) => {
  const g0 = g - f;
  const dbs = downbeats.filter((d) => d >= g0).slice(0, 5).map((d) => d - g0);
  return (
    <Bg id="s13" seed={13} base={C.mustard}>
      <g opacity={0.45}><Sunburst a={C.mustard} b={C.orange} spin={g * 0.12} cy={420} /></g>
      {[0, 1, 2, 3, 4].map((i) => {
        const at0 = dbs[i] ?? 6 + i * 12;
        return <g key={i} transform={`translate(${360 + i * 300}, ${440 - bump(f, at0, 5) * 50})`}><MiniRocker on={f > at0 ? 1 : 0} s={1.4} /></g>;
      })}
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const t = ((f + k * 23) % 90) / 90;
        return <text key={k} x={200 + k * 300 + Math.sin((f + k * 20) / 10) * 30} y={720 - t * 520} fontFamily={SANS} fontSize={70} fill={C.ink} opacity={Math.sin(t * Math.PI) * 0.7}>{k % 2 ? "♪" : "♫"}</text>;
      })}
      <Lyric id="L10" f={f} g={g} y={860} size={120} />
    </Bg>
  );
};

// the bedroom (S14, S15, S37): daisy wallpaper, a window (sunrise or moon), a headboard bed with a patchwork quilt
// and a pillow, a bedside table with an alarm clock, a dresser with three drawers, slippers and a rug; `night` dims it
const Bedroom_: React.FC<{ id: string; night: boolean; g: number; drawer?: number; children?: React.ReactNode }> = ({ id, night, g, drawer = 0, children }) => (
  <Bg id={id} seed={14} base={night ? C.night : C.cream}>
    <Wallpaper id={id} kind="daisy" a={night ? "#3a4a70" : C.mustard} b={night ? "#2c3d63" : C.orange} opacity={night ? 0.35 : 0.3} />
    <g transform="translate(1620, 280)"><Window w={300} h={320} sky={night ? "#16203a" : "#f2c98a"} sun={night ? "moon" : "sun"} curtain={night ? "#4a3a5a" : C.teal} /></g>
    <rect x={-20} y={814} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
    <rect x={-20} y={860} width={W + 40} height={240} fill={night ? "#1b2440" : "#b98a5a"} stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={860} h={240} boards={3} />
    <g transform="translate(1450, 990)"><Rug w={520} color={night ? "#4a3a5a" : C.avocado} /></g>
    {/* the dresser, right: three drawers; the top one can slide open */}
    <g transform="translate(1620, 700)">
      <rect x={-200} y={-140} width={400} height={300} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(7)} />
      {[0, 1, 2].map((k) => (
        <g key={k} transform={`translate(${k === 0 ? drawer * 60 : 0}, ${-120 + k * 92})`}>
          {k === 0 && drawer > 0 && <rect x={-180 - drawer * 60} y={0} width={360 + drawer * 60} height={80} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />}
          <rect x={-180} y={0} width={360} height={80} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(5)} />
          <circle cx={0} cy={40} r={10} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
        </g>
      ))}
      <g transform="translate(-110, -190) scale(0.55)"><Plant sway={Math.sin(g / 50)} /></g>
    </g>
    {/* the bed, left */}
    <g transform="translate(640, 720)">
      <rect x={-560} y={-300} width={70} height={460} rx={14} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(7)} />
      <rect x={-500} y={-40} width={1000} height={170} rx={20} fill={night ? "#3a5a58" : C.teal} stroke={C.ink} strokeWidth={lw(7)} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-300 + (i % 5) * 160} y={-30 + Math.floor(i / 5) * 76} width={150} height={70} fill={[C.orange, C.mustard, C.avocado, C.cream, C.red][(i * 3) % 5]} opacity={night ? 0.35 : 0.55} />)}
      <ellipse cx={-330} cy={-50} rx={160} ry={60} fill={C.white} stroke={C.ink} strokeWidth={lw(7)} />
      <rect x={480} y={-100} width={40} height={260} rx={10} fill={C.cardigan} stroke={C.ink} strokeWidth={lw(6)} />
      <g transform="translate(-700, 120)">{[0, 1].map((k) => <ellipse key={k} cx={k * 70} cy={0} rx={34} ry={16} fill={C.red} stroke={C.ink} strokeWidth={lw(4)} />)}</g>
    </g>
    {/* bedside table and alarm clock (it rings at sunrise) */}
    <g transform="translate(1260, 760)">
      <rect x={-60} y={-60} width={140} height={200} fill={C.cardiganShade} stroke={C.ink} strokeWidth={lw(6)} />
      <g transform={`translate(10, -110) rotate(${night ? 0 : Math.sin(g * 1.7) * 6})`}><Clock t={night ? 2 * 3600 + 40 * 60 : 6 * 3600 + 30 * 60} r={44} />
        {!night && [-1, 1].map((k) => <circle key={k} cx={k * 32} cy={-46} r={14} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />)}</g>
    </g>
    {night && <rect x={-20} y={-20} width={W + 40} height={H + 40} fill="#0d1222" opacity={0.25} />}
    {children}
  </Bg>
);

// S14: "It was there when you woke up…": sunrise over the bed, the answer box on the pillow; then the same room at
// night, the answer box still there, waving
// at night, the answer box still there, waving
export const Bedroom: React.FC<{ f: number; g: number; len: number; lineId: string }> = ({ f, g, len, lineId }) => {
  const night = f > len / 2;
  return (
    <Bedroom_ id={night ? "bedn" : "bed"} night={night} g={g}>
      <g transform="translate(310, 600) scale(0.5)"><AnswerBox mouth={night ? mouthAt(g, "narrator") : "X"} wave={night ? Math.sin(f / 4) : 0} /></g>
      {!night && <text x={1170} y={580} fontFamily={BUBBLE} fontSize={50} fill={C.ink} transform="rotate(-8, 1170, 580)">BRRING!</text>}
      <Lyric id={lineId} f={f} g={g} y={1030} size={64} />
    </Bedroom_>
  );
};
export const S14: ShotC = ({ f, g, len }) => <Bedroom f={f} g={g} len={len} lineId="L11" />;

// S15 / S37: "You can hide it, you can mute it…": three beats; each gag hides the answer box and it comes back
export const Gags: React.FC<{ f: number; g: number; len: number; lineId: string; set: 1 | 2 }> = ({ f, g, len, lineId, set }) => {
  const beat = Math.min(2, Math.floor((f / len) * 3));
  const t = f - (beat * len) / 3;
  const back = ez(t, len / 3 - 14, len / 3 - 4);
  const toss = ez(t, 0, 8);
  // set 1: a blanket thrown over it on the pillow; a mute bar over its mouth; shut in the top drawer, which slides
  // back open. Set 2 (S37): a sleeping bag zipped over it; the mute bar slides off by itself; a lunchbox that pops open
  return (
    <Bedroom_ id={`gag${set}`} night={set === 2} g={g} drawer={set === 1 && beat === 2 ? back : 0}>
      {beat === 0 && (set === 1 ? (
        <g transform="translate(310, 600)">
          <g transform="scale(0.5)"><AnswerBox mouth={back > 0.5 ? "D" : "X"} /></g>
          <path d={`M-200,${-170 + toss * 120 - back * 160} Q0,${-230 + toss * 120 - back * 160} 200,${-170 + toss * 120 - back * 160} L210,${60 - back * 200} Q0,${90 - back * 200} -210,${60 - back * 200} Z`}
            fill={C.orange} stroke={C.ink} strokeWidth={lw(6)} opacity={1 - back * 0.9} />
        </g>
      ) : (
        <g transform="translate(900, 900)">
          <path d="M-320,0 Q-330,-130 -200,-140 L260,-140 Q330,-120 320,0 Z" fill={C.avocado} stroke={C.ink} strokeWidth={lw(7)} />
          <line x1={-200} y1={-140} x2={-200 + (1 - back) * 460} y2={-140} stroke={C.mustard} strokeWidth={8} />
          <g transform={`translate(-230, ${-150 - back * 70}) scale(0.4)`}><AnswerBox mouth={back > 0.5 ? "C" : "X"} /></g>
        </g>
      ))}
      {beat === 1 && (
        <g transform="translate(310, 600)">
          <g transform="scale(0.5)"><AnswerBox mouth="X" /></g>
          <g transform={`translate(${set === 2 ? ez(t, 8, 22) * 420 : 0}, ${set === 2 ? ez(t, 8, 22) * 260 : 0}) rotate(${set === 2 ? ez(t, 8, 22) * 40 : 0})`}>
            <rect x={60} y={-56} width={190} height={46} rx={12} fill={C.ink} />
            <text x={155} y={-24} textAnchor="middle" fontFamily={BUBBLE} fontSize={30} fill={C.cream}>MUTED</text>
          </g>
        </g>
      )}
      {beat === 2 && (set === 1 ? (
        <g transform={`translate(${1620 + back * 60}, ${560 - back * 110}) scale(0.4)`} opacity={toss > 0.5 && back < 0.1 ? 0 : 1}>
          <AnswerBox mouth={back > 0.5 ? "D" : "X"} wave={back > 0.5 ? Math.sin(f / 3) : 0} />
        </g>
      ) : (
        <g transform="translate(1260, 640)">
          <rect x={-80} y={-60} width={180} height={110} rx={14} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
          <path d="M-30,-60 q40,-50 80,0" fill="none" stroke={C.ink} strokeWidth={lw(8)} />
          <g transform={`rotate(${-back * 60}, -80, -60)`}><rect x={-80} y={-74} width={180} height={18} rx={6} fill={C.orange} stroke={C.ink} strokeWidth={lw(5)} /></g>
          {back > 0.4 && <g transform={`translate(10, ${-80 - back * 40}) scale(0.3)`}><AnswerBox mouth="C" /></g>}
        </g>
      ))}
      <Lyric id={lineId} f={f} g={g} y={1030} size={64} />
    </Bedroom_>
  );
};
export const S15: ShotC = ({ f, g, len }) => <Gags f={f} g={g} len={len} lineId="L12" set={1} />;

// the redraw in pencil: stage by stage from a bare outline to the whole drawing, then inked into the full Switch
// (the human's note, 2026-11-06: "have the drawn version eventually get to more detail"). `t` 0..1; returns the
// drawing and where the pencil's tip is now
const STAGES = [0.18, 0.32, 0.46, 0.6, 0.72, 0.84]; // outline · bevel+screws · eyes · paddle · mouth+arms · hatching
const sketchTip = (t: number): [number, number] => {
  if (t < STAGES[0]) { const u = t / STAGES[0]; return u < 0.5 ? [-125 + u * 500, -195] : [125, -195 + (u - 0.5) * 780]; }
  if (t < STAGES[1]) return [0, -170];
  if (t < STAGES[2]) return [-58 + ((t - STAGES[1]) / (STAGES[2] - STAGES[1])) * 116, -108];
  if (t < STAGES[3]) return [-58, 14];
  if (t < STAGES[4]) return [0, 132];
  return [140, 60];
};
const PencilSwitch: React.FC<{ t: number }> = ({ t }) => {
  const k = (i: number) => ez(t * 1000, (i ? STAGES[i - 1] : 0) * 1000, STAGES[i] * 1000);
  const line = { fill: "none", stroke: C.inkSoft, strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  const draw = (p: number) => ({ strokeDasharray: `${p} 1` });
  const ink = ez(t * 1000, STAGES[5] * 1000, 1000);
  return (
    <g>
      <g opacity={1 - ink * 0.85} filter="url(#s16p-ink)">
        <rect x={-PLATE.w / 2} y={-PLATE.h / 2} width={PLATE.w} height={PLATE.h} rx={34} {...line} {...draw(k(0))} />
        <rect x={-PLATE.w / 2 + 16} y={-PLATE.h / 2 + 16} width={PLATE.w - 32} height={PLATE.h - 32} rx={22} {...line} strokeWidth={2.5} {...draw(k(1))} />
        {[-1, 1].map((sd) => <circle key={sd} cy={sd * (PLATE.h / 2 - 24)} r={8} {...line} {...draw(k(1))} />)}
        {[-58, 58].map((x) => <g key={x}><circle cx={x} cy={-108} r={46} {...line} {...draw(k(2))} /><circle cx={x} cy={-104} r={18} {...line} {...draw(k(2))} /></g>)}
        <rect x={-58} y={-56} width={116} height={140} rx={16} {...line} {...draw(k(3))} />
        <line x1={-48} x2={48} y1={14} y2={14} {...line} {...draw(k(3))} />
        <circle cy={-30} r={8} {...line} {...draw(k(3))} />
        <path d="M-30,132 Q0,152 30,132" {...line} {...draw(k(4))} />
        {[-1, 1].map((sd) => <path key={sd} d={`M${sd * 119},20 q${sd * 40},30 ${sd * 30},80`} {...line} {...draw(k(4))} />)}
        <rect x={PLATE.w / 2 - 10} y={-PLATE.h / 2 + 30} width={22} height={PLATE.h - 20} fill="url(#pen-hatch)" opacity={k(5)} />
        <rect x={-58} y={14} width={116} height={56} fill="url(#pen-hatch)" opacity={k(5) * 0.7} />
      </g>
      {/* inked: the whole Switch, fully detailed, fades up over the pencil */}
      <g opacity={ink}><Switch pose="neutral" toggle={1} mouth="X" /></g>
    </g>
  );
};

// S16: "But the switch is just a picture…": Switch peels off the wall and turns out to be a sticker (flat: a sticker
// has no thickness); beside him a pencil draws him back on, stage by stage, until the drawing is the whole Switch
export const S16: ShotC = ({ f, g, len }) => {
  const peel = ez(f, 0, Math.min(30, len * 0.3));
  const d = 70 + peel * 190;
  const t = ez(f, 4, len - 6);
  const [tx, ty] = sketchTip(t);
  const DX = W / 2 + 250, DY = 470; // the drawing's centre
  const fx = PLATE.w / 2, fy = PLATE.h / 2, c = fx + fy - d, R = 600;
  return (
    <Bg id="s16" seed={16} base={C.mustard}>
      <defs>
        <filter id="s16p-ink" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={2} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={3} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <Wallpaper id="s16" kind="daisy" a={C.cream} b={C.orange} opacity={0.3} />
      <rect x={-10} y={860} width={W + 20} height={26} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
      <g transform={`translate(${DX}, ${DY})`}><PencilSwitch t={t} /></g>
      {t < 0.9 && (
        <g transform={`translate(${DX + tx}, ${DY + ty}) rotate(-35)`}>
          <path d="M0,0 L22,-7 L22,7 Z" fill={C.ink} />
          <path d="M22,-7 L54,-14 L54,14 L22,7 Z" fill="#e8c9a0" stroke={C.ink} strokeWidth={lw(3)} />
          <rect x={54} y={-14} width={300} height={28} fill={C.mustard} stroke={C.ink} strokeWidth={lw(4)} />
          <rect x={354} y={-14} width={26} height={28} fill={C.sleeve} stroke={C.ink} strokeWidth={lw(3)} />
          <rect x={380} y={-14} width={36} height={28} rx={8} fill="#e8a0a0" stroke={C.ink} strokeWidth={lw(4)} />
        </g>
      )}
      {/* Switch the sticker, left: the corner beyond the fold is gone and its white backing lies folded over the front */}
      <g transform={`translate(${W / 2 - 330}, 470) rotate(-4)`}>
        <clipPath id="s16-peel2"><path d={`M${-R},${-R} L${R},${-R} L${R},${c - R} L${c - R},${R} L${-R},${R} Z`} /></clipPath>
        <g clipPath="url(#s16-peel2)"><Switch pose="startled" mouth="E" look={[0.6, 0.6]} flat /></g>
        <path d={`M${fx},${fy - d} L${fx - d},${fy} Q${fx - d * 0.92},${fy - d * 0.9} ${fx - d},${fy - d} Q${fx - d * 0.9},${fy - d * 0.92} ${fx},${fy - d} Z`}
          fill={C.white} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
        <path d={`M${fx - d * 0.3},${fy - d * 0.8} L${fx - d * 0.8},${fy - d * 0.3}`} stroke={C.creamShade} strokeWidth={6} strokeLinecap="round" />
      </g>
      <Lyric id="L13" f={f} g={g} y={1000} size={74} />
    </Bg>
  );
};

// S17 / S39: "Default on!" / V04 / V11 "(On, on, on…)": Switch, redrawn slightly crooked, echoes quietly
const Echo: React.FC<{ f: number; g: number; tired?: boolean }> = ({ f, g, tired }) => (
  <Bg id="echo" seed={17} base={C.mustard}>
    <Wallpaper id="echo" kind="daisy" a={C.cream} b={C.orange} opacity={0.3} />
    {/* the redrawing shows: faint pencil construction lines, a centre cross, eraser crumbs on the skirting */}
    <g stroke={C.inkSoft} strokeWidth={2} fill="none" opacity={0.45}>
      <rect x={W / 2 - 150} y={300} width={300} height={440} rx={30} transform={`rotate(${tired ? -5 : -3}, ${W / 2}, 520)`} />
      <line x1={W / 2} y1={240} x2={W / 2} y2={800} /><line x1={W / 2 - 220} y1={520} x2={W / 2 + 220} y2={520} />
      <circle cx={W / 2 - 58} cy={412} r={56} /><circle cx={W / 2 + 58} cy={412} r={56} />
    </g>
    {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={W / 2 + 160 + k * 26} cy={900 + (k % 2) * 8} rx={10} ry={6} fill="#e8b0a0" stroke={C.ink} strokeWidth={lw(2)} />)}
    <rect x={-10} y={860} width={W + 20} height={26} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
    <g transform={`translate(${W / 2}, 520) scale(${1 - f * 0.0008}, ${(1 - f * 0.0008) * breath(g, 5)})`}>
      <Switch pose={tired ? "sad" : "neutral"} tilt={tired ? -9 : -6} mouth={mouthAt(g, "switch")} blink={tired ? 0.4 : blink(g)} />
    </g>
    {[0, 1, 2].map((k) => <text key={k} x={W / 2 + 220 + k * 70} y={400 - k * 50 - (f % 40)} fontFamily={BUBBLE} fontSize={56 - k * 10} fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} paintOrder="stroke" opacity={0.85 - k * 0.2}>on</text>)}
  </Bg>
);
export const S17: ShotC = ({ f, g }) => <Echo f={f} g={g} />;
export const S39: ShotC = ({ f, g }) => <Echo f={f} g={g} tired />;

// S18: the flute and scat fill: the grey hand doodles little ON switches in a margin, in time with the fill
export const S18: ShotC = ({ f, g }) => {
  const n = Math.min(Math.floor(f / 14), 10);
  const k = Math.max(0, n - 1);
  const px = 160 + (k % 2) * 140, py = 190 + Math.floor(k / 2) * 170;
  const scrib = Math.sin(f * 1.3) * 10;
  return (
    <Bg id="s18" seed={18}>
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={0} y1={110 + i * 76} x2={W} y2={110 + i * 76} stroke={C.teal} strokeWidth={2} opacity={0.35} />)}
      <line x1={420} y1={0} x2={420} y2={H} stroke={C.red} strokeWidth={4} opacity={0.6} />
      {[200, 540, 880].map((y) => <circle key={y} cx={60} cy={y} r={22} fill={C.paper} stroke={C.inkSoft} strokeWidth={3} />)}
      <circle cx={1500} cy={760} r={130} fill="none" stroke={C.cardigan} strokeWidth={14} opacity={0.25} />
      <text x={520} y={260} fontFamily={SANS} fontSize={44} fill={C.inkSoft} opacity={0.7}>opt-in · opt-out · default</text>
      <path d="M520,320 q80,-30 160,0 t160,0" fill="none" stroke={C.inkSoft} strokeWidth={4} opacity={0.6} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${160 + (i % 2) * 140}, ${190 + Math.floor(i / 2) * 170}) rotate(${((i * 37) % 9) - 4})`}><MiniRocker on={1} s={0.9} /></g>
      ))}
      {[[700, 520], [1100, 420], [900, 700]].map(([x, y], i) => i < n / 3 && <path key={i} d={`M${x},${y} l10,24 l26,4 l-20,16 l6,26 l-22,-14 l-22,14 l6,-26 l-20,-16 l26,-4 Z`} fill="none" stroke={C.inkSoft} strokeWidth={3} opacity={0.7} />)}
      {/* the hand, with a pencil, scribbling the latest switch */}
      {/* the hand holds the pencil like a hand does: tip on the page at the latest doodle, the pencil running down to
          the right between thumb and index, the fist and sleeve off past the frame's bottom edge */}
      <g transform={`translate(${px + 40 + scrib}, ${py + 50})`}><PencilHand angle={52} /></g>
    </Bg>
  );
};

// S37: chorus 2's first three lines, the S13-S15 layouts with new gags (a sleeping bag instead of a blanket, the
// mute bar sliding off, a lunchbox instead of the drawer)
export const S37: ShotC = ({ f, g, len }) => {
  const a = at(line("L35").start) - (g - f), b = at(line("L36").start) - (g - f);
  if (f < a) return <S13 f={f} g={g} len={a} />;
  if (f < b) return <Bedroom f={f - a} g={g} len={b - a} lineId="L35" />;
  return <Gags f={f - b} g={g} len={len - b} lineId="L36" set={2} />;
};

// S38: "But the switch is just a picture…": the sticker reveal again, but this time Switch peels himself off before
// anyone else can, his own hand at the curling corner, and sighs; nobody comes with a pencil
export const S38: ShotC = ({ f, g, len }) => {
  const peel = ez(f, 8, len * 0.6);
  const d = 40 + peel * 210;
  const fx = PLATE.w / 2, fy = PLATE.h / 2, R = 600, c = fx + fy - d;
  const sigh = ez(f, len * 0.62, len * 0.9);
  return (
    <Bg id="s38" seed={38} base={C.mustard}>
      <Wallpaper id="s38" kind="daisy" a={C.cream} b={C.orange} opacity={0.3} />
      <rect x={-10} y={860} width={W + 20} height={26} fill={C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
      {/* the bare wall shows where he was, a pale rectangle with two screw holes */}
      <rect x={W / 2 - fx + 30} y={470 - fy + 20} width={PLATE.w} height={PLATE.h} rx={34} fill={C.cream} opacity={0.35 * peel} />
      <g transform={`translate(${W / 2}, 470) rotate(${-4 - peel * 6})`}>
        <clipPath id="s38-peel"><path d={`M${-R},${-R} L${R},${-R} L${R},${c - R} L${c - R},${R} L${-R},${R} Z`} /></clipPath>
        <g clipPath="url(#s38-peel)"><Switch pose="sad" mouth={mouthAt(g, "narrator")} armL={20} armR={150} look={[0.7, 0.8]} blink={sigh > 0.3 ? 1 : 0} flat /></g>
        <path d={`M${fx},${fy - d} L${fx - d},${fy} Q${fx - d * 0.92},${fy - d * 0.9} ${fx - d},${fy - d} Q${fx - d * 0.9},${fy - d * 0.92} ${fx},${fy - d} Z`}
          fill={C.white} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
        <circle cx={fx - d * 0.98} cy={fy - d * 0.98} r={21} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} />
      </g>
      {sigh > 0 && sigh < 1 && <g transform={`translate(${W / 2 - 160 - sigh * 120}, ${560 - sigh * 80})`} opacity={1 - sigh}>
        {[0, 1, 2].map((k) => <circle key={k} cx={-k * 34} cy={-k * 10} r={18 + k * 6} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />)}
      </g>}
      <Lyric id="L37" f={f} g={g} y={1000} size={74} />
    </Bg>
  );
};

