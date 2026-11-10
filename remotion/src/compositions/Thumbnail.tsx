// M5: the thumbnail (brief: Switch mid-flip with the grey hand reaching in; never the real hand, the generation screen
// or the timeline). The pre-chorus night set and spotlight, Switch large with his paddle halfway between OFF and ON and
// a startled face, the grey sleeve's finger on the paddle, and the title in the film's bubble letters. No child, no
// real material. Rendered as a still at 1920x1080 (YouTube takes 16:9 up to 2 MB).
import React from "react";
import { Film } from "../film/Film";
import { Night } from "../shots/Chorus";
import { Hand, TIP_Y } from "../rigs/Hand";
import { PADDLE, Switch } from "../rigs/Switch";
import { BUBBLE } from "../theme/fonts";
import { C, lw } from "../theme/palette";

const SX = 1080, SY = 620, SS = 1.3; // Switch's place and size
export const Thumbnail: React.FC = () => {
  const tipY = SY + PADDLE.bottom.y * SS; // the finger on the paddle's lower half, pushing it up
  return (
    <Film strength={1} splices={[]}>
      <Night id="thumb" g={40}>
        <g transform={`translate(${SX}, ${SY}) scale(${SS})`}><Switch pose="startled" toggle={0.5} blink={0} mouth="E" look={[-0.6, 0.2]} /></g>
        <g transform={`translate(-40, ${tipY - TIP_Y * SS}) scale(${SS})`}><Hand reach={1} length={(SX - 8 + 40) / SS} press={0.6} /></g>
        <text x={SX + 250} y={330} fontFamily={BUBBLE} fontSize={110} fill={C.mustard} stroke={C.ink} strokeWidth={lw(6)} paintOrder="stroke" transform={`rotate(-10, ${SX + 250}, 330)`}>click!</text>
        <g transform="translate(720, 200) rotate(-4)">
          <text textAnchor="middle" x={10} y={12} fontFamily={BUBBLE} fontSize={170} fill={C.ink} opacity={0.4} letterSpacing={4}>DEFAULT ON</text>
          <text textAnchor="middle" fontFamily={BUBBLE} fontSize={170} fill={C.cream} stroke={C.ink} strokeWidth={14} paintOrder="stroke" letterSpacing={4}>DEFAULT ON</text>
        </g>
      </Night>
    </Film>
  );
};
