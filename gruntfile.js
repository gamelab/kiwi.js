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
    },

    concat: {
          build: {
            src:['build/kiwi.js','src/gl-matrix-min.js'],
            dest: 'build/kiwi.js'
          },
          buildmin: {
            src:['build/kiwi.min.js','src/gl-matrix-min.js'],
            dest: 'build/kiwi.min.js'
          }
          
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      files: {
        src: ["./src/**/*.ts"],
      }
    },

    copy: {
        doclogo: {
		    src: 'docstyles/logo.png',
        dest: 'docs/assets/css/logo.png'
	  },
   	    
    docstyles: {
      src: 'docstyles/main.css',
    	dest: 'docs/assets/css/main.css'
	  }

    }


 });

  grunt.loadNpmTasks("grunt-ts");

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-tslint'); 
  
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask("default", ["ts:build", "tslint","concat:build","uglify:build"]);
  grunt.registerTask("full", ["ts:build","concat:build","uglify:build","yuidoc:compile","copy:doclogo","copy:docstyles"]);
  grunt.registerTask("docs", ["yuidoc:compile","copy:doclogo","copy:docstyles"]);
  grunt.registerTask("join", ["concat:build"]);
};