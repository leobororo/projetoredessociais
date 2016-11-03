angular.module("AppRedesSociais").controller("amigosCtrl", function($scope, contatoFacebookAPIService) {

    // disponibiliza no scope a função para obtenção da lista de amigos através do serviço da API do facebook
    $scope.carregarListaAmigos = function() {
      contatoFacebookAPIService.getAmigos()
      .then(function(data) {
        $scope.amigos = data;
        console.log("GET dados dos amigos executado com sucesso");
      }, function(error) {
        console.log("Falha ao executar GET amigos, error: " + error);
      });
    };

});
