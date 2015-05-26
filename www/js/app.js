// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('jokeCtrl', function($scope, $http, jokesBank){
  //$scope.joke = {};

  jokesBank.getRandom().then(function(j){
    $scope.joke = j;
  });

  $scope.doRefresh = function(){
    $http.get("http://api.icndb.com/jokes/random/").then(function(resp){
      jokesBank.getRandom().then(function(j){
        $scope.joke = j;
      });
    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.factory('jokesBank', function($http, $q){

  var Joke = function(jid, jtext){
    this.id = jid;
    this.text = jtext;
  };

  return{
    getRandom: function(){
      //return new Joke(12, "Hello there!");
      return $http.get("http://api.icndb.com/jokes/random/").then(function(resp){
        var thejoke = new  Joke(resp.data.value.id, resp.data.value.joke);
        return thejoke;
      });
    }
  };
});
