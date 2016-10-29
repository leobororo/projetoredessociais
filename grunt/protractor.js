module.exports = {
    protractor: {
        options: {
            keepAlive: true,
            configFile: "protractor.conf.js"
        },
        singlerun: {},
        auto: {
            keepAlive: true,
            options: {
                args: {
                    seleniumPort: 4444
                }
            }
        }
    }
};
