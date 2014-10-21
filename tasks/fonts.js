let mainBowerFiles  = require('main-bower-files'),
//    filter          = require('gulp-filter'), //not working for '**/*.{eot,svg,ttf,woff}
  filter          = require('gulp-grep-stream'),
  flatten         = require('gulp-flatten');

export default function fonts(gulp, cfg, args) {
  'use strict';
  gulp.task('fonts', () => {
    return gulp.src(mainBowerFiles().concat('app/fonts/**/*'))
      .pipe(filter('**/*.{eot,svg,ttf,woff}'))
      .pipe(flatten())
      .pipe(gulp.dest('dist/fonts'));
  });
}
