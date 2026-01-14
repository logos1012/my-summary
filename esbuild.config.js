import esbuild from 'esbuild';
import copyPlugin from 'esbuild-plugin-copy';

const prod = process.argv[2] === 'production';

const context = await esbuild.context({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian'],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  minify: prod,
  outfile: 'main.js',
  plugins: [
    copyPlugin({
      assets: {
        from: ['./manifest.json', './styles.css'],
        to: ['.'],
      },
      watch: !prod,
    }),
  ],
});

if (prod) {
  await context.rebuild();
  await context.dispose();
} else {
  await context.watch();
}