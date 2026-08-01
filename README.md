# graphl-flow

**The progressive-reveal layer for GraphL.** It turns a lesson's left-pane scene from static
furniture into the story itself — a flow/pattern diagram that is *assembled in front of the viewer*,
one beat at a time, in sync with the narration.

This repo is the **design + spec** for that layer. It is not (yet) an app. It documents the model,
the content contract, and the reveal engine that `graphl-render-app` and `graphl-capture-app` will
implement.

---

## The problem it fixes

Today a GraphL section shows a **fully-drawn, static** scene on the left and a bullet slide on the
right. Because the scene never changes, all the forward motion lives in the right-pane list — so the
video feels like an **academic index of modules and sections read aloud**. The left half carries no
narrative and barely earns its space.

**graphl-flow makes the scene move.** Each section (and, for richer scenes, each *beat within* a
section) reveals the next node / edge / container. By the end of a scene the whole pattern has been
built up, and the payoff is *"oh — that's the shape of the thing."* Lecture becomes a build.

---

## Two archetypes of scene

Not all scenes reveal the same way. The whole design rests on separating these two:

### Type A — **Map** scenes (structural)
A fixed map of how something is built. The reveal is **spatial** — assemble the architecture piece by
piece and pan across it. Reveal clock is coarse: **one step per section**.

- *Java:* compile → bytecode → interpreter → machine code (+ author, year)
- *Spark:* memory-based engine architecture (+ author, year); the batch API layer; the streaming API layer

### Type B — **Trace** scenes (execution)
The scene is **built by following a program as it runs**. The reveal is **temporal** — it follows
control flow, not a map. Nodes are *runtime entities* (threads, RDDs, variables, stages); state
changes over time. Reveal clock is fine: **many beats per section**, timed to narration.

- *Java:* one canonical program for syntax (variables, conditions, loops)
- *Java:* one canonical program for **multithreading** — threads spawn, share a variable, collide
- *Spark:* one program for ingestion → transformation → actions
- *Spark:* one program for streaming concepts

|                     | Map scene                          | Trace scene                              |
| ------------------- | ---------------------------------- | ---------------------------------------- |
| Reveal driver       | section → section                  | program execution beats                  |
| What a node *is*    | a component / layer                | a runtime entity (thread, RDD, var…)     |
| Best visual         | blueprint filling in with color    | code + a live state graph                |
| Reveal granularity  | coarse (per section)               | fine (per beat, timed to narration)      |
| Tell-tale verb      | `solidify`                         | `annotate` (state changing over time)    |

**Rule of thumb:** if a "program" scene's beats are all `solidify` (pieces just appearing), it's
really a Map scene in a Trace costume. A true Trace scene needs `annotate` — showing *state change*
a static diagram can't.

---

## A reusable module skeleton

Re-read through the two archetypes, a concept's modules fall into a rhythm that works for *any*
language/framework:

1. **Origin Map** — invention, author, year, the compile/execution pipeline *(Type A)*
2. **Architecture Map** — how the runtime/engine is built *(Type A)*
3. **Syntax Trace** — one canonical program, revealed as it runs *(Type B)*
4. **[Hard concept] Trace** — threading / streaming / the money shot *(Type B)*

That map→map→trace→trace rhythm is what makes a series feel *designed* rather than assembled — each
module opens with orientation and pays off with a live trace. It's the direct antidote to the "index"
feeling.

---

## The reveal model in one page

**Ghost, then solidify (not blur).** Draw the full diagram's skeleton from the start at low opacity
(dim outlines, dashed edges, empty containers ~0.15–0.2). As each beat arrives, the relevant element
*fills in* — gains its semantic color, full opacity, its label. Think architect's blueprint filling
in, not a photo coming into focus.

> Blur was considered and **rejected**: it turns to mud under H.264 re-encoding, wastes bitrate on
> sharp/blurry gradients, and reads as "noise to ignore" rather than "structure coming." Ghosting
> keeps the sense of a bigger shape, survives compression, and is *less* code than a blur mask.

**A beat *is* a narration line.** The storyboard, the tts script, and the reveal schedule are the
**same list**:

> **1 beat = 1 narration line + 1 reveal delta**

- A **Map** section's list has length **1** (whole section = one beat).
- A **Trace** section's list has length **N** (one beat per step of the program).

This collapses timing entirely: a beat fires when its narration **clip starts**; the clip's own
length is the timing. No `t=4.2s` anchors to drift when audio is regenerated. It also reuses the
render-app's existing `useNarration` auto-advance — beat→beat is the same "clip ended, go next" logic
as section→section, one level deeper. And Chatterbox generating N short clips per Trace section is
*more* natural than one long blob.

**Reveal deltas** are small and additive (reveal only accumulates within a scene):

- `solidify` — ghosted element → full color + label
- `draw` — an edge (the flow arrives)
- `pulse` / `highlight` — emphasize something already revealed (the collision, the hot path)
- `annotate` — show a value on a node (`counter = 1`, `thread-2 waiting`) — makes a Trace scene alive
- `pan` — camera to the active region

**Reveal state is a pure function of the beat index.** Never mutate reveal forward on each tick.
"What's revealed" = fold all deltas from the scene's first beat up to the current one. This makes
← / → paging, capture-mode seeking, and reload/deep-link all automatically correct — they're each
just *"set index, recompute."*

**The scene is the reset boundary.** Reveal accumulates across the sections that share one scene. A
new scene enters **fully ghosted** and builds fresh. One assembling pattern per scene.

---

## Relationship to the other repos

- **content repos** (`apache-spark-ct`, …) — own the `md → (slide, tts/beats)` derivations. The
  beats/tts merge into one ordered `(line, reveal-delta)` list per section.
- **graphl-render-app** — implements the ghost-and-solidify engine, the beat-driven reveal, and the
  extended `useNarration` that advances beats.
- **graphl-capture-app** — records it; depends on reveal being seekable by beat index.

See `CLAUDE.md` for the working context, the content contract details, and the open items.
