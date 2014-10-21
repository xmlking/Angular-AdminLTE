let GulpProtractor = require('gulp-protractor');

export default function e2eTests(gulp, cfg, args) {
  'use strict';
  // Downloads the selenium webdriver
  gulp.task('webdriver-update', GulpProtractor.webdriver_update);

  gulp.task('webdriver-standalone', GulpProtractor.webdriver_standalone);

  gulp.task('protractor-only', ['webdriver-update', 'wiredep'],  (done) => {
    var testFiles = [
      'test/e2e/**/*.js'
    ];

    gulp.src(testFiles)
      .pipe(GulpProtractor.protractor({
        configFile: 'test/protractor.conf.js'
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        // Close connect server to and gulp connect task
        // Feature ignored because it's not possible to stop browser sync
        // browserSync.close();
        done();
      });
  });

  gulp.task('protractor', ['serve:e2e', 'protractor-only']);
  gulp.task('protractor:src', ['serve:e2e', 'protractor-only']);
  gulp.task('protractor:dist', ['serve:e2e-dist', 'protractor-only']);
}
