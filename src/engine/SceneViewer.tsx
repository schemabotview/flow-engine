import { useEffect, useMemo } from 'react'
import { ReactFlow, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { SceneSpec } from './types.ts'
import type { RevealState } from './reveal.ts'
import { resolveGrid, type Box } from './grid.ts'
import { sceneDirection, toFlowNodes, toFlowEdges } from './sceneGraph.ts'
import { SceneNode } from './SceneNode.tsx'
import { FlowEdge } from './FlowEdge.tsx'
import './scene.css'

const nodeTypes = { scene: SceneNode }
const edgeTypes = { flow: FlowEdge }

// Camera padding: a touch more breathing room when framing a focus cluster than when
// fitting the whole scene (a cluster edge-to-edge reads cramped).
const WHOLE_PADDING = 0.08
const FOCUS_PADDING = 0.22
const FIT_MS = 550

/** Union of boxes → a viewport rect, or null if empty. */
function unionBox(bs: Box[]): { x: number; y: number; width: number; height: number } | null {
  if (!bs.length) return null
  const minX = Math.min(...bs.map((b) => b.x))
  const minY = Math.min(...bs.map((b) => b.y))
  const maxX = Math.max(...bs.map((b) => b.x + b.w))
  const maxY = Math.max(...bs.map((b) => b.y + b.h))
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
}

// The camera (rendered INSIDE <ReactFlow>, so `useReactFlow()` is live). It frames the
// `focus` union box — computed straight from the grid-resolved boxes — via `fitBounds` on
// our own rect. Crucially there is NO dependence on React Flow measuring nodes: this scene
// renders flat, custom-sized nodes whose measurement never settles, so the measured-size
// path (`fitView({nodes})` / `useNodesInitialized`) silently no-ops. `fitBounds(rect)` needs
// only the pane's own size, which the rAF defers a frame for. Re-fits whenever the focus id
// set changes — i.e. per section — which is the Ken-Burns pan paging drives.
function Camera({ boxes, focusIds }: { boxes: Record<string, Box>; focusIds: string[] }) {
  const rf = useReactFlow()
  const key = focusIds.join(',')
  useEffect(() => {
    const framed = focusIds.map((id) => boxes[id]).filter(Boolean) as Box[]
    const rect = unionBox(framed.length ? framed : Object.values(boxes))
    if (!rect) return
    const padding = framed.length ? FOCUS_PADDING : WHOLE_PADDING
    const raf = requestAnimationFrame(() => rf.fitBounds(rect, { padding, duration: FIT_MS }))
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, boxes, rf])
  return null
}

// Draw one scene: resolve the grid to pixel boxes, map to RF nodes/edges. `reveal` (the
// fold of the beat index, from reveal.ts) gates the ghost skeleton — null = every element
// solid; a RevealState = its `nodes`/`edges` are solid, the rest ghosted. Camera framing
// is `focus`: the per-section node ids to fit (empty → whole scene). Annotation/pulse
// rendering composes later.
export function SceneViewer({
  scene,
  reveal = null,
  focus = [],
}: {
  scene: SceneSpec
  reveal?: RevealState | null
  focus?: string[]
}) {
  const direction = sceneDirection(scene)
  const boxes = useMemo(() => resolveGrid(scene.nodes, scene.grid, scene.canvas), [scene])
  // The focus band as a Set — drives both the camera framing and the lit/dimmed node states.
  const focusSet = useMemo(() => (focus.length ? new Set(focus) : null), [focus])
  const nodes = useMemo(
    () => toFlowNodes(scene, boxes, direction, reveal?.nodes ?? null, focusSet),
    [scene, boxes, direction, reveal, focusSet],
  )
  const edges = useMemo(
    () => toFlowEdges(scene, reveal?.nodes ?? null, reveal?.edges ?? null, focusSet),
    [scene, reveal, focusSet],
  )

  return (
    <div className="scene-flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
        zoomOnDoubleClick={false}
        minZoom={0.2}
        maxZoom={8}
      >
        <Camera boxes={boxes} focusIds={focus} />
      </ReactFlow>
    </div>
  )
}
