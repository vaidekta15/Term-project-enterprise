const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
app.use(express.static('./html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.post('/insert', (req, res)=> {
	console.log("Trying to insert data..");
	console.log("fname: " + req.body.title)
	res.send("1 document inserted");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myobj = {"fname": req.body.fname,"lname" :req.body.year,"lname" :req.body.rated,"empid":req.body.empid,"deptid":req.body.deptid};
  dbo.collection("employee").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
	
    db.close();
  });
 
});
});


app.get('/show',(req,res)=> {

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  dbo.collection("employee").find({}).toArray(function(err,result) {
  if (err) throw err;
  console.log(result);
  res.send(result);
  db.close();
 });
});
});

app.post('/update',(req,res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myquery = { "fname": req.body.fname };
  var newvalues = { $set: {"lname":req.body.lname } };
  dbo.collection("employee").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});

app.post('/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment");
  var myobj = { "fname": req.body.fname };
  dbo.collection("employee").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));



