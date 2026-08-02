# flow-engine

The shared **progressive-reveal engine** for [GraphL](https://github.com/schemabotview) — React +
React Flow rendering, a pure reveal fold, per-beat narration, and a `<RevealPlayer>` component that
assembles a flow/pattern diagram beat-by-beat in sync with narration.

It's a **library**: each concept (e.g. [`apache-spark`](https://github.com/schemabotview/apache-spark))
is its own app that installs this engine and supplies its own scenes, course, and audio.

## Install

```bash
npm install github:schemabotview/flow-engine react react-dom @xyflow/react lucide-react
```

The built `dist/` is committed, so GitHub install needs no build step. `react`, `react-dom`,
`@xyflow/react`, and `lucide-react` are peer dependencies. (`react-markdown` + `remark-gfm`, used by
the Markdown slide, are bundled into `dist` — no extra install.)

## Use

```tsx
import { RevealPlayer, container, wgrid, BLUE, type Course, type SceneSpec } from 'flow-engine'
import 'flow-engine/styles.css'

const scene: SceneSpec = { /* … authored with container / wgrid / colors … */ }
const course: Course = { concept: 'My Topic', sections: [ /* slide + beats … */ ] }

export default () => (
  <RevealPlayer
    course={course}
    getScene={(id) => (id === scene.id ? scene : undefined)}
    audioBase=""          // '' = same-origin (serve public/audio/<section>-<beat>.wav)
  />
)
```

`RevealPlayer` owns the fixed 1920×1080 two-pane stage, the (section, beat) cursor, the reveal fold,
the **per-section camera** (frames each section's `focus` band; empty focus = whole-scene overview),
narration, and the SPACE / ← → transport. A section's `slide.body` is **Markdown** (react-markdown +
GFM). The engine ships plain CSS (no Tailwind needed).

## Public API

- `<RevealPlayer>` · `<SceneViewer>` · `<SlidePane>`
- authoring: `container`, `group`, `wgrid`, `getIcon`, color constants
- logic: `revealAt`, `revealForPosition`, `step`, `validateCourse`
- types: `SceneSpec`, `Course`, `Section`, `Slide`, `Beat`, `RevealDelta`, …

## Develop

```bash
npm install
npm run build     # Vite lib → dist/ (flow-engine.js + flow-engine.css + index.d.ts)
```

**After changing `src/`, rebuild and commit `dist/`** — consumers install the committed build.

See `CLAUDE.md` for the architecture, the locked design principles, and what's deferred.
