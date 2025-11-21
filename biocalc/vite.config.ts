import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(),react()],
  server: {
    port: 3000,
    host: true
  },
  esbuild: {
    supported: { 'top-level-await': true }
  },
  base: '/biocalc',
},)
