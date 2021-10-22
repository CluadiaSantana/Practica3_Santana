const gulp = require('gulp');
const tsc = require('gulp-typescript');



gulp.task('scripts', function (){
    const tsConfig = tsc.createProject('tsconfig.json');
    return tsConfig.src()
    .pipe(tsConfig())
    .pipe(gulp.dest('src/controllers'));
});

gulp.task('scripts:watch', gulp.series('scripts',function(done){
    //escucha cambios
    gulp.watch('src/scripts/**/*.ts', gulp.series('scripts'));
    done();
}));

gulp.task('serve', function(done){
    const allTask=gulp.parallel('scripts:watch');
    allTask();
    done();
}); 

gulp.task('default', gulp.parallel('scripts', function(done) 
{
    done();
}));