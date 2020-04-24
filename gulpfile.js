const gulp = require ("gulp");
const pug = require ("gulp-pug");
const sass = require ("gulp-sass");
const plumber = require ("gulp-plumber");
const postcss = require ("gulp-postcss");
const autoprefixer = require ("autoprefixer");
const server = require ("browser-sync").create();

function css () {
  return gulp.src ('./src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss ([
    autoprefixer()
  ]))
  .pipe(gulp.dest('./build/css'))
  .pipe(server.stream());
}

function html () {
  return gulp.src ('./src/pug/**/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./build/'))
  .pipe(server.stream());
}

function serve () {
    server.init({
        server: {
            baseDir: 'build/'
        },
        port: 8080,
        notify: false
    });
    gulp.watch ('./src/scss/**/*.scss', css)
    gulp.watch ('./src/pug/**/*.pug', html)
    gulp.watch ('./build/*.html').on('change', server.reload)
    gulp.watch ('./build/css/**/*.css').on('change', server.reload)
    gulp.watch ('./build/js/**/*.js').on('change', server.reload)
};

gulp.task('start', gulp.series(gulp.parallel(css,html), serve))
