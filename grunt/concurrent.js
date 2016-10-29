module.exports = {
    target: {
        tasks: ['nodemon', 'watch'],
        //tasks: ['watch'],
        options: {
            logConcurrentOutput: true,
            limit: 5
        }
    },
    test: {
        tasks: ['watch'],
        //tasks: ['nodemon', 'watch', 'protractor'],
        options: {
            logConcurrentOutput: true,
            limit: 5
        }
    }
};
