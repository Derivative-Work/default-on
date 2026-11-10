// The timing map (timing/map.json, scripts/timing_map.py) as the video's clock. Video frames include the
// pre-roll (map.preroll_s: S00's 2 s card ends on v2's start, the master's first downbeat, so 0.9122 s before the final master's); `at(t)` turns audio seconds into a video frame. Shots, lines, words and Switch slots come from the map.
import map from "../../timing/map.json";

export const FPS = map.fps;
export const PREROLL = map.preroll_s;
export const DURATION = map.duration_frames;
export const at = (t: number) => Math.round((t + PREROLL) * FPS);

type Shot = (typeof map.shots)[number];
export const shot = (id: string) => {
  const s = map.shots.find((x) => x.id === id) as Shot;
  if (!s || s.frame == null) throw new Error(`shot ${id} has no time`);
  return s as Shot & { t: number; frame: number };
};
// a shot's frames on screen: [first, last + 1)
export const shotRange = (id: string): [number, number] => {
  const s = shot(id);
  return [s.frame, s.frame_end ?? s.frame + 90];
};
export const lines = map.lines;
export const line = (id: string) => map.lines.find((l) => l.id === id)!;
export const slot = (id: string) => map.switch_slots.find((s) => s.id === id)!;
export const sections = map.sections;
export const beats = map.beats.map(at);
export const downbeats = map.downbeats.map(at);
export const events = map.events;
export const post = map.post as { id: string; frame: number; what: string; len_s: number; interventions?: number }[];

// every shot in order, with its frame range, then the post-roll (map.post, M5): S67 holds 2 s past the audio, then
// fact card G, the creator's disclosure (FD), the fact cards F1-F9 and the end card (FE); S68 is retired
export const END = map.video_end_frame;
const ordered = [...map.shots.map((s) => ({ id: s.id, cue: s.cue, frame: s.frame as number })),
  ...map.post.map((p) => ({ id: p.id, cue: p.what, frame: p.frame }))]
  .sort((a, b) => a.frame - b.frame);
export const shots = ordered.map((s, i) => ({ ...s, end: i + 1 < ordered.length ? ordered[i + 1].frame : END }));

// mouths: Rhubarb Lip Sync's cues per line (timing/visemes.json, scripts/rhubarb_visemes.py), as frames: the
// Narrator's from the vocal stem, Switch's from the human's comp of his takes
import visemes from "../../timing/visemes.json";
type Shape = "X" | "A" | "B" | "C" | "D" | "E" | "F";
const CUES = { narrator: [] as [number, Shape][], switch: [] as [number, Shape][] };
for (const l of visemes.lines) {
  const who = l.singer as "narrator" | "switch";
  for (const [t, v] of l.cues as [number, Shape][]) CUES[who].push([at(t), v]);
}
CUES.narrator.sort((a, b) => a[0] - b[0]);
CUES.switch.sort((a, b) => a[0] - b[0]);
export const mouthAt = (g: number, who: "narrator" | "switch"): Shape => {
  const c = CUES[who];
  let lo = 0, hi = c.length - 1, k = -1;
  while (lo <= hi) { const m = (lo + hi) >> 1; if (c[m][0] <= g) { k = m; lo = m + 1; } else hi = m - 1; }
  return k < 0 ? "X" : c[k][1];
};
// the global frame of the n'th word of a line
export const wordAt = (lineId: string, n: number) => at(line(lineId).words[n].start);
