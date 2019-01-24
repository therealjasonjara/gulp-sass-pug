var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var bs = require('browser-sync').create();
var minifyjs = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');


gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public'))
    .pipe(bs.stream());
});


gulp.task('pug', () => {
  return gulp.src('src/template/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('./public/'))
})

gulp.task('minify', () => {
  return gulp.src('src/js/*')
  .pipe(minifyjs({
    ignoreFiles: ['*.min.js']
  }))
  .pipe(gulp.dest('./public/js'))
})


gulp.task('watch', gulp.series('sass', 'pug', 'minify', () => {
  bs.init({
    server: {
      baseDir: './public'
    },
    port: 8080
  });

  gulp.watch('./src/template/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/*.js', gulp.series('minify'));
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./public/*.html').on('change', bs.reload);
}))

gulp.task('default', gulp.series('watch'))