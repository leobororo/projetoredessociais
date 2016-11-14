angular.module("AppRedesSociais").controller("postCtrl", function($scope, contatoFacebookAPIService) {

    // ontém a lista de amigos através do serviço da API do facebook
    contatoFacebookAPIService.getAmigos()
    .then(function(data) {
      $scope.amigosPost = data;
      $scope.amigosCompartilhar = data;
      console.log("GET dados dos amigos executado com sucesso");
    }, function(error) {
      console.log("Falha ao executar GET amigos, error: " + error);
    });

    var obterListaAmigosSelecionados = function(amigos) {
      function getConcat(concat, amigo) {
        var id = "";

        function isString (obj) {
          return (Object.prototype.toString.call(obj) === '[object String]');
        }

        if (amigo.selecionado) {
          id = amigo.id;
        }

        if (isString(concat)) {
            return concat + "," + id;
        } else {
            return id;
        }
      };

      return amigos.reduce(getConcat);
    }

    // disponibiliza no $scope a função para post
    $scope.post = function(data, amigos) {

      var amigosSelecionados = obterListaAmigosSelecionados(amigos);

      contatoFacebookAPIService.post(data, amigosSelecionados)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");

        delete $scope.comentario;
        $scope.postForm.$setPristine();
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };

    // disponibiliza no $scope a função para postLink
    $scope.sendDialog = function(data, idAmigo) {

      $scope.urlEnviar = "";
      $scope.idAmigo = "";
      $scope.sendForm.$setPristine();

      contatoFacebookAPIService.sendDialog(data, idAmigo)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };

    // disponibiliza no $scope a função para postLink
    $scope.shareDialog = function(data) {

      $scope.urlShare = "";
      $scope.shareForm.$setPristine();

      contatoFacebookAPIService.shareDialog(data)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };
});
