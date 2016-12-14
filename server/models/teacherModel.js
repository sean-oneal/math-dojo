var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  username:  {type: String, unique: true},
  password:  String,
  imageUrl:  String,
  classroom: String,
  students: [ {
    username:  { type: String },
    password:  { type: String },
    imageUrl:  { type: String }
  } ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
