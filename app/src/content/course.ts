import type { Course } from './types.ts'

// The in-repo content for this app. One section for now (slice 7); multi-section rollover
// and the scene-reset boundary land in the next slice. The `scene` field names a scene in
// the registry (scenes/index.ts); the `beats` reference that scene's raw node ids.
export const course: Course = {
  concept: 'Spark (demo)',
  sections: [
    {
      id: 'the-cluster',
      heading: 'The cluster',
      scene: 'demo',
      slide: {
        title: 'The cluster',
        bullets: [
          'The driver owns the SparkSession and builds the plan',
          'The cluster manager allocates machines to the app',
          'Executors run the work on the worker nodes',
        ],
      },
      // A hand storyboard that assembles the cluster. Beat 0 solidifies the frame (the
      // empty labelled stage), then each beat fills in a subsystem. Edges auto-solidify
      // once both endpoints are revealed; the explicit `draw` deltas demonstrate the verb.
      beats: [
        {
          line: 'Here is the cluster we are about to assemble.',
          delta: [{ kind: 'solidify', ids: ['master'] }],
        },
        {
          line: 'Your driver program owns the SparkSession.',
          delta: [{ kind: 'solidify', ids: ['driver', 'session'] }],
        },
        {
          line: 'It submits work to the cluster manager.',
          delta: [
            { kind: 'solidify', ids: ['cluster-mgr'] },
            { kind: 'draw', edges: [['session', 'cluster-mgr']] },
          ],
        },
        {
          line: 'Which launches executors on the worker nodes.',
          delta: [
            { kind: 'solidify', ids: ['worker-a', 'worker-b'] },
            { kind: 'draw', edges: [['cluster-mgr', 'worker-a'], ['cluster-mgr', 'worker-b']] },
          ],
        },
      ],
    },
  ],
}
