const gulp = require ("gulp"),
      pug = require ("gulp-pug"),
      sass = require ("gulp-sass"),
      plumber = require ("gulp-plumber"),
      postcss = require ("gulp-postcss"),
      autoprefixer = require ("autoprefixer"),
      media_queries = require('gulp-group-css-media-queries'),
      server = require ("browser-sync").create();
      clean_css = require('gulp-clean-css'),
      gulp_rename = require('gulp-rename'),
      uglify_js = require('gulp-uglify-es').default,
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin');

function css () {
  return gulp.src ('./src/scss/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([autoprefixer({
      overrideBrowserslist: ["last 3 versions"]
    })]))
  .pipe(media_queries())
  .pipe(gulp.dest('./build/css'))
  .pipe(clean_css())
  .pipe(
    gulp_rename({
      extname: ".min.css"
    })
    )
  .pipe(gulp.dest('./build/css'))
  .pipe(server.stream());
}

function html () {
  return gulp.src('./src/pug/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./build/'))
  .pipe(server.stream());
}

function js () {
  return gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./build/js/'))
    .pipe(babel({
            presets: ['@babel/env']
        }))
    .pipe(uglify_js())
    .pipe(
      gulp_rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest('./build/js/'))
    .pipe(server.stream());
};

function img () {
  return gulp.src('./src/img/**/**.**')
  .pipe(
    imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3,
    })
  )
  .pipe(gulp.dest('./build/img/'))
}

function serve () {
    server.init({
        server: {
            baseDir: 'build/'
        },
    });
    gulp.watch ('./src/scss/**/*.scss', css)
    gulp.watch ('./src/pug/**/*.pug', html)
    gulp.watch ('./src/js/**/*.js', js)
    gulp.watch ('./src/img/**/', img).on('change', server.reload)
    gulp.watch ('./build/*.html').on('change', server.reload)
    gulp.watch ('./build/css/**/*.css').on('change', server.reload)
    gulp.watch ('./build/js/**/*.js').on('change', server.reload)
};

gulp.task('start', gulp.series(gulp.parallel(js, css, html, img), serve))
