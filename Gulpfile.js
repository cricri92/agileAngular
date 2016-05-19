var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

// SERVIDOR WEB DE DESARROLLO
// Permite que los cambios que se realicen en el proyecto puedan ser visibles desde nuestra IP,
// siempre y cuando las personas que accedan esten dentro de la misma red y
// tambien permite que los cambios que se hagan mientras de desarrolla puedan
// visualizarse de inmediato.

gulp.task('server', function() {
    connect.server({
        root: './app',
        hostname: '0.0.0.0',
        port: 8080,
        livereload: true,
        middleware: function(connect, opt) {
            return [ historyApiFallback() ];
        }
    });
});


// CONFIGURACION PARA EL COMPILADO DE LOS ARCHIVOS .styl que generan los .css para la aplicacion
var stylus = require('gulp-stylus'),
nib = require('nib');

// Pre-procesa archivos Stylus a CSS y recarga los cambios
// Por ahora, esta tarea tomara el archivo 'main.styl' para procesarlo, y lo guardara en el destino:
// app/stylesheets
gulp.task('css', function() {
    gulp.src('./app/stylesheets/main.styl')
        .pipe(stylus({ use: nib() }))
        .pipe(gulp.dest('./app/stylesheets'))
        .pipe(connect.reload());
});
// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload());
});
// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
});

// Tarea por defecto que a su vez lanza las tareas server y watch.
gulp.task('default', ['server', 'watch']);

