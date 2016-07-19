'use strict'
var express = require('express')
var router = express.Router();

//GET /questions
router.get("/", function(req, res){
	res.json({responses: "you sent me a GET request"});
});

//POST /questions
router.get("/", function(req, res){
	res.json({
		responses: "you sent me a POST request",
		body: req.body
	});
});

//GET /questions/:id
router.get("/:qID", function(req, res){
	res.json({
		responses: "you sent me a POST request" + req.params.qID
	});
});

//GET /questions/:qID/answers
// Route for creating answers
router.post("/:qID/answers", function(req, res){
	res.json({
		responses: "you sent me a POST request to /answers",
		questionID: req.params.qID,
		body: res.body
	});
});

//POST qID/answers/:aID/vote-up
//POST qID/answers/:aID/vote-down
// Route for voting on an specidic answer
router.post("/:qID/answers/:aID/vote-:dir", 
	function(req, res, next) {
		//another call back function to validate the middleware
		if(req.params.dir.search(/^(up|down)$/) === -1 ){
			var err = new Err ("Not Found");
			err.status = 404;
			next(err);
		}else {
			//if it matches call the next handler, which is the next callback function below
			next();
		}
	},
	function(req, res){
		res.json({
			responses: "you sent me a POST request to /vote", + req.params.dir
			questionID: req.params.qID,
			answersID: req.params.aID,
			vote: req.params,dir,
			body: res.body
		});
});

//PUT /questions/:id/answers/:id
// Route for updating specidic answer
router.put("/:qID/answers/:aID", function(req, res){
	res.json({
		responses: "you sent me a PUT request to /answers",
		questionID: req.params.qID,
		answersID: req.params.aID,
		body: res.body
	});
});

//DELETE /questions/:id/answers/:id
// Route for deleting specidic answer
router.delete("/:qID/answers/:aID", function(req, res){
	res.json({
		responses: "you sent me a DELETE request to /answers",
		questionID: req.params.qID,
		answersID: req.params.aID
	});
});

module.exports = router;