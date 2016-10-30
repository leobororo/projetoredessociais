angular.module("AppRedesSociais").factory("contatoFacebookAPIService", function($q) {

  // declara uma função para obter os dados do usuário logado
  var _obterDadosUsuario = function() {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    $.getScript('//connect.facebook.net/pt_BR/sdk.js', function () {
      FB.init({
        appId      : '1125094257578327',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          dadosUser();
          console.log("service: " + response);
        }
        else {
          FB.login(function(response) {
            if (response.status === 'connected') {
              dadosUser();
              console.log("service: " + response);
            }
          },
          {
            scope: 'email,user_about_me,user_hometown,publish_actions',
            return_scopes: true
          });
        }
      });

      function dadosUser() {
        FB.api(
            '/me',
            'GET',
            {
                "fields": "id, name, email, hometown, picture, gender"
            },
            function(response) {
                if (!response || response.error) {

                  // configura os dados que serão recebidos pela função de erro
                  deferred.reject(response);
                  console.log("service: " + response.error);
                } else {
                    var dadosUser = {
                      id: response.id,
                      nome: response.name,
                      email: response.email,
                      cidade: response.hometown.name,
                      genero: response.gender,
                      urlPhoto: response.picture.data.url
                    }

                    // configura os dados que serão recebidos pela função de sucesso
                    deferred.resolve(dadosUser);
                }
            }
          );
        }
    });

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // declara uma função para fazer o post dos dados passados como parâmetro
  var _post = function(data) {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    $.getScript('//connect.facebook.net/pt_BR/sdk.js', function () {
      FB.init({
        appId      : '1125094257578327',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log("service: " + response);
          post();
        }
        else {
          FB.login(function(response) {
            if (response.status === 'connected') {
              console.log("service: " + response);
              post();
            }
          },
          {
            scope: 'email,user_about_me,user_hometown,publish_actions',
            return_scopes: true
          });
        }
      });

      function post() {
        FB.api(
              "/me/feed",
              "POST",
              {
                  "message": data
              },
              function (response) {
                if (!response || response.error) {
                  console.log("service: " + response.error);
                  deferred.reject(response);
                } else {
                  // configura os dados que serão recebidos pela função de sucesso
                  deferred.resolve(response);
                }
              }
        );
      }
    });

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // função para obter lista de amigos, ainda hard coded, a ser implementada
  var _obterAmigos = function() {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    var amigos = [{
        nome: "Amanda",
        idade: 32
    }, {
        nome: "Ana",
        idade: 20
    }, {
        nome: "Maria",
        idade: 23
    }];

    // configura os dados que serão recebidos pela função de sucesso
    deferred.resolve(amigos);

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // aqui devolvemos um objeto javascript com todos os métodos que precisamos
  return {
      getDadosUsuario: _obterDadosUsuario,
      post: _post,
      getAmigos: _obterAmigos
  };
});
