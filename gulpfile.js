
var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var wait = require('gulp-wait');

var JS = ['_site/js/**/*.js'];
var CSS = '_site/css/**/*.css';
var HTML = '_includes/**/*.html';


gulp.task('devserver', function() {
  var port = 4000;
  var portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex != -1) {
    port = parseInt(process.argv[portArgIndex+1]);
  }
  connect.server({
    root: ['_site/'],
    port: port,
    // livereload: true
    livereload: {
      port: 33332
    }
  });
});

gulp.task('dev-js', function () {
  gulp.src(JS)
    .pipe(connect.reload());
});

gulp.task('dev-styles', function () {
  gulp.src(CSS)
    .pipe(connect.reload());
});

gulp.task('dev-templates', function () {
  gulp.src(HTML)
    .pipe(wait(300))
    .pipe(connect.reload());
});


gulp.task('watch', function () {
  gulp.watch(JS, ['dev-js']);
  gulp.watch(HTML, ['dev-templates']);
  gulp.watch(CSS, ['dev-styles']);
});


gulp.task('default', function() {
  gulp.start('devserver', 'watch');
});

