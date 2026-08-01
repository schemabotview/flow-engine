import { useLayoutEffect, useMemo, useState } from 'react'
import { SceneViewer } from './engine/SceneViewer.tsx'
import { useNarration } from './hooks/useNarration.ts'
import { getScene } from './scenes/index.ts'
import { SlidePane } from './frame/SlidePane.tsx'
import { course } from './content/course.ts'
import { revealForPosition, step, type Position } from './content/nav.ts'
import { validateCourse } from './content/validate.ts'

// Fail loud at load in dev too (the build runs the same check via `npm run validate`), so
// a beat referencing a renamed scene node surfaces immediately, not silently at play time.
if (import.meta.env.DEV) {
  const errors = validateCourse(course.sections, getScene)
  if (errors.length) console.error('[content] validation failed:\n' + errors.map((e) => '  ✗ ' + e).join('\n'))
}

// The canonical frame: Full HD, landscape 16:9 (YouTube / Udemy). A later capture
// recorder records at a 1920×1080 viewport, so at capture time scale === 1.
const STAGE_W = 1920
const STAGE_H = 1080

// The two-pane split (must sum to STAGE_W): left = visual scene, right = slide.
const SCENE_W = 1120
const SLIDE_W = STAGE_W - SCENE_W // 800

// Scale the fixed 1920×1080 stage down to fit the current window (preview only).
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

export default function App() {
  const scale = useFitScale()

  // The (section, beat) cursor. ←/→ page beats and roll across section boundaries; reveal
  // is a PURE FOLD over the current scene-run (revealForPosition), never mutated forward —
  // so paging back, or crossing into a new scene, always derives the truthful partial state.
  const [pos, setPos] = useState<Position>({ section: 0, beat: 0 })
  const section = course.sections[pos.section]
  const scene = getScene(section.scene)
  const reveal = useMemo(() => revealForPosition(course.sections, pos), [pos])

  // Per-beat narration by convention: `audio/<section-id>-<beatIndex>.wav`. On clip-end
  // roll forward one beat (across sections); at the course's very end, stop. SPACE toggles.
  const audioUrl = `${import.meta.env.BASE_URL}audio/${section.id}-${pos.beat}.wav`
  const { playing, toggle, stop } = useNarration(audioUrl, () =>
    setPos((p) => {
      const next = step(course.sections, p, 1)
      if (next.section === p.section && next.beat === p.beat) stop() // clamped at the end
      return next
    }),
  )

  // Transport keys, re-bound each render so they see the latest toggle/stop.
  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setPos((p) => step(course.sections, p, 1))
      else if (e.key === 'ArrowLeft') setPos((p) => step(course.sections, p, -1))
      else if (e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="grid h-full w-full place-items-center bg-black">
      {/* Sizer occupies the SCALED footprint so the stage centers cleanly; the stage
          itself scales from its top-left corner to fill it. */}
      <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
        <div
          className="relative flex overflow-hidden bg-scene shadow-2xl"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div style={{ width: SCENE_W }} className="border-r border-white/10">
            {scene && <SceneViewer scene={scene} reveal={reveal} />}
          </div>
          {/* Right pane: the section's static slide, with a per-beat narration caption bar
              below it (the slide holds while beats advance). */}
          <div style={{ width: SLIDE_W }} className="flex flex-col">
            <div className="flex flex-1 flex-col justify-center">
              <SlidePane slide={section.slide} />
            </div>
            <div className="border-t border-white/10 px-16 py-8">
              <div className="mb-3 text-xs uppercase tracking-widest text-white/30">
                §{pos.section + 1}/{course.sections.length} · beat {pos.beat + 1}/{section.beats.length} ·{' '}
                {playing ? '▶ playing' : '⏸ paused'} · SPACE / ← →
              </div>
              <div className="text-xl leading-snug text-white/75">{section.beats[pos.beat].line}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
