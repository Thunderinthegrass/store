const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
// const pug = require('gulp-pug');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

// function pug2html() {
//   return src('app/pug/**/**/*.pug')
//     .pipe(pug({
//       pretty:true
//     }))
//     .pipe(dest('app'))
//     .pipe(browserSync.stream())
// }

function images() {
  return src('app/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/img'))
}

function scripts() {
  return src([
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function js() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

function styles() {
  return src(['app/scss/style.scss',
    // 'node_modules/normalize-css/normalize.css',
    // 'node_modules/slick-carousel/slick/slick.scss'
  ])
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function css() {
  return src([
    'node_modules/normalize-css/normalize.css',
    'node_modules/slick-carousel/slick/slick.scss'
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('libs.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/js/libs.min.js', 
    'app/*html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  // watch(['app/pug/**/*pug'], pug2html);
  watch(['app/*html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.css = css;
exports.js = js;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
// exports.pug2html = pug2html;

exports.build = series(cleanDist, images, build);
// exports.default = parallel(pug2html, styles, css, scripts, js, browsersync, watching);
exports.default = parallel(styles, css, scripts, js, browsersync, watching);