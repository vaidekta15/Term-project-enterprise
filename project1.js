const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
app.use(express.static('./index'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.post('/insert', (req, res)=> {
	console.log("Trying to insert new movie data..");
	console.log("title: " + req.body.Title)
	res.send("1 document inserted");
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("assignment"); 
  var myobj = {"title": req.body.title,"year" :req.body.year,"rated" :req.body.rated,"genre":req.body.genre,"director":req.body.director};
  dbo.collection("movie").insertOne(myobj, function(err, res) {
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
  dbo.collection("movie").find({}).toArray(function(err,result) {
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
  var myquery = { "title": req.body.title };
  var newvalues = { $set: {"genre":req.body.genre } };
  dbo.collection("movie").updateOne(myquery, newvalues, function(err, res) {
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
  var myobj = { "title": req.body.title };
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



