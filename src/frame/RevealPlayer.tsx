import { useLayoutEffect, useMemo, useState } from 'react'
import { SceneViewer } from '../engine/SceneViewer.tsx'
import type { SceneSpec } from '../engine/types.ts'
import { useNarration } from '../hooks/useNarration.ts'
import { SlidePane } from './SlidePane.tsx'
import type { Course } from '../content/types.ts'
import { revealForPosition, step, type Position } from '../content/nav.ts'
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
  /** Base URL for audio; clips resolve as `${audioBase}/audio/<section-id>-<beat>.wav`.
   *  Use '' for same-origin (a concept app serving its own public/audio). */
  audioBase: string
}

export function RevealPlayer({ course, getScene, audioBase }: RevealPlayerProps) {
  const scale = useFitScale()
  const sections = course.sections

  // The (section, beat) cursor. ←/→ page beats and roll across section boundaries; reveal
  // is a PURE FOLD over the current scene-run (revealForPosition), never mutated forward.
  const [pos, setPos] = useState<Position>({ section: 0, beat: 0 })
  const section = sections[pos.section]
  const scene = section ? getScene(section.scene) : undefined
  const reveal = useMemo(
    () => (section ? revealForPosition(sections, pos) : null),
    [sections, pos, section],
  )

  // Per-beat narration by convention: `<audioBase>/audio/<section-id>-<beatIndex>.wav`.
  const audioUrl = section ? `${audioBase}/audio/${section.id}-${pos.beat}.wav` : undefined
  const { toggle, stop } = useNarration(audioUrl, () =>
    setPos((p) => {
      const next = step(sections, p, 1)
      if (next.section === p.section && next.beat === p.beat) stop() // clamped at the end
      return next
    }),
  )

  // Transport keys, re-bound each render so they see the latest toggle/stop.
  useLayoutEffect(() => {
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
            {scene && <SceneViewer scene={scene} reveal={reveal} />}
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
