
var Teacher = require('./../models/teacherModel.js');
var Student = require('./../models/studentModel.js');
var util = require('./../config/utility.js');

exports.createTeacher = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var classroom = req.body.classroom;
  if (!username || !password ) {
    res.send({ error: 'Username and Password Required' });
  } else {
    Teacher.create({
      username: username,
      password: password,
      classroom: classroom,
      students: []
    }, function(err, user) {
      if (err) {
        res.send({ error: 'Username is already taken' });
      } else {
        console.log('Saved', req.body.username, 'to the database');
        res.send(user);
      }
    });
  }
};

exports.addStudent = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var classroom = req.body.classroom;
  var teacher = req.body.teacher;
  console.log("Add Student:" + JSON.stringify(req.body));
  if (!username || !password ) {
    res.send({ error: 'Username and Password Required' });
  } else {
    Teacher.findOne({ username: teacher, classroom: req.body.classroom }, function(err, classroom) {
      if (err) {
        // database error
        console.log('Error retrieving classroom:', err);
        res.send({ error: 'Error retrieving classroom' });
      } else {
        //add student to classroom
        classroom.students.push(username);
        classroom.save(function (err, teacher){
          if (err) {
            console.log('Error saving student to classroom:', err);
            res.send({ error: 'Error saving student to classroom' });
          } else {
            // Add student to student database
            console.log('update teacher class:' + JSON.stringify(teacher));
            Student.create({
              username: username,
              password: password,
              classroom: classroom
            }, function(err, student){
              if (err) {
                console.log('Error saving student to Database:', err);
                res.send({ error: 'Error saving student to database' });
              } else {
                //student saved
                res.send(teacher);
              }
            });
          }
        });
      }
    });
    //
    // Teacher.create({
    //   username: username,
    //   password: password,
    //   classroom: classroom,
    //   students: []
    // }, function(err, user) {
    //   if (err) {
    //     res.send({ error: 'Username is already taken' });
    //   } else {
    //     console.log('Saved', req.body.username, 'to the database');
    //     res.send(user);
    //   }
    // });
    //
  }
};

exports.loginTeacher = function (req, res) {
  console.log("in the loginTeacher route");
  Teacher.findOne({username: req.body.username}, function(err, user) {
    if (err) {
      console.log('Error retrieving user:', err);
      res.send({ error: 'Error retrieving user' });
    } else if (!user) {
      res.send(200, { error: 'User does not exist, please create an account' });
    } else {
      // TODO: password needs to be hashed before entering
      if (req.body.password !== user.password) {
        res.send({ error: 'Password does not match' });
      } else {
        util.createSession(req, res, user);
        res.send(user);
      }
    }
  });
};

exports.logoutTeacher = function (req, res) {
  req.session.destroy();
  console.log('session over');
};
