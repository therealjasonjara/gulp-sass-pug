var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var bs = require('browser-sync').create();
var minifyjs = require('gulp-minify');
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    //.pipe(cleanCSS())
    .pipe(gulp.dest('./public'))
    .pipe(bs.stream());
});

gulp.task('pug', () => {
  return gulp.src('src/template/**/index.pug')
  .pipe(pug({
    pretty: true // Change this to false if you want to minify the HTML file
  }))
  .pipe(gulp.dest('./public/'))
})

gulp.task('minifyjs', () => {
  return gulp.src('src/js/*')
  .pipe(minifyjs({
    ignoreFiles: ['*.min.js', 'script.js'] // Files ignored by minifyJS. Feel free to add or delete entries.
  }))
  .pipe(gulp.dest('./public/js'))
})

gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
  .pipe(gulp.dest('./public/assets'))
})

gulp.task('watch', gulp.series('sass', 'pug', 'minifyjs', 'assets', () => {
  bs.init({
    server: {
      baseDir: './public'
    },
    port: 8080
  });

  gulp.watch('./src/template/**/*.pug', gulp.series('pug'));
  gulp.watch('./src/js/*.js', gulp.series('minifyjs'));
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/assets/**/*', gulp.series('assets'));
  gulp.watch('./public/*.html').on('change', bs.reload);
  gulp.watch('./public/js/*.js').on('change', bs.reload);
}))

gulp.task('default', gulp.series('watch')) // default gulp command $ gulp