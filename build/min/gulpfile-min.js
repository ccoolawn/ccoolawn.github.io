var gulp=require("gulp"),less=require("gulp-less"),browserSync=require("browser-sync").create(),header=require("gulp-header"),cleanCSS=require("gulp-clean-css"),rename=require("gulp-rename"),uglify=require("gulp-uglify"),pkg=require("./package.json"),banner=["/*!\n"," * Cornell Coulon- <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n"," * Copyright 2016-"+(new Date).getFullYear()," <%= pkg.author %>\n"," * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n"," */\n",""].join("");gulp.task("default",["less","minify-css","minify-js","copy"]),gulp.task("less",function(){return gulp.src("less/grayscale.less").pipe(less()).pipe(header(banner,{pkg:pkg})).pipe(gulp.dest("css")).pipe(browserSync.reload({stream:!0}))}),gulp.task("minify-css",function(){return gulp.src("css/grayscale.css").pipe(cleanCSS({compatibility:"ie8"})).pipe(rename({suffix:".min"})).pipe(gulp.dest("css")).pipe(browserSync.reload({stream:!0}))}),gulp.task("minify-js",function(){return gulp.src("js/grayscale.js").pipe(uglify()).pipe(header(banner,{pkg:pkg})).pipe(rename({suffix:".min"})).pipe(gulp.dest("js")).pipe(browserSync.reload({stream:!0}))}),gulp.task("bootstrap",function(){return gulp.src(["node_modules/bootstrap/dist/**/*","!**/npm.js","!**/bootstrap-theme.*","!**/*.map"]).pipe(gulp.dest("vendor/bootstrap"))}),gulp.task("jquery",function(){return gulp.src(["node_modules/jquery/dist/jquery.js","node_modules/jquery/dist/jquery.min.js"]).pipe(gulp.dest("vendor/jquery"))}),gulp.task("fontawesome",function(){return gulp.src(["node_modules/font-awesome/**","!node_modules/font-awesome/**/*.map","!node_modules/font-awesome/.npmignore","!node_modules/font-awesome/*.txt","!node_modules/font-awesome/*.md","!node_modules/font-awesome/*.json"]).pipe(gulp.dest("vendor/font-awesome"))}),gulp.task("copy",["bootstrap","jquery","fontawesome"]),gulp.task("browserSync",function(){browserSync.init({server:{baseDir:""}})}),gulp.task("dev",["browserSync","less","minify-css","minify-js"],function(){gulp.watch("less/*.less",["less"]),gulp.watch("css/*.css",["minify-css"]),gulp.watch("js/*.js",["minify-js"]),gulp.watch("*.html",browserSync.reload),gulp.watch("js/**/*.js",browserSync.reload)});