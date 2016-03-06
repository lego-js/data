var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var Server = require('karma').Server;

function compile(entry, watch) {
    var bundler = browserify({ entries: [entry], debug: true }).transform('babelify', { presets: ['es2015'] });

    var name = entry.split('/').pop();

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source(name))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        watchify(bundler).on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function compileAll(watch) {
    glob('./src/es5-*.js', function(err, files) {
        if(err) return;

        files.map(function(entry) {
            compile(entry, watch)
        });
    })
}

function serveKarma(watch) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: !watch
    }).start();
}

gulp.task('default', function() {
    compileAll();
    serveKarma();
});

gulp.task('watch', function() {
    compileAll(true);
    serveKarma(true);
});
