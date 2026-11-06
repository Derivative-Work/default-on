// The palette, driven toward the reference shorts the human supplied (2026-11-06): flat cel colours a step brighter
// than the brief's first 70s set (mustard, orange, green, a blue-leaning teal, red) on pale, slightly lavender paper;
// ink lines a near-black warm brown, thinner (LINE) and loose. The film layer grades high-key, soft and cool.
export const C = {
  paper: "#f5f1f2", // off-white paper
  cream: "#fbf1dc", // Switch's wall plate
  creamShade: "#e3cfa4",
  mustard: "#f0b52e",
  orange: "#ea7230", // burnt orange
  avocado: "#7aa645",
  teal: "#3a8fbd",
  ink: "#2a1f1b", // warm dark brown: every outline
  inkSoft: "#5e4a3e",
  night: "#2c3f88", // the pre-chorus's night blue
  dark: "#1f1a1d", // the outro's black wall (a very dark brown, still not black)
  sleeve: "#8e8b86", // the off-screen hand's grey sleeve, the same every time
  sleeveShade: "#6f6c68",
  skin: "#f2c29c", // the Narrator
  skinShade: "#dba27c",
  cardigan: "#7a4a2a", // brown cardigan
  cardiganShade: "#5e3820",
  hair: "#5a3a22",
  white: "#fbf6ea",
  chalk: "#3d5a48", // the chalkboard
  red: "#d6443a", // stamps and X marks, from the orange family
};

export const W = 1920;
export const H = 1080;

// line weight: every ink outline's width goes through lw(), so the whole film's line can be set in one place
export const LINE = 0.62;
export const lw = (n: number) => Math.round(n * LINE * 100) / 100;

// the pen layer: thin ink detail lines (hatching, grain, folds, hair), drawn over the flat colour
export const PEN = { stroke: C.ink, strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
