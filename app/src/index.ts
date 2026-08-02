// Public API of the flow-engine package. Concept apps import their authoring helpers,
// types, components, and reveal/nav logic from here. (The <RevealPlayer> top-level
// component lands in the next slice; for now the surface is the engine primitives.)

// --- Scene authoring model (types) ---
export type { SceneSpec, SceneNodeSpec, SceneEdgeSpec, SceneGrid, NodeKind } from './engine/types.ts'

// --- Authoring helpers ---
export { container, group, wgrid } from './engine/patterns.ts'
export type { WeightedSpec, WeightedSeed, NodeSeed, PatternResult } from './engine/patterns.ts'
export { BLUE, GREEN, ORANGE, PURPLE, TEAL, RED, GRAY, YELLOW, EDGE } from './engine/colors.ts'
export { getIcon } from './engine/icons.tsx'

// --- Grid resolver ---
export { resolveGrid, tracks } from './engine/grid.ts'
export type { Box } from './engine/grid.ts'

// --- Reveal fold (pure function of the beat index) ---
export { revealAt, edgeKey } from './engine/reveal.ts'
export type { Beat, RevealDelta, RevealState } from './engine/reveal.ts'

// --- Content model + navigation (the scene-run fold) ---
export type { Course, Section, Slide } from './content/types.ts'
export { revealForPosition, step, sceneRunStart } from './content/nav.ts'
export type { Position } from './content/nav.ts'
export { validateCourse, sceneNodeIds } from './content/validate.ts'

// --- Components ---
export { SceneViewer } from './engine/SceneViewer.tsx'
export { SlidePane } from './frame/SlidePane.tsx'

// --- Hooks ---
export { useNarration } from './hooks/useNarration.ts'
