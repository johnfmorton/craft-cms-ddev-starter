import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import manifestSRI from 'vite-plugin-manifest-sri'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import ViteRestart from 'vite-plugin-restart'
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2'
import { partytownVite } from '@builder.io/partytown/utils'
import critical from 'rollup-plugin-critical'

// ----------------------------------------------------------------------
// Reference: https://vitejs.dev/config/
// ----------------------------------------------------------------------
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
        // ----------------------------------------------------------------------
        // Example of manual chunking for a specific module
        // ----------------------------------------------------------------------
        // This is useful if you want to split out a specific module into a
        // separate chunk. In this example, we are splitting out the
        // progressive-share-button module into a separate chunk.
        // ----------------------------------------------------------------------
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

    // ----------------------------------------------------------------------
    // Reference: https://partytown.qwik.dev/
    // ----------------------------------------------------------------------
    // Partytown is a library that allows you to run scripts in a separate
    // thread from the main thread. This is useful for running scripts that
    // are not needed immediately, such as analytics or social media sharing
    // buttons.
    // ----------------------------------------------------------------------
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
      // ----------------------------------------------------------------------
      // About Critical CSS rebase rule:
      // ----------------------------------------------------------------------
      // Rebase the critical CSS to the root of the site
      // This useful if you generate the critical CSS from a different domain
      // than the one you are serving the site from. For example, if you are
      // generating the critical CSS from your local DDEVserver, you can set the
      // from domain to the staging server and the to domain to the production
      // server. In this example, we are generating the critical CSS from our
      // local DDEV server and serving it from the production server, which is
      // using / to get to the root of the site.
      // ----------------------------------------------------------------------
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
    }),
    tailwindcss()
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
    strictPort: true,
    // Defines the origin of the generated asset URLs during development, this must be set to the
    // Vite dev server URL and selected port. In general, `process.env.DDEV_PRIMARY_URL` will give
    // us the primary URL of the DDEV project, e.g. "https://test-vite.ddev.site". But since DDEV
    // can be configured to use another port (via `router_https_port`), the output can also be
    // "https://test-vite.ddev.site:1234". Therefore we need to strip a port number like ":1234"
    // before adding Vite's port to achieve the desired output of "https://test-vite.ddev.site:5173".
    origin: `${process.env.DDEV_PRIMARY_URL.replace(/:\d+$/, "")}:3000`,
    // 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
    // Configure CORS securely for the Vite dev server to allow requests from *.ddev.site domains,
    // supports additional hostnames (via regex). If you use another `project_tld`, adjust this.
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
  }
}));
