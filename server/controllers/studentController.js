
var Student = require('./../models/studentModel.js');
var util = require('./../config/utility.js');

exports.loginStudent = function (req, res) {
  Student.findOne({username: req.body.username, classroom: req.body.classroom }, function(err, student) {
    if (err) {
      res.status(500);
      res.send({ error: 'Error retrieving student record' });
    } else if (!student || req.body.password !== student.password ) {
      res.status(401);
      res.send({ error: 'Invalid username or password' });
    } else {
      util.createSession(req, res, student);
      res.send(student);
    }
  });
};

exports.logoutStudent = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
