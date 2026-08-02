import type { Section } from './types.ts'
import type { SceneSpec, SceneNodeSpec } from '../engine/types.ts'
import type { RevealDelta } from '../engine/reveal.ts'
import { edgeKey } from '../engine/reveal.ts'

// Content-lint: beats reference raw scene node ids (the contract in CLAUDE.md), so a
// second content→scene reference surface exists — renaming a scene node can silently
// break a beat. Treat it like a FOREIGN-KEY check: every id a beat names must exist in
// its scene's element set, and every drawn edge must be a real scene edge. Fail loud at
// build/load, not silently at play time. Because the app is one project (scenes + content
// together), this is a compile/load-time check, not a runtime fetch validation.

/** Flatten every node id in a scene (the "valid set" — the scene enumerates its ids for
 *  free because ghost-and-solidify draws every element from the start). */
export function sceneNodeIds(scene: SceneSpec): Set<string> {
  const ids = new Set<string>()
  const walk = (nodes: SceneNodeSpec[]) => {
    for (const n of nodes) {
      ids.add(n.id)
      if (n.children?.length) walk(n.children)
    }
  }
  walk(scene.nodes)
  return ids
}

/** The `${from}->${to}` key set of a scene's declared edges. */
function sceneEdgeKeys(scene: SceneSpec): Set<string> {
  return new Set(scene.edges.map((e) => edgeKey(e.from, e.to)))
}

/** Every (id, "how it's used") a single delta references — for node-existence checks. */
function nodeRefs(delta: RevealDelta): string[] {
  switch (delta.kind) {
    case 'solidify':
    case 'pulse':
      return delta.ids
    case 'annotate':
      return [delta.id]
    case 'pan':
      return [delta.to]
    case 'draw':
      return delta.edges.flat()
  }
}

/**
 * Validate a course against the scene registry. Returns a list of human-readable errors
 * (empty = valid). Checks, per beat: (1) every referenced node id exists in the scene;
 * (2) every drawn edge matches a declared scene edge (else the draw is a silent no-op).
 */
export function validateCourse(
  sections: Section[],
  getScene: (id: string) => SceneSpec | undefined,
): string[] {
  const errors: string[] = []
  sections.forEach((section, si) => {
    const where = `§${si + 1} "${section.id}"`
    const scene = getScene(section.scene)
    if (!scene) {
      errors.push(`${where}: references unknown scene "${section.scene}"`)
      return
    }
    const nodeIds = sceneNodeIds(scene)
    const edgeKeys = sceneEdgeKeys(scene)
    section.beats.forEach((beat, bi) => {
      for (const delta of beat.delta) {
        for (const id of nodeRefs(delta)) {
          if (!nodeIds.has(id)) {
            errors.push(`${where} beat ${bi}: ${delta.kind} id "${id}" is not a node in scene "${section.scene}"`)
          }
        }
        if (delta.kind === 'draw') {
          for (const [from, to] of delta.edges) {
            if (!edgeKeys.has(edgeKey(from, to))) {
              errors.push(`${where} beat ${bi}: draw ${from}->${to} has no matching edge in scene "${section.scene}"`)
            }
          }
        }
      }
    })
  })
  return errors
}
