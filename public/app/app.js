angular.module('BestEverApp', ['BestEverCtrls', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
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
    url: '/profile',
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .state('newEntry', {
    url: '/new_entry',
    templateUrl: 'views/new_entry.html',
    controller: 'NewCtrl'
  })
  .state('viewEntry', {
    url: '/view_entry',
    templateUrl: 'views/view_entry.html',
    controller: 'ViewCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);