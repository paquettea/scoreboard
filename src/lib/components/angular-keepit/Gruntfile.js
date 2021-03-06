module.exports = function (grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ngmin: {
         module: {
            src: [  "src/KeepIt.js" ],
            dest: "dist/KeepIt.ngmin.js"
         },
         localStorage:{
             src: [  "src/Interfaces/KeepItLocalStorageService.js"],
             dest: "dist/KeepItLocalStorageService.ngmin.js"

         },
         sessionStorage:{
             src: [  "src/Interfaces/KeepItSessionStorageService.js"],
             dest: "dist/KeepItSessionStorageService.ngmin.js"
         },
         cacheFactory:{
             src: [  "src/Interfaces/KeepItCacheFactoryService.js"],
             dest: "dist/KeepItCacheFactoryService.ngmin.js"
         }
      },
      uglify: {
         my_target: {
            files: {
               'dist/KeepIt.min.js': ['dist/KeepIt.ngmin.js'],
               'dist/KeepItCacheFactoryService.min.js': ['dist/KeepItCacheFactoryService.ngmin.js'],
               'dist/KeepItLocalStorageService.min.js': ['dist/KeepItLocalStorageService.ngmin.js'],
               'dist/KeepItSessionStorage.min.js': ['dist/KeepItSessionStorageService.ngmin.js']
            }
         }
      },
      watch: {
         normal: {
            files: ['src/**.js'],
            tasks: ['default']
         }
      }
   });

   grunt.loadNpmTasks("grunt-ngmin");
   grunt.loadNpmTasks('grunt-contrib-uglify');
   //grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-watch');

   // Default task(s).
   grunt.registerTask('default', ['ngmin','uglify']);
   grunt.registerTask('watch', ['watch:normal']);
};