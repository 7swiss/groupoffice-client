var Dgeni = require('dgeni');

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
			tmp: ['.tmp'],
			dist: ["dist/app"],
			docs: ["dist/docs"]
		}, 

        copy: {
            dist: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!lib/**/*.{js,scss}', '!css/**', '!scss/*','!modules/*/js/**','!modules/*/scss/**'],
                dest: 'dist/app'
            },
			fonts:{
				expand: true,
                cwd: 'bower_components/components-font-awesome/fonts/',
                src: ['*'],
                dest: 'dist/app/fonts'
			}
//			scss:{
//				expand: true,
//                cwd: 'app/',
//                src: [
//					'scss/*.scss',
//					'modules/**/scss/*.scss',
//					'lib/**/*.scss'
//				],
//                dest: '.tmp/scss'
//			}
        },

        rev: {
            files: {
                src: ['dist/app/**/*.{js,css}', '!dist/app/lib/shims/**']
            }
        },

        useminPrepare: {
            html: 'app/index.html',
			options: {
				dest: 'dist/app'
			}
        },

        usemin: {
            html: ['dist/app/index.html']
        },
		
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/js',
                        src: '*.js',
                        dest: '.tmp/concat/js'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/app',
                        src: ['**/*.html'],
                        dest: 'dist/app'
                    }
                ]
            }
        },


        uglify: {
			options: {
				report: 'min',
				mangle: false
			}
        },
		
		autoprefixer: {

				// prefix the specified file
//				single_file: {
//				  src: '.tmp/concat/css/app.min.css',
//				  dest: '.tmp/concat/css/app.min.css'
//				}
				single_file: {
				  src: 'app/css/app.css',
				  dest: 'app/css/app.css'
				}
		},


        fileblocks: {
            options: {
                removeFiles: true,
                prefix: '../'
            },
            dev: {
                src: 'app/index.html',
                blocks: {
                    'styles': { src: 'app/css/app.css' },
                    'core': { src: 'app/lib/**/*.js' },
                    'modules': { src: 'app/modules/**/*.js' }
                }
            }
        },
//		
//		compass: {  
//			dev: {
//			  options: {
//				sassDir: '.tmp/scss',
//				cssDir: 'app/css'
//			  }
//			}
//		  },

        watch: {
            blocks: {
                files: [
					'app/**/*.js',
					'app/css/**/scss/*.css'
					//'app/css/modules/**/scss/*.css'
				],
                tasks: ['fileblocks:dev']
            }
//            scss: {
//                files: [
//					'app/**/*.scss',
//					'app/modules/**/scss/*.scss',
//					'app/lib/**/*.scss'
//				],
//                tasks: ['clean:tmp', 'copy:scss', 'compass:dev']
//            }
			
        },
        ngdocs: {
            options: {
                dest: 'dist/docs',
                scripts: [
                    'angular.js',
                    'dist/app/js/app.min.js'
                ],
                title: 'Intermesh Angular Docs',
                html5Mode: false,
				bestMatch: true,
				startPage: '/api'
				
            },
            api: {
                src: ['app/lib/**/*.js'],
                title: 'API Documentation'
            }
        },
		
		
    });
	
	
	

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-file-blocks');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-ngdocs');
	grunt.loadNpmTasks('grunt-autoprefixer');
	
	
	
	grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
		var done = this.async();
		var dgeni = new Dgeni([require('./docs/dgeni-example')]);
		dgeni.generate().then(done);
	  });

    // Tell Grunt what to do when we type "grunt" into the terminal.
    // Default is build the distributable version.
    grunt.registerTask('dist', [
		'clean:tmp',
        'clean:dist',
		'autoprefixer',
        'copy:dist',
		'copy:fonts',
        'useminPrepare',
        'concat:generated',
        'ngAnnotate',
        'uglify:generated',
        'cssmin:generated',
		
        'rev',
        'usemin',
        'htmlmin'
    ]);

    //Generate a minified version for the docs. Don't use rev so we know the
    //file name that is listed in {ngdocs:{scrips:[]}
    grunt.registerTask('docs', [
        'clean:tmp',
		'clean:docs',
        'copy',
        'useminPrepare',
        'concat:generated',
        'ngAnnotate',
        'uglify:generated',
        'usemin',
        'ngdocs'
    ]);
};
