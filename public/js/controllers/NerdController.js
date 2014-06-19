angular.module('NerdController', []).controller('NerdController', function($scope, $routeParams, $window, $location, Nerd) {
	$scope.tagline = 'Nothing beats a pocket protector!';

	$scope.getNerds = function(){
		Nerd.resourceObj.query(function(response) {
			var nerd3 = response[2];
			console.log('nerd3 = ' + angular.toJson(nerd3));
			nerd3.$remove();
		});
		Nerd.get().then(function(response){
			$scope.allnerds = response.data;
		});
	}

    var nerd = new Nerd.resourceObj({
        name: 'Bob',
        email : 'bob@gmail.com',
        science : 'chemistry'
    });


	// console.log('Nerd.object = ' + angular.toJson(nerd));

	Nerd.resourceObj.query(function(nerds) {
		// console.log('all nerds are = ' + nerds);
	});

        // console.log('new nerd = ' + nerd);
	$scope.helloworld = 'hello world';

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
		// console.log('delete object = ' + angular.toJson(nerd));
		// nerd.remove();
		Nerd.destroy(nerd._id);
		// console.log('nerd = ' + nerd);
		// console.log('inspect nerd = ' + angular.toJson(nerd));
  //       nerd.$remove(function(response) {
  //       	console.log('response = ' + response);
  //       });
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