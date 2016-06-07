var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var app = express();

var secret = "mysupersecretpassword";

// Mongoose stuff
var mongoose = require('mongoose');
var User = require('./models/user');
var Entry = require('./models/entry');
// mongoose.connect('mongodb://localhost/Entry');
mongoose.connect('mongodb://localhost/best')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/api/entries', expressJWT({secret: secret}));
app.use('/api/users', expressJWT({secret: secret})
.unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/entries', require('./controllers/entries'));
app.use('/api/users', require('./controllers/users'));


var User = require('./models/user');
app.post('/api/auth', function(req, res){
	User.findOne({username:req.body.username}, function(err, user){
		user.authenticated(req.body.password, function(err, loggedUser){
			if(err || !loggedUser) {
				res.send({error: err});
			}
			var userInfo = {username: user.username};
			console.log("userInfo:", userInfo);
			
			var token = jwt.sign(userInfo, secret)
		  
		  console.log("token:", token);
			res.json({token:token})
		})
	})
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(3000);