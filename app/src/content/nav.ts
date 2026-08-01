import type { Section } from './types.ts'
import { revealAt, type Beat, type RevealState } from '../engine/reveal.ts'

// Course navigation: the (section, beat) cursor and the scene-run reveal fold.
//
// The scene is the reveal accumulation/reset boundary (CLAUDE.md, locked). A "scene run"
// is a maximal run of consecutive sections sharing the same scene id. Reveal accumulates
// across a run and resets at its edge — so a section continuing the previous scene keeps
// its solidified nodes, while a section that switches scenes enters fully ghosted.

export interface Position {
  section: number
  beat: number
}

/** First section index of the scene-run containing section `i`. */
export function sceneRunStart(sections: Section[], i: number): number {
  let start = i
  while (start > 0 && sections[start - 1].scene === sections[i].scene) start--
  return start
}

/**
 * Fold every beat in the current scene-run up to (and including) `pos`. Earlier sections
 * in the run contribute all their beats; the current section contributes beats [0…beat].
 * A fresh run (scene just changed) folds only from its own start → the scene enters
 * ghosted. Pure function of position — paging back re-derives the exact partial reveal.
 */
export function revealForPosition(sections: Section[], pos: Position): RevealState {
  const start = sceneRunStart(sections, pos.section)
  const acc: Beat[] = []
  for (let s = start; s < pos.section; s++) acc.push(...sections[s].beats)
  acc.push(...sections[pos.section].beats.slice(0, pos.beat + 1))
  return revealAt(acc, acc.length - 1)
}

/**
 * Step the cursor by ±1, rolling across section boundaries: past a section's last beat →
 * next section's first beat (and symmetrically for ←). Clamps at the course's very first
 * / last beat (returns the same position, so callers can detect the end).
 */
export function step(sections: Section[], pos: Position, delta: 1 | -1): Position {
  const b = pos.beat + delta
  if (b >= 0 && b < sections[pos.section].beats.length) return { section: pos.section, beat: b }
  if (delta > 0 && pos.section < sections.length - 1) return { section: pos.section + 1, beat: 0 }
  if (delta < 0 && pos.section > 0) {
    return { section: pos.section - 1, beat: sections[pos.section - 1].beats.length - 1 }
  }
  return pos // clamp at course edges
}
