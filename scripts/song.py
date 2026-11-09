"""This song's files and stems, in one place for every analysis script."""
TITLE = "Default On"
TRACK = "audio/track/Default On.wav"  # the locked mix, v2 (Suno Studio export with the replaces, 32-bit float)
STEM = "audio/stems/{}.wav"
STEMS = ["1 Woodwinds", "2 Brass", "3 FX", "4 Synth", "5 Strings", "6 Percussion", "7 Keyboard", "8 Guitar", "9 Bass",
         "10 Drums", "11 Backing_Vocals", "12 Vocals (original)"]
VOCALS = "12 Vocals (original)"  # the Narrator, and the generator's attempt at Switch
BACKING = "11 Backing_Vocals"
DRUMS = "10 Drums"
SWITCH_RAW = "audio/switch/raw"  # the child's raw takes: never published, never in the manifest (brief)
V1 = "archive/audio/2026-11-06_v1"  # the first export (superseded 2026-11-06), kept for the timing comparison

# The human's final master (2026-11-08): the generated portions run through the postfilter, Switch's comped takes and
# the sound effects mixed in; the whole master moved later for Logic's barline, and one bar added before V21.
MASTER = "audio/master/Default On (final master).wav"
FX = "audio/master/Default On (FX only).wav"  # the effects alone, for syncing (already in the master)
SWITCH_COMP = "audio/switch/comp/Default On (switch only).wav"  # Switch's comped lines alone (private, like raw)
# v2 -> master clock, measured by cross-correlating the v2 mix against the master (scripts/timing_map.py notes):
# +1.0878 s up to the Narrator's last word, +2.8915 s after it (the added bar, 1.8037 s, sits before V21)
OFFSET_1, OFFSET_2, BAR_AFTER_V2 = 1.0878, 2.8915, 242.55


def v2_to_master(t):
    return None if t is None else round(t + (OFFSET_1 if t <= BAR_AFTER_V2 else OFFSET_2), 3)
