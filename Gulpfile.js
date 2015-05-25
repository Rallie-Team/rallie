
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

var b = watchify(browserify({
  cache: {},
  packageCache: {},
  entries: ['client/public/js/app.js'],
  debug: true,
  transform: ['reactify']
}));

var bundle = function() {
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('client/public/js'));
};

var paths = {
  // images: 'client/public/assets/img/*.*',
  // styles: 'client/public/assets/css/*.css',
  html: 'client/public/index.html',
  server: 'server/**/*.js'
};

// gulp.task('styles', function() {
//   return gulp.src([
//     paths.styles
//   ])
//   .pipe(livereload());
// });

gulp.task('html', function() {
  return gulp.src(
    paths.html
  )
  .pipe(livereload());
});

// gulp.task('images', function() {
//   return gulp.src([
//     paths.images
//   ])
//   .pipe(livereload());
// });

gulp.task('server', function() {
  return gulp.src([
    paths.server
  ])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('react', bundle);
gulp.task('watch', function () {
  livereload.listen();

  gulp.watch(paths.html,['html']);
  // gulp.watch(paths.images,['images']);
  // gulp.watch(paths.styles,['styles']);
  gulp.watch(paths.server,['server']);
});


// Runs watchify again on any changes
b.on('update', bundle);
b.on('log', gutil.log);
gulp.task('default', ['watch', 'react']);

