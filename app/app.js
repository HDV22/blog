//app.js
var app = angular.module('app', ['ngRoute','app.controllers']) 
.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider.when('/',{
			templateUrl: 'views/main.html',
			controller: 'PostController'
		})
		.when('/post/:id',{
			templateUrl:'views/singlepost.html',
			controller: 'SinglePostController'
		})
		.when('/add-post',{
			templateUrl: 'views/add-post.html',
			controller: 'AddPostController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);

