import * as gulp from 'gulp';
const gulpSass = require ('gulp-sass');
const sass = gulpSass(require('sass'));
// @ts-ignore
import * as clean from 'gulp-clean';

const minify = require('gulp-minify');

gulp.task('copy-govuk-sass', () => (
  gulp.src(['./node_modules/govuk-frontend/govuk/**/*.scss', '!assets/**'])
    .pipe(gulp.dest('./sass/'))
))

gulp.task('copy-hmrc-sass', () => (
  gulp.src('./node_modules/hmrc-frontend/hmrc/components/language-select/*.scss')
    .pipe(gulp.dest('./sass/components/hmrc'))
))

gulp.task('copy-govuk-assets', () => (
  gulp.src('./node_modules/govuk-frontend/govuk/assets/**/*')
    .pipe(gulp.dest('./public'))
))

gulp.task('copy-js', () => (
  gulp.src(['./node_modules/govuk-frontend/govuk/all.js', './src/js/*.js'])
    .pipe(gulp.dest('./public/scripts'))
))

gulp.task('copy-govuk-autocomplete', () => (
  gulp.src('./node_modules/accessible-autocomplete/dist/*.*')
    .pipe(gulp.dest('./public/components'))
))

gulp.task('sass', () => (
  gulp.src(['./sass/**/*.scss', '!all.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./public/css'))
));

gulp.task('copy-images', () => (
  gulp.src(['./images/**/*.png', '!assets/**'])
    .pipe(gulp.dest('./public/images'))
))

gulp.task('compress', () => (
  gulp.src(['./public/scripts/*.js', './public/scripts/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('./public/scripts'))
));

gulp.task('clean', () => (
  gulp.src('./public/scripts', {read: false, allowEmpty: true })
    .pipe(clean())
));


gulp.task('assets', gulp.series(
  'clean',
  'copy-govuk-sass',
  'copy-hmrc-sass',
  'copy-govuk-assets',
  'copy-js',
  'copy-govuk-autocomplete',
  'sass',
  'copy-images',
  'compress'
));
