var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  {type: String, unique: true},
  password:  String,
  imageUrl:  String,
  level: {type: Number, default: 1}
});

module.exports = mongoose.model('User', userSchema);