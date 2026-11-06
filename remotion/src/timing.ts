// The timing map (timing/map.json, scripts/timing_map.py) as the video's clock. Video frames include the 3 s
// pre-roll; `at(t)` turns audio seconds into a video frame. Shots, lines, words and Switch slots come from the map.
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

// every shot in order, with its frame range; S67 holds HOLD_S past the audio (brief) before the fact cards
export const HOLD_S = 2;
export const END = at(map.events.audio_end + HOLD_S);
export const shots = map.shots.map((s, i) => ({
  id: s.id, cue: s.cue, frame: s.frame as number,
  end: i + 1 < map.shots.length ? (map.shots[i + 1].frame as number) : END,
}));

// placeholder mouths until M4's Rhubarb pass: inside an aligned word (or a proposed Switch slot) the mouth cycles
// open shapes every 3 frames; otherwise it rests
const SHAPES = ["C", "B", "D", "B", "E"] as const;
const spans = (singer: string) => {
  const w = map.lines.filter((l) => l.singer === singer).flatMap((l) => l.words.map((x) => [at(x.start), at(x.end)]));
  if (singer === "switch") {
    for (const s of map.switch_slots) if ("proposed" in s && s.proposed) w.push([at(s.proposed[0]), at(s.proposed[1])]);
  }
  return w;
};
const SPANS = { narrator: spans("narrator"), switch: spans("switch") };
export const mouthAt = (g: number, who: "narrator" | "switch") => {
  const s = SPANS[who].find(([a, b]) => g >= a && g < b);
  return s ? SHAPES[Math.floor((g - s[0]) / 3) % SHAPES.length] : "X";
};
// the global frame of the n'th word of a line
export const wordAt = (lineId: string, n: number) => at(line(lineId).words[n].start);
