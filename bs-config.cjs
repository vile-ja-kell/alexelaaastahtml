// BrowserSync config for local dev.
// Started via `npm run dev` (runs alongside PostCSS watch) or `npm run serve` (server only).
// Docs: https://browsersync.io/docs/options

module.exports = {
  server: {
    baseDir: '.',
    // Resolve "/" to index.html, and serve directories without trailing-slash redirects.
    directory: false,
  },

  // Files BrowserSync watches for changes.
  // - HTML / JS changes trigger a full page reload.
  // - CSS changes (css/style.css is the PostCSS-compiled output) are injected without reload.
  files: [
    '*.html',
    'en/*.html',
    'css/style.css',
    'main.js',
  ],

  // Don't watch sources — PostCSS rebuilds them into css/style.css, which we already watch.
  watchOptions: {
    ignored: ['node_modules', '.git', '.claude', 'src', 'video', 'fonts', 'img'],
    ignoreInitial: true,
  },

  port: 3000,
  ui: { port: 3001 },        // BrowserSync control panel
  open: 'local',             // open default browser on start
  notify: false,             // suppress the corner toast
  injectChanges: true,       // CSS-only changes inject without full reload
  reloadDebounce: 150,       // coalesce bursts of file events
  ghostMode: false,          // don't mirror clicks/scrolls across tabs
  logLevel: 'info',
  logPrefix: 'Alexela',
};
