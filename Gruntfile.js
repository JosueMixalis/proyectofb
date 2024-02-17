module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: ['css/*.scss'],
        tasks: ['build', 'scss']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'css/*.css',
            '*.html',
            'js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
    },
    imagemin: {
      dynamic: {
        files:[{
          expand:true,
          cwd: './',
          src:'images/*.{png,gif,jpg,jpeg,webp}',
          dest:'dist/'
        }]
      }
    },
    copy:{
      html:{
        files:[{
          expand:true,
          dot:true,
          cwd: './',
          src: ['*.html'],
          dest: 'dist'
        }]
      },
      fonts: {
        files: [{
          expand:true,
          dot:true,
          cwd:'node_modules/bootstrap-icons/font',
          src:['fonts/*.*'],
          dest: 'dist'
        }]
      }
    },
    clean: {
      build: {
        src : ['dist/']
      }
    },
    cssmin: {
      dist:{}
    },
    uglify: {
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length:20
      },
      release: {
        files: [ {
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist:{}
    },
    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['index.html','about.html','servicios.html','contacto.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: (context,block) => {
                let generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0,
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },
    usemin: {
      html: ['dist/index.html','dist/about.html','dist/servicios.html','dist/contacto.html'],
      options: {
        assetsDir:['dist','dist/css','dist/js']
      }
    }
  });

  grunt.registerTask('build',[
    'clean',
    'copy',
    'imagemin',
    'sass',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
  grunt.registerTask('img:compress',['imagemin']);
};
