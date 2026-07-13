import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type { Plugin } from 'vite'

// Plugin to remove the require polyfill from the generated bundle
const stripRequirePolyfillPlugin: Plugin = {
  name: 'strip-require-polyfill',
  generateBundle(options, bundle) {
    for (const [fileName, file] of Object.entries(bundle)) {
      if (fileName.endsWith('.js')) {
        let code: string;
        
        if (file.type === 'asset') {
          code = String(file.source);
        } else if (file.type === 'chunk') {
          code = file.code;
        } else {
          continue;
        }
        
        // Find and remove the require polyfill by looking for the error message unique to it
        if (code.includes('Calling `require`')) {
          const callRequireIdx = code.indexOf('Calling `require`');
          const endIdx = code.indexOf('});', callRequireIdx);
          
          if (callRequireIdx !== -1 && endIdx !== -1) {
            // Find the start of the variable declaration before this
            let varStart = code.lastIndexOf(',', callRequireIdx);
            if (varStart !== -1) {
              // Remove from the comma to after the closing });
              code = code.substring(0, varStart) + code.substring(endIdx + 3);
            }
          }
        }
        
        if (file.type === 'asset') {
          file.source = code;
        } else {
          file.code = code;
        }
      }
    }
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      primereact: resolve(__dirname, 'node_modules/primereact'),
      primeicons: resolve(__dirname, 'node_modules/primeicons'),
      'lucide-react': resolve(__dirname, 'node_modules/lucide-react')
    }
  },
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
      plugins: [stripRequirePolyfillPlugin],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          primereact: 'PrimeReact',
          primeicons: 'PrimeIcons',
          'lucide-react': 'LucideReact',
          primeflex: 'PrimeFlex',
          tailwindcss: 'tailwindcss'
        }
      }
    }
  }
})
