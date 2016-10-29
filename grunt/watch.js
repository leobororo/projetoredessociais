module.exports = {
    //copiar arquivos quando modificados para a pasta client
    copy: {
        files: [
            "client/**/*.*"
        ],
        tasks: ["copy"]
    },
    //ferramenta JSHint para verificar potenciais problemas nos códigos Javascript e ferramenta JSBeautifier para formatar Javascript e HTML (utiliza ferramenta grunt-newer para formatar apenas arquivos novos ou modificados)
    gruntFiles: {
        files: [
            "grunt/**/*.js",
            "Gruntfile.js"
        ],
        tasks: ["jshint", "newer:jsbeautifier"]
    },
    js: {
        files: [
            "!client/lib/**/*.js",
            "client/**/*.js"

        ],
        tasks: ["jshint", "newer:jsbeautifier"]
    }
};
