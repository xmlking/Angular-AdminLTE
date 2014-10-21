let deploy  = require('gulp-gh-pages');

export default function fonts(gulp, cfg, args) {
  'use strict';
  gulp.task('deploy', () => {
    return gulp.src('./dist/**/*')
      .pipe(deploy());
  });
}
