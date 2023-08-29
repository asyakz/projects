const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const gulpif = require('gulp-if')
const argv = require('yargs').argv
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()

let isProd = false

const clean = () => {
  return del(['dist'])
}

const recources = () => {
  return src('src/resources/**')
  .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.scss', {sourcemaps: !isProd})
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulpif(isProd, cleanCss({
    level: 2
  })))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(isProd, htmlMin({
      collapseWhitespace: true
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlForDev = () => {
  return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images**/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/**/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write("."))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.svg',
    'src/images/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/images'))
}

const fonts = () => {
  return src([
    'src/fonts/**/*.woff',
    'src/fonts/**/*.woff2'
  ])
  .pipe(dest('dist/fonts'))
}

watch('src/**/*.html', htmlMinify)
watch('src/**/*.html', htmlForDev)
watch('src/styles/**/*.scss', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', recources)

const toProd = (done) => {
  isProd = true;
  done();
};

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlForDev, recources, scripts, styles, images, fonts, svgSprites, watchFiles)
exports.build = series(toProd, clean, htmlMinify, scripts, styles, images, fonts, svgSprites, watchFiles);
