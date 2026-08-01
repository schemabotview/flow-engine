import { MarkerType, type Edge, type Node } from '@xyflow/react'
import type { SceneNodeSpec, SceneSpec } from './types.ts'
import { tracks, type Box } from './grid.ts'
import { GRAY, EDGE } from './colors.ts'
import { edgeKey } from './reveal.ts'
import type { SceneNodeData } from './SceneNode.tsx'

// Pure mapping: a resolved SceneSpec → the React Flow nodes[]/edges[] arrays. No React,
// no state — SceneViewer just memoizes the output.
//
// The ghost gate: `nodes` = null = every element solid (no reveal in play); a Set = those
// ids are solid and everything else renders GHOSTED (the faint skeleton a reveal builds
// up from). These sets come from the reveal fold (reveal.ts) keyed by the beat index. An
// edge is solid when BOTH its endpoints are revealed OR an explicit `draw` (in `drawn`)
// covers it.

/** Wider-than-tall grids flow left→right (handles on L/R); else top→bottom. */
export const sceneDirection = (scene: SceneSpec): 'horizontal' | 'vertical' =>
  tracks(scene.grid.cols).length > tracks(scene.grid.rows).length ? 'horizontal' : 'vertical'

/** Flatten the scene tree, parent before each of its children (depth-first). */
function flatten(nodes: SceneNodeSpec[]): SceneNodeSpec[] {
  const out: SceneNodeSpec[] = []
  for (const n of nodes) {
    out.push(n)
    if (n.children?.length) out.push(...flatten(n.children))
  }
  return out
}

export function toFlowNodes(
  scene: SceneSpec,
  boxes: Record<string, Box>,
  direction: 'horizontal' | 'vertical',
  nodes: Set<string> | null,
): Node<SceneNodeData>[] {
  return flatten(scene.nodes).map((n) => {
    const box = boxes[n.id]
    return {
      id: n.id,
      type: 'scene',
      position: { x: box.x, y: box.y },
      draggable: false,
      selectable: false,
      data: {
        label: n.label,
        sub: n.sub,
        type: n.type,
        color: n.color ?? GRAY,
        kind: n.kind ?? 'symbol',
        direction,
        width: box.w,
        height: box.h,
        ghosted: nodes ? !nodes.has(n.id) : false,
      },
    }
  })
}

export function toFlowEdges(
  scene: SceneSpec,
  nodes: Set<string> | null,
  drawn: Set<string> | null,
): Edge[] {
  return scene.edges.map((e, i) => {
    const solid =
      !nodes || (nodes.has(e.from) && nodes.has(e.to)) || (drawn?.has(edgeKey(e.from, e.to)) ?? false)
    return {
      id: `${e.from}-${e.to}-${i}`,
      source: e.from,
      target: e.to,
      type: 'flow',
      data: { color: EDGE, animated: e.animated, label: e.label, ghosted: !solid },
      markerEnd: { type: MarkerType.ArrowClosed, color: EDGE },
    }
  })
}
