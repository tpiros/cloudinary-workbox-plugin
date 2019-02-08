const gulp = require('gulp');
const del = require('del');
const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');

const clean = async () => {
  return await del(['dist']);
};

const bundle = async () => {
  const bundle = await rollup({
    input: 'index.mjs'
  });

  return bundle.write({
    file: 'dist/cloudinaryPlugin.js',
    format: 'iife',
    output: {
      name: 'cloudinaryPlugin',
    }
  });
};

const minifiedBundle = async () => {
  const bundle = await rollup({
    input: 'index.mjs',
    plugins: [terser({
      output: {
        comments: 'all'
      }
    })]
  });

  return bundle.write({
    file: 'dist/cloudinaryPlugin.min.js',
    format: 'iife',
    output: {
      name: 'cloudinaryPlugin',
    }
  });
};

gulp.task('default', gulp.series(clean, bundle, minifiedBundle));