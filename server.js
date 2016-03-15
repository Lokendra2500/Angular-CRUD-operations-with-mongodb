var express = require("express");
var app = express();
var mongojs = require ('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

//setting up our html template files

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.json());
app.get('/contactList', function(req, res){
	console.log("Request Received");

	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactList', function(req, res){
	console.log(req.body);
	db.contactList.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactList/:id', function(req,res){
	var id = req.params.id;
	console.log(id);

	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactList/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.firstName);
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:{$set:{firstName: req.body.firstName, Email: req.body.Email, contact_number: req.body.contact_number}},
		new:true}, function(err, doc){
			res.json(doc);
		});
});
app.listen(3000);
console.log("running");