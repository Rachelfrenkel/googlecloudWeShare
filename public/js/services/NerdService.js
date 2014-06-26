angular.module('NerdService', []).factory('Nerd', ['$http', '$cookies', '$resource', function($http, $cookies, $resource) {

	return {
		// call to GET all nerds
		get : function() {
			return $http.get('/api/nerds');
		},

		// call to POST and create a new nerd
		create : function(nerdData) {
			// $http.defaults.headers.post['x-csrf-token'] = $cookies._csrfToken;
			// console.log('default headers = ' + angular.toJson($http.defaults.headers));
			return $http.post('/api/nerds', nerdData);
		},

		// call to DELETE a nerd
		destroy : function(id) {
			return $http.delete('/api/nerds/' + id);
		},

		// create a resource object to interact with RESTful
		// server-side data sources
		resourceObj: $resource('api/nerds/:id', {
			id: '@_id'
		})
	}	
}]);