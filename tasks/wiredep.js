let wiredepStream = require('wiredep').stream;

export default function wiredep(gulp, cfg, env) {
  'use strict';
  gulp.task('wiredep', function () {

    gulp.src('app/styles/*.scss')
      .pipe(wiredepStream({
        directory: 'bower_components'
      }))
      .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
      .pipe(wiredepStream({
        directory: 'bower_components',
        exclude: ['bootstrap-sass-official']
      }))
      .pipe(gulp.dest('app'));
  });
}
