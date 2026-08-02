import { useEffect, useState } from 'react'
import { RevealPlayer } from './frame/RevealPlayer.tsx'
import { getScene } from './scenes/index.ts'
import type { Course } from './content/types.ts'
import { catalog, DEFAULT_CONCEPT } from './content/catalog.ts'
import { fetchManifest } from './content/client.ts'
import { validateCourse } from './content/validate.ts'

// Engine dev harness: fetch a concept's manifest (raw GitHub) and mount <RevealPlayer>.
// This exists to preview the engine standalone; a real concept app imports its Course
// locally (its own scenes + course) and mounts RevealPlayer the same way.
export default function App() {
  const concept = catalog[DEFAULT_CONCEPT]
  const [course, setCourse] = useState<Course | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetchManifest(concept.contentBaseUrl)
      .then((c) => {
        if (!alive) return
        // Validate fetched beats against the scene registry — fail loud at load.
        const errs = validateCourse(c.sections, getScene)
        if (errs.length) console.error('[content] validation failed:\n' + errs.map((e) => '  ✗ ' + e).join('\n'))
        setCourse(c)
      })
      .catch((e) => alive && setError(String(e)))
    return () => {
      alive = false
    }
  }, [concept.contentBaseUrl])

  if (error) return <Centered>Failed to load content — {error}</Centered>
  if (!course) return <Centered>Loading content…</Centered>

  return <RevealPlayer course={course} getScene={getScene} audioBase={concept.contentBaseUrl} />
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="grid h-full w-full place-items-center bg-scene text-lg text-white/40">{children}</div>
}
