import { useLayoutEffect, useMemo, useState } from 'react'
import { SceneViewer } from './engine/SceneViewer.tsx'
import { revealAt } from './engine/reveal.ts'
import { useNarration } from './hooks/useNarration.ts'
import { getScene } from './scenes/index.ts'
import { SlidePane } from './frame/SlidePane.tsx'
import { course } from './content/course.ts'

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

  // One section for now (slice 7 wires content in-repo; multi-section rollover is next).
  const section = course.sections[0]
  const scene = getScene(section.scene)
  const beats = section.beats

  // The beat cursor. ←/→ page beats; reveal is a PURE FOLD of this index (revealAt),
  // never mutated forward — so paging back re-derives the earlier partial reveal exactly.
  const [beat, setBeat] = useState(0)
  const reveal = useMemo(() => revealAt(beats, beat), [beats, beat])

  // Per-beat narration by convention: `audio/<section-id>-<beatIndex>.wav`. On clip-end
  // auto-advance to the next beat; on the last beat, stop. SPACE toggles play/pause.
  const audioUrl = `${import.meta.env.BASE_URL}audio/${section.id}-${beat}.wav`
  const { playing, toggle, stop } = useNarration(audioUrl, () =>
    setBeat((b) => {
      if (b >= beats.length - 1) {
        stop()
        return b
      }
      return b + 1
    }),
  )

  // Transport keys, re-bound each render so they see the latest toggle/stop.
  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setBeat((b) => Math.min(b + 1, beats.length - 1))
      else if (e.key === 'ArrowLeft') setBeat((b) => Math.max(b - 1, 0))
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
                Beat {beat + 1} / {beats.length} · {playing ? '▶ playing' : '⏸ paused'} · SPACE / ← →
              </div>
              <div className="text-xl leading-snug text-white/75">{beats[beat].line}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
