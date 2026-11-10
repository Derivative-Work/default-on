// S40-S47: verse 3, the Pop Quiz. S45 and S46 carry the brief's captions (the Apple and Australia fixes).
import React from "react";
import { BUBBLE, SANS } from "../theme/fonts";
import { Caption, Door, Phone, PriceTag } from "../components/props";
import { Narrator } from "../rigs/Narrator";
import { Switch } from "../rigs/Switch";
import { C, PEN, W, lw } from "../theme/palette";
import { at, events, mouthAt } from "../timing";
import { Floorboards, Grain, breath } from "../components/sets";
import { Bg, ShotC, blink, bump, ez } from "./common";

// the game-show studio: swagged curtains, a marquee sign with chasing bulbs, spotlit floor discs, an audience in
// silhouette along the bottom, a scoreboard, the contestant podium (Switch, with a buzzer) and the host's lectern
// (the Narrator, with a stick mic and question cards)
const Curtains: React.FC = () => (
  <g>
    {[-1, 1].map((k) => (
      <g key={k} transform={`translate(${k < 0 ? 0 : W}, 0) scale(${k < 0 ? 1 : -1}, 1)`}>
        <path d="M0,0 L300,0 Q260,400 330,1080 L0,1080 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
        {[80, 160, 240].map((x) => <path key={x} d={`M${x},0 Q${x - 30},500 ${x + 20},1080`} stroke="#a8302a" strokeWidth={10} fill="none" />)}
      </g>
    ))}
    <path d={`M0,0 L${W},0 L${W},90 Q${W * 0.75},170 ${W / 2},100 Q${W * 0.25},170 0,90 Z`} fill={C.red} stroke={C.ink} strokeWidth={lw(6)} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={80 + i * 160} cy={120 + Math.sin(i * 0.9) * 20} r={14} fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />)}
  </g>
);
export const Audience: React.FC<{ f: number }> = ({ f }) => (
  <g>
    {Array.from({ length: 16 }, (_, i) => {
      const bob = Math.abs(Math.sin((f + i * 7) / 6)) * 8;
      return <g key={i} transform={`translate(${60 + i * 125}, ${1060 - bob})`}>
        <ellipse cx={0} cy={0} rx={62} ry={50} fill="#3b2f3a" />
        <circle cx={0} cy={-58} r={36} fill="#3b2f3a" />
      </g>;
    })}
  </g>
);
const Scoreboard: React.FC<{ score: string }> = ({ score }) => (
  <g transform="translate(1560, 300)">
    <rect x={-150} y={-60} width={300} height={120} rx={14} fill={C.dark} stroke={C.ink} strokeWidth={lw(6)} />
    <text x={-120} y={-14} fontFamily={SANS} fontWeight={600} fontSize={26} fill={C.mustard}>SWITCH</text>
    <text x={120} y={40} textAnchor="end" fontFamily={BUBBLE} fontSize={70} fill={C.mustard}>{score}</text>
  </g>
);
const Show: React.FC<{ f: number; g: number; sign?: string; score?: string; children?: React.ReactNode; light?: string }> = ({ f, g, sign = "POP QUIZ!", score = "0", children, light }) => (
  <Bg id="show" seed={40} base={C.night}>
    {[480, 960, 1440].map((x) => <ellipse key={x} cx={x} cy={900} rx={260} ry={50} fill={C.cream} opacity={0.18} />)}
    <rect x={-20} y={814} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
    <rect x={-20} y={860} width={W + 40} height={240} fill="#3a3466" stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={860} h={240} boards={3} />
    <Curtains />
    <g transform="translate(960, 260)">
      <rect x={-440} y={-90} width={880} height={180} rx={30} fill={C.teal} stroke={C.ink} strokeWidth={lw(8)} />
      {Array.from({ length: 22 }, (_, i) => {
        const t = i / 22, x = -440 + (t < 0.5 ? t * 2 * 880 : 880 - (t - 0.5) * 2 * 880), y = t < 0.5 ? -90 : 90;
        return <circle key={i} cx={x} cy={y} r={11} fill={(i + Math.floor(f / 3)) % 3 ? C.cream : C.mustard} stroke={C.ink} strokeWidth={lw(2)} />;
      })}
      <text textAnchor="middle" y={38} fontFamily={BUBBLE} fontSize={112} fill={C.cream} stroke={C.ink} strokeWidth={6} paintOrder="stroke">{sign}</text>
    </g>
    <Scoreboard score={score} />
    {/* the host's lectern, left */}
    <g transform={`translate(440, ${700 - (breath(g) - 1) * 200}) scale(0.62)`}><Narrator mouth={mouthAt(g, "narrator")} armR="point" head={1} blink={blink(g)} /></g>
    <g transform="translate(440, 820)">
      <path d="M-170,-40 L170,-40 L140,240 L-140,240 Z" fill={C.orange} stroke={C.ink} strokeWidth={lw(7)} />
      <path d="M0,-40 L0,-150" stroke={C.ink} strokeWidth={6} />
      <ellipse cx={0} cy={-162} rx={16} ry={22} fill={C.sleeveShade} stroke={C.ink} strokeWidth={lw(4)} />
      <rect x={-130} y={-70} width={110} height={70} rx={6} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} transform="rotate(-8)" />
      <path d="M-40,40 l12,26 l28,4 l-20,18 l6,28 l-26,-14 l-26,14 l6,-28 l-20,-18 l28,-4 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(3)} />
    </g>
    {/* the contestant's podium, right */}
    <g transform="translate(1400, 790)">
      <path d="M-180,-60 L180,-60 L150,300 L-150,300 Z" fill={C.mustard} stroke={C.ink} strokeWidth={lw(8)} />
      <text x={0} y={70} textAnchor="middle" fontFamily={BUBBLE} fontSize={56} fill={C.ink}>SWITCH</text>
      <circle cx={0} cy={-70} r={30} fill={light ?? C.red} stroke={C.ink} strokeWidth={lw(6)} />
      <g transform="translate(0, -290) scale(0.6)"><Switch pose="curious" mouth={mouthAt(g, "switch")} armR={90} blink={blink(g, 5)} /></g>
    </g>
    <Audience f={f} />
    {children}
  </Bg>
);

// a question on the studio's big screen, between the curtains: a card label ("Q1") and the screen's content
const QuizScreen: React.FC<{ f: number; q: string; children: React.ReactNode }> = ({ f, q, children }) => {
  const kids = React.Children.toArray(children);
  const isCaption = (c: React.ReactNode) => React.isValidElement(c) && c.type === Caption;
  return (
  <Bg id="qscreen" seed={41} base={C.night}>
    <rect x={-20} y={814} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
    <rect x={-20} y={860} width={W + 40} height={240} fill="#3a3466" stroke={C.ink} strokeWidth={lw(6)} />
    <Floorboards y={860} h={240} boards={3} />
    <Curtains />
    <rect x={380} y={170} width={1160} height={720} rx={24} fill={C.teal} stroke={C.ink} strokeWidth={lw(8)} opacity={0.9} />
    <g transform="translate(470, 250) rotate(-6)">
      <rect x={-70} y={-44} width={140} height={88} rx={10} fill={C.mustard} stroke={C.ink} strokeWidth={lw(5)} />
      <text textAnchor="middle" y={22} fontFamily={BUBBLE} fontSize={56} fill={C.ink}>{q}</text>
    </g>
    <clipPath id="qscreen-clip"><rect x={380} y={170} width={1160} height={720} rx={24} /></clipPath>
    <g clipPath="url(#qscreen-clip)">{kids.filter((c) => !isCaption(c))}</g>
    <Audience f={f} />
    {/* the screen's content stays inside the screen; captions sit on top of the audience */}
    {kids.filter(isCaption)}
  </Bg>
  );
};

// S40: "Pop quiz!"
export const S40: ShotC = ({ f, g }) => <Show f={f} g={g} />;

// a generic chat thread: two bubbles from Mom and Dad, and the plain glowing ring parked at the bottom
const Chat: React.FC<{ f: number; ring: number; muffs?: number }> = ({ f, ring, muffs = 0 }) => (
  <Phone w={420}>
    <rect x={0} y={0} width={400} height={80} fill={C.teal} />
    <text x={200} y={54} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={32} fill={C.cream}>Family</text>
    <rect x={24} y={120} width={290} height={84} rx={30} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={46} y={172} fontFamily={SANS} fontSize={27} fill={C.ink}>Mom: dinner at 6</text>
    <rect x={86} y={236} width={290} height={84} rx={30} fill={C.avocado} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={108} y={288} fontFamily={SANS} fontSize={27} fill={C.cream}>Dad: on my way</text>
    <rect x={24} y={352} width={200} height={84} rx={30} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />
    <text x={46} y={404} fontFamily={SANS} fontSize={27} fill={C.ink}>Mom: ok!</text>
    {/* the message bar at the bottom of the screen */}
    <rect x={0} y={790} width={400} height={70} fill={C.creamShade} />
    <rect x={20} y={804} width={300} height={42} rx={21} fill={C.white} stroke={C.ink} strokeWidth={lw(3)} />
    <circle cx={356} cy={825} r={22} fill={C.teal} stroke={C.ink} strokeWidth={lw(3)} />
    <g transform={`translate(${200}, ${960 - ring * 290})`}>
      <circle r={50 + Math.sin(f / 5) * 4} fill="none" stroke={C.teal} strokeWidth={18} opacity={0.9} />
      <circle r={70} fill="none" stroke={C.teal} strokeWidth={6} opacity={0.3} />
      {muffs > 0 && [-1, 1].map((s) => <circle key={s} cx={s * 62} cy={0} r={26 * muffs} fill={C.red} stroke={C.ink} strokeWidth={lw(4)} />)}
      {muffs > 0 && <path d="M-62,-10 Q0,-90 62,-10" stroke={C.ink} strokeWidth={lw(8)} fill="none" />}
    </g>
  </Phone>
);

// the chat verse's source (the human's note, 2026-11-09: a visual indicator like the phone's), from the fact card's row
// "Meta AI in WhatsApp, Facebook and Instagram can't be disabled; the chat can be muted." Held S41-S43
const CHATCAP = "Meta AI in WhatsApp, Facebook and Instagram";

// S41: "There's a blue ring in the chat app…": a generic chat thread; a plain glowing ring floats in and parks
export const S41: ShotC = ({ f, len }) => (
  <QuizScreen f={f} q="Q1">
    <g transform="translate(960, 530) scale(0.72)"><Chat f={f} ring={ez(f, len * 0.4, len * 0.8)} /></g>
    <Caption text={CHATCAP} />
  </QuizScreen>
);

// S42: V12 "I'll uninstall it!" / "Nope!": wrong-answer honk, big red X, landing on the human's horn (two honks)
export const S42: ShotC = ({ f, g }) => {
  const h0 = at(events.horn[0]) - (g - f), h1 = at(events.horn[1]) - (g - f);
  const x = ez(f, h0, h0 + 3) * (1 + 0.12 * bump(f, h1, 4));
  return (
    <Show f={f} g={g} light={x > 0 ? C.red : C.cream} score={x > 0 ? "✗" : "0"}>
      {x > 0 && <g transform={`translate(960, 600) scale(${x})`} opacity={0.92}>
        <path d="M-260,-260 L260,260 M260,-260 L-260,260" stroke={C.red} strokeWidth={90} strokeLinecap="round" />
      </g>}
      {x > 0 && <text x={1180} y={560} fontFamily={BUBBLE} fontSize={110} fill={C.mustard} stroke={C.ink} strokeWidth={6} paintOrder="stroke" transform="rotate(10, 1180, 560)">HONK!</text>}
      <Caption text={CHATCAP} />
    </Show>
  );
};

// S43: V13 "I'll mute it, then?" / "That's not so bad!": half-credit chime; the ring puts on earmuffs and stays put
export const S43: ShotC = ({ f, len }) => (
  <QuizScreen f={f} q="Q1">
    <g transform="translate(960, 530) scale(0.72)"><Chat f={f} ring={1} muffs={ez(f, len * 0.5, len * 0.65)} /></g>
    <g transform="translate(1400, 380)" opacity={ez(f, len * 0.5, len * 0.6)}>
      <text textAnchor="middle" fontFamily={BUBBLE} fontSize={130} fill={C.mustard} stroke={C.ink} strokeWidth={6} paintOrder="stroke">½</text>
      <text x={20} y={90} textAnchor="middle" fontFamily={BUBBLE} fontSize={56} fill={C.cream} stroke={C.ink} strokeWidth={4} paintOrder="stroke">DING!</text>
      {[[-120, -80], [110, -110], [140, 30]].map(([x, y], i) => <path key={i} transform={`translate(${x}, ${y}) scale(${0.8 + 0.3 * Math.sin(f / 4 + i)})`} d="M0,-20 L6,-6 L20,0 L6,6 L0,20 L-6,6 L-20,0 L-6,-6 Z" fill={C.cream} stroke={C.ink} strokeWidth={lw(3)} />)}
    </g>
    <Caption text={CHATCAP} />
  </QuizScreen>
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
export const S44: ShotC = ({ f }) => (
  <QuizScreen f={f} q="Q2">
    <g transform={`translate(960, 540) scale(${0.85 + Math.sin(f / 6) * 0.01})`}><ContinuePhone /></g>
  </QuizScreen>
);

// S45: V14 "Where's the 'No'?" / "There isn't one!…": Switch searches the phone's edges with a magnifying glass; pull
// back to a row of phones; on some, a setting slides to ON by itself. Caption: "Some iPhones, iOS 18.3.2, March 2025"
export const S45: ShotC = ({ f, g, len }) => {
  const back = ez(f, len * 0.45, len * 0.65);
  const s = 0.86 - back * 0.42; // the close-up still fits inside the quiz screen
  return (
    <QuizScreen f={f} q="Q2">
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
    </QuizScreen>
  );
};

// S46: "In Australia, office software went up forty-five percent…": a map card of Australia (a hand-drawn outline:
// Cape York, Arnhem Land, the Gulf, the Bight, Tasmania; ocean with wave lines; a compass rose; the name); on the east
// coast a generic boxed office suite (no logo), whose price tag is a balloon on a string that swells to "+45%" and
// tugs the box off the map. Caption: "Microsoft 365 Personal. Alleged by Australia's ACCC."
const OZ: [number, number][] = [
  [0.05, 0.36], [0.14, 0.26], [0.27, 0.19], [0.34, 0.09], [0.42, 0.13], [0.47, 0.05], [0.55, 0.09], [0.59, 0.02], [0.65, 0.11],
  [0.70, 0.10], [0.72, 0.30], [0.76, 0.24], [0.78, 0.0], [0.82, 0.12], [0.86, 0.30], [0.92, 0.40], [0.97, 0.55], [0.98, 0.68],
  [0.93, 0.80], [0.85, 0.88], [0.78, 0.85], [0.70, 0.79], [0.66, 0.71], [0.62, 0.76], [0.58, 0.71], [0.52, 0.67], [0.40, 0.65],
  [0.30, 0.70], [0.18, 0.78], [0.08, 0.75], [0.03, 0.64], [0.01, 0.48],
];
const ozPath = (w: number, h: number) => OZ.map(([x, y], i) => `${i ? "L" : "M"}${(x - 0.5) * w},${(y - 0.45) * h}`).join(" ") + " Z";
export const S46: ShotC = ({ f, len }) => {
  const inflate = ez(f, len * 0.25, len * 0.8);
  const lift = ez(f, len * 0.75, len);
  const MW = 560, MH = 470; // the continent's drawing box
  const CX = 1000, CY = 560; // the map card's centre, clear of the Q3 card
  const bx = CX + 60 + (0.9 - 0.5) * MW * 0.95, by = CY + 30 + (0.62 - 0.45) * MH * 0.95; // the box sits on the east coast
  const r = 50 + inflate * 90; // the balloon tag's radius
  const tx = 1310, ty = 420 - inflate * 60 - lift * 40;
  return (
    <QuizScreen f={f} q="Q3">
      {/* the map card */}
      <g transform={`translate(${CX}, ${CY})`}>
        <rect x={-430} y={-330} width={760} height={640} rx={16} fill="#bfe0ec" stroke={C.ink} strokeWidth={lw(7)} />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-400 + (i % 3) * 250},${-260 + Math.floor(i / 3) * 210} q16,-10 32,0 t32,0`} {...PEN} stroke={C.teal} opacity={0.7} />)}
        <text x={-100} y={-262} textAnchor="middle" fontFamily={BUBBLE} fontSize={56} fill={C.ink}>AUSTRALIA</text>
        <g transform="translate(60, 30) scale(0.95)">
          <path d={ozPath(MW, MH)} fill={C.orange} stroke={C.ink} strokeWidth={lw(6)} strokeLinejoin="round" />
          <path d={ozPath(MW, MH)} fill="url(#pen-dots)" opacity={0.6} />
          <ellipse cx={(0.86 - 0.5) * MW} cy={(1.0 - 0.45) * MH} rx={34} ry={26} fill={C.orange} stroke={C.ink} strokeWidth={lw(5)} />
          {/* a few inland pen marks: ranges and a dry lake */}
          <path d={`M${0.25 * MW - 0.5 * MW},${0.05 * MH} l14,-18 l14,18 l14,-18 l14,18`} {...PEN} />
          <path d={`M${0.85 * MW - 0.5 * MW},${-0.05 * MH} l12,-16 l12,16 l12,-16 l12,16`} {...PEN} />
          <ellipse cx={0.05 * MW} cy={0.1 * MH} rx={34} ry={12} {...PEN} />
        </g>
        <g transform="translate(250, -250)">
          <circle r={44} fill={C.cream} stroke={C.ink} strokeWidth={lw(4)} />
          <path d="M0,-38 L8,0 L0,38 L-8,0 Z" fill={C.red} stroke={C.ink} strokeWidth={lw(2)} />
          <text y={-48} textAnchor="middle" fontFamily={SANS} fontWeight={600} fontSize={20} fill={C.ink}>N</text>
        </g>
      </g>
      {/* the boxed office suite, tugged up by its balloon */}
      <g transform={`translate(${bx}, ${by - lift * 70}) rotate(${lift * -8})`}>
        <path d="M-60,-50 L60,-50 L60,50 L-60,50 Z" fill={C.white} stroke={C.ink} strokeWidth={lw(5)} />
        <path d="M-60,-50 L-40,-66 L80,-66 L60,-50 Z M60,-50 L80,-66 L80,34 L60,50 Z" fill={C.creamShade} stroke={C.ink} strokeWidth={lw(4)} />
        <rect x={-50} y={-38} width={100} height={30} fill={C.teal} />
        <text x={0} y={-17} textAnchor="middle" fontFamily={BUBBLE} fontSize={20} fill={C.white}>OFFICE</text>
        {[0, 1, 2].map((k) => <rect key={k} x={-46} y={2 + k * 14} width={80 - k * 16} height={6} fill={C.creamShade} />)}
      </g>
      <path d={`M${bx + 60},${by - 40 - lift * 70} Q${(bx + tx) / 2 + 40},${(by + ty) / 2 + 80} ${tx - r * 0.2},${ty + r * 0.95}`} stroke={C.ink} strokeWidth={3} fill="none" />
      {/* the tag as a balloon: a rounded tag shape with a punched hole, swelling */}
      <g transform={`translate(${tx}, ${ty}) rotate(${Math.sin(f / 9) * 5})`}>
        <path d={`M${-r},${-r * 0.75} Q0,${-r * 1.15} ${r},${-r * 0.75} Q${r * 1.2},0 ${r},${r * 0.75} Q0,${r * 1.1} ${-r},${r * 0.75} Q${-r * 1.25},0 ${-r},${-r * 0.75} Z`} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} />
        <path d={`M${-r * 0.6},${-r * 0.6} q${r * 0.3},${-r * 0.16} ${r * 0.6},${-r * 0.1}`} stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7} />
        <circle cx={-r * 0.7} cy={0} r={Math.max(6, r * 0.09)} fill={C.paper} stroke={C.ink} strokeWidth={lw(3)} />
        <text x={r * 0.1} y={r * 0.2} textAnchor="middle" fontFamily={BUBBLE} fontSize={r * 0.55} fill={C.ink}>+45%</text>
      </g>
      <Caption text="Microsoft 365 Personal. Alleged by Australia's ACCC." />
    </QuizScreen>
  );
};

// S47: V15 "Was there one without the robot?" / "Only once you tried to leave!": Switch walks toward a door marked
// "CANCEL"; a cheaper tag peeks out from behind it (labelled CLASSIC, no price: the fact card gives none), then the
// door slams on the human's door recording
export const S47: ShotC = ({ f, g, len }) => {
  const d = at(events.door_slam) - (g - f); // the slam's local frame
  const walk = ez(f, 0, len * 0.5);
  const peek = ez(f, len * 0.5, len * 0.6) * (1 - ez(f, d - 4, d));
  const slam = f >= d;
  return (
    <Bg id="s47" seed={47} base={C.night}>
      <rect x={-20} y={814} width={W + 40} height={46} fill="url(#pen-hatch)" opacity={0.32} />
      <rect x={-20} y={860} width={W + 40} height={240} fill="#3a3466" stroke={C.ink} strokeWidth={lw(6)} />
      <Floorboards y={860} h={240} boards={3} />
      <Curtains />
      {/* standing on the floor line, against the wall (the human's note, 2026-11-09, round 6: it sank into the floor) */}
      <g transform="translate(1280, 860)"><Door label="CANCEL" open={slam ? 0 : peek * 0.4} color={C.red} /></g>
      <g transform={`translate(${1480 - (1 - peek) * 220}, 560) scale(0.6)`} opacity={peek}><PriceTag text="CLASSIC" color={C.avocado} s={0.8} /></g>
      <g transform={`translate(${300 + walk * 520}, ${700 - bump(f, d + 2, 5) * 30}) scale(0.6)`}>
        <Switch pose={slam ? "startled" : "curious"} mouth={mouthAt(g, "switch")} look={[1, 0]} blink={blink(g, 6)} />
      </g>
      {slam && f < d + 18 && <text x={1100} y={300} fontFamily={BUBBLE} fontSize={110} fill={C.mustard} stroke={C.ink} strokeWidth={6} paintOrder="stroke">SLAM!</text>}
      <Audience f={f} />
    </Bg>
  );
};
