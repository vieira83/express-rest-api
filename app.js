'use strict'
var express = require('express');
var app = express();
var routes = require('routes');
var logger = require("morgan");

var jsonParser = require('body-parser').json;

var jsonCheck = function(req, res, next) {
	if(req.body) {
		console.log('the sky is', req.body.color);
	}else {
		console.log('no property on the reques');
	}
	next();
}

var port = process.env.PORT || 3000;



app.use("/questions", routes)

app.listen(port, function(){
	 console.log("Express server running on port", req.query.color);
});

app.use(logger("dev"));

app.use(jsonParser());

app.use('/different/:id', function (req, res, next){
	console.log('Second piece of middleware', req.params.id);
	next();
});

