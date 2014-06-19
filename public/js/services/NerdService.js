angular.module('NerdService', []).factory('Nerd', ['$http', '$resource', function($http, $resource) {

	return {
		// call to get all nerds
		get : function() {
			return $http.get('/api/nerds');
		},

		// call to POST and create a new nerd
		create : function(nerdData) {
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