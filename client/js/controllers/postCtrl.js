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

    // disponibiliza no $scope a função para postLink
    $scope.postDialog = function() {
      contatoFacebookAPIService.postDialog()
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };

    $scope.sendLink = function(data) {
      contatoFacebookAPIService.sendLink(data)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };
});
