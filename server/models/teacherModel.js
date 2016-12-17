var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  googleId: {type: String, unique: true},
  displayName:  {type: String, unique: true},
  accessToken: String,
  classroom: String,
  students: [ String ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
