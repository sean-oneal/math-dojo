const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  googleId: { type: String, unique: true },
  displayName: { type: String, unique: true },
  accessToken: String,
  classroom: String,
  students: [ String ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
