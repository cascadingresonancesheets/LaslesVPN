const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

task("clean", () => {
  return src("public/**/*", { read: false }).pipe(rm());
});

task("pug", () => {
  return src("./src/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(dest("./public"))
    .pipe(reload({ stream: true }));
});

task("styles", () => {
  return src("./src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public"))
    .pipe(reload({ stream: true }));
});

task("styles-min", () => {
  return src("./src/scss/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(dest("./public"));
});

task("scripts-dev", () => {
  return src("./src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./public"))
    .pipe(reload({ stream: true }));
});

task("scripts", () => {
  return src("./src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("./public"));
});

task("imgmin", () => {
  return src("./src/img/**/*.*")
    .pipe(dest("public/img"))
    .pipe(imagemin({ quality: 75, progressive: true }))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src("./src/img/**/*.*")
    .pipe(dest("public/img"))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src("./src/fonts/**/*.*").pipe(dest("./public/fonts"));
});

task("copy:resources", () => {
  return src("./src/resources/**/*.*")
    .pipe(dest("./public/resources"))
    .pipe(reload({ stream: true }));
});

task("copy:vendor", () => {
  return src("./src/vendor/**/*.*")
    .pipe(dest("./public/vendor"))
    .pipe(reload({ stream: true }));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
    open: false,
  });
});

task("watch", () => {
  watch("./src/pug/**/*.*", series("pug"));
  watch("./src/scss/**/*.*", series("styles"));
  watch("./src/js/*.js", series("scripts-dev"));
  watch("./src/img/**/*.*", series("copy:img"));
  watch("./src/resources/**/*.*", series("copy:resources"));
  watch("./src/vendor/**/*.*", series("copy:vendor"));
});

task("default", series("clean", parallel("pug", "styles", "scripts-dev", "copy:fonts", "copy:img", "copy:resources", "copy:vendor"), parallel("watch", "server")));

task("build", series("clean", parallel("pug", "styles", "styles-min", "scripts", "copy:fonts", "imgmin", "copy:resources", "copy:vendor")));
