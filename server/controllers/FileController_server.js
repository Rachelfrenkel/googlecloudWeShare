var mongoose = require('mongoose');
var util = require('util');
var fs = require('fs');
var restify = require('restify'),
    server = restify.createServer(),
    GAPI = require('node-gcs').gapitoken,
    GCS = require('node-gcs'),
    multiparty = require('multiparty'),
    Mimer = require('mimer');
var googleapis = require('googleapis'),
    OAuth2 = googleapis.auth.OAuth2;;

  var clientId = '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8.apps.googleusercontent.com';
  var email =    '242925103834-s6lkt0e9slm8a1t0fefge7sma2phjmj8@developer.gserviceaccount.com';

  // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
  // requests in the code.
  // The provided key works for this sample only when run from
  // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
  // To use in your own application, replace this API key with your own.
  var apiKey = 'AIzaSyACyKO5dH-2eU_QZj5CTPv57CqvstqBXmE';

  // To enter one or more authentication scopes, refer to the documentation for the API.
  // var scopes = "https://www.googleapis.com/auth/devstorage.full_control";

  var keyPath = __dirname + "../../key.pem";

var client = '242925103834-62p0i78fsoote0nkhpn6lfjpau0ljt2v.apps.googleusercontent.com';
var secret = 'MPhASyHID27d1FpF09e2-UnH';
var redirect = 'http://localhost:8000/oauth2callback';
// var auth = new googleapis.OAuth2Client(client, secret, redirect);

var oauth2Client =
    new OAuth2(client, secret, redirect);

// generates a url that allows offline access and asks permissions
// for Google+ scope.
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/devstorage.full_control'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes.join(" ") // space delimited string of scopes
});

exports.getfiles = function(req, res){
    console.log("getting files server side");
    googleapis.discover('storage', 'v1').execute(function(err, client) {
        if (err) {
            console.log('problem during client discovery', err);
            return;
        }
        client.storage.buckets.list(
            {'project': 'effective-balm-365'},
            {'bucket':'cindylikeschicken'})
            .withApiKey(apiKey)
            .withAuthClient(oauth2Client)
            .execute(function(resp) {
                console.log("bucket resp: ", resp);
            });


    });
}


//   console.log("getting files");
//   //pass in bucket in req

//   gapi.client.load('storage', 'v1', function() {
//     var list_obj_request = gapi.client.storage.objects.list(
//       {'bucket' : 'cindylikeschicken'} //PUT ALL OF THIS AND BELOW IN THE BUCKETS.EXECUTE
//     );
//     list_obj_request.execute(function(resp) {
//       // console.log("storage bucket response: \n" + JSON.stringify(resp));
//       // var heading = document.createElement('h4');

//       var bucket = resp.items[0].bucket;

//       var filename = "";
//       for (var i = 0; i < resp.items.length; i++) {
//         allfiles[i] = resp.items[i].name;
//         console.log("got file: " + allfiles[i]);
//         // filename = resp.items[i].name;
//         // var image = document.createElement('img');
//         // image.src = 'http://storage.googleapis.com/' + bucket + '/' + filename;
//         // heading.appendChild(image);
//         // heading.appendChild(document.createTextNode(filename));
//         // document.getElementById('content').appendChild(heading);
//       };
//       res.jsonp(allfiles);
//     });
//   });
// }

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
    res.redirect('/nerds');
};

exports.delete = function(req, res) {
    console.log("going to delete");
    var fileName = req.params.file;

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

            gcs.deleteFile('cindylikeschicken', '/' + fileName, headers, function(gerr, gres){
                console.log('file should be gone!');
            });
        });
    res.redirect('/nerds');
};