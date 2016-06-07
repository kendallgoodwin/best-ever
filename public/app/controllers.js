angular.module('BestEverCtrls', ['BestEverServices'])

.controller('EntriesCtrl', ['$scope', '$state', '$stateParams', 'Entry', function($scope, $state, $stateParams, Entry) {
	$scope.entries = [];

  Entry.query(function success(data) {
    $scope.entries = data;
  }, function error(data) {
    console.log(data);
  });

	$state.go('landing');
}])

.controller('SignUpCtrl', ['$scope', '$http', '$location', '$state', '$stateParams', 
	function($scope, $http, $location, $state, $stateParams) {
	$scope.user = {
	    username: '',
	    email: '',
	    password: ''
	  };
	  $scope.userSignup = function() {
	    $http.post('/api/users', $scope.user).then(function success(res) {
	      $location.path('/');
	    }, function error(res) {
	      console.log(res);
	    });
	  }

  $state.go('signup');
}])

.controller('LoginCtrl', ['$scope', '$http', '$location', '$state', '$stateParams', 'Auth', 
	function($scope, $http, $location, $state, $stateParams, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }

	$state.go('login');
}])

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])

.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('dashboard');
}])

.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$state.go('profile');
}])

.controller('NewCtrl', ['$scope', '$state', '$stateParams', '$location', 'Entry', 
	function($scope, $state, $stateParams, $location, Entry) {
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
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }

	$state.go('newEntry');
}])

.controller('ViewCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$scope.entry = {};

  Entry.get({id: $stateParams.id}, function success(data) {
    $scope.entry = data;
  }, function error(data) {
    console.log(data);
  });

	$state.go('viewEntry');
}])