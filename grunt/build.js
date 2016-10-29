module.exports = function(grunt) {
    "use strict";

    grunt.registerTask("build", ["jshint", "newer:jsbeautifier", "copy"]);

};
