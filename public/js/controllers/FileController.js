angular.module('FileController', []).controller('FileController', function($scope, $routeParams, $window, $location, File) {

$scope.bucket = 'cindylikeschicken';
$scope.allfiles = [];

//       // Use a button to handle authentication the first time.
// $window.handleClientLoad = function() {
//   console.log("handling");
//   window.gapi.client.setApiKey(apiKey);
//   // window.setTimeout(checkAuth,1);
// }
// $window.onLoad = handleClientLoad();


$scope.uploadFile = function(){
	console.log("you pressed the button");

	$location.path('/nerds');
};

      // Load the API and make an API call.  Display the results on the screen.
      // $scope.getPlus = function() {
      //   gapi.client.load('plus', 'v1', function() {
      //     var request = gapi.client.plus.people.get({
      //       'userId': 'me'
      //     });
      //     request.execute(function(resp) {
      //       var heading = document.createElement('h4');
      //       var image = document.createElement('img');
      //       image.src = resp.image.url;
      //       heading.appendChild(image);
      //       heading.appendChild(document.createTextNode(resp.displayName));

      //       document.getElementById('content').appendChild(heading);
      //     });
      //   });
      // }
      function get_bucket_arr() {
        gapi.client.load('storage', 'v1', function() {

          //**********************
          // GET ALL BUCKETS, STORE IN ARRAY (bucket_arr[i])
          //**********************
            var buckets = gapi.client.storage.buckets.list(
              {'project' : 'effective-balm-635'}
            );
            var bucket_arr = [];
            buckets.execute(function(resp) {
              var num_buckets = resp.items.length;
              for (var i = 0; i < num_buckets; i++) {
                bucket_arr[i] = resp.items[i].id;
              };
            });

            $scope.bucket = bucketId;

        });
      }
//*********************
// DELETE OBJECT FROM BUCKET  (uncomment execute func to run it)
//**********************
$scope.deleteFile = function(file, bucket) {
  gapi.client.load('storage', 'v1', function() {
    var delete_request = gapi.client.storage.objects.delete({
        'bucket': bucket,
        'object': file
      });
    delete_request.execute(function(resp) {
      console.log("delete resp: " + JSON.stringify(resp));
    });
  });
}

//**********************
// GET ALL OBJECTS IN A BUCKET, DISPLAY 
//**********************
$scope.getFiles = function(){
    File.get().then(function(response){
      console.log('response.data = ' + response.data);
      $scope.allfiles = response.data;
    });
  // console.log("getting files");
  // gapi.client.load('storage', 'v1', function() {
  //   var list_obj_request = gapi.client.storage.objects.list(
  //     {'bucket' : $scope.bucket} //PUT ALL OF THIS AND BELOW IN THE BUCKETS.EXECUTE
  //   );
  //       var num_files; 

  //   list_obj_request.execute(function(resp) {
  //     num_files = resp.items.length;
  //     // console.log("storage bucket response: \n" + JSON.stringify(resp));
  //     // var heading = document.createElement('h4');

  //     var bucket = resp.items[0].bucket;

  //     var filename = "";

  //     for (var i = 0; i < resp.items.length; i++) {
  //       $scope.allfiles[i] = resp.items[i].name;
  //       console.log("got file: " + $scope.allfiles[i]);
  //       // filename = resp.items[i].name;
  //       // var image = document.createElement('img');
  //       // image.src = 'http://storage.googleapis.com/' + bucket + '/' + filename;
  //       // heading.appendChild(image);
  //       // heading.appendChild(document.createTextNode(filename));
  //       // document.getElementById('content').appendChild(heading);
  //       num_files--;
  //     };

     
  //   });
  // while (num_files != 0) {}
  //       console.log('all files after finishing for loop = ' + $scope.allfiles);  
  // });
  // console.log("all files: " + $scope.allfiles);
}

});