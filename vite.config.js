import { defineConfig } from 'vite'
import manifestSRI from 'vite-plugin-manifest-sri'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import ViteRestart from 'vite-plugin-restart'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'
import { partytownVite } from '@builder.io/partytown/utils'
import critical from 'rollup-plugin-critical'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    manifest: true,
    outDir: 'web/dist/',
    rollupOptions: {
      input: {
         app: 'src/js/app.ts'
      },
      output: {
        // example of manual chunking for a specific module
        manualChunks: {
          'progressive-share-button': ['progressive-share-button'],
        }
      }
    },
    build: {
      // sourcemap: true
      manifest: true
    }
  },
  plugins: [
    partytownVite({
      dest: path.resolve('web/dist/', '~partytown')
    }),
    manifestSRI({ algorithms: ['sha384', 'sha512'] }),
    viteCompression({
      filter: /\.(js|mjs|json|css|map)$/i
    }),
    ViteRestart({
      reload: ['templates/**/*']
    }),
    critical({
      criticalUrl: 'http://localhost/',
      criticalBase: './web/dist/criticalcss/',
      criticalPages: [
        { uri: '', template: 'index' },
      ],
      criticalConfig: {
        rebase: {
          from: 'https://craft-cms-5-starter.ddev.site/',
          to: '/'
        }
      }
    }),
    ViteFaviconsPlugin({
      logo: './src/img/favicon-src.png',
      inject: false,
      outputPath: 'favicons',
      favicons: {
        appName: 'Craft CMS Starter Project',
        appShortName: 'Craft CMS Starter',
        appDescription: 'Starter project for Craft CMS with Vite and Tailwind CSS',
        developerName: 'John F Morton',
        developerURL: 'https://supergeekery.com',
        display: 'minimal-ui'
      }
    })
  ],
  publicDir: path.resolve(__dirname, 'src/public'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@js': path.resolve(__dirname, 'src/js')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
}));
