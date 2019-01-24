/*
 Copyright 2019 Cloudinary Ltd. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

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