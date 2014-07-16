angular.module('AccountService', []).factory('Account', ['$http', '$cookies', '$resource', function($http, $cookies, $resource) {

	return {

		// call to POST and create a new nerd
		register : function(nerdData) {
			// $http.defaults.headers.post['x-csrf-token'] = $cookies._csrfToken;
			// console.log('default headers = ' + angular.toJson($http.defaults.headers));
			return $http.post('/api/register', nerdData);
		},

		// call to DELETE a nerd
		login : function(id) {
			return $http.post('/api/login/');

			// return $http.post('/api/login/' + id);
		},

		// getLoginState : function() {
		// 	return $http.get('api/login');
		// }

		// create a resource object to interact with RESTful
		// server-side data sources
		resourceObj: $resource('api/nerds/:id', {
			id: '@_id'
		})
	}	
}]);