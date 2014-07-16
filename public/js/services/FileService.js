angular.module('FileService', []).factory('File', ['$http', '$cookies', '$resource', function($http, $cookies, $resource) {

	return {

		get : function() {
			console.log("getting files in service");
			return $http.get('/api/getfiles/');
		},

		upload : function() {
			return $http.post('/api/upload/');
		},

		destroy : function(id) {
			return $http.delete('/api/delete/' + id);
		},
	}	
}]);