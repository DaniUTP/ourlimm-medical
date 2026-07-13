import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OurlimmMedicUI',
      fileName: 'ourlimm-medic-ui',
      formats: ['es']
    },
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'primereact', 'primeicons', 'lucide-react', 'primeflex', 'tailwindcss'],
      output: {
        format: 'es',
        exports: 'named'
      }
    }
  }
})
