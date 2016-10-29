module.exports = {
    all: {
        files: [
            // copiar os arquivos da pasta client para a pasta server/public
            {
                expand: true,
                cwd: 'client',
                src: ['**/*.*'],
                dest: 'server/public/'
            }
        ]
    },
    server: {
        files: [
            // copiar os arquivos de dependências do front-end
            {
                expand: true,
                cwd: 'bower_components/angular',
                src: ['angular.js'],
                dest: 'client/lib/angular'
            }, {
                expand: true,
                cwd: 'bower_components/angular-animate',
                src: ['angular-animate.js'],
                dest: 'client/lib/angular'
            }, {
                expand: true,
                cwd: 'bower_components/angular-aria',
                src: ['angular-aria.js'],
                dest: 'client/lib/angular'
            }, {
                expand: true,
                cwd: 'bower_components/angular-messages',
                src: ['angular-messages.js'],
                dest: 'client/lib/angular'
            }, {
                expand: true,
                cwd: 'bower_components/bootstrap/dist/css',
                src: ['bootstrap.css'],
                dest: 'client/lib/css'
            }, {
                expand: true,
                cwd: 'bower_components/angular-material/',
                src: ['angular-material.min.css'],
                dest: 'client/lib/css'
            }, {
                expand: true,
                cwd: 'bower_components/angular-material/',
                src: ['angular-material.min.js'],
                dest: 'client/lib/angular'
            }
        ]
    }
};
