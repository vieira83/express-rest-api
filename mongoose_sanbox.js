'use strict'
/*
Test the connection in command line
$ mongo
$ use sandbox
$ db.getCollectionNames();
$ db.animals
$ db.animals.find()
$ quit()
to run these file in node
$ node mongoose_sandbox.js
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
		type: {type: String, default: 'Goldfish'},
		color: {type: String, default: 'red'},
		size: {type: String, default: 'small'},
		mass: {type: Number, default: '300'},
		name: {type: String, default: 'default'}
	});

	// We will use the mongo schema to create a MODEL , used to create 
	//   and save documents
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

	var animal = new Animal({}); // created a Goldfish generic animal

	//DELETING - empty the Animal model before saving, avoid multiple elephants
	// SAVING -call back function save elephant or animal after emptying the model
	Animal.remove({}, function(){
		elephant.save(function(){
			if (err)console.error("Error Save failed!", err);
			animal.save(function(err){
				if (err) console.error("Error Save failed!", err);
				//once finished close the connection
				db.close(function() {
					//notifies when connection is closed
					console.log(" db connection Closed !");
				});
			});
		});	
	});

	// READING THE Database or Query the Dabase
	Animal.find("size:small", function(err, animals){
		animals.forEach(function(animal){
			console.log(animal.name + " The " + animal.color + " " + animal.type );
		});
	})
})