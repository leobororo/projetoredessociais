angular.module("AppRedesSociais").factory("contatoFacebookAPIService", function($q) {

  // declara uma função para obter os dados do usuário logado
  var _obterDadosUsuario = function() {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    // função para obter os dados do usuário através da api do facebook
    // caso o usuário esteja logado
    var getDadosUsuario = function(deferred) {
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

                  var cidade = "";
                  if (response.hometown) {
                    cidade = response.hometown.name;
                  }

                  var dadosUser = {
                    id: response.id,
                    nome: response.name,
                    email: response.email,
                    cidade: cidade,
                    genero: response.gender,
                    urlPhoto: response.picture.data.url
                  }

                  // configura os dados que serão recebidos pela função de sucesso
                  deferred.resolve(dadosUser);
              }
          }
        );
    };

    // função que verifica se o usuário está logado e executa o script getDadosUsuario
    runScript(getDadosUsuario, deferred);

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // declara uma função para fazer o post dos dados passados como parâmetro
  var _post = function(data) {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    // função para postar na timeline do usuario logado através da api do facebook,
    // caso o usuário esteja logado
    var postTimelineUsuarioLogado = function(deferred) {
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
    };

    // função que verifica se o usuário está logado e executa o script getDadosUsuario
    runScript(postTimelineUsuarioLogado, deferred);

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // função para obter lista de amigos, ainda hard coded, a ser implementada
  var _obterAmigos = function() {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    // função para obter os amigos do usuário através da api do facebook
    // caso o usuário esteja logado
    var getAmigos = function(deferred) {

      FB.api(
          '/me/friends',
          {
              "fields": "id, name, gender"
          },
          function(response) {
              if (!response || response.error) {

                // configura os dados que serão recebidos pela função de erro
                deferred.reject(response);
                console.log("service amigos: " + response.error);
              } else {
                  var amigos = response.data;
                  console.log(response);

                  // configura os dados que serão recebidos pela função de sucesso
                  deferred.resolve(amigos);
              }
          }
        );
    };

    // função que verifica se o usuário está logado e executa o script getAmigos
    runScript(getAmigos, deferred);

    // devolve a promessa de resposta
    return deferred.promise;
  };

  // função para obter array de permissoes, a ser implementada
  var _getPermissoes = function() {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    // função para obter as permissões do usuário através da api do facebook
    // caso o usuário esteja logado
    var getPermissoes = function(deferred) {

      /* make the API call */
      FB.api(
          "/me/permissions",
          function(response) {
              if (!response || response.error) {

                // configura os dados que serão recebidos pela função de erro
                deferred.reject(response);
                console.log("service permissoes: " + response.error);
              } else {
                  var permissoes = response.data;
                  console.log(response);

                  // configura os dados que serão recebidos pela função de sucesso
                  deferred.resolve(permissoes);
              }
          }
      );
    };

    // função que verifica se o usuário está logado e executa o script getPermissoes
    runScript(getPermissoes, deferred);

    // devolve a promessa de resposta
    return deferred.promise;
  };

  var runScript = function(metodoHttp, deferred) {
    $.getScript('//connect.facebook.net/pt_BR/sdk.js', function () {
      FB.init({
        appId      : '1125094257578327',
        xfbml      : true,
        version    : 'v2.8'
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          metodoHttp(deferred);
          console.log("service: " + response);
        }
        else {
          FB.login(function(response) {
            if (response.status === 'connected') {
              metodoHttp(deferred);
              console.log("service: " + response);
            }
          },
          {
            scope: 'email,user_about_me,user_actions.books,user_hometown,publish_actions,user_friends,user_likes,user_birthday',
            return_scopes: true
          });
        }
      });
    });
  };


  // aqui abrimos uma tela de publicação que permite o envio para lista de amigos com imagem e link do google
  var _feedDialog = function(data) {

    // cria uma variável do tipo promessa
    var deferred = $q.defer();

    var postTimelineUsuarioAmigoFeed= function(deferred){
      FB.ui(
        {
          method: 'feed', //Método para postar no Mural
          link: 'http://google.com/', //Link a ser compartilhado
          picture: data //Imagem do Share
        },
        function(response) {
          console.log(response); //Callback da função.
        }
      );
    }
    runScript(postTimelineUsuarioAmigoFeed, deferred);
    // devolve a promessa de resposta
    return deferred.promise;
    };


    // função para envio de mensagem  de link par amigos ou individual  VIA Dialog.
    var _sendDialog = function(data) {

      // cria uma variável do tipo promessa
      var deferred = $q.defer();

      var sendUsuarioMensagemPrivateMessage= function(deferred){
        FB.ui(
          {
            method: 'send',
            link: data,
          },
          function(response) {
            console.log(response); //Callback da função.
          }
        );
      }
      runScript(sendUsuarioMensagemPrivateMessage, deferred);
      // devolve a promessa de resposta
      return deferred.promise;
      };

      // função para postar na timeline permite que as pessoas publiquem uma história
      //individual na própria Linha do Tempo, na Linha do Tempo de um amigo, em um grupo
      //ou em uma mensagem privada no Messenger.
      //Não requer o Login no Facebook ou qualquer outra permissão estendida,
      //portanto é a maneira mais fácil de habilitar o compartilhamento na Web.
      var _shareDialog = function(data) {

        // cria uma variável do tipo promessa
        var deferred = $q.defer();

        var postTimelineUsuarioAmigoShare= function(deferred){
          FB.ui(
            {
              method: 'share',
               href: data,
            },
            function(response) {
              console.log(response); //Callback da função.
            }
          );
        }
        runScript(postTimelineUsuarioAmigoShare, deferred);
        // devolve a promessa de resposta
        return deferred.promise;
        };


  // aqui devolvemos um objeto javascript com todos os métodos que precisamos
  return {
      getDadosUsuario: _obterDadosUsuario,
      post: _post,
      getPermissoes: _getPermissoes,
      getAmigos: _obterAmigos,
      feedDialog : _feedDialog,
      sendDialog : _sendDialog,
      shareDialog: _shareDialog
  };
});
