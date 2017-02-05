module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        
        clean: {
            css: 'public/css/release/angular-bootstrap-web.min.css',
            libscss: 'public/css/release/libs-all.min.css',
            libsjs: ['public/js/release/libs-all.js','public/js/release/libs-all.min.js'],
            js: ['public/js/release/angular-bootstrap-web.js','public/js/release/angular-bootstrap-web.min.js']
        },
        
        less: {
            compile: {
                options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'app.css.map',
                  sourceMapFilename: 'public/css/app.css.map'
                },
                src: 'public/less/app.less',
                dest: 'public/css/app.css'
            }
        },
        
        bowercopy: {
            libs: {
                options: {
                    destPrefix: 'public/js/libs'
                },
                files: {
                    'moment.js': 'moment/moment.js',
                    'jquery.js': 'jquery/dist/jquery.js',
                    'jquery-ui.js': 'jquery-ui/jquery-ui.js',
                    'angular.js': 'angular/angular.js',
                    'angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.js',
                    'ui-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.js'
                }
            },
            css: {
                options: {
                    destPrefix: 'public/css/libs'
                },
                files: {
                    'font-awesome.css': 'font-awesome/css/font-awesome.css',
                    'animate.css': 'animate.css/animate.css',
                    'bootstrap.css': 'bootstrap/dist/css/bootstrap.css'
                }
            }
        },
        
        copy: {
            libsfonts: {
                files: [
                    { 
                        cwd: 'bower_components/',
                        src: ['font-awesome/fonts/*',  
                            'bootstrap/dist/fonts/*',  
                            'source-sans-pro/EOT/*',
                            'source-sans-pro/OTF/*',
                            'source-sans-pro/TTF/*',
                            'source-sans-pro/WOFF/OTF/*',
                            'source-sans-pro/WOFF/TTF/*',
                            'source-sans-pro/WOFF2/OTF/*',
                            'source-sans-pro/WOFF2/TTF/*'
                        ], 
                        dest: 'public/css/fonts/',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: 'public/css/libs',
                        src:['*.css', '!*.min.css'],
                        dest: 'public/css/libs',
                        ext: '.min.css'
                },
                {
                        expand: true,
                        cwd: 'public/css',
                        src:['*.css', '!*.min.css'],
                        dest: 'public/css',
                        ext: '.min.css'
                }]
            }
        },
    
        concat: {
            options: {
              banner: '',
              stripBanners: false
            },
            
            libscss: {
              src: [
                'public/css/libs/*.min.css'
              ],
              dest: 'public/css/release/libs-all.min.css'
            },
            
            css: {
              src: [
                'public/css/*.min.css'
              ],
              dest: 'public/css/release/angular-bootstrap-web.min.css'
            },
            
            libsjs: {
                src: ['public/js/libs/moment.js', 
                    'public/js/libs/moment-timezone-with-data.js', 
                    'public/js/libs/jquery.js', 
                    'public/js/libs/jquery-ui.js', 
                    'public/js/libs/angular.js', 
                    'public/js/libs/**/*.js'],
                dest: 'public/js/release/libs-all.js'
            },
            
            js: {
                src: ['public/js/main.js', 'public/js/**/*.js', '!public/js/libs/**/*.js', '!public/js/release/**/*.js'],
                dest: 'public/js/release/angular-bootstrap-web.js'
            }
        },
        
        uglify: {
            options: {
              compress: {
                warnings: false
              },
              mangle: true,
              preserveComments: 'some'
            },
            
            libs: {
              src: 'public/js/release/libs-all.js',
              dest: 'public/js/release/libs-all.min.js'
            },
            
            source: {
              src: 'public/js/release/angular-bootstrap-web.js',
              dest: 'public/js/release/angular-bootstrap-web.min.js'
            }
        },
        
        watch: {
            less: {
              files: 'public/less/**/*.less',
              tasks: 'build-css'
            },
            
            js: {
              files: ['public/js/**/*.js', '!public/js/libs/**/*.js', '!public/js/release/**/*.js'],
              tasks: 'build-js'
            }
        }
    });
        
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.registerTask('compile-less', ['less:compile']);
    grunt.registerTask('concat-css', ['concat:libscss', 'concat:css']);
    grunt.registerTask('copy-libs-assets', ['bowercopy:libs', 'bowercopy:css', 'copy:libsfonts']);
    grunt.registerTask('build-css', ['clean:css', 'less:compile', 'cssmin', 'concat:css']);
    grunt.registerTask('build-js', ['clean:js', 'concat:js', 'uglify:source']);
    grunt.registerTask('release', ['clean', 'less:compile', 'copy-libs-assets', 'cssmin', 'concat', 'uglify']);
};
