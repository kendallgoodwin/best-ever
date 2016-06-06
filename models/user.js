var mongoose = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
	password: String
});

var User = mongoose.model('User', userSchema);

// make this available to our other files
module.exports = User;