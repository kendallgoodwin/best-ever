angular.module('BestEverCtrls', ['BestEverServices'])

.controller('EntriesCtrl', ['$scope', '$state', '$stateParams', 'Entry', 
	function($scope, $state, $stateParams, Entry) {
	// $scope.searchTerm = '';

	// $scope.search = function() {
	// 	var req = {
	// 		url: 'http://www.reddit.com/search.json?q=' + $scope.searchTerm, 
	// 		method: 'get'
	// 	}
	// 	$http(req).then(function success(res) {
	// 		var redditData = res.data;
	// 		var articleData = redditData.data.children
	// 		// console.log(redditData);
	// 		$scope.articleArray = [];
	// 		for (var i = 0; i < articleData.length; i++) {
	// 			var articles = articleData[i];
	// 			// console.log(articles);
	// 			$scope.articleArray.push(articles);
	// 			// console.log($scope.articleArray);
	// 		} 

	// 		$scope.history.push($scope.searchTerm);
	// 		localStorage.setItem("hist", JSON.stringify($scope.history));
	// 		console.log(localStorage.getItem('hist'))

	// 	}, function error(res) {
	// 		console.log(res);
	// 	});
	// }

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

		$http({url:'/api/users/' + $scope.user.username + '/entries'}).then(function success(res) {
			$scope.entries = res.data;
			console.log(res);
		}, function err(data) {
			$scope.error = data;
		})

		$scope.delete = function(index) {
			var entry = $scope.entries[index]._id
			alert(entry);
			$http({url:'/api/entries/' + entry, method: 'DELETE'}).then(function success(res) {
				$scope.entries.splice(index, 1);
			}, function error(res) {
				
			})
		}

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

	$scope.getEntry = function() {
	  Entry.get({id: $stateParams.id}, function success(data) {
	    $scope.entry = data;
	  }, function error(data) {
	    console.log(data);
	  });
	}

	$state.go('viewEntry');
}])