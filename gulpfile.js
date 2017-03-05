var gulp = require('gulp');
var gutil = require('gulp-util');

var preprocess = require('gulp-preprocess');
var argv = require('yargs').argv;

var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', [
    // 'uglify', // dependency: core
    'preprocess-html',
    'generate-service-worker',
    // 'build-vendor'
], function() {
    return gutil.log('default DONE');
});

/* **********************************************************************************
 * Builds html for development/production
 * **********************************************************************************/
gulp.task('preprocess-html', function() {
    var cordova = process.env.CORDOVA_CMDLINE || argv.cordova;
    gutil.log('preprocess-html STARTED CORDOVA_CMDLINE:'+(cordova!=undefined)+' Production:'+ argv.production);
    return gulp.src(['./src/index.html'])
        .pipe(preprocess({context: {ENVIRONMENT: argv.production ? 'production' : 'development', CORDOVA:(cordova!=undefined)}}))
        .pipe(gulpif(argv.production, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./www/'))
        .on('end', function() {
            return gutil.log('preprocess-html DONE');
        });
});



// Run PageSpeed Insights
gulp.task('pagespeed', cb =>{

    var psi = require('psi');
    // Output a formatted report to the terminal
    psi.output('https://delivery-v3.ilhanet.com').then(
        (att) => console.log('done',att),
        (att) => console.log('reject',att)
    )
}


    // Update the below URL to the public URL of your site
    // psi('delivery-v3.ilhanet.com', {
    //     strategy: 'mobile'
    //     // By default we use the PageSpeed Insights free (no API key) tier.
    //     // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    //     // key: 'YOUR_API_KEY'
    // }, cb)
);

gulp.task('pagespeed2', cb =>{
    var psi = require('psi');
    // Output a formatted report to the terminal
    psi.output('https://delivery24horas.com').then(
        (att) => console.log('done',att),
        (att) => console.log('reject',att)
    )
});

gulp.task('generate-service-worker', function(callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'www';

    swPrecache.write(`${rootDir}/service-worker.js`, {
        verbose: true,
        staticFileGlobs: [
            rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}',
        ],

        stripPrefix: rootDir,
        // importScripts: [
        //     '/sw-sync.js'
        // ],
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/delivery-v3\.(localhost|ilhanet)\.com\/assets\/fonts/,
                handler: 'cacheFirst',
                options: {
                    debug: true,
                    cache: {
                        maxEntries: 10,
                        name: 'assets-cache',
                        maxAgeSeconds: 604800
                    }
                }
            },
            {
                urlPattern: /^https:\/\/erpnet-v5\.(localhost|ilhanet)\.com\/erpnet-api/,
                handler: 'fastest',
                options: {
                    debug: true,
                }
            },
            {
                urlPattern: /^https:\/\/storage\.googleapis\.com\/ilhanet-140808\.appspot\.com/,
                handler: 'cacheFirst',
                options: {
                    debug: true,
                    cache: {
                        maxEntries: 10,
                        name: 'ilhanet-140808-cache',
                        maxAgeSeconds: 604800
                    }
                }
            },
            {
                urlPattern: /^https:\/\/viacep\.com\.br\/ws/,
                handler: 'cacheFirst',
                options: {
                    debug: true,
                    cache: {
                        maxEntries: 10,
                        name: 'viacep-cache',
                        maxAgeSeconds: 604800
                    }
                }
            },
            // {
            //     urlPattern: /\/product_group\//,
            //     handler: 'fastest',
            //     options: {
            //         cache: {
            //             maxEntries: 10,
            //             name: 'product_group-cache'
            //         }
            //     }
            // }
            ]
    }, callback);
});