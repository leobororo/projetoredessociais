angular.module("AppRedesSociais").factory("contatoFacebookAPIService", function($q) {

    var _obterDadosUsuario = function(setDadosUsuario) {

    var deferred = $q.defer();

    $.getScript('//connect.facebook.net/pt_BR/sdk.js', function () {
      FB.init({
        appId      : '1125094257578327',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log(response);
          dadosUser();
        }
        else {
          FB.login(function(response) {
            if (response.status === 'connected') {
              console.log(response);
              dadosUser();
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
                  console.log(response.error);
                  alert('Error occured');
                  deferred.reject(response);
                } else {
                    var dadosUser = {
                      id: response.id,
                      nome: response.name,
                      email: response.email,
                      cidade: response.hometown.name,
                      genero: response.gender,
                      urlProfileImage: response.picture.data.url
                    }

                    deferred.resolve(dadosUser);
                }
            }
          );
        }
      });

      return deferred.promise;
  };

    //aqui são declaradas as funções que devolverão cada tipo de dado via API do facebook
    var _obterAmigos = function() {
        return [{
            nome: "Amanda",
            idade: 32
        }, {
            nome: "Ana",
            idade: 20
        }, {
            nome: "Maria",
            idade: 23
        }]; //deve retornar dados obtidos via api do facebook
    };

    return {
        //aqui enviamos um objeto javascript todos os métodos que precisamos
        getDadosUsuario: _obterDadosUsuario,
        getAmigos: _obterAmigos
    };
  });
