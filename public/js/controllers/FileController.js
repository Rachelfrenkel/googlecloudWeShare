angular.module('FileController', []).controller('FileController', function($scope, $timeout, $routeParams, $window, $location, File) {


$scope.bucket = 'cindylikeschicken';
$scope.allfiles = [];

  // Enter a client ID for a web application from the Google Developer Console.
  var clientId = '242925103834-62p0i78fsoote0nkhpn6lfjpau0ljt2v.apps.googleusercontent.com';

  // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
  // requests in the code.
  var apiKey = 'AIzaSyACyKO5dH-2eU_QZj5CTPv57CqvstqBXmE';

  // To enter one or more authentication scopes, refer to the documentation for the API.
  var scopes = "https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/devstorage.full_control";

  //*********************
  // DELETE OBJECT FROM BUCKET
  //**********************
  $scope.deleteFile = function(file, bucket) {
    file = file.substr(file.lastIndexOf('/')+1, file.last);

    File.destroy(bucket, file).then(function(results) {
        console.log('results = ' + angular.toJson(results));
        if (results.status == 200) {
          $scope.getFiles();
          console.log('delete was successful');
        } else {
          console.log('delete failed.');
        }
    })
  }

  //**********************
  // GET ALL OBJECTS IN A BUCKET, DISPLAY 
  //**********************
  $scope.getFiles = function(){

      File.get().then(function(response){
        console.log('response.data = ' + JSON.stringify(response.data));
        $scope.allfiles = response.data;
      });
  }

  $scope.uploadFile = function(){
    File.upload().then(function(response){
      console.log("uploaded file");
      $scope.getFiles();
    })
  }

  //**********************
  // GET ALL BUCKETS 
  //**********************
  function get_bucket_arr() {
    gapi.client.load('storage', 'v1', function() {

      //**********************
      // GET ALL BUCKETS, STORE IN ARRAY (bucket_arr[i])
      //**********************
        var buckets = gapi.client.storage.buckets.list(
          {'project' : 'effective-balm-635'}
        );
        $scope.bucket_arr = [];
        buckets.execute(function(resp) {
          var num_buckets = resp.items.length;
          for (var i = 0; i < num_buckets; i++) {
            $scope.bucket_arr[i] = resp.items[i].id;
          };
        });

    });
  }

});