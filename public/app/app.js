var photoAlbumApp = angular.module('photoAlbumApp', [
  'BestEverCtrls',
  'ui.router',
  'ngRoute',
  'cloudinary',
  'photoAlbumAnimations',
  'photoAlbumControllers',
  'photoAlbumServices',
  'ngAnimate'
])

.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/photos', {
      templateUrl: 'partials/photo-list.html',
      resolve: {
        photoList: function ($q, $rootScope, album) {
          if (!$rootScope.serviceCalled) {
            return album.photos({}, function (v) {
              $rootScope.serviceCalled = true;
              $rootScope.photos = v.resources;
            });
          } else {
            return $q.when(true);
          }
        }
      }
    }).when('/photos/new', {
      templateUrl: 'partials/photo-upload.html',
      controller: 'photoUploadCtrl'
    }).otherwise({
      redirectTo: '/photos'
    });
}])


// angular.module('BestEverApp', ['BestEverCtrls', 'ui.router'])


.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'views/all_entries.html',
    controller: 'EntriesCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'views/signup.html',
    controller: 'SignUpCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .state('profile', {
    url: '/profile/:username',
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .state('newEntry', {
    url: '/new_entry',
    templateUrl: 'views/new_entry.html',
    controller: 'photoUploadCtrl'
  })
  .state('viewEntry', {
    url: '/view_entry/:id',
    templateUrl: 'views/view_entry.html',
    controller: 'ViewCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $locationProvider.html5Mode({enabled:true});
}])

.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "kendallgoodwin")
      .set("upload_preset", "preset");
}]);