// Open-licensed fonts only (assets/LICENSES.md): Titan One, a rounded bubble face for titles, section cards and the
// bouncing-ball lyrics; Work Sans for captions and fine print; Kalam, a pencil handwriting, for notes written on
// paper in the scene (S18's margin, the human's note of 2026-11-09). From pinned Fontsource packages; every frame waits.
import "@fontsource/titan-one/400.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/kalam/400.css";
import { continueRender, delayRender } from "remotion";

export const BUBBLE = "'Titan One', sans-serif";
export const SANS = "'Work Sans', sans-serif";
export const HAND = "'Kalam', cursive";

const FACES = ["400 16px 'Titan One'", "400 16px 'Work Sans'", "600 16px 'Work Sans'", "400 16px 'Kalam'"];
const handle = delayRender("fonts");
Promise.all(FACES.map((f) => document.fonts.load(f))).then(() => continueRender(handle));
