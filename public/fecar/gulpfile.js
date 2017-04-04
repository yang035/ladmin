

// main
const gulp = require("gulp");

// tool
const plumber = require("gulp-plumber");
const debug = require("gulp-debug");
const notify = require("gulp-notify");

// compile
const stylus = require("gulp-stylus");
const autoprefixer = require("gulp-autoprefixer");
const browserify = require("gulp-browserify");
const map = require("gulp-sourcemaps");


// init path
const src = {
	es: "es/",
	stylus: "stylus/"
}
const dest = {
	js: "js/",
	css: "css/"
}


// gulp compile tasks
gulp.task("dest_stylus", function(){
	return gulp.src( [src.stylus + "*.styl"] )
		.pipe( plumber() )
		.pipe( map.init() )
		.pipe( stylus({ outputStyle: "expanded" }) )
		.pipe( autoprefixer() )
		.pipe( map.write() )
		.pipe( gulp.dest( dest.css ) );
});

gulp.task("dest_es", function(){
	return gulp.src( [src.es + "*.js"] )
		.pipe( plumber() )
		.pipe( map.init() )
		.pipe( browserify() )
		.pipe( map.write() )
		.pipe( gulp.dest( dest.js ) );
});

// gulp dest
gulp.task("dest", ["dest_stylus", "dest_es"]);

// gulp watch
gulp.task("watch", function(){
	gulp.watch( [src.stylus + "**/*.styl"], ["dest_stylus"] );
	gulp.watch( [src.es + "**/*.js"], ["dest_es"] );
});

// gulp default
gulp.task("default", function(){
	console.log(
		"\n" +
		"\n" +
		"please input the task name:\n" +
		"\n" +
		"dest   : Compile src to dest.\n" +
		"watch  : Watch src and compile in real time.\n" +
		"\n" +
		"\n"
	);
});
