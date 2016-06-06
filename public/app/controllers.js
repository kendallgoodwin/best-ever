angular.module('BestEverCtrls', ['BestEverServices'])

.controller('EntriesCtrl', ['$scope', '$state', '$stateParams', 'Entry', function($scope, $state, $stateParams, Entry) {
	$scope.entry = [];

  Entry.query(function success(data) {
    $scope.entry = data;
  }, function error(data) {
    console.log(data);
  });

	$state.go('landing');
}])

.controller('SignUpCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  // User.get({id: $stateParams.id}, function success(data) {
  //   $scope.film = data;
  // }, function error(data) {
  //   console.log(data);
  // });

  $state.go('signup');
}])

.controller('LoginCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('login');
}])

.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('dashboard');
}])

.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('profile');
}])

.controller('NewCtrl', ['$scope', '$state', '$stateParams', 'Entry', function($scope, $state, $stateParams, Entry) {
	  $scope.entry = {
    title: '',
    artist: '',
    category: '', 
    argument: '', 
    image: '',
    userId: '', 
  };

  $scope.createEntry = function() {
    Entry.save($scope.entry, function success(data) {
      $location.path('/new_entry');
    }, function error(data) {
      console.log(data);
    });
  }

	$state.go('newEntry');
}])

.controller('ViewCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('viewEntry');
}])