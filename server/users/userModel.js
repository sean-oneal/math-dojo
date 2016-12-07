var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {type:String, unique: true},
  password:  String,
  imageUrl:  String,
});

module.exports.User = mongoose.model('User', userSchema);