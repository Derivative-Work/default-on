// S09-S18 (pre-chorus 1 and chorus 1) and S35-S39 (pre-chorus 2 and chorus 2), which restage them.
import React from "react";
import { Wash } from "../film/Paper";
import { BallLyric } from "../components/kit";
import { AnswerBox, MiniRocker, Spotlight } from "../components/props";
import { Hand } from "../rigs/Hand";
import { Switch } from "../rigs/Switch";
import { C, H, W } from "../theme/palette";
import { at, line, mouthAt } from "../timing";
import { S16 as S16Key } from "../scenes/KeyFrames";
import { Bg, ShotC, blink, bump, ez } from "./common";

// one lyric line as bouncing-ball words, timed from the aligned words (local frames of the shot starting at g0)
export const Lyric: React.FC<{ id: string; f: number; g: number; y?: number; size?: number }> = ({ id, f, g, y, size }) => {
  const g0 = g - f;
  const syl = line(id).words.map((w) => ({ t: w.w + " ", at: at(w.start) - g0 }));
  return <BallLyric f={f} syl={syl} y={y} size={size} />;
};

// the pre-chorus set: night blue, one spotlight, Switch alone on the wall; `dim` for the second time round
const Night: React.FC<{ id: string; dim?: number; children: React.ReactNode }> = ({ id, dim = 0, children }) => (
  <Bg id={id} seed={9} base={C.night}><Spotlight dim={dim} />{children}</Bg>
);

// S09 / S35: V03 / V10 "I've only got two sides…": Switch alone, singing slowly; in S35 the hand already waits
const Lament: React.FC<{ g: number; f: number; dim?: number; hand?: boolean }> = ({ g, f, dim = 0, hand }) => (
  <Night id="pc" dim={dim}>
    <g transform={`translate(${W / 2}, 540) rotate(${Math.sin(f / 22) * 2})`}>
      <Switch pose="sad" toggle={1} mouth={mouthAt(g, "switch")} look={[0, -0.3]} blink={blink(g, 3)} />
    </g>
    {hand && <g transform="translate(-40, 470) rotate(2)"><Hand reach={0.12} length={600} curl={0.4} /></g>}
  </Night>
);
export const S09: ShotC = ({ f, g }) => <Lament f={f} g={g} />;
export const S35: ShotC = ({ f, g }) => <Lament f={f} g={g} dim={1} hand />;

// S10: "You push me down for off…": he pulls himself down to OFF, exhales, closes his eyes
export const S10: ShotC = ({ f, g }) => {
  const off = ez(f, 4, 16);
  return (
    <Night id="pc">
      <g transform={`translate(${W / 2}, ${540 + off * 8})`}>
        <Switch pose={off > 0.5 ? "relaxed" : "sad"} toggle={1 - off} mouth={mouthAt(g, "switch")} armL={60 - off * 50} armR={60 - off * 50} blink={off > 0.9 ? 1 : 0} />
      </g>
    </Night>
  );
};

// S11 / S36: [click]: the grey sleeve enters from frame left and flips him back up (S36 faster)
const Flip: React.FC<{ f: number; len: number; fast?: boolean }> = ({ f, len, fast }) => {
  const k = fast ? 0.5 : 1;
  const reach = ez(f, 0, 6 * k) * (1 - ez(f, len - 6 * k, len));
  const flipped = f >= 4 * k;
  return (
    <Night id="pc" dim={fast ? 1 : 0}>
      <g transform={`translate(${W / 2}, 540)`}><Switch pose={flipped ? "startled" : "relaxed"} toggle={flipped ? 1 : 0} blink={flipped ? 0 : 1} /></g>
      <g transform={`translate(-40, ${440 + (flipped ? -20 : 40)}) rotate(${flipped ? -6 : 6})`}><Hand reach={reach} length={880} /></g>
    </Night>
  );
};
export const S11: ShotC = ({ f, len }) => <Flip f={f} len={len} />;
export const S36: ShotC = ({ f, len }) => <Flip f={f} len={len} fast />;

// S12: "…so how'd I just return?": he looks left and right; nobody's there
export const S12: ShotC = ({ f, g }) => (
  <Night id="pc">
    <g transform={`translate(${W / 2}, 540)`}>
      <Switch pose="curious" toggle={1} mouth={mouthAt(g, "switch")} look={[Math.sin(f / 9) > 0 ? -1 : 1, 0]} />
    </g>
  </Night>
);

// S13: "Default on! Default on!": bright mustard; bubble-letter lyrics with a bouncing ball; rockers flick on in time
export const S13: ShotC = ({ f, g }) => (
  <Bg id="s13" seed={13} base={C.mustard}>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`translate(${360 + i * 300}, ${420 - bump(f, 6 + i * 6, 6) * 40})`}><MiniRocker on={f > 6 + i * 6 ? 1 : 0} s={1.4} /></g>
    ))}
    <Lyric id="L10" f={f} g={g} y={820} size={110} />
  </Bg>
);

// S14: "It was there when you woke up…": sunrise over a bed with the answer box on the pillow; then the empty room
// at night, the answer box still there, waving
export const Bedroom: React.FC<{ f: number; g: number; len: number; lineId: string }> = ({ f, g, len, lineId }) => {
  const night = f > len / 2;
  return (
    <Bg id={night ? "s14n" : "s14"} seed={14} base={night ? C.night : C.paper}>
      {!night && <Wash id="s14" color={C.orange} opacity={0.7}><circle cx={1540} cy={560} r={200} /></Wash>}
      {night && <circle cx={1540} cy={260} r={80} fill={C.cream} opacity={0.85} />}
      <rect x={1300} y={160} width={500} height={420} fill="none" stroke={C.ink} strokeWidth={10} />
      <g transform="translate(700, 700)">
        <rect x={-500} y={-40} width={1000} height={200} rx={20} fill={C.teal} stroke={C.ink} strokeWidth={7} />
        <rect x={-560} y={-200} width={60} height={360} rx={10} fill={C.cardigan} stroke={C.ink} strokeWidth={7} />
        <ellipse cx={-320} cy={-50} rx={160} ry={60} fill={C.white} stroke={C.ink} strokeWidth={7} />
        <g transform="translate(-320, -150) scale(0.5)"><AnswerBox mouth={night ? "C" : "X"} wave={night ? Math.sin(f / 4) : 0} /></g>
      </g>
      <Lyric id={lineId} f={f} g={g} y={1010} size={64} />
    </Bg>
  );
};
export const S14: ShotC = ({ f, g, len }) => <Bedroom f={f} g={g} len={len} lineId="L11" />;

// S15 / S37: "You can hide it, you can mute it…": three beats; each gag hides the answer box and it comes back
export const Gags: React.FC<{ f: number; g: number; len: number; lineId: string; set: 1 | 2 }> = ({ f, g, len, lineId, set }) => {
  const beat = Math.min(2, Math.floor((f / len) * 3));
  const t = f - (beat * len) / 3;
  const back = ez(t, len / 3 - 14, len / 3 - 4);
  return (
    <Bg id={`gag${set}`} seed={15} base={set === 1 ? C.paper : C.cream}>
      <g transform="translate(960, 500)">
        {beat === 0 && (set === 1
          ? <g><g transform="scale(0.8)"><AnswerBox /></g><path d={`M-300,${-220 + ez(t, 0, 8) * 120} Q0,${-280 + ez(t, 0, 8) * 120} 300,${-220 + ez(t, 0, 8) * 120} L300,${140 - back * 300} Q0,${180 - back * 300} -300,${140 - back * 300} Z`} fill={C.orange} stroke={C.ink} strokeWidth={7} opacity={1 - back} /></g>
          : <g><path d="M-420,120 Q-420,-120 0,-120 Q420,-120 420,120 Z" fill={C.teal} stroke={C.ink} strokeWidth={8} /><g transform={`translate(0, ${-110 - back * 40}) scale(0.5)`}><AnswerBox mouth={back > 0.5 ? "C" : "X"} /></g></g>)}
        {beat === 1 && (
          <g><g transform="scale(0.8)"><AnswerBox mouth="X" /></g>
            <rect x={-60 + (set === 2 ? ez(t, 6, 20) * 500 : 0)} y={-14} width={300} height={60} rx={14} fill={C.ink} transform="translate(120, -40)" />
            <text x={270 + (set === 2 ? ez(t, 6, 20) * 500 : 0)} y={0} textAnchor="middle" fontFamily="'Titan One'" fontSize={34} fill={C.cream}>MUTED</text></g>
        )}
        {beat === 2 && (set === 1
          ? <g><rect x={-360} y={-60} width={720} height={260} fill={C.cardigan} stroke={C.ink} strokeWidth={8} /><rect x={-340} y={-40} width={680} height={200} fill={C.cardiganShade} stroke={C.ink} strokeWidth={6} /><g transform={`translate(0, ${-60 - back * 140}) scale(0.6)`} opacity={back}><AnswerBox mouth="D" /></g><rect x={-60} y={60} width={120} height={20} rx={8} fill={C.creamShade} stroke={C.ink} strokeWidth={4} /></g>
          : <g><rect x={-320} y={-180} width={640} height={360} rx={30} fill={C.red} stroke={C.ink} strokeWidth={8} /><rect x={-80} y={-240} width={160} height={70} rx={30} fill="none" stroke={C.ink} strokeWidth={14} /><g transform={`translate(0, ${-back * 260}) scale(0.7)`}><AnswerBox /></g></g>)}
      </g>
      <Lyric id={lineId} f={f} g={g} y={1010} size={64} />
    </Bg>
  );
};
export const S15: ShotC = ({ f, g, len }) => <Gags f={f} g={g} len={len} lineId="L12" set={1} />;

export const S16: ShotC = ({ f }) => <S16Key f={f} />;

// S17 / S39: "Default on!" / V04 / V11 "(On, on, on…)": Switch, redrawn slightly crooked, echoes quietly
const Echo: React.FC<{ f: number; g: number; tired?: boolean }> = ({ f, g, tired }) => (
  <Bg id="echo" seed={17} base={C.mustard}>
    <g transform={`translate(${W / 2}, 520) scale(${1 - f * 0.0008})`}>
      <Switch pose={tired ? "sad" : "neutral"} tilt={tired ? -9 : -6} mouth={mouthAt(g, "switch")} blink={tired ? 0.4 : blink(g)} />
    </g>
  </Bg>
);
export const S17: ShotC = ({ f, g }) => <Echo f={f} g={g} />;
export const S39: ShotC = ({ f, g }) => <Echo f={f} g={g} tired />;

// S18: the flute and scat fill: the grey hand doodles little ON switches in a margin, in time with the fill
export const S18: ShotC = ({ f }) => {
  const n = Math.floor(f / 14);
  return (
    <Bg id="s18" seed={18}>
      <line x1={420} y1={0} x2={420} y2={H} stroke={C.red} strokeWidth={4} opacity={0.6} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={140 + i * 80} x2={W} y2={140 + i * 80} stroke={C.teal} strokeWidth={2} opacity={0.3} />)}
      {Array.from({ length: Math.min(n, 8) }, (_, i) => (
        <g key={i} transform={`translate(${160 + (i % 2) * 140}, ${190 + Math.floor(i / 2) * 190}) rotate(${(i % 3) - 1 * 4})`}><MiniRocker on={1} s={0.9} /></g>
      ))}
      <g transform={`translate(${-40}, ${260 + Math.floor(Math.min(n, 8) / 2) * 190}) rotate(-8)`}><Hand reach={0.7} length={700} curl={0.2} /></g>
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

// S38: "But the switch is just a picture…": the sticker reveal again; this time Switch peels himself off first, and sighs
export const S38: ShotC = ({ f }) => <S16Key f={f + 10} />;

