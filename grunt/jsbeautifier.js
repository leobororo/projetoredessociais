module.exports = {
    grunt: {
        src: [
            "Gruntfile.js",
            "grunt/**/*.js"
        ]
    },
    app: {
        src: [
            "client/**/*.js",
            "!client/lib/**/*.js"
        ]
    },
    test: {
        src: [
            "tests/**/*.js"
        ]
    }
};
