angular.module('BestEverCtrls', ['BestEverServices'])

.controller('EntriesCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('landing');
}])

.controller('SignUpCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
  // User.get({id: $stateParams.id}, function success(data) {
  //   $scope.film = data;
  // }, function error(data) {
  //   console.log(data);
  // });

  $state.go('signup');
}])

.controller('LoginCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('login');
}])

.controller('DashboardCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('dashboard');
}])

.controller('ProfileCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('profile');
}])

.controller('NewCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('newEntry');
}])

.controller('ViewCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
	$state.go('viewEntry');
}])