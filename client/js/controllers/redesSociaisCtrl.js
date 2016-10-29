angular.module("AppRedesSociais").controller("redesSociaisCtrl", function($scope, contatoFacebookAPIService) {
    $scope.appName = "Aplicativo redes sociais";
    $scope.amigos = contatoFacebookAPIService.getAmigos();

    obterDadosUsuario = function () {
      contatoFacebookAPIService.getDadosUsuario(function(dadosUsuario) {
        $scope.$apply(function () {
          $scope.dadosUsuario = dadosUsuario;
        });
      });
    };

    $(document).ready(function() {
      obterDadosUsuario();
      console.log($scope.dadosUsuario);
    });
});
