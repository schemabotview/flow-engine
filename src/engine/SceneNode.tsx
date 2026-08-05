import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { NodeKind } from './types.ts'
import { fitLabelPx, fitTitlePx, fitCodePx, fitTablePx } from './fitFont.ts'
import { getIcon } from './icons.tsx'
import { tokenizeCode } from './codeHighlight.ts'
import { GRAY } from './colors.ts'

/** "ElastiCache" → "El": first letter capitalized, the rest lowercased — the service-tile
 *  monogram when a `mono` symbol has no icon. */
function deriveInitials(label: string, count = 2): string {
  const clean = label.replace(/[^a-zA-Z0-9]/g, '')
  if (!clean) return ''
  return clean.charAt(0).toUpperCase() + clean.slice(1, count).toLowerCase()
}

export interface SceneNodeData {
  label: string
  sub?: string
  type?: string
  icon?: string
  /** Filename shown in the window-chrome tab of a `code` node. */
  filename?: string
  /** For a `table` node: header labels + row data. */
  columns?: string[]
  rows?: string[][]
  iconInline?: boolean
  mono?: boolean
  color: string
  kind: NodeKind
  /** Dominant flow direction of the scene, sets handle placement. */
  direction: 'horizontal' | 'vertical'
  width: number
  height: number
  /** Not yet revealed: render as the faint skeleton (see scene.css .scene-node--ghost). */
  ghosted?: boolean
  /** Revealed AND in the current section's focus band: emphasised (.scene-node--lit). */
  highlighted?: boolean
  /** Revealed but OUT of the current focus (a past era): faded (.scene-node--dimmed). */
  dimmed?: boolean
  [key: string]: unknown
}

// One node in the scene: a calm filled block (symbol), a chip (term), or a titled box
// whose title rides the top-left border (container). A 'group' is an invisible arranger.
// Styling lives in scene.css, driven by the `--node-color` role hue.
export function SceneNode({ data }: NodeProps) {
  const d = data as SceneNodeData

  // A 'group' occupies its box (children lay out inside) but draws no chrome.
  if (d.kind === 'group') {
    return <div className="scene-node scene-node--group" style={{ width: d.width, height: d.height }} />
  }

  // Mutually exclusive reveal/focus states: ghost (unrevealed) · lit (revealed, in focus) ·
  // dimmed (revealed, past era). No class = revealed with no focus in play (base solid).
  const state = d.ghosted
    ? ' scene-node--ghost'
    : d.highlighted
      ? ' scene-node--lit'
      : d.dimmed
        ? ' scene-node--dimmed'
        : ''
  const horizontal = d.direction === 'horizontal'

  // A code node paints as an IDE-editor card (chrome + gutter + syntax-highlighted line),
  // not a role-colored block — a whole separate layout, so branch out early.
  if (d.kind === 'code') return <CodeCard d={d} state={state} horizontal={horizontal} />

  // A table node paints as a titled data grid (header row + cell rows) — its own layout.
  if (d.kind === 'table') return <TableCard d={d} state={state} horizontal={horizontal} />

  const isContainer = d.kind === 'container'
  const mono = d.kind === 'symbol' && !!d.mono
  const Icon = d.kind === 'symbol' || isContainer ? getIcon(d.icon) : undefined
  const iconSize = Math.max(18, Math.min(Math.min(d.width, d.height) * 0.4, 48))
  // Inline (icon/badge-left) mode steals horizontal room from the label, so size the font
  // against the narrower label area to keep it inside the box.
  const inlineIcon = !!((Icon || mono) && d.iconInline)
  // An ERD row: a `term` carrying a right-aligned data type; the name owns ~60% of width.
  const rowType = d.kind === 'term' && !!d.type
  const labelWidth = inlineIcon
    ? Math.max(24, d.width - iconSize - 12)
    : rowType
      ? Math.max(24, d.width * 0.6)
      : d.width
  // Vertical room the label must leave for the STACKED icon and the sub-label, so a
  // node with icon + label + sub fits its box. An inline icon/badge sits beside the
  // label (no vertical cost); a stacked icon or mono badge costs its height + margin.
  const iconReserveV = inlineIcon ? 0 : mono ? iconSize + 4 : Icon ? iconSize + 5 : 0
  const subReserveV = d.sub ? 16 : 0
  const font = isContainer
    ? fitTitlePx(d.label, d.width)
    : fitLabelPx(d.label, labelWidth, d.height, d.kind, iconReserveV + subReserveV)

  return (
    <div
      className={`scene-node scene-node--${d.kind}${mono ? ' scene-node--mono' : ''}${inlineIcon ? ' scene-node--iconh' : ''}${state}`}
      style={{ width: d.width, height: d.height, ['--node-color' as string]: d.color }}
    >
      <Handle type="target" position={horizontal ? Position.Left : Position.Top} className="scene-handle" isConnectable={false} />
      {isContainer ? (
        <span className="scene-node__title" style={{ fontSize: font }}>
          {Icon && <Icon className="scene-node__title-icon" size={Math.round(font * 1.25)} strokeWidth={1.75} />}
          {d.label}
        </span>
      ) : (
        <>
          {mono ? (
            <span className="scene-node__mono" style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.42 }}>
              {Icon ? <Icon size={iconSize * 0.6} strokeWidth={2} /> : deriveInitials(d.label)}
            </span>
          ) : (
            Icon && <Icon className="scene-node__icon" size={iconSize} strokeWidth={1.75} />
          )}
          {rowType ? (
            <span className="scene-node__row">
              <span className="scene-node__label" style={{ fontSize: font }}>{d.label}</span>
              <span className="scene-node__type" style={{ fontSize: font * 0.82 }}>{d.type}</span>
            </span>
          ) : (
            <span className="scene-node__label" style={{ fontSize: font }}>{d.label}</span>
          )}
          {d.sub && <span className="scene-node__sub">{d.sub}</span>}
        </>
      )}
      <Handle type="source" position={horizontal ? Position.Right : Position.Bottom} className="scene-handle" isConnectable={false} />
    </div>
  )
}

SceneNode.defaultColor = GRAY

// The `code` node: a small IDE window. Window chrome (traffic-light dots + a filename tab),
// then a body of numbered lines — line 1 is `label` run through the syntax tokenizer, and an
// optional comment line carries `sub` as `# …`. Ghost/lit/dimmed come in via `state` (scene.css
// mutes the token colors when ghosted). Font is fit so the longest line stays on one row.
function CodeCard({ d, state, horizontal }: { d: SceneNodeData; state: string; horizontal: boolean }) {
  // Multi-line: `label` may carry several lines (split on \n), each numbered in the gutter;
  // a `sub`, if present, trails as one more `# comment` line (kept for single-line back-compat).
  const srcLines = d.label.split('\n')
  const commentChars = d.sub ? d.sub.length + 2 : 0 // "# " + sub
  const maxChars = Math.max(commentChars, ...srcLines.map((l) => l.length))
  const lineCount = srcLines.length + (d.sub ? 1 : 0)
  // Reserve the chrome bar's height and the gutter's width before fitting the code font.
  const barH = Math.max(20, Math.min(d.height * 0.18, 34))
  const gutterW = 30
  // Subtract the code-body's vertical padding (18px top + bottom) so the fit leaves that room.
  const font = fitCodePx(maxChars, d.width - gutterW - 26, d.height - barH - 36, lineCount)

  return (
    <div
      className={`scene-node scene-node--code${state}`}
      style={{ width: d.width, height: d.height, ['--node-color' as string]: d.color }}
    >
      <Handle type="target" position={horizontal ? Position.Left : Position.Top} className="scene-handle" isConnectable={false} />
      <div className="scene-node__code-bar" style={{ height: barH }}>
        <span className="scene-node__code-dots">
          <i style={{ background: '#ff5f56' }} />
          <i style={{ background: '#ffbd2e' }} />
          <i style={{ background: '#27c93f' }} />
        </span>
        {d.filename && <span className="scene-node__code-file">{d.filename}</span>}
      </div>
      <div className="scene-node__code-body" style={{ fontSize: font }}>
        {srcLines.map((line, li) => (
          <div className="scene-node__code-line" key={li}>
            <span className="scene-node__code-gutter">{li + 1}</span>
            <span className="scene-node__code-src">
              {tokenizeCode(line).map((t, ti) => (
                <span key={ti} className={`tok-${t.cls}`}>{t.text}</span>
              ))}
            </span>
          </div>
        ))}
        {d.sub && (
          <div className="scene-node__code-line">
            <span className="scene-node__code-gutter" />
            <span className="scene-node__code-src tok-comment">{`# ${d.sub}`}</span>
          </div>
        )}
      </div>
      <Handle type="source" position={horizontal ? Position.Right : Position.Bottom} className="scene-handle" isConnectable={false} />
    </div>
  )
}

// A data table: a title bar + a `columns` header row + `rows` of cells — a real grid look for
// showing sample DATA (rows/columns), distinct from a schema drawn as container + `term` rows.
function TableCard({ d, state, horizontal }: { d: SceneNodeData; state: string; horizontal: boolean }) {
  const cols = d.columns ?? []
  const rows = d.rows ?? []
  const Icon = getIcon(d.icon)
  const titleH = Math.max(22, Math.min(d.height * 0.16, 40))
  const maxRowChars = Math.max(cols.join('   ').length, ...rows.map((r) => r.join('   ').length), 1)
  const font = fitTablePx(cols.length, rows.length, maxRowChars, d.width, d.height - titleH)

  return (
    <div
      className={`scene-node scene-node--table${state}`}
      style={{ width: d.width, height: d.height, ['--node-color' as string]: d.color }}
    >
      <Handle type="target" position={horizontal ? Position.Left : Position.Top} className="scene-handle" isConnectable={false} />
      <div className="scene-node__table-title" style={{ height: titleH }}>
        {Icon && <Icon className="scene-node__title-icon" size={Math.round(titleH * 0.5)} strokeWidth={1.75} />}
        {d.label}
      </div>
      <div className="scene-node__table-wrap" style={{ fontSize: font }}>
        <table className="scene-node__table">
          <thead>
            <tr>{cols.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>{r.map((cellv, ci) => <td key={ci}>{cellv}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <Handle type="source" position={horizontal ? Position.Right : Position.Bottom} className="scene-handle" isConnectable={false} />
    </div>
  )
}
