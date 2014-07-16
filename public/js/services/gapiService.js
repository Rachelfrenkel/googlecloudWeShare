'use strict';

angular.module('Gapi', ['ENV', function(ENV) {

return {
load: function load() {
  console.log('loading google apis...');
  if (typeof gapi.client === 'undefined') {
    setTimeout(load, 500);
  } else {
    gapi.client.setApiKey(ENV.googleToken);
    gapi.client.load('storage', 'v1', function() {
      console.log('loaded! :)');
      var request = gapi.client.storage.buckets.list({ project: ''});
      console.log(request);
      request.execute(function(response) { console.log(response); });
    });
  }
}
  };
}]);
