// Concept catalog: maps a concept id to its content repo. Content is fetched at runtime
// over raw GitHub (CORS `*`), so the engine app carries no concept content itself — each
// concept is its own repo (solves per-repo size limits; audio lives per concept).
export interface Concept {
  id: string
  label: string
  /** Base URL of the concept's content repo (raw GitHub, no trailing slash). */
  contentBaseUrl: string
}

export const catalog: Record<string, Concept> = {
  'apache-spark': {
    id: 'apache-spark',
    label: 'Apache Spark',
    contentBaseUrl: 'https://raw.githubusercontent.com/schemabotview/apache-spark/main',
  },
}

export const DEFAULT_CONCEPT = 'apache-spark'
