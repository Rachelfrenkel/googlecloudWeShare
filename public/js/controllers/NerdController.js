angular.module('NerdController', []).controller('NerdController', function($scope, $routeParams, $window, $location, Nerd) {
	$scope.tagline = 'Nothing beats a pocket protector!';

	$scope.getNerds = function(){
		Nerd.get().then(function(response){
			console.log('resopnse.data = ' + response.data);
			$scope.allnerds = response.data;
		});
	}

	// // Creates a NERD object server-side. We can then save or delete this object as if
	// // we were operating on the server.
    // var nerd = new Nerd.resourceObj({
    //     name: 'Bob',
    //     email : 'bob@gmail.com',
    //     science : 'chemistry'
    // });

	

	// Nerd.resourceObj.query(function(nerds) {
	// 	// console.log('all nerds are = ' + nerds);
	// });


	$scope.linkToNewNerd = function(){
		console.log('link to new nerd');
		$location.path('/nerds/create');
	};

	$scope.addNewNerd = function(){
		var nerd = {
			name: this.name,
			email: this.email,
			science: this.science
		};

		Nerd.create(nerd);
		$scope.getNerds();
		$location.path('nerds');
	}

	$scope.editNerd = function(nerd){
		$location.path('/nerds/edit/' + nerd._id);
	};

	$scope.deleteNerd = function(nerd){
		Nerd.destroy(nerd._id).then(function(results){
			console.log('results = ' + angular.toJson(results));
			if (results.status == 200) {
				$scope.getNerds();
				console.log('delete was successful');
			} else {
				console.log('delete failed.');
			}
		});
	};

	$scope.findNerd = function(){
		var nerdId = $routeParams._id;
		Nerd.get({ _id: nerdId }).then(function(nerds){
			$scope.nerd = nerds.data[0];
		});
	};

	$scope.updateNerd = function(){

	};

});