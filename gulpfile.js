var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserify  = require('browserify'),
    browserSync = require('browser-sync').create(),
    babelify    = require('babelify'),
    uglifyify   = require('uglifyify'),
    bourbon     = require('bourbon'),
    svgo        = require('gulp-svgo'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('buildHTML', () => {
  return gulp.src(['./src/**/*.pug', '!./src/**/_*/**/*'])
    .pipe(pug())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('buildSass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: bourbon.includePaths
    }))
    .on('error', sass.logError)
    .pipe(prefix({
      browsers: 'last 2 versions',
      cascade: false
    }))
    .pipe(sourcemaps.write('./sourcemaps/'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('buildJS', () => {
  var bundleStream = browserify(['src/js/index.js'])
        .transform(babelify, {presets: ['env'], sourceMaps: true})
        .transform(uglifyify, {global: true})
        .bundle();

  bundleStream
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./sourcemaps/'))
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('transferImages', () => {
  return gulp.src('./src/img/**')
    .pipe(svgo())
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('transferFonts', () => {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./src/**/*.pug', ['buildHTML']);
  gulp.watch('./src/**/*.scss', ['buildSass']);
  gulp.watch('./src/**/*.js', ['buildJS']);
});

gulp.task('default', ['buildHTML', 'buildSass', 'buildJS', 'transferImages', 'transferFonts', 'watch']);
