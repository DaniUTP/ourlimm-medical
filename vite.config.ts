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
        let code = file.type === 'asset' ? file.source : file.code;
        if (typeof code !== 'string') continue;
        
        // Remove the __require polyfill and rolldown runtime region
        code = code.replace(
          /\/\/#region \\0rolldown\/runtime\.js[\s\S]*?\/\/#endregion\n?/g,
          '// ESM-only bundle: require polyfill removed\n'
        );
        
        // Also remove any standalone __require declaration if present
        code = code.replace(
          /var __require\s*=\s*\/\*[\s\S]*?\}\);?\n?/g,
          ''
        );
        
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
