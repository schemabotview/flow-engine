import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  useInternalNode,
  useStore,
  Position,
  type EdgeProps,
  type InternalNode,
  type Node,
} from '@xyflow/react'
import { EDGE } from './colors.ts'

// Edge labels ride the EdgeLabelRenderer, which only TRANSLATES its layer. A fixed-px
// label overpowers the graph when zoomed out, so scale the font with the live camera
// zoom and CLAMP it: proportional to the map, never smaller than legible nor too large.
const LABEL_BASE = 16
const LABEL_MIN = 8
const LABEL_MAX = 16
const labelPx = (zoom: number) => Math.max(LABEL_MIN, Math.min(LABEL_MAX, LABEL_BASE * zoom))

// Floating-edge geometry: connect at the point on each node's border that faces the
// other node, so an edge leaves whichever side actually points at its target. (Standard
// React Flow floating math.)
function borderPoint(node: InternalNode<Node>, other: InternalNode<Node>) {
  const w = (node.measured.width ?? 0) / 2
  const h = (node.measured.height ?? 0) / 2
  const cx = node.internals.positionAbsolute.x + w
  const cy = node.internals.positionAbsolute.y + h
  const ox = other.internals.positionAbsolute.x + (other.measured.width ?? 0) / 2
  const oy = other.internals.positionAbsolute.y + (other.measured.height ?? 0) / 2
  const xx = (ox - cx) / (2 * w) - (oy - cy) / (2 * h)
  const yy = (ox - cx) / (2 * w) + (oy - cy) / (2 * h)
  const a = 1 / (Math.abs(xx) + Math.abs(yy) || 1)
  return { x: w * (a * xx + a * yy) + cx, y: h * (-a * xx + a * yy) + cy }
}

function sideOf(node: InternalNode<Node>, p: { x: number; y: number }): Position {
  const px = node.internals.positionAbsolute.x
  const py = node.internals.positionAbsolute.y
  const w = node.measured.width ?? 0
  if (p.x <= px + 1) return Position.Left
  if (p.x >= px + w - 1) return Position.Right
  if (p.y <= py + 1) return Position.Top
  return Position.Bottom
}

// A calm connector: a plain bezier with an arrowhead + a small slow dot as a gentle
// directional cue. Endpoints float to the facing borders; two ends on the SAME side use
// an orthogonal step so the edge doesn't fold back. The reveal-driven active/dimmed
// states arrive in a later slice — this slice draws the calm "overview" strength.
export function FlowEdge({ id, source, target, data, markerEnd }: EdgeProps) {
  const sourceNode = useInternalNode(source)
  const targetNode = useInternalNode(target)
  const zoom = useStore((s) => s.transform[2])
  if (!sourceNode?.measured.width || !targetNode?.measured.width) return null

  const s = borderPoint(sourceNode, targetNode)
  const t = borderPoint(targetNode, sourceNode)
  const sourcePosition = sideOf(sourceNode, s)
  const targetPosition = sideOf(targetNode, t)
  const geo = { sourceX: s.x, sourceY: s.y, targetX: t.x, targetY: t.y, sourcePosition, targetPosition }
  const [path, labelX, labelY] =
    sourcePosition === targetPosition
      ? getSmoothStepPath({ ...geo, borderRadius: 14, offset: 24 })
      : getBezierPath(geo)

  const color = (data?.color as string) ?? EDGE
  const label = data?.label as string | undefined
  // Ghost: the edge exists in the skeleton but hasn't been drawn — a faint dashed line,
  // no arrowhead, no travelling dot, and its label stays hidden until it solidifies.
  // Dimmed: a drawn edge in a past era (both endpoints out of focus) — solid but faded,
  // no travelling dot or label, so it recedes with its nodes.
  const ghosted = data?.ghosted === true
  const dimmed = data?.dimmed === true
  const showDot = data?.animated !== false && !ghosted && !dimmed

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={ghosted ? undefined : markerEnd}
        style={{
          stroke: color,
          strokeWidth: 1.75,
          opacity: ghosted ? 0.14 : dimmed ? 0.25 : 0.6,
          strokeDasharray: ghosted ? '5 5' : undefined,
        }}
      />
      {showDot && (
        <circle r={3} fill={color} opacity={0.85}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path={path} />
        </circle>
      )}
      {label && !ghosted && !dimmed && (
        <EdgeLabelRenderer>
          <div
            className="scene-edge-label"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`, fontSize: `${labelPx(zoom)}px` }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
