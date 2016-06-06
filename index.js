var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Mongoose stuff
var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect('mongodb://localhost/best-ever');



// create a new user called Chris
var kendall = new User({
  username: 'Kendall',
});

app.get('/', function(req, res) {
  res.send(kendall.sayHello());
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(3000);