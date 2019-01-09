const gulp = require("gulp");
const concat = require("gulp-concat");

gulp.task("concat", function() {
  return gulp
    .src([
      "./dist/iv-widget/runtime.js",
      "./dist/iv-widget/polyfills.js",
      "./dist/iv-widget/scripts.js",
      "./dist/iv-widget/main.js"
    ])
    .pipe(concat("iv-widget.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("default", gulp.series(["concat"]));
