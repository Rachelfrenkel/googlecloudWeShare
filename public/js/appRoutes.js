angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		//nerds index page
		.when('/nerds', {
			templateUrl: 'views/nerds/nerd-index.html',
			controller: 'NerdController'
		})

		//form for creating a new nerd
		.when('/nerds/create', {
			templateUrl: 'views/nerds/nerd-create.html',
			controller: 'NerdController'
		})

		//form for editing an existing nerd
		.when('/nerds/edit/:_id', {
			templateUrl: 'views/nerds/nerd-edit.html',
			controller: 'NerdController'
		})

		//geeks index page
		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
	$locationProvider.html5Mode(true);
}]);