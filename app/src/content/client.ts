import type { Course } from './types.ts'

// Runtime fetch of a concept's content from its contentBaseUrl (raw GitHub serves CORS
// `*`). The manifest is the whole course (concept + sections with inline slides + beats);
// audio clips are fetched by the <audio> element via contentUrl().

/** Join a content base URL with a repo-relative path. */
export const contentUrl = (base: string, path: string) => `${base}/${path}`

async function getText(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`)
  return res.text()
}

/** Fetch and parse a concept's manifest.json into a Course. */
export async function fetchManifest(base: string): Promise<Course> {
  return JSON.parse(await getText(contentUrl(base, 'manifest.json'))) as Course
}
