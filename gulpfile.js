const gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass"),
  babel = require("gulp-babel"),
  htmlbeautify = require("gulp-html-beautify"),
  plumber = require("gulp-plumber"), //ловим ошибки
  autoprefix = require("gulp-autoprefixer"), //добавление вендорных префиксов
  imagemin = require("gulp-imagemin"), //минификация изображений
  imageminpng = require("imagemin-pngquant"), //минификация png изображений
  newer = require("gulp-newer"), //отслеживание изменнённых и нетронутых файлов
  wait = require('gulp-wait'),
  del = require("del"), //удаление файлов и папок
  browserSync = require("browser-sync"), //autoreload страниц
  reload = browserSync.reload;

const path = {
  source: {
    pug: "./pages/**/*.pug",
    styles: [
      "./sass/**/*.scss",
      "!./sass/variables/*.scss",
      "!./sass/components/*.scss",
    ],
    img: "./images/**/*.*",
    html: "./html-pages/*.html",
  },
  build: {
    pug: "./html-pages/",
    styles: "./css/",
    img: "./images/",
    html: ".html-pages/",
  },
  watch: {
    pug: "./**/*.pug",
    styles: "./sass/**/*.scss",
    img: "./images/**/*.*",
  },
  clean: ["./html-pages/**", "./css/styles.css"],
};

gulp.task("clean", function () {
  return del(path.clean);
});

gulp.task("browser-sync", function () {
  browserSync.init({
    open: "ui",
    browser: "chrome",
    server: {
      baseDir: "./",
      directory: true,
    },
    startPath: '/html-pages',
    port: 8084,
    cors: true,
    notify: false,
    files: ["./*.*"],
  });
});

gulp.task("pug:build", function () {
  return gulp
    .src(path.source.pug)
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(path.build.pug))
    .pipe(reload({ stream: true }));
});

gulp.task("styles:build", function () {
  return gulp
    .src(path.source.styles)
    .pipe(wait(300))
    .pipe(newer(path.build.styles))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(gulp.dest(path.build.styles))
    .pipe(reload({ stream: true }));
});

gulp.task("img:build", function () {
  return gulp
    .src(path.source.img, { base: "./images/" })
    .pipe(newer(path.build.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [imageminpng()],
        interlaced: true,
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

gulp.task("htmlbeautify", function () {
  var options = { indentSize: 2 };
  return gulp
    .src(path.source.html)
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest(path.build.html));
});

gulp.task(
  "build",
  gulp.series(
    gulp.parallel("styles:build", "img:build", "pug:build"),
    "htmlbeautify"
  )
);

gulp.task("watch", function () {
  gulp.watch(path.watch.pug, gulp.series("pug:build", "htmlbeautify"));
  gulp.watch(path.watch.styles, gulp.series("styles:build"));
  gulp.watch(path.watch.img, gulp.series("img:build"));
});


gulp.task(
  "default",
  gulp.series("clean", "build", gulp.parallel("watch", "browser-sync"))
);
