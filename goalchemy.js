/**
   Copyright 2014 AlchemyAPI

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


var express = require('express');
var consolidate = require('consolidate');

var app = express();
var server = require('http').createServer(app);

//Create the AlchemyAPI object
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
var poster = require('./poster.js');


// all environments
app.engine('dust',consolidate.dust);
app.set('views',__dirname + '/views');
app.set('view engine', 'dust');
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/goAlchemy/:id/:url', goAlchemy);



var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
	console.log('To view the example, point your favorite browser to: localhost:3000');
});

function goAlchemy(req, res) {
	var output = {};

	//Start the analysis chain
	text(req, res, output);
}

function text(req, res, output) {

  demo_url = req.params.url;
	alchemyapi.text('url', demo_url, {}, function(response) {
		output['text'] = { url:demo_url, content:response.text };
		author(req, res, output);
	});
}

function author(req, res, output) {
  demo_url = req.params.url;
	alchemyapi.author('url', demo_url, {}, function(response) {
		output['author'] = { url:demo_url, author:response.author };
		taxonomy(req, res, output);
	});
}

function taxonomy(req, res, output) {
  demo_url = req.params.url;
	alchemyapi.taxonomy('url', demo_url, {}, function(response) {
		output['taxonomy'] = { url:demo_url, taxonomy:response.taxonomy };
		//res.json(output);


 console.log("pinging...");
    poster(req.params.id, output);
	});
}
