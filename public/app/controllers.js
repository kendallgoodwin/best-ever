angular.module('BestEverCtrls', ['BestEverServices'])

.controller('AuthCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  $scope.film = {};

  User.get({id: $stateParams.id}, function success(data) {
    $scope.film = data;
  }, function error(data) {
    console.log(data);
  });

  $state.go('sign-up');
}])