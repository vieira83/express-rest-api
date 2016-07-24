'use strict'
/*
Test the connection in command line
$ mongo
$ use sandbox
$ db.getCollectionNames();
$ db.animals
$ db.animals.find()
*/
var mongoose = require('mongoose');

//connect to the mongo server, takes 1 param
//27017 is th default port for mongodb
//sandbox is the Database name
mongoose.connect("mongodb://localhost:27017/sandbox");

//monitor the state of the connection and store it in a var
var db = mongoose.connection;


//when errors occurs this  listener handler will take care o it
db.on("error", function (err){
	console.log("connection error:", err);
});

//Listen to open events, means connections is open and ready to talk
//once method to listen only once, the first time the event occurs
db.once("open", function() {
	console.log("db connection successful");
	//All dabase communication goes here

	//Create a Schema Constructor , that will be used to create schemas
	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema ({
		type: String,
		color: String,
		size: String,
		mass: Number,
		name: String
	});

	// We will use the mongo schema to create a Model , used to create 
	//   and sav documents
	// FIrst param - name of Model
	// Second Param - schema to be used, that defined animals
	// Mongoose pluralizes the first param (name) and will map to 
	//    a collection in the mongo database whenever we save a document (Animals)
	var Animal = mongoose.Model("Animal", AnimalSchema);

	//creating an elephant, mongo will save it in the animals collection
	var elephant = Animal({
		type: "elephant",
		size: "big",
		color: "grey",
		mass: 6000,
		name: "Lawrence"
	});

	elephant.save(function(){
		//once finished close the connection
		if (err) console.error("Error Save failed!", err);
		else console.log(" Saved successful");
		db.close(function() {
			//notifies when connection is closed
			console.log(" db connection Closed !");
		});
	});

})