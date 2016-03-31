
// -----------------------------------------------
//
//   A not-so-simple gulpfile.
//   Based on: https://github.com/braveux/website
//   and: https://github.com/drewbarontini/noise
//
// -----------------------------------------------
//
//   ToDo:
// - linting
// - options as an object (ala Noise)
// - sass sourcemaps (so can minify everything always)
//
// -----------------------------------------------

var gulp    = require( 'gulp' );
// var run     = require( 'run-sequence' );
var plugins = require( 'gulp-load-plugins' )( {
    lazy: true,
    rename : {
        'gulp-sass-lint'  : 'sasslint',
        'gulp-svg-symbols': 'svgsymbols',
        'psi'             : 'pagespeedindex'
    }

} );


// -----------------------------------------------
//   Options
// -----------------------------------------------

var options = {

    default : {
        tasks : [ 'build', 'watch' ]
    },

    build : {
        tasks       : [ 'images', 'compile:sass', 'minify:js', 'fonts' ],
        destination : 'build/'
    },

    production : {
        tasks : [ 'build', 'minify:css' ]
    },

    css : {
        files       : 'source/stylesheets/*.css',
        // file        : 'source/stylesheets/application.css',
        // destination : 'source/stylesheets'
        file        : 'build/styles/styles.css',
        destination : 'build/styles'
    },

    fonts : {
        files       : 'source/fonts/*.{otf,ttf,eot,woff,woff2,svg}',
        destination : 'build/fonts'
    },

    icons : {
        files       : 'source/icons/ic-*.svg',
        destination : 'build/icons'
    },

    images : {
        files       : 'source/images/*',
        destination : 'build/images'
    },

    js : {
        files       : 'source/scripts/*.js',
        file        : 'source/scripts/site.js',
        destination : 'source/scripts'
    },

    pagespeedindex : {
        site        : 'http://www.apfbrokercairns.com.au/',
        key         : ''
    },

    sass : {
        files       : 'source/styles/*.scss',
        destination : 'build/styles'
    },

    watch : {
        files : function() {
            return [
                options.images.files,
                options.js.files,
                options.sass.files
            ]
        },
        run : function() {
            return [
                [ 'images' ],
                [ 'minify:js' ],
                [ 'compile:sass' ]
            ]
        }
    }
}


// -----------------------------------------------
//   Tasks
// -----------------------------------------------

gulp.task( 'default', options.default.tasks );

gulp.task( 'build', function() {
    options.build.tasks.forEach( function( task ) {
        gulp.start( task );
    } );
});

gulp.task( 'production', options.production.tasks );

gulp.task('fonts', function() {
    gulp.src( options.fonts.files )
        .pipe( gulp.dest( options.fonts.destination ) )
        .pipe( plugins.size({title: 'fonts'}) );
});

gulp.task('images', function() {
    gulp.src( options.images.files )
        // .pipe( plugins.cache( plugins.imagemin({ })))
        .pipe( plugins.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe( gulp.dest( options.images.destination ) )
        .pipe( plugins.size({title: 'images'}) );
});

gulp.task( 'compile:sass', function() {
    gulp.src( options.sass.files )
        .pipe( plugins.plumber() )
        .pipe( plugins.sass( {
            indentedSyntax: true,
            // errLogToConsole: true
        } ) )
        .pipe( plugins.autoprefixer( {
                browsers : [ 'last 2 versions' ],
                cascade  : false
        } ) )
        // .pipe(sourcemaps.init())
        // .pipe(plugins.sourcemaps.write('./'))
        .pipe( gulp.dest( options.sass.destination ) )
        .pipe( plugins.size({title: 'styles'}) )
        .pipe( plugins.connect.reload() );
});

// Research & decide:
// gulp-clean-css or gulp-cssmin or gulp-cssnano?

gulp.task( 'minify:css', function () {
    gulp.src( options.css.file )
        .pipe( plugins.plumber() )
        .pipe( plugins.uncss ( {
            html: [
                '_includes/*.html',
                '_layouts/*.html',
                '/blog/*.html',
                '/info-for/*.html',
                '*.html'
            ],
            uncssrc: '.uncssrc'
        } ) )
        .pipe( plugins.cssnano( { advanced: false } ) )
        .pipe( plugins.rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( options.build.destination ) )
        .pipe( plugins.size({title: 'styles'}) )
        .pipe( plugins.connect.reload() );
});

gulp.task( 'minify:js', function () {
    gulp.src( options.js.files )
        .pipe( plugins.plumber() )
        .pipe( plugins.concat('site.concat.js') )
        .pipe( plugins.uglify() )
        // .pipe( plugins.rename( { suffix: '.min' } ) )
        .pipe( gulp.dest( options.build.destination ) )
        .pipe( plugins.connect.reload() );
});

// Creates SVG sprite and demo page.
// See: https://github.com/Hiswe/gulp-svg-symbols

// gulp.task( 'svg:16', function() {
//     gulp.src( options.svg.files + '/16/*.svg' )
//         .pipe( plugins.svgsymbols({
//             title: false,
//             templates: [
//                 'default-svg',                    // generates the SVG sprite
//                 options.svg.template + '/16.html' // example file
//             ]
//         }))
//         .pipe( gulp.dest( options.svg.files + '/16' ) );
// });

gulp.task( 'icons', function() {
    gulp.src( options.icons.files )
        .pipe( plugins.svgmin() )
        .pipe( plugins.svgstore( { inlineSvg: true } ) )
        .pipe( gulp.dest( options.icons.destination ) );
});

// PageSpeed tests using the `nokey` option.
// See: https://github.com/addyosmani/psi-gulp-sample/blob/master/gulpfile.js

gulp.task('psiMobile', function () {
    return plugins.psi( options.pagespeedindex.site, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('psiDesktop', function () {
    return plugins.psi( options.pagespeedindex.site, {
        // key: key,
        nokey: 'true',
        strategy: 'desktop',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});

gulp.task( 'watch', function() {
    var watchFiles = options.watch.files();
    watchFiles.forEach( function( files, index ) {
        gulp.watch( files, options.watch.run()[ index ]  );
    } );
});
