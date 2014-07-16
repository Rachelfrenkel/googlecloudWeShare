
angular.module('AccountController', []).controller('AccountController', function($scope, $routeParams, $window, $location, Account) {


	$scope.tagline = 'To the moon and back!';	

	$scope.registerUser = function(){

		var user = {
			username: this.username,
			password: this.password
		};

		Account.register(user);
		$location.path('/')

	};

	$scope.checkLogInState = function() {
		Account.getLoginState.then(function(userLoggedInDict) {
			if (userLoggedInDict.isLoggedIn){
				$scope.userLoggedIn = true;
			}
		});
	};

	$scope.loginUser = function(){
		var user = {
			username: this.username,
			password: this.password
		};

		Account.login(user);
		$location.path('/nerds')

	};


});
