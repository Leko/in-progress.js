const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack-stream')
const gutil = require('gulp-util')
const gzip = require('gulp-gzip')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const webpackConfig = require('./webpack.config.js')

gulp.task('build', (done) => {
  // inprogress.js
  webpack(Object.assign(webpackConfig, {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      filename: 'inprogress.js',
      library: 'InProgress',
      libraryTarget: 'umd'
    }
  }))
    .pipe(gulp.dest('dist'))
    // inprogress.min.js + source map
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', gutil.log))
    .pipe(gzip())
    .pipe(rename('inprogress.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})
