const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  classroom: String,
  imageUrl: String,
  level: { type: Number, default: 1 },
  correctAnswers: {
    addition: { type: Number, default: 0 },
    subtraction: { type: Number, default: 0 },
    multiplication: { type: Number, default: 0 },
    division: { type: Number, default: 0 }
  },
  incorrectAnswers: {
    addition: { type: Number, default: 0 },
    subtraction: { type: Number, default: 0 },
    multiplication: { type: Number, default: 0 },
    division: { type: Number, default: 0 }
  },
  score: {type: Number, default: 0}
});

module.exports = mongoose.model('Student', studentSchema);
