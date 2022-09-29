const dependencies = require('./package.json').dependencies || {};
async function build() {
  require('esbuild').build({
    entryPoints: [
      'src/image.tsx'
    ],
    external: [
      '@ijstech/components',
      ...Object.keys(dependencies)
    ],
    outdir: 'dist',
    bundle: true,
    minify: false,
    format: 'iife',
    target: 'ES2017',
    jsx: 'transform',
    plugins: [],
  }).catch(() => process.exit(1));
}
build();

