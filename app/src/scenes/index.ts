import type { SceneSpec } from '../engine/types.ts'
import { demo } from './demo.ts'

// App-owned scene registry: content references a scene by id (a string), resolved here.
// Scenes are TypeScript (structure, the app's contribution), not content.
const scenes: Record<string, SceneSpec> = {
  [demo.id]: demo,
}

export const getScene = (id: string): SceneSpec | undefined => scenes[id]

export const sceneIds = (): string[] => Object.keys(scenes)
