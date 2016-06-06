angular.module('BestEverCtrls', ['BestEverServices'])

.controller('AuthCtrl', ['$scope', '$stateParams', 'Films', function($scope, $stateParams, Films) {
  $scope.film = {};

  User.get({id: $stateParams.id}, function success(data) {
    $scope.film = data;
  }, function error(data) {
    console.log(data);
  });

  $state.go('sign-up');
}])