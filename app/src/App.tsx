import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { SceneViewer } from './engine/SceneViewer.tsx'
import { useNarration } from './hooks/useNarration.ts'
import { getScene } from './scenes/index.ts'
import { SlidePane } from './frame/SlidePane.tsx'
import type { Course } from './content/types.ts'
import { catalog, DEFAULT_CONCEPT } from './content/catalog.ts'
import { fetchManifest, contentUrl } from './content/client.ts'
import { revealForPosition, step, type Position } from './content/nav.ts'
import { validateCourse } from './content/validate.ts'

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
  const concept = catalog[DEFAULT_CONCEPT]

  // Content is fetched at runtime from the concept's content repo (not bundled). One
  // manifest fetch = the whole course, which the scene-run reveal fold needs.
  const [course, setCourse] = useState<Course | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    fetchManifest(concept.contentBaseUrl)
      .then((c) => {
        if (!alive) return
        // Validate fetched beats against the app's scene registry — fail loud at load
        // (the content repo's CI runs the same check at build; see A3).
        const errs = validateCourse(c.sections, getScene)
        if (errs.length) console.error('[content] validation failed:\n' + errs.map((e) => '  ✗ ' + e).join('\n'))
        setCourse(c)
      })
      .catch((e) => alive && setError(String(e)))
    return () => {
      alive = false
    }
  }, [concept.contentBaseUrl])

  const sections = course?.sections ?? []

  // The (section, beat) cursor. ←/→ page beats and roll across section boundaries; reveal
  // is a PURE FOLD over the current scene-run (revealForPosition), never mutated forward.
  const [pos, setPos] = useState<Position>({ section: 0, beat: 0 })
  const section = sections[pos.section]
  const scene = section ? getScene(section.scene) : undefined
  const reveal = useMemo(
    () => (section ? revealForPosition(sections, pos) : null),
    [sections, pos, section],
  )

  // Per-beat narration by convention: `<contentBase>/audio/<section-id>-<beatIndex>.wav`.
  const audioUrl = section ? contentUrl(concept.contentBaseUrl, `audio/${section.id}-${pos.beat}.wav`) : undefined
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

  if (error) return <Centered>Failed to load content — {error}</Centered>
  if (!course || !section) return <Centered>Loading content…</Centered>

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
          {/* Right pane: the section's static slide (the capture frame — no dev chrome).
              Narration is heard, not shown; transport is SPACE / ← →. */}
          <div style={{ width: SLIDE_W }} className="flex flex-col justify-center">
            <SlidePane slide={section.slide} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid h-full w-full place-items-center bg-scene text-lg text-white/40">{children}</div>
}
