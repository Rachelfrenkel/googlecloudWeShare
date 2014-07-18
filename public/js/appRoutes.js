angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		// .when('/', {
		// 	templateUrl: 'views/home.html',
		// 	controller: 'HomeController'
		// })

		.when('/', {
			templateUrl: 'google-cloud_public/home.html',
			controller: 'FileController'
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

		// form to register a new user
		.when('/register', {
			templateUrl: 'views/accounts/register.html',
			controller: 'AccountController'
		})

		//form to login an existing user
		.when('/login', {
			templateUrl: 'views/accounts/login.html',
			controller: 'AccountController'
		})

		.when('/login/:_id', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		//geeks index page
		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
	$locationProvider.html5Mode(true);
}]);
