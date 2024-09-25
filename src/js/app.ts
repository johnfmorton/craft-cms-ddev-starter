declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

// Accept HMR as per https://vitejs.dev/guide/api-hmr.html#accepting-updates
/// <reference types="vite/client" />
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('HMR update');
  });
}

// Import our CSS
import '@/css/app.css';

// https://alpinejs.dev/essentials/installation#as-a-module
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()

console.log('Hello, world.');
