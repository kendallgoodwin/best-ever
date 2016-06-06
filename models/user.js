var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// create a schema
var userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
	password: String
});

// userSchema.methods.sayHello = function() {
//   return "Hi " + this.username;
// };

userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      username: ret.username,
      email: ret.email,
      name: ret.name
    };
    return returnJson;
  }
});

userSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', userSchema);




// // make this available to our other files
// module.exports = User;