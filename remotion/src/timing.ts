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
