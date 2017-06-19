/*
 * Signaletic Gruntfile
 * http://github.com/fluid-studios/signaletic
 *
 * Copyright 2017, OCAD University
 * Licensed under the New BSD license.
 */

"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            src: [
                "src/**/*.js",
                "tests/**/*.js",
                "examples/**/*.js"
            ]
        },

        jsonlint: {
            src: [
                "src/**/*.json",
                "tests/**/*.json",
                "examples/**/*.json"
            ]
        },

        json5lint: {
            options: {
                enableJSON5: true
            },
            src: [
                "src/**/*.json5",
                "tests/**/*.json5",
                "examples/**/*.json5"
            ]
        }
    });

    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");
    grunt.loadNpmTasks("fluid-grunt-json5lint");

    grunt.registerTask("lint", "Lint JavaScript, JSON, and JSON5 files",
        ["eslint", "jsonlint", "json5lint"]);
    grunt.registerTask("default", ["lint"]);
};
