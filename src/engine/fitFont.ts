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

/** Fit a container's on-border TITLE (one nowrap uppercase line) to its box width. */
export function fitTitlePx(label: string, w: number): number {
  const avail = Math.max(w - 8, 6)
  const px = avail / (Math.max(label.length, 1) * 0.86) // uppercase + letter-spacing runs wide
  return Math.max(4, Math.min(px, 16))
}
