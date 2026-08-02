import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Slide } from '../content/types.ts'

// The right pane: one static slide per section, holding while beats advance. The title is
// drawn as the heading; `slide.body` is a curated subset of Markdown (headings, lists,
// tables, bold, inline code) rendered by react-markdown + GFM. Styling is generic element
// CSS in player.css (.slide__body h3/ul/li/strong/…), so authors write Markdown, not markup.
export function SlidePane({ slide }: { slide: Slide }) {
  return (
    <div className="slide">
      <h2 className="slide__title">{slide.title}</h2>
      <div className="slide__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{slide.body}</ReactMarkdown>
      </div>
    </div>
  )
}
