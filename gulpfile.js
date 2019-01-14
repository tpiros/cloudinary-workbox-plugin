const gulp = require('gulp');
const del = require('del');
const { rollup } = require('rollup');

const clean = () => {
  return del(['dist']);
}

const bundle = async () => {
  const bundle = await rollup({
    input: 'index.mjs'
  });

  return bundle.write({
    file: 'dist/cloudinaryPlugin.js',
    format: 'iife',
    output: {
      name: 'cloudinaryPlugin'
    }
  });
}

gulp.task('default', gulp.series(clean, bundle));