module.exports = {
  plugins: {
    'postcss-import': {}, // Ensure postcss-import is included
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-nested': {}, // Ensure postcss-nested is included
  },
  corePlugins: {
    // Enable the `@apply` directive
    applyComplexClasses: true,
  },
};
