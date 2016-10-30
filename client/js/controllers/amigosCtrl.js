angular.module("AppRedesSociais").controller("amigosCtrl", function($scope, contatoFacebookAPIService) {

    // obtém a lista de amigos através do serviço da API do facebook
    contatoFacebookAPIService.getAmigos()
    .then(function(data) {
      $scope.amigos = data;
      console.log("GET dados dos amigos executado com sucesso");
    }, function(error) {
      console.log("Falha ao executar GET amigos, error: " + error);
    });

});
