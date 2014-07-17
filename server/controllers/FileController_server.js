var mongoose = require('mongoose');
var util = require('util');
var fs = require('fs');
var restify = require('restify'),
    server = restify.createServer(),
    GAPI = require('node-gcs').gapitoken,
    GCS = require('node-gcs'),
    multiparty = require('multiparty'),
    Mimer = require('mimer');

var CloudStorage = require('cloud-storage');
var gcloud = require('gcloud'),
    bucketCloud = new gcloud.storage.Bucket({
        bucketName: 'cindylikeschicken',
        projectId: 'effective-balm-635',
        email: '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8@developer.gserviceaccount.com',
        pemFilePath: __dirname + "/../../key.pem"
    });


  var clientId = '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8.apps.googleusercontent.com';
  var email =    '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8@developer.gserviceaccount.com';

  var apiKey = 'AIzaSyACyKO5dH-2eU_QZj5CTPv57CqvstqBXmE';

  var keyPath = __dirname + "../../key.pem";

// var client = '242925103834-62p0i78fsoote0nkhpn6lfjpau0ljt2v.apps.googleusercontent.com';
// var secret = 'MPhASyHID27d1FpF09e2-UnH';
// var redirect = 'http://localhost:8000/oauth2callback';
// // var auth = new googleapis.OAuth2Client(client, secret, redirect);

// var oauth2Client =
//     new OAuth2(client, secret, redirect);

// // generates a url that allows offline access and asks permissions
// // for Google+ scope.
var scopes ='https://www.googleapis.com/auth/devstorage.full_control';

// gapi.auth.authorize(
//     {client_id: clientId, scope: scopes, immediate: false},
//     function(authResult) {
//       if (authResult && !authResult.error) {
//       gapi.client.load('storage', 'v1', function() { ...


// var url = oauth2Client.generateAuthUrl({
//   access_type: 'offline',
//   scope: scopes.join(" ") // space delimited string of scopes
// });

var storage = new CloudStorage({
    accessId: '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8@developer.gserviceaccount.com',
    privateKey: __dirname + "/../../key.pem"
});

exports.getfiles = function(req, res){

      var url_array = [];

      bucketCloud.list(function(err, files, nextQuery) {
            if(err) console.log(err);

            if (files) {
                for (var i = 0; i < files.length; i++) {
                url_array[i] = storage.getUrl("gs://cindylikeschicken/" + files[i].name); 
                console.log(url_array[i]);           
                };
            }
            res.jsonp(url_array);
      });
}

exports.upload = function(req, res) {

    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        var file = fs.createReadStream(files.file[0].path);

        var fileType = '.' + file.path.split('.').pop().toLowerCase();
        var fileName = files.file[0].originalFilename;

        var gapi = new GAPI({
            iss: '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8@developer.gserviceaccount.com',
            scope: 'https://www.googleapis.com/auth/devstorage.full_control',
            keyFile: __dirname + '/../../key.pem'
        }, 
        function(err) {
            if (err) { console.log('google cloud authorization error: ' + err); }

            var headers = {
                'Content-Type': Mimer(fileType),
                'Transfer-Encoding': 'Chunked',
                'x-goog-acl': 'public-read'
            };

            var gcs = new GCS(gapi);

            gcs.putStream(file, 'cindylikeschicken', '/' + fileName, headers, function(gerr, gres){
                console.log('file should be there!');
            });
        });

    });
    res.redirect('/');
};

exports.destroy = function(req, res) {
    var bucket = req.params.bucket
    var file = req.params.file;

    storage.remove("gs://" + bucket + "/"+file, function(err, success) { 
        console.log(success);
        res.send('File is deleted');
    });
};
