/**
 * Created by David on 5/2/2017.
 */

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var runSequence = require ('run-sequence');
var del = require('del');

//used to read the files in the test folder
var fs = require('fs');

//defult gulp command, run in order
gulp.task("default", function(callback){
    runSequence('clean',['compile-typescript','push-files'],function(){
        callback();
    });
});

//convert typescript to javascript, targeting ES5
gulp.task("compile-typescript", function(){
    console.log("Compiling Typescript");
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("push-files", function(){
    console.log("Pushing Files");
    return gulp.src(['src/**/*.*','!src/**/*.ts','!src/**/*.tsx','!src/**/*.scss'])
        .pipe(gulp.dest("dist"));
});

//remove dist folder
gulp.task("clean",function(){
    console.log("Cleaning dist files");
    return del(["dist/**/*.*","dist/"]).then(paths => {
        console.log('Cleaned Files:\n', paths.join('\n'))});
});

//compile everything run tests, then delete tests