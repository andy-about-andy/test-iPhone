import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import svgmin from 'gulp-svgmin';
import {deleteAsync} from 'del';
import terser from 'gulp-terser';
import svgstore from 'gulp-svgstore';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import {buffer} from 'stream/consumers';
import pngquant from 'imagemin-pngquant';
import convWebp from 'gulp-webp';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(imagemin([
      mozjpeg({quality: 75}),
      optipng({optimizationLevel: 2, buffer}),
      pngquant({speed: 10})
    ]))
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png,webp}')
    .pipe(gulp.dest('build/img'))
}

// Webp

const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(convWebp())
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img/svg'))
}

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
  .pipe(svgmin())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/favicons/*.{svg,png}',
    'source/*.ico',
    'source/manifest.webmanifest',
    'source/lang/*.json',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return deleteAsync('./build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    optimizeImages,
    createWebp
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
    copyImages,
    svg,
    sprite,
    createWebp
  ),
  server,
  watcher
);
