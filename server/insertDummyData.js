// use node insertDummyData.js to run
var dummyData = require('./userDummyData.js');
var User = require('./users/userModel.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/catFight');

var insertData = function() {
  var usersToInsert = dummyData.length;
  dummyData.forEach(function(user) {
    User.create({
      username: user.username,
      password: user.password,
      imageUrl: user.imageUrl,
      level: user.level,
      correctAnswers: user.correctAnswers,
      incorrectAnswers: user.incorrectAnswers,
      score: user.score
    }, function(err, user) {
      if (err) {
        console.log('Error inserting users');
      } else {
        console.log(user.username, 'has been inserted into the database');
        usersToInsert--;
        if (usersToInsert === 0) {
          console.log('All users inserted successfully.');
          process.exit();
        }
      }
    });
  });
};
insertData();
