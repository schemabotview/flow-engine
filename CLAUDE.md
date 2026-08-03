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
- **Capture surface** (`?capture=1`): the player exposes `window.__capture` for a headless recorder
  (`CaptureApi`, exported). `plan()` → one entry per section `{ section, id, scene, beats }`; `seek`
  jumps the cursor and fits the camera **instantly**; `transition(s, b, ms)` jumps and **animates**
  the fit over `ms` from the current viewport (the per-section pan the recorder captures during the
  bell lead). `window.__captureReady` flips true once the seeked frame has painted — the recorder
  awaits it before rolling. Narration + key transport go inert in capture mode.
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

- **Ghost-and-solidify + focus states**: `SceneViewer` draws every scene element. Three node states
  (`sceneGraph.toFlowNodes` → `SceneNode` CSS classes): **ghost** = not in the reveal set (unrevealed
  skeleton); **lit** (`--lit`) = revealed AND in the section's focus band (emphasised in its own
  semantic color); **dimmed** (`--dimmed`) = revealed but out of focus (a past band). Edges dim to
  match. Not blur.
- **Per-section camera** (`SceneViewer` `Camera`): frames the section's `focus` band via
  `rf.fitBounds(rect)`, where `rect` is the union of the grid-resolved boxes for the focus ids —
  **not** React Flow's measured node sizes (flat custom-sized nodes never settle, so `fitView({nodes})`
  / `useNodesInitialized` silently no-op; `fitBounds` on our own rect + a `requestAnimationFrame` is
  reliable). Empty focus → whole-scene fit (the ghosted "overview" opener). `RevealPlayer` resolves a
  section's focus via `sectionFocus` (default = the nodes it solidifies; `Section.focus` overrides).
- **Reveal = pure fold of the beat index** (`reveal.ts` `revealAt`): never mutated forward. Nav
  (`nav.ts`) folds across a *scene run* (consecutive same-scene sections accumulate; a scene change
  resets to fully ghosted). This purity is what makes capture-seek and reload truthful.
- **Reveal verbs** (`RevealDelta`): `solidify` · `draw` (edge) · `pulse` · `annotate` · `pan`.
  Additive only. `solidify`/`draw` render today; `pulse`/`annotate`/`pan` are folded but **not yet
  drawn** (the per-section camera is separate from the per-beat `pan` verb, which is still deferred).
- **Slide** (`SlidePane`): the right pane renders `slide.body` (a Markdown string) with
  `react-markdown` + `remark-gfm`; generic element CSS in `player.css` (`.slide__body h3/ul/li/…`)
  styles it, so authors write Markdown, not per-element markup.
- **Narration** (`useNarration`): one `<audio>`; a beat fires when its clip starts, clip length is
  the timing (no timestamps); clip-end auto-advances the beat.

## Theme & typography (implements the canonical palette in `../CLAUDE.md`)

The Zed-slate palette lives in `engine/scene.css` (diagram) + `frame/player.css` (stage/slide).
Fonts are the *consumer's* responsibility (the concept app self-hosts Plex and sets `body`
font-family); the engine only references the family names (`'IBM Plex Mono'` for code/sub/type/
container-title; node labels + slide inherit the app's Plex Sans).

Scene typography (calm, uniform — `engine/scene.css` + `engine/fitFont.ts`):
- Node labels: **weight 600** (symbol *and* term unified — no 400/700 split), auto-fit **capped 18px**.
- `fitLabelPx(label, w, h, kind, reserveV)` — `SceneNode` passes `reserveV` = the stacked icon's
  height + the sub-label footprint, so **icon + label + sub fits its box** (don't drop this — a flat
  reserve overflows short boxes).
- Sub-labels, ERD types, container titles → **Plex Mono**.
- Edge labels: **13px** (`FlowEdge` `LABEL_BASE`/`MAX`) — clearly secondary to node labels.

**Edge-label layering (behind nodes).** React Flow (basic zIndexMode) assigns: container z `0/1`,
child nodes `+1`, etc.; `.react-flow__nodes` is *not* a stacking context, so each node's inline
z-index competes directly in the viewport context. We layer: container fills `0/1` → **wires z 3**
(`.react-flow__edges`) → **edge labels z 4** (`.react-flow__edgelabel-renderer`) → **leaf node boxes
z 10** (`sceneGraph.toFlowNodes` sets `zIndex: 10` on symbol/term). Net: a wire label reads over the
container background + wire but **tucks behind any leaf box it crosses** (no pill/stamp-on-node). A
label on a crowded/short edge will therefore be mostly hidden — that's a *scene-authoring* signal
(space the nodes or omit the label), not an engine bug.

## Build & release

```bash
npm run build     # Vite lib → dist/flow-engine.js + .css + index.d.ts
```

- **`dist/` is committed.** GitHub install (`npm i github:schemabotview/flow-engine`) resolves the
  committed `dist` via `exports` — no build-on-install. **After changing `src/`, rebuild and commit
  `dist/`**, or consumers won't see the change.
- Peers (`react`, `react-dom`, `@xyflow/react`, `lucide-react`) are externalized — the consumer
  provides them. `react-markdown` + `remark-gfm` (for the Markdown slide) are **bundled into `dist`**,
  so concept apps need no extra install.
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
- Rendering of `pulse` / `annotate` / the per-*beat* `pan` camera. `annotate` visual is an open
  question (badge? inline?).
- **Done (was deferred):** per-section camera (`fitBounds` to the focus band) + focus-dim
  (ghost/lit/dimmed). Still deferred: a **timed two-phase intro** (auto overview → Ken-Burns); today
  the "overview" is authored as a section with empty focus, and the camera moves on section change.
- **Done (was deferred):** capture mode — the `?capture=1` `window.__capture` surface (`plan`/`seek`/
  `transition`) + the `__captureReady` handshake, driven **preload + seek** off the pure fold (never
  off the audio `ended` event — a failed live fetch would hang the recording). The recorder lives in
  `schemabotview.github.io/capture` (`record-course.mjs`); `transition` powers the per-section pan it
  records under each section's bell lead.

## Working agreement (HARD RULE)

One reviewed slice at a time: propose → approve → implement → stop for review. Explain before writing.
No silent scaffolding.
