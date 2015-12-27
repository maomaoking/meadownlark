/**
 * Created by zhangyumou on 15/12/27.
 */



module.exports = function (grunt){
    //加载插件
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function(task){
        grunt.loadNpmTasks(task);
    });

    grunt.initConfig({
        cafemocha: {
            //mocha -u tdd -R spec qa/tests-unit.js
            all: {src: 'qa/tests-unit.js', options: {ui: 'tdd'}}
        },
        jshint: {
            app: ['meadowlark.js','public/js/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js']
        },
        exec: {
            //linkchecker:{
            //    cmd: 'linkchecker http://localhost:3000'
            //}
        }
    });
    grunt.registerTask('default', ['cafemocha', 'jshint']);
};