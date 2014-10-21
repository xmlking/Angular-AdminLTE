import {ErrorHandler} from './errors';

let templateCache = require('gulp-angular-templatecache');

export default function partials(gulp, cfg, args) {
  'use strict';
  gulp.task('partials', function () {
    gulp.src('app/modules/**/partials/*.html')
      //.pipe(jade()).on('error', ErrorHandler.onError);
      .pipe( templateCache({
        module: 'templates',
        root: 'modules/',
        standalone: true
      }))
      .pipe(gulp.dest('.tmp/modules'));
  });

}
