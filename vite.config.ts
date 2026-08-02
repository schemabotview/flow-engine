import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// Library build for the flow-engine package. Reuses the same Vite/esbuild toolchain the
// dev app compiles with, so the `.ts`-extension imports and CSS resolve identically.
// Peers are externalized (the consumer provides them); vite-plugin-dts with rollupTypes
// bundles a single index.d.ts so there are no internal import-path/extension issues.
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.json', rollupTypes: true, include: ['src'] }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'flow-engine',
    },
    cssCodeSplit: false, // one bundled stylesheet (scene.css + player.css + xyflow)
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@xyflow/react', 'lucide-react'],
    },
  },
})
