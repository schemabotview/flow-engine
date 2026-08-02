// The reveal fold — the single most load-bearing principle (see CLAUDE.md):
//
//   "What's revealed at beat i" = fold deltas [0 … i] from the scene's first beat.
//
// Reveal state is a PURE FUNCTION of the beat index, never mutated forward per tick.
// That makes ←/→ paging, capture-mode seeking, and reload/deep-link all automatically
// correct — each is just "set i, recompute". Get this wrong and capture frames lie.

/** A beat = one narration line + one reveal delta (a list of deltas fired together). */
export interface Beat {
  line: string
  delta: RevealDelta[]
}

/**
 * The verb set — small and ADDITIVE (reveal only ever accumulates within a scene; there
 * are no un-reveal verbs).
 *  - solidify: fill in node id(s) — the dominant verb.
 *  - draw:     mark edge(s) drawn, as [from, to] pairs.
 *  - pulse:    momentary emphasis on node id(s) — applies to the CURRENT beat only.
 *  - annotate: show a runtime value on a node (state changing over time — the Trace tell).
 *  - pan:      move the camera to frame a node/group id.
 */
export type RevealDelta =
  | { kind: 'solidify'; ids: string[] }
  | { kind: 'draw'; edges: [string, string][] }
  | { kind: 'pulse'; ids: string[] }
  | { kind: 'annotate'; id: string; value: string }
  | { kind: 'pan'; to: string }

/** The folded reveal at a beat. `nodes`/`edges`/`annotations` ACCUMULATE across [0…i];
 *  `pulse` is momentary (beat i only); `camera` is the most recent pan (last wins). */
export interface RevealState {
  /** Solidified node ids — the ghost gate: anything NOT here renders ghosted. */
  nodes: Set<string>
  /** Drawn edge keys `${from}->${to}`. */
  edges: Set<string>
  /** node id → value to display (later annotate on the same id overwrites). */
  annotations: Map<string, string>
  /** Node ids emphasised at THIS beat only (not accumulated). */
  pulse: Set<string>
  /** Most recent pan target across [0…i], or null if never panned. */
  camera: string | null
}

/** The edge key convention shared with sceneGraph's edge lookup. */
export const edgeKey = (from: string, to: string) => `${from}->${to}`

/**
 * Fold beats [0…index] into the reveal state. `index` is clamped to the beat range; an
 * index below 0 (before the first beat) yields the empty state (nothing revealed).
 */
export function revealAt(beats: Beat[], index: number): RevealState {
  const nodes = new Set<string>()
  const edges = new Set<string>()
  const annotations = new Map<string, string>()
  let camera: string | null = null

  const upto = Math.min(index, beats.length - 1)
  for (let i = 0; i <= upto; i++) {
    for (const d of beats[i].delta) {
      switch (d.kind) {
        case 'solidify':
          for (const id of d.ids) nodes.add(id)
          break
        case 'draw':
          for (const [from, to] of d.edges) edges.add(edgeKey(from, to))
          break
        case 'annotate':
          annotations.set(d.id, d.value)
          break
        case 'pan':
          camera = d.to
          break
        case 'pulse':
          break // momentary — resolved from the current beat only, below
      }
    }
  }

  // Pulse is emphasis for the beat the viewer is ON, so it reads from beat `upto` alone
  // rather than the accumulation — paging away from a beat drops its pulse.
  const pulse = new Set<string>()
  if (upto >= 0) {
    for (const d of beats[upto].delta) {
      if (d.kind === 'pulse') for (const id of d.ids) pulse.add(id)
    }
  }

  return { nodes, edges, annotations, pulse, camera }
}
