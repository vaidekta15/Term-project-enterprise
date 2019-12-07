const express = require('express');
const app = express();
var mongo = require('mongodb');
app.use(express.json());



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//get services to read data from collections
app.get('/api/project',(req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  dbo.collection("restaurants").find({}).toArray(function(err,result) {
  if (err) throw err;
  console.log(result);
  res.send(result);
  db.close();
 });
});
});

app.get('/api/project1.1',(req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  dbo.collection("movie").find({}).toArray(function(err,result) {
  if (err) throw err;
  console.log(result);
  res.send(result);
  db.close();
 });
});
});





//post services to insert data into collections.
app.post('/api/project/ekta', (req, res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myobj = ({"name":"Red Lobster","cuisine":"Sea Food","address":{"street":"Keele St","city":"York","state":"ON","zipcode":"45993"},"rating":4.5});
  dbo.collection("restaurants").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
	
    db.close();
  });
  res.send("1 document inserted");
});
});


//put services to update collections.

app.put('/api/project/student2',(req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myquery = { genre: "Documentary" };
  var newvalues = { $set: {genre: "Drama" } };
  dbo.collection("movie").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});



//delete services to delete data from collections
app.delete('/api/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  var myobj = { "title": "Malificent"};
  dbo.collection("movie").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));










