module.exports = function(grunt){

	grunt.initConfig({

		//recibe valor por línea de comandos, ejemplo: grunt copy:core --taller='../ram_a8_f3'
		oda: grunt.option('oda') || 'dist',

		jshint: {
			files: [
						'timer.js'
					]
		},
		sass: {
			dist: {
				options: {
					style: 'expanded', //compressed, expanded
					sourcemap: 'none'
				},
				files: [{
					expand: false,
					src: 'timer.scss',
					dest: 'timer.css'
				}]
			}
		},
		autoprefixer: {
			dest: {
				src: 'timer.css'
			}
		},
		watch: {
			general: {
				files: ['index.html', 'timer.scss', 'timer.js'],
				tasks: ['default']
			},
			options: {
				livereload: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'jshint']);
};