var mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  title: String,
  artist: String,
  category: String,
  argument: String,
  image: String,
  userId: Number, 
  upvotes: Number
});

var Entry = mongoose.model('Entry', entrySchema);

// make this available to our other files
module.exports = Entry;