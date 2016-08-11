var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;
var port = 3030;
var app = express();

MongoClient.connect('mongodb://testuser:testicles@ds153745.mlab.com:53745/movie-quotes', function(err, database){
    if (err) return console.log(err)
    db = database;
    app.listen(port,function(){
        console.log("Listening on port "+port+"...");
    });
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    db.collection('quotes').find().toArray(function(err,result){
       if (err) return console.log(err);
       res.render(__dirname + '/public/views/index.ejs', {quotes: result});
    });
});
app.post('/quotes', function(req, res){
    db.collection('quotes').save(req.body, function(err, result){
       if (err) return console.log(err);
       console.log('Saved to database');
        res.redirect('/');
    });
    console.log(req.body);
});

