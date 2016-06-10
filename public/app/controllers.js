var photoAlbumControllers = angular.module('photoAlbumControllers', ['ngFileUpload', 'photoAlbumServices']);

photoAlbumControllers.controller('photoUploadCtrl', 
  ['$scope', '$state', '$stateParams', '$rootScope', '$routeParams', '$location', '$http', 'Upload', 'cloudinary', 
  'Entry', 'Auth', 
  /* Uploading with Angular File Upload */
  function($scope, $state, $stateParams, $rootScope, $routeParams, $location, $http, $upload, cloudinary, Entry, Auth) {
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    //$scope.$watch('files', function() {
    // $scope.image = '';
    $scope.uploadFiles = function(files){
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            },
            skipAuthorization: true
          }).progress(function (e) {
            console.log('progress is made', e);
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            console.log('sucess was done');
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $scope.image = file.result.url;
            // console.log($scope.image);
            $rootScope.photos.push(data);
            console.log('data:', $scope.image);
          }).error(function (data, status, headers, config) {
            console.log('error occured');
            file.result = data;
          });
        }
      });
    };
    //});

    // /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };

 //    $scope.searchTerm = '';
 //    $scope.audioArray = [];

 //    $scope.search = function() {
	// 	var req = {
	// 		url: 'https://itunes.apple.com/search?term=' + $scope.searchTerm + '&limit=25', 
	// 		method: 'get'
	// 	}
	// 	$http.jsonp('https://itunes.apple.com/search', {
	// 		params: {
	// 			"callback": "JSON_CALLBACK",
	// 			"term": $scope.searchTerm,
	// 			"limit": 25
	// 		}
	// 	}).then(function success(res) {
	// 		var itunesData = res.data;
	// 		// var audio = itunesData.data
	// 		// console.log(itunesData);
	// 		// console.log(itunesData.results[0].previewUrl, itunesData.results[0].trackName, itunesData.results[0].artistName);

	// 		$scope.audioArray = [];
	// 		for (var i = 0; i < itunesData.length; i++) {
	// 			var audio = itunesData.results[i];
	// 			// console.log(articles);
	// 			$scope.audioArray.push(audio);
	// 			// console.log($scope.articleArray);
	// 			console.log(audioArray);
	// 		// $scope.articleArray = [];
	// 		// for (var i = 0; i < articleData.length; i++) {
	// 		// 	var articles = articleData[i];
	// 		// 	// console.log(articles);
	// 		// 	$scope.articleArray.push(articles);
	// 		// 	// console.log($scope.articleArray);
	// 		// }) 
	// 	}
	// 	}, function error(res) {
	// 		console.log(res);
	// 	})
	// }

    // $scope.image = uploadFiles(files);
    // $scope.image = file.result.url;
    // console.log($scope.image);
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
    console.log('url:', $scope.image)
    var newEntry = {
      title: $scope.entry.title,
      artist: $scope.entry.artist,
      category: $scope.entry.category, 
      argument: $scope.entry.argument, 
      image: $scope.image,
      user: $scope.user.username, 
    }

    Entry.save(newEntry, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }

  $state.go('newEntry');
}]);


angular.module('BestEverCtrls', ['photoAlbumServices'])

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
		$scope.currentEdit = false;

		$scope.update = function(index) {
			$scope.currentEdit = index;
			$scope.edit = $scope.entries[index]
		}

		$scope.save = function() {
			$http({url:'/api/entries/' + $scope.edit._id, method: 'PUT', data:{entry:$scope.edit}}).then(function success(res) {
				$scope.entries[$scope.currentEdit] = $scope.edit;
				// for angular updates!!! include elsewhere!
				$scope.currentEdit = false;
			})
		}

		$scope.user = Auth.currentUser();

		$http({url:'/api/users/' + $scope.user.username + '/entries'}).then(function success(res) {
			$scope.entries = res.data;
			console.log(res);
		}, function err(data) {
			$scope.error = data;
		})

		$scope.delete = function(index) {
			var entry = $scope.entries[index]._id
			// alert(entry);
			$http({url:'/api/entries/' + entry, method: 'DELETE'}).then(function success(res) {
				$scope.entries.splice(index, 1);
			}, function error(res) {
				console.log(res);
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

.controller('ViewCtrl', ['$scope', '$state', '$stateParams', '$http', function($scope, $state, $stateParams, $http) {
	  
    $http({url:'/api/entries/' + $stateParams.id}).then(function success(res) {
      $scope.entry = res.data;
      console.log($scope.entry);
      console.log(res);
    }, function err(data) {
      $scope.error = data;
    })



  // $scope.entry = {};
 //  $scope.currentEntry = $scope.entry[index];

	// $scope.getEntry = function(index) {
 //    $http({url:'/api/entry/' + $scope.currentEntry}).then(function success(res) {
 //      $scope.entries = res.data;
 //      console.log(res);
 //    }, function err(data) {
 //      $scope.error = data;
 //    }


	  // Entry.get({id: $stateParams.id}, function success(data) {
	  //   $scope.entry = data;
	  // }, function error(data) {
	  //   console.log(data);
	  // });
	// }

	$state.go('viewEntry');
}])