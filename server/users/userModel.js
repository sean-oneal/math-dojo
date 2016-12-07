var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  String,
  password:  String,
  imageUrl:  String,
});

var User = mongoose.model('User', userSchema);


exports.User = User;