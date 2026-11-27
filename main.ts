// Two-Sentence Horror — make.fun entry (u-suroto-two-sentence-horror-acea9253)
// Deterministic, no network: writes exactly one two-sentence horror story
// to /output/entry.txt (gate: UTF-8, 1-400 chars, not only whitespace).
import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "Every night at eleven, my neighbour knocks twice on the wall between our apartments \u2014 our signal that he is still alive. " +
  "His obituary ran on Tuesday, and tonight the knocking came from inside my flat.";

// Self-check the sealed gate before writing: exactly two sentences,
// 1-400 characters, not only whitespace. Fail loudly instead of
// shipping an entry the gate would refuse.
const sentences = STORY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`expected exactly 2 sentences, got ${sentences.length}`);
}
if ([...STORY].length < 1 || [...STORY].length > 400) {
  throw new Error(`story must be 1-400 characters, got ${[...STORY].length}`);
}
if (STORY.trim().length === 0) {
  throw new Error("story must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY + "\n", "utf8");
console.log(STORY);
