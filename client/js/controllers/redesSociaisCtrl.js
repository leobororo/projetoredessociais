angular.module("AppRedesSociais").controller("redesSociaisCtrl", function($scope, contatoFacebookAPIService) {
    $scope.appName = "Aplicativo redes sociais";
    $scope.amigos = contatoFacebookAPIService.getAmigos();

    obterDadosUsuario = function() {
      contatoFacebookAPIService.getDadosUsuario()
      .then(function(data) {
        console.log(data);
        $scope.dadosUsuario = data;
      },
      function(error) {
        console.log("Failed to get dados do usuário, error: " + error);
      });
    };


    $(document).ready(function() {
      obterDadosUsuario();
    });
});
