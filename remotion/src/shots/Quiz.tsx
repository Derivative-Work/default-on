// S40-S47: verse 3, the Pop Quiz. S45 and S46 carry the brief's captions (the Apple and Australia fixes).
import React from "react";
import { BUBBLE, SANS } from "../theme/fonts";
import { Caption, Door, Phone, PriceTag } from "../components/props";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { C, W, lw } from "../theme/palette";
import { mouthAt } from "../timing";
import { Bg, ShotC, blink, bump, ez } from "./common";

// the game-show set: bulbs round the edge, the sign, Switch at a podium with a buzzer
const Show: React.FC<{ f: number; g: number; sign?: string; children?: React.ReactNode; light?: string }> = ({ f, g, sign = "POP QUIZ!", children, light }) => (
  <Bg id="show" seed={40} base={C.orange}>
    {Array.from({ length: 30 }, (_, i) => {
      const x = i < 15 ? 60 + i * 129 : 60 + (i - 15) * 129;
      const y = i < 15 ? 50 : 1030;
      return <circle key={i} cx={x} cy={y} r={18} fill={(i + Math.floor(f / 4)) % 2 ? C.cream : C.mustard} stroke={C.ink} strokeWidth={lw(4)} />;
    })}
    <g transform="translate(960, 200)">
      <rect x={-420} y={-80} width={840} height={160} rx={30} fill={C.teal} stroke={C.ink} strokeWidth={lw(8)} />
      <text textAnchor="middle" y={36} fontFamily={BUBBLE} fontSize={110} fill={C.cream} stroke={C.ink} strokeWidth={lw(6)} paintOrder="stroke">{sign}</text>
    </g>
    <g transform="translate(1400, 760)">
      <path d="M-180,-60 L180,-60 L150,300 L-150,300 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(8)} />
      <circle cx={0} cy={-70} r={30} fill={light ?? C.red} stroke={C.ink} strokeWidth={lw(6)} />
      <g transform="translate(0, -270) scale(0.62)"><Switch pose="curious" mouth={mouthAt(g, "switch")} armR={90} blink={blink(g, 5)} /></g>
    </g>
    <g transform="translate(420, 780) scale(0.7)"><Narrator mouth={mouthAt(g, "narrator")} armR="point" head={1} /></g>
    {children}
  </Bg>
);

// S40: "Pop quiz!"
export const S40: ShotC = ({ f, g }) => <Show f={f} g={g} />;

// a generic chat thread: two bubbles from Mom and Dad, and the plain glowing ring parked at the bottom
const Chat: React.FC<{ f: number; ring: number; muffs?: number }> = ({ f, ring, muffs = 0 }) => (
  <Phone w={420}>
    <rect x={0} y={0} width={400} height={80} fill={C.teal} />
    <text x={200} y={54} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={32} fill={C.cream}>Family</text>
    <rect x={30} y={120} width={250} height={90} rx={30} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={50} y={176} fontFamily={SANS} fontSize={28} fill={C.ink}>Mom: dinner at 6</text>
    <rect x={120} y={240} width={250} height={90} rx={30} fill={C.avocado} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={140} y={296} fontFamily={SANS} fontSize={28} fill={C.cream}>Dad: on my way</text>
    <g transform={`translate(${200}, ${860 - ring * 120})`}>
      <circle r={50 + Math.sin(f / 5) * 4} fill="none" stroke={C.teal} strokeWidth={18} opacity={0.9} />
      <circle r={70} fill="none" stroke={C.teal} strokeWidth={6} opacity={0.3} />
      {muffs > 0 && [-1, 1].map((s) => <circle key={s} cx={s * 62} cy={0} r={26 * muffs} fill={C.red} stroke={C.ink} strokeWidth={lw(4)} />)}
      {muffs > 0 && <path d="M-62,-10 Q0,-90 62,-10" stroke={C.ink} strokeWidth={lw(8)} fill="none" />}
    </g>
  </Phone>
);

// S41: "There's a blue ring in the chat app…": a generic chat thread; a plain glowing ring floats in and parks
export const S41: ShotC = ({ f, len }) => (
  <Bg id="s41" seed={41} base={C.orange}>
    <g transform="translate(960, 560)"><Chat f={f} ring={ez(f, len * 0.4, len * 0.8)} /></g>
  </Bg>
);

// S42: V12 "I'll uninstall it!" / "Nope!": wrong-answer honk, big red X
export const S42: ShotC = ({ f, g, len }) => {
  const x = ez(f, len * 0.55, len * 0.6);
  return (
    <Show f={f} g={g} light={x > 0 ? C.red : C.cream}>
      {x > 0 && <g transform={`translate(960, 600) scale(${x})`} opacity={0.92}>
        <path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke={C.red} strokeWidth={90} strokeLinecap="round" />
      </g>}
    </Show>
  );
};

// S43: V13 "I'll mute it, then?" / "That's not so bad!": half-credit chime; the ring puts on earmuffs and stays put
export const S43: ShotC = ({ f, len }) => (
  <Bg id="s41" seed={41} base={C.orange}>
    <g transform="translate(960, 560)"><Chat f={f} ring={1} muffs={ez(f, len * 0.5, len * 0.65)} /></g>
    <g transform="translate(1500, 300)"><text textAnchor="middle" fontFamily={BUBBLE} fontSize={90} fill={C.cream} stroke={C.ink} strokeWidth={lw(5)} paintOrder="stroke" opacity={ez(f, len * 0.5, len * 0.6)}>½</text></g>
  </Bg>
);

// S44: "Now your phone has got an update…": one enormous button, "Continue," and nothing else
const ContinuePhone: React.FC<{ on?: number }> = ({ on = 0 }) => (
  <Phone w={360}>
    <rect x={40} y={620} width={320} height={110} rx={40} fill={C.teal} stroke={C.ink} strokeWidth={lw(5)} />
    <text x={200} y={692} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={40} fill={C.cream}>Continue</text>
    <rect x={60} y={200} width={280} height={30} rx={10} fill={C.creamShade} />
    <rect x={60} y={260} width={220} height={30} rx={10} fill={C.creamShade} />
    <g transform="translate(200, 420)">
      <rect x={-60} y={-32} width={120} height={64} rx={32} fill={on > 0.5 ? C.avocado : C.creamShade} stroke={C.ink} strokeWidth={lw(5)} />
      <circle cx={-30 + on * 60} r={26} fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
    </g>
  </Phone>
);
export const S44: ShotC = () => (
  <Bg id="s44" seed={44} base={C.teal}>
    <g transform="translate(960, 560) scale(1.1)"><ContinuePhone /></g>
  </Bg>
);

// S45: V14 "Where's the 'No'?" / "There isn't one!…": Switch searches the phone's edges with a magnifying glass; pull
// back to a row of phones; on some, a setting slides to ON by itself. Caption: "Some iPhones, iOS 18.3.2, March 2025"
export const S45: ShotC = ({ f, g, len }) => {
  const back = ez(f, len * 0.45, len * 0.65);
  const s = 1.1 - back * 0.65;
  return (
    <Bg id="s44" seed={44} base={C.teal}>
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${960 + i * 520 * s}, 560) scale(${s})`} opacity={i === 0 ? 1 : back}>
          <ContinuePhone on={i % 3 !== 1 && i !== 0 ? ez(f, len * 0.7 + Math.abs(i) * 4, len * 0.75 + Math.abs(i) * 4) : 0} />
        </g>
      ))}
      <g transform={`translate(${1240 - back * 200}, ${380 + Math.sin(f / 6) * 120 * (1 - back)}) scale(${0.45 * (1 - back * 0.5)})`}>
        <Switch pose="curious" mouth={mouthAt(g, "switch")} look={[-1, 0]} armL={100} />
        <g transform="translate(-300, -30)"><circle r={70} fill={C.cream} fillOpacity={0.4} stroke={C.ink} strokeWidth={12} /><line x1={50} y1={50} x2={150} y2={110} stroke={C.ink} strokeWidth={18} strokeLinecap="round" /></g>
      </g>
      <Caption text="Some iPhones, iOS 18.3.2, March 2025" />
    </Bg>
  );
};

// S46: "In Australia, office software went up forty-five percent…": a map card of Australia; a price tag inflates like
// a balloon to "+45%". Caption: "Microsoft 365 Personal. Alleged by Australia's ACCC."
export const S46: ShotC = ({ f, len }) => {
  const inflate = ez(f, len * 0.3, len * 0.85);
  return (
    <Bg id="s46" seed={46} base={C.cream}>
      <g transform="translate(560, 520)">
        <rect x={-380} y={-330} width={760} height={600} rx={20} fill={C.paper} stroke={C.ink} strokeWidth={lw(7)} />
        {/* a hand-drawn continent outline: a simple blob, not a traced map */}
        <path d="M-260,-60 Q-250,-170 -120,-190 Q-40,-260 40,-200 Q120,-230 170,-150 Q260,-120 270,-10 Q300,90 220,150 Q140,210 60,170 Q-10,220 -80,170 Q-200,170 -240,80 Q-290,10 -260,-60 Z" fill={C.orange} stroke={C.ink} strokeWidth={lw(6)} opacity={0.85} />
        <path d="M140,230 q20,-10 30,10 q-10,20 -30,-10" fill={C.orange} stroke={C.ink} strokeWidth={lw(4)} />
      </g>
      <g transform={`translate(1360, ${600 - inflate * 120}) scale(${0.6 + inflate * 0.9}) rotate(${Math.sin(f / 8) * 6})`}>
        <path d="M-150,70 Q-120,220 -60,330" stroke={C.ink} strokeWidth={lw(4)} fill="none" />
        <PriceTag text="+45%" />
      </g>
      <Caption text="Microsoft 365 Personal. Alleged by Australia's ACCC." />
    </Bg>
  );
};

// S47: V15 "Was there one without the robot?" / "Only once you tried to leave!": Switch walks toward a door marked
// "CANCEL"; a cheaper tag peeks out from behind it (labelled CLASSIC, no price: the fact card gives none), then the
// door slams
export const S47: ShotC = ({ f, g, len }) => {
  const walk = ez(f, 0, len * 0.5);
  const peek = ez(f, len * 0.5, len * 0.6) * (1 - ez(f, len * 0.85, len * 0.88));
  const slam = f > len * 0.86;
  return (
    <Bg id="s47" seed={47} base={C.mustard}>
      <rect x={-20} y={900} width={W + 40} height={200} fill={C.inkSoft} opacity={0.6} />
      <g transform="translate(1280, 900)"><Door label="CANCEL" open={slam ? 0 : peek * 0.4} color={C.red} /></g>
      <g transform={`translate(${1480 - (1 - peek) * 220}, 560) scale(0.6)`} opacity={peek}><PriceTag text="CLASSIC" color={C.avocado} s={0.8} /></g>
      <g transform={`translate(${300 + walk * 520}, ${700 - bump(f, len * 0.88, 5) * 30}) scale(0.6)`}>
        <Switch pose={slam ? "startled" : "curious"} mouth={mouthAt(g, "switch")} look={[1, 0]} blink={blink(g, 6)} />
      </g>
      {slam && f < len * 0.92 && <text x={1100} y={300} fontFamily={BUBBLE} fontSize={110} fill={C.ink}>SLAM!</text>}
    </Bg>
  );
};
