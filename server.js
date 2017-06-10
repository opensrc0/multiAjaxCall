var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var path        = require('path');
var async 		= require('async');
var request 	= require('request');

var apiRoutes	= express.Router();
var publicDir	= path.join(__dirname, '/');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.render( __dirname + "/public/html/" + "index.ejs");
});

app.get('/multiCall', function(req, res) {

	var multiAysn = async.parallel({
		one: function(parallelCb) {
			request('http://127.0.0.1:4000/api/call1', function (err, res, body) {
				parallelCb(null, {err: err, body: body});
			});
		},
		two: function(parallelCb) {
			request('http://127.0.0.1:4000/api/call2', function (err, res, body) {
				parallelCb(null, {err: err, body: body});
			});
		},
		three: function(parallelCb) {
			request('http://127.0.0.1:4000/api/call3', function (err, res, body) {
				parallelCb(null, {err: err, body: body});
			});
		}
	}, function(err, results) {
		var finallArr = [];
		for(var i in results) {
			try {
				var result = JSON.parse(results[i].body);
				if(result.status && result.status == "success") {
					finallArr.push({"status" : "1" , "data" : result.data, 'callNumber' : i});
				}
			} catch(e) {
				finallArr.push({"status" : "0" , "data" : '', 'callNumber' : i});
			}
		}

		res.send(finallArr);
	});


	/**
	Native Spport

    function requestAsync(url) {
	
		return new Promise(function(resolve, reject) {
			request(url, function(err, res, body) {
				if (err) { return reject('Error'); }
				return resolve([res, body]);
			});
		});
	}

	Promise.all([requestAsync('http://127.0.0.1:4000/api/call1'), requestAsync('http://127.0.0.1:4000/api/call2') , requestAsync('http://127.0.0.1:4000/api/call3')])
	.then(function(results) {
		var finallArr = [];
		for(var i in results) {
			try {
				var result = JSON.parse(results[i].body);
				if(result.status && result.status == "success") {
					finallArr.push({"status" : "success" , "data" : result.data, 'callNumber' : i});
				}
			} catch(e) {
				finallArr.push({"status" : "failure" , "data" : '', 'callNumber' : i});
			}
		}

		res.send(finallArr);
		
	}).catch(function(reason) {
		console.log(reason);
	}); 

	Native support end here
	**/

	
});

apiRoutes.get('/call1', function(req, res) {
	setTimeout(function() {
		res.send({'status' : 'success', 'data': 'data1'});
	},5000);
});

apiRoutes.get('/call3', function(req, res) {
	setTimeout(function() {
		res.send({'status' : 'success', 'data': 'data3'});
	},3000);
});

app.use('/api', apiRoutes);

var server = app.listen(4000, function () {
   var port = server.address().port;
   console.log("Example app listening at http://%s:%s", 'http://127.0.0.1', port);
});
