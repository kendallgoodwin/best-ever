var photoAlbumServices = angular.module('photoAlbumServices', ['ngResource', 'cloudinary']);

photoAlbumServices.factory('album', ['$rootScope', '$resource', 'cloudinary',
  function($rootScope, $resource, cloudinary){
    // instead of maintaining the list of images, we rely on the 'myphotoalbum' tag
    // and simply retrieve a list of all images with that tag.
    var url = cloudinary.url('myphotoalbum', {format: 'json', type: 'list'});
    //cache bust
    url = url + "?" + Math.ceil(new Date().getTime()/1000);
    return $resource(url, {}, {
      photos: {method:'GET', isArray:false}
    });
}])

// angular.module('BestEverServices', ['ngResource'])
.factory('Entry', ['$resource', 'cloudinary', function($resource) {
  return $resource('/api/entries/:id');
}])
.factory('User', ['$resource', function($resource) {
  return $resource('/api/users/:id');
}])
.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['bestever-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['bestever-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('bestever-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
      console.log(token);
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
          console.log(payload);
        } catch(err) {
          return false;
        }
      }
    }
  }
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token && config.url.indexOf('cloudinary') === -1 && config.url.indexOf('itunes') === -1) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}])


