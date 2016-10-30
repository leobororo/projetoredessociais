angular.module("AppRedesSociais").controller("postCtrl", function($scope, contatoFacebookAPIService) {

    // disponibiliza no $scope a função para post
    $scope.post = function(data) {
      contatoFacebookAPIService.post(data)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };

});
