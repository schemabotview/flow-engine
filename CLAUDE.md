# CLAUDE.md — graphl-flow (progressive-reveal design/spec)

This repo holds the **design and implementation notes** for GraphL's progressive-reveal layer: the
system that turns a static left-pane scene into a flow/pattern diagram **assembled beat-by-beat** in
sync with narration. It is a spec, not an app — the code lands in `graphl-render-app` (engine) and is
consumed by `graphl-capture-app` (recording). Read `README.md` first for the one-page product framing;
this file is the working context and the contract details for future sessions.

> Parent context: the umbrella `Workspace/CLAUDE.md` describes GraphL overall (concept → module →
> section; the `md → (slide, tts, wav)` bundle; app-owned scenes; GitHub-only content wiring). This
> file **extends** that model with reveal; it does not replace it.

---

## Working agreement (inherited HARD RULE)

Same as the parent workspace: the owner drives, **one reviewed slice at a time**. Propose → approve →
implement one small slice → stop for review → continue. Explain before writing. No silent scaffolding.
One concept per slice.

---

## What this adds to the domain model

The existing bundle is `md` (source of truth) → `slide` (right pane) + `tts` (narration) + `wav`
(audio). graphl-flow changes **one** of those and adds **one** validated reference:

- **`tts`/beats merge into a single ordered list** per section: `[(line, reveal-delta), …]`.
  - **Map** section → list length **1** (the whole section is one beat).
  - **Trace** section → list length **N** (one beat per program step).
- **`wav` becomes per-beat clips** (natural for Chatterbox; one short clip per line).
- **`slide`** and **`md`** are unchanged in role.
- Scenes stay **app-owned TypeScript**, referenced by **raw id** — see the contract below.

### The two scene archetypes (drives everything)

- **Map (Type A / structural)** — reveal per section, coarse. Nodes are components/layers. Dominant
  verb `solidify`.
- **Trace (Type B / execution)** — reveal per beat, fine, timed to narration. Nodes are runtime
  entities (threads, RDDs, variables, stages). Needs `annotate` (state changing over time) — that's
  the tell that a Trace scene is teaching something a static diagram can't.

Reusable module rhythm: **Origin Map → Architecture Map → Syntax Trace → [hard concept] Trace.**

---

## The content ↔ scene contract (decided)

**Beats reference raw node ids** — consistent with how the manifest already wires `focus` and
`highlight`. No separate "reveal API" / declared id set; a beat may name any element id in its scene.

Consequences to honor:

1. **The ghost model enumerates the id set for free.** Because ghost-and-solidify draws *every*
   element from the start (dimmed), the scene already lists all its ids. The validator's "valid set"
   *is* "the scene's nodes/edges/containers" — no separate list to maintain.
2. **Beats are a second content→scene reference surface** (the first is manifest `scene`/`focus`/
   `highlight`). Renaming a scene node can silently break content beats.
3. **Ship a content-lint validator:** every beat id must exist in its scene's element set. Treat it
   like a foreign-key check — fail loud at build/load, not silently at play time.

Because beat-derivation must name real scene ids, **the AI pass that derives beats from the `md` needs
the scene definition as an input**, not just the `md`. The `md` alone doesn't know a scene's node ids.

---

## The reveal engine (implementation notes)

### Ghost, then solidify — NOT blur
Draw the full skeleton at low opacity (~0.15–0.2: dim outlines, dashed edges, empty containers). Each
beat *fills in* its target (semantic color + full opacity + label). Blur was **evaluated and rejected**
(mud under H.264, wasted bitrate on sharp/blurry gradients, reads as "ignore me" not "coming"). This
also composes with the existing focus model already in render-app (brighten focused, dim rest ~0.28).

### A beat is a narration line
`1 beat = 1 narration line + 1 reveal delta`. Same segmentation for storyboard, tts, and reveal.
- A beat fires when its **narration clip starts**; clip length *is* the timing. **No timestamp
  anchors** — regenerated audio never drifts.
- Reuse render-app's `useNarration` auto-advance: **beat→beat = the same "clip ended → next" logic as
  section→section**, one level deeper. Map sections (length-1 list) behave exactly as today.

### Reveal deltas (keep the verb set small + additive)
`solidify` · `draw` (edge) · `pulse`/`highlight` · `annotate` (show a value on a node) · `pan` (camera).
Reveal only *accumulates* within a scene — no un-reveal verbs.

### Reveal state = pure function of beat index (CRITICAL)
Never mutate reveal forward per tick. "What's revealed at beat *i*" = **fold deltas `[0 … i]`** from
the scene's first beat. It's cheap (a handful of deltas) and makes all of these automatically correct
because they're each just *"set i, recompute"*:
- **← / → paging** (owner re-watches a beat)
- **capture-mode seeking** (recorder teleports to a beat and needs a truthful frame)
- **reload / deep-link** (landing mid-scene shows the right partial reveal)

This is the single most load-bearing principle for capture; get it wrong and capture frames lie.

### Scene = the reset/accumulation boundary
Reveal builds up across the sections that share one scene. A **new scene enters fully ghosted** and
builds fresh — a Trace scene is never polluted by a prior Map scene's revealed state. "One assembling
pattern per scene."

---

## Authoring model (decided)

**Authored beats — a storyboard derived from the `md`** (not instrumented from a real program run).

- Fits the existing `md → …` derivation pipeline: beats become another derivation, alongside slide
  and tts, taking `md` + the scene definition as inputs.
- Instrumented execution traces (actually running the code and capturing a real trace) are a **v2
  dream**, explicitly out of scope for v1 — they only work for instrumentable programs and are a whole
  separate tooling effort.

---

## Suggested build order (Map first, cheap → Trace later, rich)

1. **Map-scene reveal** — coarse per-section ghost-and-solidify. Covers every architecture/invention
   section. Cheapest; reuses focus model + section auto-advance almost as-is.
2. **Per-beat narration** — split a section's tts/wav into an ordered `(line, delta)` list; extend
   `useNarration` to advance beats; make reveal a pure fold of the beat index.
3. **Trace-scene reveal** — `annotate` and live state; the multithreading/streaming money shots.
4. **Validator** — content-lint that every beat id exists in its scene.

**Prototype gate before any code:** take **one real module** (e.g. a `ITC-bigdata` data-modeling
module, or a Spark module) and **storyboard its beats by hand** — does the section/beat order produce
a build sequence that *teaches*, or is the reveal arbitrary? If it feels forced by hand, the fix is in
how content maps to the diagram, not in the engine.

---

## Open items / decisions still to make

- **Scene entry state:** does a scene enter with *everything* ghosted and beat 1 solidifies the entry
  point, or is the entry node pre-solid? (Leaning: fully ghosted, beat 1 solidifies entry.)
- **Beat-file format & location:** where the `(line, delta)` list physically lives in the content repo
  and how it names its scene.
- **`annotate` rendering:** how runtime values attach to a node visually (badge? inline label? side
  panel?) without hurting legibility after video re-encoding.
- **Validator home:** content-repo build step vs. render-app load-time check vs. both.

---

## Decisions already locked (do not relitigate)

- Ghost-and-solidify, **not** blur.
- **Authored** beats (storyboard from `md`), not instrumented.
- Beats reference **raw node ids**; a validator catches drift (no declared reveal-API).
- Reveal state is a **pure fold of the beat index**, never mutated forward.
- **Scene** is the reveal accumulation/reset boundary.
- `1 beat = 1 narration line + 1 reveal delta`; timing comes from clip length, not timestamps.
