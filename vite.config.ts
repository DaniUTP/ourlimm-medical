import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OurlimmMedicUI',
      fileName: 'ourlimm-medic-ui',
      formats: ['es', 'umd']
    },
    emptyOutDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'primereact', 'primeicons'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          primereact: 'PrimeReact',
          primeicons: 'PrimeIcons'
        }
      }
    }
  }
})