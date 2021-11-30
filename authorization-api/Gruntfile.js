module.exports = function(grunt) {

  grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),
   copy: {
        json: {
            expand: true,
            cwd: './src',
            src: '**/*.json',
            dest: './dist'
        },
        assets:{
          expand: true,
          cwd: './src',
          src: 'assets/**',
          dest: './dist'
        },
        templates:{
          expand: true,
          cwd: './src',
          src: '**/*.hbs',
          dest: './dist'
        },
        certs:{
          expand: true,
          cwd: './src',
          src: 'certs/**',
          dest: './dist'
        }
    },
    watch:{
      templates:{
        files:['./src/**/*.hbs'],
        tasks:['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["copy:json", "copy:assets", "copy:templates", "copy:certs"]);
};