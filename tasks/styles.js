import {ErrorHandler} from './errors';

let sass        = require('gulp-ruby-sass'),
  sourcemaps  = require('gulp-sourcemaps'),
  filter      = require('gulp-grep-stream'),
  browserSync = require('browser-sync'),
  autoprefixer= require('gulp-autoprefixer'),
  reload      = browserSync.reload;

export default function styles(gulp, cfg, args) {
  'use strict';
  gulp.task('styles', () => {
    return gulp.src('app/styles/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        style: 'expanded',
        precision: 10,
        sourcemap: (!optimize),
        sourcemapPath: '.',
        loadPath: ['bower_components/bourbon/dist', 'bower_components/compass-mixins/lib']
      }))
      .on('error', ErrorHandler.onError)
      .pipe(autoprefixer(cfg.autoprefixer))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/styles'))
      .pipe(filter('**/*.css'))
      .pipe(reload({stream: true}));
  });
}
