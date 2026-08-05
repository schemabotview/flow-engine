import { useLayoutEffect, useMemo, useState } from 'react'
import { SceneViewer } from '../engine/SceneViewer.tsx'
import type { SceneSpec } from '../engine/types.ts'
import { useNarration } from '../hooks/useNarration.ts'
import { SlidePane } from './SlidePane.tsx'
import type { Course } from '../content/types.ts'
import { revealForPosition, sectionFocus, step, type Position } from '../content/nav.ts'
import './player.css'

// The reusable player: given a Course + a scene resolver + a base URL for audio, it owns
// the whole playback surface — the fixed 1920×1080 two-pane stage, the (section, beat)
// cursor, the scene-run reveal fold, per-beat narration, and the SPACE/←→ transport.
// Concept apps mount THIS; how the Course is obtained (fetched, or imported locally) is
// the app's concern, not the engine's.

// The canonical frame: Full HD, landscape 16:9 (YouTube / Udemy). A capture recorder
// records at a 1920×1080 viewport, so at capture time scale === 1.
const STAGE_W = 1920
const STAGE_H = 1080
const SCENE_W = 1120
const SLIDE_W = STAGE_W - SCENE_W // 800

/** Scale the fixed 1920×1080 stage down to fit the current window (preview only). */
function useFitScale() {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export interface RevealPlayerProps {
  course: Course
  getScene: (id: string) => SceneSpec | undefined
  /** Directory holding this course's clips; a clip resolves as
   *  `${audioBase}/<section-id>-<beatIndex>.wav`. A concept app typically passes
   *  `${import.meta.env.BASE_URL}audio/<courseId>` (per-course audio folder). */
  audioBase: string
}

/** The imperative surface a headless recorder drives in `?capture=1` mode. */
export interface CaptureApi {
  /** The course laid out for the recorder: one entry per section, in order. `scene` lets the
   *  recorder pan only WITHIN a scene (a scene change has no shared band to travel across). */
  plan(): { section: number; id: string; scene: string; beats: number }[]
  /** Jump the cursor to an exact (section, beat) and fit the camera INSTANTLY (a seeked frame
   *  opens already-framed); clears __captureReady until it repaints. */
  seek(section: number, beat: number): void
  /** Like seek, but ANIMATE the camera fit over `ms` from the current viewport — the per-section
   *  transition pan. The recorder positions on the previous band + rolls first, then calls this,
   *  so the Ken-Burns move to this section's band is captured (instead of lost between segments). */
  transition(section: number, beat: number, ms: number): void
}
declare global {
  interface Window {
    __capture?: CaptureApi
    /** Flips true once the fold + camera have painted the seeked frame; the recorder awaits it. */
    __captureReady?: boolean
  }
}

export function RevealPlayer({ course, getScene, audioBase }: RevealPlayerProps) {
  const scale = useFitScale()
  const sections = course.sections

  // Capture mode: a headless recorder deep-drives the player instead of a human. Narration
  // and key transport go inert (the recorder supplies audio + timing by seeking off the pure
  // fold — never off the audio `ended` event). A plain `seek` fits the camera instantly (a
  // seeked frame opens already-framed); a `transition` animates the fit over the sting window,
  // so the per-section pan is recorded instead of lost in the gap between segments.
  const capture = useMemo(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('capture'),
    [],
  )

  // The (section, beat) cursor. ←/→ page beats and roll across section boundaries; reveal
  // is a PURE FOLD over the current scene-run (revealForPosition), never mutated forward.
  const [pos, setPos] = useState<Position>({ section: 0, beat: 0 })
  // Capture-only: the fit duration for the NEXT seek — 0 (instant) for a plain seek, or the
  // pan length for a `transition`. Set alongside `pos` so the Camera fits with the right timing.
  const [captureFitMs, setCaptureFitMs] = useState(0)
  const section = sections[pos.section]
  const scene = section ? getScene(section.scene) : undefined
  const reveal = useMemo(
    () => (section ? revealForPosition(sections, pos) : null),
    [sections, pos, section],
  )

  // Per-section camera framing: the nodes to fit while this section plays (default = the
  // nodes it solidifies; see sectionFocus). Keyed on the section index so the camera moves
  // on a section change and holds steady across the section's beats.
  const focus = useMemo(() => (section ? sectionFocus(section) : []), [section])
  // The lit set — decoupled from the camera frame. When a section sets `highlight`, the camera
  // still frames `focus` (context) but only `highlight` lights; otherwise lit falls back to focus.
  const highlight = useMemo(() => section?.highlight ?? null, [section])

  // Per-beat narration by convention: `<audioBase>/<section-id>-<beatIndex>.wav`. Silenced
  // in capture mode (the recorder muxes the clip; the app never plays or auto-advances).
  const audioUrl = !capture && section ? `${audioBase}/${section.id}-${pos.beat}.wav` : undefined
  const { toggle, stop } = useNarration(audioUrl, () =>
    setPos((p) => {
      const next = step(sections, p, 1)
      if (next.section === p.section && next.beat === p.beat) stop() // clamped at the end
      return next
    }),
  )

  // Transport keys, re-bound each render so they see the latest toggle/stop. Off in capture
  // (the recorder drives the cursor via window.__capture.seek, not the keyboard).
  useLayoutEffect(() => {
    if (capture) return
    const onKey = (e: KeyboardEvent) => {
      if (!sections.length) return
      if (e.key === 'ArrowRight') setPos((p) => step(sections, p, 1))
      else if (e.key === 'ArrowLeft') setPos((p) => step(sections, p, -1))
      else if (e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Capture driver: expose the seek/plan surface and clear the ready flag up front so the
  // recorder never reads a stale `true` from a previous section between its seek and repaint.
  useLayoutEffect(() => {
    if (!capture) return
    window.__captureReady = false
    window.__capture = {
      plan: () => sections.map((s, i) => ({ section: i, id: s.id, scene: s.scene, beats: s.beats.length })),
      seek: (sectionIdx, beat) => {
        window.__captureReady = false
        setCaptureFitMs(0)
        setPos({ section: sectionIdx, beat })
      },
      transition: (sectionIdx, beat, ms) => {
        window.__captureReady = false
        setCaptureFitMs(ms)
        setPos({ section: sectionIdx, beat })
      },
    }
    return () => {
      delete window.__capture
    }
  }, [capture, sections])

  // Ready handshake: after the fold + (instant) camera fit paint the seeked frame, flip
  // __captureReady true. Two rAFs clear the Camera's own one-frame fitBounds defer, so the
  // recorder starts its screencast on a settled, already-framed frame.
  useLayoutEffect(() => {
    if (!capture) return
    window.__captureReady = false
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        window.__captureReady = true
      })
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [capture, pos])

  if (!section) return null

  return (
    <div className="rp-root">
      {/* Sizer occupies the SCALED footprint so the stage centers cleanly; the stage
          itself scales from its top-left corner to fill it. */}
      <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
        <div
          className="rp-stage"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div className="rp-scene-pane" style={{ width: SCENE_W }}>
            {scene && (
              <SceneViewer scene={scene} reveal={reveal} focus={focus} highlight={highlight} fitMs={capture ? captureFitMs : undefined} />
            )}
          </div>
          {/* Right pane: the section's static slide (the capture frame — no dev chrome). */}
          <div className="rp-slide-pane" style={{ width: SLIDE_W }}>
            <SlidePane slide={section.slide} />
          </div>
        </div>
      </div>
    </div>
  )
}
