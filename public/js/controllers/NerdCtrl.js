

angular.module('NerdCtrl', []).controller('NerdController', function($scope, $routeParams, $window, $location, Nerd) {
	$scope.tagline = 'Nothing beats a pocket protector!';


	$scope.getNerds = function(){
		Nerd.get({}).then(function(d){
			$scope.allnerds = d.data;
		});
	}

	$scope.getNerds();

	$scope.linkToNewNerd = function(){
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
		//DOESNT WORK YET!
		// Nerd.delete(nerd);
		// $scope.getNerds();
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