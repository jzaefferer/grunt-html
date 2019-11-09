'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    htmllint: {
      valid: 'test/valid.html',
      invalid: 'test/*.html',
      ignore: {
        options: {
          ignore: 'The “clear” attribute on the “br” element is obsolete. Use CSS instead.'
        },
        src: 'test/fixtures/*.html'
      },
      invalidPhp: {
        options: {
          ignore: /XML processing instructions/
        },
        src: 'test/fixtures/*.php'
      },
      checkstyle: {
        options: {
          reporter: 'checkstyle'
        },
        src: 'test/fixtures/*.html'
      },
      json: {
        options: {
          reporter: 'json'
        },
        src: 'test/fixtures/*.html'
      }
    },
    nodeunit: {
      files: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', 'test');
};
