import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { NodeKind } from './types.ts'
import { fitLabelPx, fitTitlePx } from './fitFont.ts'
import { GRAY } from './colors.ts'

// One node in the scene: a calm filled block (symbol), a chip (term), or a titled box
// whose title rides the top-left border (container). A 'group' is an invisible arranger.
// Styling lives in scene.css, driven by the `--node-color` role hue. Icons/mono and the
// highlight/ghost states arrive in later slices — this slice draws full strength.

export interface SceneNodeData {
  label: string
  sub?: string
  type?: string
  color: string
  kind: NodeKind
  /** Dominant flow direction of the scene, sets handle placement. */
  direction: 'horizontal' | 'vertical'
  width: number
  height: number
  /** Not yet revealed: render as the faint skeleton (see scene.css .scene-node--ghost). */
  ghosted?: boolean
  [key: string]: unknown
}

export function SceneNode({ data }: NodeProps) {
  const d = data as SceneNodeData

  // A 'group' occupies its box (children lay out inside) but draws no chrome.
  if (d.kind === 'group') {
    return <div className="scene-node scene-node--group" style={{ width: d.width, height: d.height }} />
  }

  const ghost = d.ghosted ? ' scene-node--ghost' : ''

  const horizontal = d.direction === 'horizontal'
  const isContainer = d.kind === 'container'
  // An ERD row: a `term` carrying a right-aligned data type; the name owns ~60% of width.
  const rowType = d.kind === 'term' && !!d.type
  const labelWidth = rowType ? Math.max(24, d.width * 0.6) : d.width
  const font = isContainer
    ? fitTitlePx(d.label, d.width)
    : fitLabelPx(d.label, labelWidth, d.height, d.kind)

  return (
    <div
      className={`scene-node scene-node--${d.kind}${ghost}`}
      style={{ width: d.width, height: d.height, ['--node-color' as string]: d.color }}
    >
      <Handle type="target" position={horizontal ? Position.Left : Position.Top} className="scene-handle" isConnectable={false} />
      {isContainer ? (
        <span className="scene-node__title" style={{ fontSize: font }}>
          {d.label}
        </span>
      ) : rowType ? (
        <span className="scene-node__row">
          <span className="scene-node__label" style={{ fontSize: font }}>{d.label}</span>
          <span className="scene-node__type" style={{ fontSize: font * 0.82 }}>{d.type}</span>
        </span>
      ) : (
        <>
          <span className="scene-node__label" style={{ fontSize: font }}>{d.label}</span>
          {d.sub && <span className="scene-node__sub">{d.sub}</span>}
        </>
      )}
      <Handle type="source" position={horizontal ? Position.Right : Position.Bottom} className="scene-handle" isConnectable={false} />
    </div>
  )
}

SceneNode.defaultColor = GRAY
