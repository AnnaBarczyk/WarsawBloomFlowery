var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var less = require('gulp-less');

// Minify compiled CSS
gulp.task('minify-css', function() {
  return gulp.src('css/style.css')
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream: true
      })
    )
});

gulp.task('uncss', function() {
  return gulp.src('css/style.css')
    .pipe(uncss({
      html: [
        'index.html'
      ]
    }))
    .pipe(gulp.dest('css'));
});


// Compile LESS files from /less into /css
gulp.task('less', function() {
  return gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile LESS files from /less into /css
gulp.task('less-dark', function() {
  return gulp.src('less/style-dark.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile LESS files from /less into /css
gulp.task('less-blue', function() {
  return gulp.src('less/style-blue.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile LESS files from /less into /css
gulp.task('less-video', function() {
  return gulp.src('less/style-video.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});