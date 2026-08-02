import type { Slide } from '../content/types.ts'

// The right pane: one static slide per section (title + bullets), the slide holds while
// beats advance. Plain CSS classes (player.css) so the engine carries no Tailwind
// dependency. A richer markdown slide format can replace this later; bullets suffice.
export function SlidePane({ slide }: { slide: Slide }) {
  return (
    <div className="slide">
      <h2 className="slide__title">{slide.title}</h2>
      <ul className="slide__list">
        {slide.bullets.map((b, i) => (
          <li key={i} className="slide__item">
            <span className="slide__bullet">—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
