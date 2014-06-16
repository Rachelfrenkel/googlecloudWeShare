angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/nerds', {
			templateUrl: 'views/nerds/nerd.html',
			controller: 'NerdController'
		})
		.when('/nerds/create', {
			templateUrl: 'views/nerds/nerd-create.html',
			controller: 'NerdController'
		})
		.when('/nerds/edit/:_id', {
			templateUrl: 'views/nerds/nerd-edit.html',
			controller: 'NerdController'
		})
		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
	$locationProvider.html5Mode(true);
}]);