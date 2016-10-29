module.exports = function(grunt) {
    "use strict";

    grunt.registerTask("deploy", ["copy:server", "copy:all", "concurrent:target"]);
};
