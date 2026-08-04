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
  focus: Set<string> | null,
): Node<SceneNodeData>[] {
  // Three mutually exclusive states (see SceneNode / scene.css): a node not in `nodes` is
  // GHOST (unrevealed); a revealed node in `focus` is LIT (current era); a revealed node
  // outside `focus` is DIMMED (a past era). With no focus in play, revealed nodes stay base
  // solid (highlighted/dimmed both false), preserving pre-focus behavior.
  const hasFocus = !!focus && focus.size > 0
  return flatten(scene.nodes).map((n) => {
    const box = boxes[n.id]
    const revealed = nodes ? nodes.has(n.id) : true
    const inFocus = hasFocus ? focus!.has(n.id) : true
    // Leaf boxes (symbol/term) ride above the edge-label layer (z 4, scene.css) so a wire
    // label tucks BEHIND the node it crosses; containers/groups stay on their default low z
    // so labels read over their background. See scene.css .react-flow__edgelabel-renderer.
    const kind = n.kind ?? 'symbol'
    const isLeaf = kind === 'symbol' || kind === 'term' || kind === 'code'
    return {
      id: n.id,
      type: 'scene',
      position: { x: box.x, y: box.y },
      draggable: false,
      selectable: false,
      zIndex: isLeaf ? 10 : undefined,
      data: {
        label: n.label,
        sub: n.sub,
        type: n.type,
        icon: n.icon,
        filename: n.filename,
        iconInline: n.iconInline,
        mono: n.mono,
        color: n.color ?? GRAY,
        kind: n.kind ?? 'symbol',
        direction,
        width: box.w,
        height: box.h,
        ghosted: !revealed,
        highlighted: revealed && hasFocus && inFocus,
        dimmed: revealed && hasFocus && !inFocus,
      },
    }
  })
}

export function toFlowEdges(
  scene: SceneSpec,
  nodes: Set<string> | null,
  drawn: Set<string> | null,
  focus: Set<string> | null,
): Edge[] {
  const hasFocus = !!focus && focus.size > 0
  return scene.edges.map((e, i) => {
    const solid =
      !nodes || (nodes.has(e.from) && nodes.has(e.to)) || (drawn?.has(edgeKey(e.from, e.to)) ?? false)
    // A solid edge whose endpoints are BOTH out of the current focus band recedes with its
    // nodes (a past era) — dimmed, not ghost.
    const dimmed = solid && hasFocus && !focus!.has(e.from) && !focus!.has(e.to)
    return {
      id: `${e.from}-${e.to}-${i}`,
      source: e.from,
      target: e.to,
      type: 'flow',
      data: { color: EDGE, animated: e.animated, label: e.label, ghosted: !solid, dimmed },
      markerEnd: { type: MarkerType.ArrowClosed, color: EDGE },
    }
  })
}
