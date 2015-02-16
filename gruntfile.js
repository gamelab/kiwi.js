module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		BASE_PATH: "",
		DEVELOPMENT_PATH: "",

		ts: {
			build: {
				src: ["./src/**/*.ts"],
				out: "./build/kiwi.js",

				options: {
					target: "es5",
					module: "commonjs",
					sourcemap: false,
					declaration: true,
					comments: true
				},
			}
		},

		yuidoc: {
			compile: {
				name: "<%= pkg.name %>",
				description: "<%= pkg.description %>",
				version: "<%= pkg.version %>",
				url: "<%= pkg.homepage %>",

				options: {
					extension: ".ts",
					paths: "<%= DEVELOPMENT_PATH %>" + "src/",
					outdir: "<%= BASE_PATH %>" + "docs/"
				}
			}
		},

		uglify: {
			build: {
				files: {
					"build/kiwi.min.js": ["build/kiwi.js"]
				}
			}
		},

		concat: {
			build: {
				src: ["build/kiwi.js", "src/gl-matrix-min.js"],
				dest: "build/kiwi.js"
			},
			buildmin: {
				src: ["build/kiwi.min.js", "src/gl-matrix-min.js"],
				dest: "build/kiwi.min.js"
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
				src: "docstyles/logo.png",
				dest: "docs/assets/css/logo.png"
			},

			docfavicon: {
				src: "docstyles/favicon.png",
				dest: "docs/assets/favicon.png"
			},

			docstyles: {
				src: "docstyles/main.css",
				dest: "docs/assets/css/main.css"
			},

			templateGame: {
				src: "./build/kiwi.js",
				dest: "./templateGame/lib/kiwi.js"
			}
		}
	});

	grunt.registerTask( "default", [
		"ts:build", "tslint", "concat:build", "uglify:build",
		"copy:templateGame" ] );
	grunt.registerTask( "full", [
		"ts:build", "tslint", "concat:build", "uglify:build",
		"yuidoc:compile", "copy:templateGame",
		"copy:doclogo", "copy:docstyles", "copy:docfavicon" ] );
	grunt.registerTask( "docs", [
		"yuidoc:compile", "copy:doclogo",
		"copy:docstyles", "copy:docfavicon" ] );
	grunt.registerTask( "join", [ "concat:build" ] );
};
