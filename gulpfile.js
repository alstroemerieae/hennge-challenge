const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const del = require("del");
const merge = require("merge-stream");
const autoprefixer = require('gulp-autoprefixer');



// Clean vendor
function clean() {
  return del(["./vendor/"]);
}


// Bring third party dependencies from node_modules into vendor directory
function modules() {  
  // Font Awesome CSS files
  let fontawesome_js = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/all.min.css')
    .pipe(gulp.dest('./vendor/fontawesome/css'));
  
  // Font Awesome CSS files
  let fontawesome_fonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest('./vendor/fontawesome/webfonts'));

  return merge(fontawesome_js, fontawesome_fonts);
}


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


// Define tasks
const build = gulp.series(clean, modules, style);


// Export tasks
exports.default = build;
exports.build = build;
exports.watch = watch;
