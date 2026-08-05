import type { NodeKind } from './types.ts'

// Proportional label sizing: shrink the font so a label fits its box instead of wrapping
// into garble. Logical px in canvas coords — fitView scales.
//   - 'term' chips render on ONE line (CSS nowrap): size the whole label to the box width.
//   - 'symbol' labels keep the clean word-wrap: size to the longest WORD, two-line budget.
// `reserveV` = vertical px the label must NOT claim: the stacked icon + the sub-label +
// base padding. The caller (SceneNode) knows the real icon size and whether a sub exists,
// so it passes the footprint here — otherwise icon+label+sub overflows a short box.

/** Fit a leaf label ('symbol' / 'term') to its box, leaving `reserveV` for icon + sub. */
export function fitLabelPx(label: string, w: number, h: number, kind: NodeKind, reserveV = 0): number {
  if (kind === 'term') {
    const chars = Math.max(1, label.replace(/\s+/g, ' ').trim().length)
    const byWidth = Math.max(w - 4, 6) / (chars * 0.72)
    const byHeight = Math.max(h - reserveV - 4, 6) / 1.2
    return Math.max(4, Math.min(byWidth, byHeight, 18))
  }
  const words = label.split(/\s+/).filter(Boolean)
  const longest = Math.max(1, ...words.map((word) => word.length))
  const byWidth = Math.max(w - 20, 8) / (longest * 0.72)
  const lines = words.length > 1 ? 2 : 1
  const byHeight = Math.max(h - reserveV - 8, 8) / (lines * 1.25)
  return Math.max(7, Math.min(byWidth, byHeight, 18)) // symbol cap
}

/** Fit a `code` node's source line (monospace, one line, no wrap) to the body area. `chars`
 *  = the longest line's length (code vs its comment); `lines` = how many rows the body holds. */
// Fit a data `table` node: font so the header + `rows` fit the box height, and the widest
// row (in mono chars, plus per-column padding) fits the width. Mono, so width is predictable.
export function fitTablePx(cols: number, rows: number, maxRowChars: number, w: number, h: number): number {
  const byHeight = Math.max(h - 8, 6) / ((rows + 1) * 2.0) // header + N rows, ~2em row box
  const byWidth = Math.max(w - 16, 6) / (Math.max(maxRowChars, 1) * 0.62 + cols * 1.8) // chars + cell padding
  return Math.max(9, Math.min(byHeight, byWidth, 28)) // a data table may grow larger than a code line
}

export function fitCodePx(chars: number, w: number, h: number, lines = 1): number {
  const byWidth = Math.max(w - 8, 6) / (Math.max(chars, 1) * 0.62) // mono advance ≈ 0.62em
  // 1.8 per line ≈ the real rendered line box: line-height 1.5 + the 0.35em inter-line gap.
  // (Under-counting here overflows a multi-line block and clips the last line.)
  const byHeight = Math.max(h - 10, 6) / (lines * 1.8)
  return Math.max(9, Math.min(byWidth, byHeight, 24)) // code cap
}

/** Fit a container's on-border TITLE (one nowrap uppercase line) to its box width. */
export function fitTitlePx(label: string, w: number): number {
  const avail = Math.max(w - 8, 6)
  const px = avail / (Math.max(label.length, 1) * 0.86) // uppercase + letter-spacing runs wide
  return Math.max(4, Math.min(px, 16))
}
