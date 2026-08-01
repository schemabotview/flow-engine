import type { SceneSpec } from '../engine/types.ts'
import { BLUE, GREEN, PURPLE, RED, YELLOW } from '../engine/colors.ts'

// A second small scene — the inside of one executor: a Heap (execution + storage memory)
// over two cores, with a Local Disk it spills to. Used to demonstrate the scene RESET
// boundary: a section on this scene enters fully ghosted, independent of the `demo`
// scene's accumulated reveal.
export const executor: SceneSpec = {
  id: 'executor',
  title: 'Inside an executor',
  canvas: { width: 900, height: 520 },
  grid: { cols: [1.6, 1], rows: 1, gap: 0.4, padding: 0.4 },
  nodes: [
    {
      id: 'executor',
      label: 'Executor',
      kind: 'container',
      color: PURPLE,
      cell: [0, 0],
      layout: { cols: [1, 1], rows: [1.4, 1], gap: 0.3, padding: 0.5 },
      children: [
        {
          id: 'heap',
          label: 'Heap',
          kind: 'container',
          color: BLUE,
          cell: [0, 0, 2, 1],
          layout: { cols: [1, 1], rows: 1, gap: 0.3, padding: 0.5 },
          children: [
            { id: 'execution', label: 'Execution', kind: 'symbol', color: PURPLE, cell: [0, 0] },
            { id: 'storage', label: 'Storage', kind: 'symbol', color: GREEN, cell: [1, 0] },
          ],
        },
        { id: 'core-1', label: 'Core 1', kind: 'symbol', color: RED, cell: [0, 1] },
        { id: 'core-2', label: 'Core 2', kind: 'symbol', color: RED, cell: [1, 1] },
      ],
    },
    { id: 'disk', label: 'Local Disk', kind: 'symbol', color: YELLOW, cell: [1, 0] },
  ],
  edges: [
    { from: 'core-1', to: 'disk', label: 'spill' },
    { from: 'core-2', to: 'disk', label: 'spill' },
  ],
}
