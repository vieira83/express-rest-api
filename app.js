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

//Handles requests that don't fall in anything else
// give 400 not found
app.use(function(req, res, next){
	var err = new Err("Not Found");
	err.satus = 400;
	next(err);
});

//Error Handler , take a fourth paramenter, that how express now is a error handleer and not middlewae
app.use(function(err, req, res, next){
	//if error status is undefined 500 is used
	res.status(err.status || 500);
	res.json ({
		error: {
			message: err.message
		}
	});

});