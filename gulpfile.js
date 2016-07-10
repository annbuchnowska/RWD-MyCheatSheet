/** 
  * @desc Gulpfile 
  * @author Anna Buchnowska 
*/

var Promise = require('es6-promise').Promise;
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	plumber = require("gulp-plumber"),
	browserSync = require("browser-sync"),
	del = require("del"),
	useref = require("gulp-useref"),
 	uglify = require("gulp-uglify"),
	gulpif = require("gulp-if"),
	imagemin = require("gulp-imagemin");


// test
/*gulp.task("hello", function() {
	console.log("hello world");
}); */


// Compile sass into CSS + watching 
gulp.task("css", function() {
	require('es6-promise').polyfill();
	gulp.src("src/scss/style.scss")
		.pipe(plumber())
		.pipe(sass.sync())
		.pipe(autoprefixer({
			browsers: ["last 3 versions"],
			cascade: true
		}))
		.pipe(gulp.dest("src/css/"))
		.pipe(browserSync.stream());
});

gulp.task("server", function(){
	browserSync.init({
		server: "src/"
	});
});

gulp.task("watch", function() {
	gulp.watch("src/scss/**/*.scss", ["css"]);
	gulp.watch(["src/*.html", "svg-diagram/**/*.js"], browserSync.reload);
});

gulp.task("clean", function(){
	del("dist/");
});

gulp.task("html", function(){
	gulp.src("src/*html")
		.pipe(useref())
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulp.dest("dist/"));
});

gulp.task("images", function(){
	gulp.src("src/images/*", {
		base: "src/"
		})
		.pipe(imagemin())
		.pipe(gulp.dest("dist/"));
});


gulp.task("default", ["css", "server", "watch"]);





