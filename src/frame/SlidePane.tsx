import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Slide } from '../content/types.ts'

// The right pane: one static slide per section, holding while beats advance. The title is
// drawn as the heading; `slide.body` is a curated subset of Markdown (headings, lists,
// tables, bold, inline code, fenced code) rendered by react-markdown + GFM. Styling is generic
// element CSS in player.css (.slide__body h3/ul/li/strong/pre/…), so authors write Markdown.
//
// Fenced code blocks (```python / ```bash …) are syntax-highlighted by rehype-highlight
// (highlight.js/lowlight) — it runs at render time and bundles the languages, so it needs NO
// network (safe for headless capture). It emits `.hljs-*` token classes; the One-Dark-slate
// token palette + the code-block frame live in player.css. `ignoreMissing` keeps an unknown
// language from throwing; `detect` lets it guess when a fence has no language tag.
export function SlidePane({ slide }: { slide: Slide }) {
  return (
    <div className="slide">
      <h2 className="slide__title">{slide.title}</h2>
      <div className="slide__body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        >
          {slide.body}
        </ReactMarkdown>
      </div>
    </div>
  )
}
