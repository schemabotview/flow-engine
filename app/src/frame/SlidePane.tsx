import type { Slide } from '../content/types.ts'

// The right pane: one static slide per section (title + bullets). The per-beat narration
// caption is rendered separately by App, below the slide — the slide holds while beats
// advance. A richer markdown slide format can replace this later; bullets suffice for now.
export function SlidePane({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col gap-8 px-16">
      <h2 className="text-4xl font-bold leading-tight text-white/90">{slide.title}</h2>
      <ul className="flex flex-col gap-5">
        {slide.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-2xl leading-snug text-white/70">
            <span className="mt-1 text-white/25">—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
