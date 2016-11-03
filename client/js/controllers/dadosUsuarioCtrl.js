angular.module("AppRedesSociais").controller("dadosUsuarioCtrl", function($scope, contatoFacebookAPIService) {

    // obtém a os dados do usuário logado através do serviço da API do facebook
    contatoFacebookAPIService.getDadosUsuario()
    .then(function(data) {
        $scope.dadosUsuario = data;
        getPermissoes();
        console.log("GET dados do usuário executado com sucesso");
      },
      function(error) {
       console.log("Falha ao executar GET dados do usuário, error: " + error);
      }
    );

    // função para obter as permissoes do usuário
    var getPermissoes = function() {
      contatoFacebookAPIService.getPermissoes()
      .then(function(data) {
          $scope.permissoes = data;

          console.log("GET permissões do usuário executado com sucesso");
        },
        function(error) {
         console.log("Falha ao executar GET permissões do usuário, error: " + error);
        }
      );
    }
});
