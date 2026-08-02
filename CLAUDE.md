# CLAUDE.md — flow-engine (the shared reveal engine)

The concept-agnostic **progressive-reveal engine** for GraphL: React + React Flow rendering, the
reveal fold, per-beat narration, and a top-level `<RevealPlayer>`. It is a **library** — concept
apps (`apache-spark`, …) install it via GitHub and supply their own scenes + course + audio. This
repo contains **no concept content and no runnable app** (the concept apps are the previews).

> Parent context: `../CLAUDE.md` (workspace overview + the domain model + locked principles).

## Layout

```
flow-engine/
  package.json      name "flow-engine"; exports → dist; peerDeps; Vite lib build
  vite.config.ts    Vite library mode + vite-plugin-dts (rollupTypes)
  tsconfig.json
  dist/             flow-engine.js + flow-engine.css + index.d.ts   ← COMMITTED
  src/
    index.ts        the PUBLIC API barrel (the only thing consumers import)
    engine/         grid resolver, sceneGraph, SceneNode/FlowEdge/SceneViewer,
                    reveal.ts (the fold), colors, fitFont, icons, patterns, scene.css
    content/        types.ts (Course/Section/Slide), nav.ts (scene-run fold), validate.ts
    frame/          RevealPlayer.tsx, SlidePane.tsx, player.css
    hooks/          useNarration.ts
```

## Public API (src/index.ts)

- **`<RevealPlayer course getScene audioBase />`** — the whole playback surface (stage, (section,
  beat) cursor, reveal fold, narration, SPACE/←→ transport). A concept app mounts this.
- **Authoring helpers**: `container` / `group` / `wgrid` (build nested scene grids), the color
  constants (`BLUE`, `GREEN`, …), `getIcon`.
- **Types**: `SceneSpec`, `SceneNodeSpec`, `Course`, `Section`, `Slide`, `Beat`, `RevealDelta`, …
- **Logic**: `revealAt` (fold), `revealForPosition` / `step` (scene-run nav), `validateCourse`.

Consume:
```ts
import { RevealPlayer, container, wgrid, BLUE, validateCourse, type Course } from 'flow-engine'
import 'flow-engine/styles.css'
```

## How it renders (the core)

- **Ghost-and-solidify**: `SceneViewer` draws every scene element; `revealForPosition` returns the
  set of solidified node/edge ids, everything else renders ghosted (faint). Not blur.
- **Reveal = pure fold of the beat index** (`reveal.ts` `revealAt`): never mutated forward. Nav
  (`nav.ts`) folds across a *scene run* (consecutive same-scene sections accumulate; a scene change
  resets to fully ghosted). This purity is what makes capture-seek and reload truthful.
- **Reveal verbs** (`RevealDelta`): `solidify` · `draw` (edge) · `pulse` · `annotate` · `pan`.
  Additive only. `solidify`/`draw` render today; `pulse`/`annotate`/`pan` are folded but **not yet
  drawn**.
- **Narration** (`useNarration`): one `<audio>`; a beat fires when its clip starts, clip length is
  the timing (no timestamps); clip-end auto-advances the beat.

## Build & release

```bash
npm run build     # Vite lib → dist/flow-engine.js + .css + index.d.ts
```

- **`dist/` is committed.** GitHub install (`npm i github:schemabotview/flow-engine`) resolves the
  committed `dist` via `exports` — no build-on-install. **After changing `src/`, rebuild and commit
  `dist/`**, or consumers won't see the change.
- Peers (`react`, `react-dom`, `@xyflow/react`, `lucide-react`) are externalized — the consumer
  provides them.
- **No Tailwind dependency**: the player chrome is plain CSS (`frame/player.css` + `engine/scene.css`)
  bundled into `flow-engine.css`. Consumers import `'flow-engine/styles.css'`; nothing else needed.

## Locked decisions (do not relitigate)

- Ghost-and-solidify, **not** blur. · Reveal is a **pure fold of the beat index**. · **Scene** is the
  accumulation/reset boundary. · Beats reference **raw node ids** (validated, no reveal API). ·
  `1 beat = 1 line + 1 delta`; timing from clip length. · **Authored** beats, not instrumented.
- Engine consumed by **GitHub install** (not npm publish); `dist` committed.
- Scenes live in **concept apps**, not the engine (scenes are per-concept structure).

## Deferred

- **`flow-engine/pure`**: a second, DOM-free entry exporting `validateCourse`/`revealAt`/nav/types/
  authoring helpers (no `@xyflow/react`), so a concept app's CI can run a `node` build-gate on
  beat-id drift. Today the bundle imports React Flow (DOM), so only dev-load validation runs.
- Rendering of `pulse` / `annotate` / `pan`. `annotate` visual is an open question (badge? inline?).
- Camera/focus model (per-section zoom push-in + focus-dim two-phase intro). Only whole-scene fitView.
- Capture mode: `__captureReady` handshake + **preload + seek** off the pure fold (never drive
  capture off the audio `ended` event — a failed live fetch would hang the recording).

## Working agreement (HARD RULE)

One reviewed slice at a time: propose → approve → implement → stop for review. Explain before writing.
No silent scaffolding.
