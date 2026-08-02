import type { Beat } from '../engine/reveal.ts'

// The in-repo content model (the "one-project" decision: content lives WITH the app, not
// fetched from a -ct repo). The manifest wires per SECTION; the beat list is the
// per-section ordered [(line, delta)]. Slide + heading are per section; the per-beat
// narration line lives inside each Beat. See CLAUDE.md → domain model.

/** The right-pane slide — one per section, static across the section's beats. `body` is a
 *  curated, one-screen subset of Markdown (headings, lists, tables, bold, code) rendered by
 *  SlidePane via react-markdown + GFM — so authors write content, not per-element markup. */
export interface Slide {
  title: string
  body: string
}

export interface Section {
  /** Slug — also the audio path stem: `audio/<id>-<beatIndex>.wav`. */
  id: string
  heading: string
  /** Scene id, resolved via the scene registry (scenes/index.ts). */
  scene: string
  slide: Slide
  /**
   * The per-section ordered beat list. A Map section has length 1 (the whole section is
   * one beat); a Trace section has length N (one beat per step). Beats reference the
   * scene's raw node ids — a scene may be ridden by many sections, each with its own beats.
   */
  beats: Beat[]
  /** Camera framing (per section) — wired in a later slice. */
  focus?: string | string[]
  highlight?: string[]
}

/**
 * One course = an ordered list of sections. A concept can have several courses (the
 * concept app holds a registry of them); `id` routes to it (#/<id>) and names its audio
 * directory, `title` shows in the index.
 */
export interface Course {
  id: string
  title: string
  sections: Section[]
}
