angular.module('BestEverApp', ['BestEverCtrls', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('sign-up', {
    url: '/',
    templateUrl: 'app/views/sign-up.html',
    controller: 'AuthCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);