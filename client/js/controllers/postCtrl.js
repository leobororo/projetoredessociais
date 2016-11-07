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
    $scope.feedDialog = function() {
      contatoFacebookAPIService.feedDialog()
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };
  // disponibiliza no $scope a função para postLink
    $scope.sendDialog = function(data) {
      contatoFacebookAPIService.sendDialog(data)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };
  // disponibiliza no $scope a função para postLink
    $scope.shareDialog = function(data) {
      contatoFacebookAPIService.shareDialog(data)
      .then(function(data) {
        console.log("POST no feed executado com sucesso");
      },
      function(error) {
        console.log("Falha ao executar POST feed, error: " + error);
      });
    };
});
