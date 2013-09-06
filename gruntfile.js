module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    BASE_PATH: '',
    DEVELOPMENT_PATH: '',

    ts: {            
        build: {                          
            src: ["./src/**/*.ts"],    
            out: './build/kiwi.js',    
           
            options: {                    
                target: 'es5',            
                module: 'commonjs',       
                sourcemap: false,         
                declaration: true,       
                comments: true           
            },
        }
    },

    yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    extension: '.ts',                               
                    paths: '<%= DEVELOPMENT_PATH %>' + 'src/',
                    outdir: '<%= BASE_PATH %>' + 'docs/'
                }
            }
        },

    uglify: {
            build: {
                files: {
                'build/kiwi.min.js': ['build/kiwi.js']
            }
        }
    }
  });

  grunt.loadNpmTasks("grunt-ts");

  grunt.loadNpmTasks('grunt-contrib-uglify');

  //grunt.loadNpmTasks('grunt-contrib-yuidoc');

  
  
  
  // Default task(s).
  grunt.registerTask("default", ["ts:build",'uglify:build']);
  
  

};