// SceneSpec — the declarative authoring contract for one diagram. Render-free on
// purpose: it describes WHAT a scene contains, not how it paints. Nodes are placed on a
// grid by `cell`; the grid resolver (grid.ts) turns cells into absolute pixel boxes with
// a top-left origin (the corner React Flow will position a node by, in slice 3).

/**
 * 'symbol'    = filled role-colored block: bold title (+ optional `sub` caption).
 * 'term'      = mono filled chip whose text IS the concept (an option/value).
 * 'code'      = an IDE-editor card: window chrome + line-number gutter + the `label`
 *               rendered as SYNTAX-HIGHLIGHTED source (a `sub` becomes a `# comment` line).
 * 'container' = titled box whose `children` lay out INSIDE it (title rides border).
 * 'group'     = invisible arranger: no chrome, only sub-lays out its `children`.
 */
export type NodeKind = 'symbol' | 'term' | 'code' | 'container' | 'group'

export interface SceneNodeSpec {
  id: string
  label: string
  /** [col, row, colSpan?, rowSpan?] within the PARENT's grid (scene grid at top level). */
  cell: [number, number, number?, number?]
  /** A semantic role color from `colors.ts` (driver=BLUE, compute=GREEN, …). */
  color?: string
  kind?: NodeKind
  /** Optional smaller caption under the label. */
  sub?: string
  /** Optional data type / role tag for a `term` used as an ERD table row — rendered
   *  right-aligned and dimmed on the SAME line (e.g. `customer_key` … `int PK`). */
  type?: string
  /** Optional icon name (see engine/icons, added later) for a `symbol` node. */
  icon?: string
  /** Filename shown in the window-chrome tab of a `code` node (e.g. `query.py`). */
  filename?: string
  /** Render the icon to the LEFT of the label (instead of above), for short-but-wide boxes. */
  iconInline?: boolean
  /** Render a MONOGRAM badge instead of a lucide icon — the service-tile look. `symbol` only. */
  mono?: boolean
  /** Inner grid for this node's `children`, resolved inside this node's box. */
  layout?: SceneGrid
  /** Child nodes laid out inside this node's box via `layout`. */
  children?: SceneNodeSpec[]
}

export interface SceneEdgeSpec {
  from: string
  to: string
  label?: string
  /** Animate a slow dot along this edge as a gentle directional cue. Default true. */
  animated?: boolean
}

export interface SceneGrid {
  /** Column tracks: a count `n` = n equal columns, or an array of relative weights. */
  cols: number | number[]
  /** Row tracks — same rule as `cols`. */
  rows: number | number[]
  /** Gap between tracks, in grid units (1 unit = one weight-1 track). Default 0.2. */
  gap?: number
  /** Inner padding, in grid units. Default 0.4. */
  padding?: number
}

export interface SceneSpec {
  id: string
  title: string
  grid: SceneGrid
  nodes: SceneNodeSpec[]
  edges: SceneEdgeSpec[]
  /** Logical canvas the grid resolves into; aspect should match the grid so cells stay
   *  square. A later fitView scales it into the scene pane. */
  canvas: { width: number; height: number }
}
