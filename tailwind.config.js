// module exports
module.exports = {
  content: ['./templates/**/*.{twig,html}'],
  // Set classes here that should always be included. Freeform uses py-3 and px-3
  safelist: ['py-3', 'px-3'],
  theme: {
    extend: {
      screens: {
        'nav-break': '900px'
        // => @media (min-width: 992px) { ... }
      }
    }
  },
  corePlugins: {},
  plugins: [require('@tailwindcss/forms')]
}
