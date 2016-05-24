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
        port: 8000,
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

var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
    return gulp.src('./app/scripts/**/*.js') // Busca los archivos que coincidan con la regex
        .pipe(jshint('.jshintrc')) // Se enlaza con las configs establcidas en el fichero .jshintrc
        .pipe(jshint.reporter('jshint-stylish')) // Usa el plugin de jshint para mostrar de una mejor manera los mensajes por terminal
        .pipe(jshint.reporter('fail')); // Seguiremos informando
});

var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', function () {
    var target = gulp.src('./app/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src(['./app/scripts/**/*.js', './app/stylesheets/**/*.css'], {read: false, relative: true});
 
    return target
        .pipe(inject(sources, {ignorePath: '/app'}))
        .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: './app/lib/'  
        })) 
        .pipe(gulp.dest('./app'));
});

gulp.task('server-dist', function() {
    connect.server({
        root: './dist',
        hostname: '0.0.0.0',
        port: 8000,
        livereload: true,    
        middleware: function(connect, opt) {
            return [ historyApiFallback() ];
        }
    });
});

gulp.task('build', []);

//END OF TASK DECLARATIONS

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
    gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
    gulp.watch(['./bower.json'], ['wiredep']);
});

// Tarea por defecto que a su vez lanza las tareas server y watch.
gulp.task('default', ['server', 'inject', 'wiredep', 'watch']);


