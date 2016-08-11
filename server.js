var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Quote = require('./models/quote');
var port = process.env.PORT || 8080;
var app = express();

mongoose.connect('mongodb://testuser:testicles@ds153745.mlab.com:53745/movie-quotes');
mongoose.connection.on('open', function(){
    app.listen(port,function(){
        console.log("Listening on port "+port+"...");
    });
});


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    Quote.find({},function(err,result){
        if (err) return console.log(err);
        res.render(__dirname + '/public/views/index.ejs', {quotes: result});
    });
});
app.post('/quotes', function(req, res){
    var newQuote = Quote(req.body);
    newQuote.save(function(err){
        if (err) return console.log(err);
        console.log('Saved to database');
        res.redirect('/');
    });
    console.log(req.body);
});

