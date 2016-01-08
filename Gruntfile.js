module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            clean: {
                files: ["app/views/**/*", "app/views/*"],
                tasks: ["clean", 'copy'],
                options: {
                    debounceDelay: 100
                }
            },
            cssmin: {
                files: ["app/stylesheets/**/*.css", "app/stylesheets/**/*.css"],
                tasks: ["cssmin"],
                options: {
                    debounceDelay: 250
                }
            }

        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    "app/__build/css/entry.min.css": [ "app/stylesheets/entry/login.css", "app/stylesheet/entry/register.css" ],
                    "app/__build/css/index.min.css": [ "app/stylesheets/index.css"],
                    "app/__build/css/user.min.css": [ "app/stylesheets/account/account-index.css", "app/stylesheets/account/agent-agent-recharge.css"],
                    "app/__build/css/recharge.min.css": [ "app/stylesheets/account/agent-recharge.css"],
                    "app/__build/css/morefn.min.css": [ "app/stylesheets/morefn/morefn.css"],
                }
            }

        },

        copy: {
            main: {
                cwd: 'app/views',
                src: '**',
                dest: 'app/__build/views/',
                expand: true,
                flatten: false,
            }
        },

        clean: {
            files: ['app/__build/views']
        }


    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

}