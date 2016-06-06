angular.module('BestEverCtrls', ['BestEverServices'])

.controller('SignUpCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  $scope.film = {};

  User.get({id: $stateParams.id}, function success(data) {
    $scope.film = data;
  }, function error(data) {
    console.log(data);
  });

  $state.go('signup');
}])
.controller('LoginCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

	$state.go('login');
	}])
