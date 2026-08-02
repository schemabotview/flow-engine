import { useMemo } from 'react'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { SceneSpec } from './types.ts'
import type { RevealState } from './reveal.ts'
import { resolveGrid } from './grid.ts'
import { sceneDirection, toFlowNodes, toFlowEdges } from './sceneGraph.ts'
import { SceneNode } from './SceneNode.tsx'
import { FlowEdge } from './FlowEdge.tsx'
import './scene.css'

const nodeTypes = { scene: SceneNode }
const edgeTypes = { flow: FlowEdge }

// Draw one scene: resolve the grid to pixel boxes, map to RF nodes/edges, and fitView
// the whole diagram into the pane. `reveal` (the fold of the beat index, from reveal.ts)
// gates the ghost skeleton — null = every element solid; a RevealState = its `nodes`/
// `edges` are solid, the rest ghosted. Annotation/pulse/camera rendering composes later.
export function SceneViewer({ scene, reveal = null }: { scene: SceneSpec; reveal?: RevealState | null }) {
  const direction = sceneDirection(scene)
  const boxes = useMemo(() => resolveGrid(scene.nodes, scene.grid, scene.canvas), [scene])
  const nodes = useMemo(
    () => toFlowNodes(scene, boxes, direction, reveal?.nodes ?? null),
    [scene, boxes, direction, reveal],
  )
  const edges = useMemo(
    () => toFlowEdges(scene, reveal?.nodes ?? null, reveal?.edges ?? null),
    [scene, reveal],
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
        fitView
        fitViewOptions={{ padding: 0.12 }}
        panOnDrag
        zoomOnScroll
        zoomOnDoubleClick={false}
        minZoom={0.2}
        maxZoom={8}
      />
    </div>
  )
}
