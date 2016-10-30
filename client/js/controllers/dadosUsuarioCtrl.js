angular.module("AppRedesSociais").controller("dadosUsuarioCtrl", function($scope, contatoFacebookAPIService) {
$scope.mostrarFoto = false;
    // obtém a os dados do usuário logado através do serviço da API do facebook
    contatoFacebookAPIService.getDadosUsuario()
    .then(function(data) {
      $scope.dadosUsuario = data;
      console.log("GET dados do usuários executado com sucesso");
    },
    function(error) {
      console.log("Falha ao executar GET dados do usuário, error: " + error);
    });
});
