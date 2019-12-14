const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', (req,res) => {
res.send('Welcome to REST API with Node.js Tuorial!!!');
});





//Create a GET Method Service “/API/YourStudentID/Students” which will return list of all the students 

app.get('/api/get', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  dbo.collection("intern").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});

});




//	Create a POST Method Service  which will insert data to Collection 

app.post('/api/insert', (req, res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myobj = {"internfname" : "Priyanka", "internlname" : "Marwah", "Grade" : "A"};
  dbo.collection("intern").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
	
    db.close();
  });
  res.send("1 document inserted");
});
});

//	Create a PUT Method Service which will update collection

app.put('/api/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  var myquery = { "Lastname": "Marwah" };
  var newvalues = { $set: { "Lastname": "Marw" } };
  dbo.collection("intern").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
	
    db.close();
  });
  res.send("1 document updated");
});
});

//delete services to delete data from collections

app.delete('/api/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  var myobj = { "internfname": "Sona"};
  dbo.collection("intern").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});
const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));

