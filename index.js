var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/family-tree');

app.get('/', function(req, res) {
  res.send('Hi!');
});

app.listen(3000);