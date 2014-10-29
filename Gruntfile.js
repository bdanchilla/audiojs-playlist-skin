module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        src: 'js/playlist.js',
        dest: 'js/playlist.min.js'
      },
    },
    cssmin: {
      css: {
        src: 'css/playlist.css',
        dest: 'css/playlist.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  // Default task(s).
  grunt.registerTask('default', ['uglify:js', 'cssmin:css']);

};
