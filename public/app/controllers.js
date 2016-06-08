angular.module('BestEverCtrls', ['BestEverServices'])

.controller('EntriesCtrl', ['$scope', '$state', '$stateParams', 'Entry', 
	function($scope, $state, $stateParams, Entry) {
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
	      // Auth.saveToken(res.data.token)
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
    username: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      // console.log('Logged in')
      $location.path('/');
    }, function error(res) {
      console.log(res);
    });
  }

	$state.go('login');
}])

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.currentUser = Auth.currentUser();
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])

.controller('DashboardCtrl', ['$scope', '$state', '$stateParams', '$http', 'Auth', 'User', 
	function($scope, $state, $stateParams, $http, Auth, User) {
		$scope.user = Auth.currentUser();

		$http({url:'/api/users/' + $scope.user + '/entries'}).then(function success(res) {
			$scope.entries = res.data;
			console.log(res);
		}, function err(data) {
			$scope.error = data;
		})

	$state.go('dashboard');
}])

.controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$http',
	function($scope, $state, $stateParams, $http) {
		$scope.user = $stateParams.username;

		$http({url:'/api/users/' + $scope.user + '/entries'}).then(function success(res) {
			$scope.entries = res.data;
			console.log(res);
		}, function err(data) {
			$scope.error = data;
		})

	$state.go('profile');
}])

.controller('NewCtrl', ['$scope', '$state', '$stateParams', '$location', 'Entry', 'Auth',
	function($scope, $state, $stateParams, $location, Entry, Auth) {
	  $scope.user = Auth.currentUser();
	  $scope.entry = {
    title: '',
    artist: '',
    category: '', 
    argument: '', 
    image: '',
    user: $scope.user.username, 
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