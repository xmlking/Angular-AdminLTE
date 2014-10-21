export default function watch(gulp, cfg, env) {
  'use strict';
  gulp.task('watch', ['wiredep', 'styles', 'scripts'], function () {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/modules/**/*.js', ['transpile']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
  });
}
