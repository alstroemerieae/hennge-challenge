const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


// Compile scss files into a single minified css file
function style() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
}


// Create a local server and watch for changes
function watch() {
  browserSync.init({
    server: {
      baseDir: ".",
      index: "./index.html"
    }
  });
  gulp.watch('./**/*.scss', style)
  gulp.watch('./**/*.html').on('change',browserSync.reload)
  gulp.watch('./**/*.js').on('change', browserSync.reload)
}


// Export tasks
exports.watch = watch;
