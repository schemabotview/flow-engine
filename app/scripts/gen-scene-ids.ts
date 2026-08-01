import { writeFileSync, mkdirSync } from 'node:fs'
import { sceneIds, getScene } from '../src/scenes/index.ts'
import { sceneNodeIds } from '../src/content/validate.ts'
import { edgeKey } from '../src/engine/reveal.ts'

// Publish the scenes' valid id sets as data, so a content repo's CI can validate its
// beats against them WITHOUT importing the app's TypeScript. The app is the authority on
// scene ids; this artifact (committed + served at public/scene-ids.json) is how that
// authority reaches the content repos. Regenerated on every build.
const out: Record<string, { nodes: string[]; edges: string[] }> = {}
for (const id of sceneIds()) {
  const scene = getScene(id)!
  out[id] = {
    nodes: [...sceneNodeIds(scene)].sort(),
    edges: scene.edges.map((e) => edgeKey(e.from, e.to)).sort(),
  }
}

mkdirSync(new URL('../public/', import.meta.url), { recursive: true })
const dest = new URL('../public/scene-ids.json', import.meta.url)
writeFileSync(dest, JSON.stringify(out, null, 2) + '\n')
console.log(`wrote scene-ids.json — ${Object.keys(out).length} scenes`)
