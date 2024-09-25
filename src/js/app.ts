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


// Import the ProgressiveShareButton component
// https://www.npmjs.com/package/progressive-share-button
import {ProgressiveShareButton} from 'progressive-share-button';
// Initialize the component
ProgressiveShareButton();

import { externalLinks } from './utils';

// on DOMContentLoaded make external links open in new tab
document.addEventListener('DOMContentLoaded', externalLinks)

console.log('Hello, world.');
