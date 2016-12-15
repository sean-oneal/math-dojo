
var Teacher = require('./../models/teacherModel.js');
var Student = require('./../models/studentModel.js');
var util = require('./../config/utility.js');

exports.createTeacher = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var classroom = req.body.classroom;
  if (!username || !password || !classroom) {
    res.status(406);
    res.send({ error: 'Username and Password Required' });
  } else {
    Teacher.create({
      username: username,
      password: password,
      classroom: classroom,
      students: []
    }, function(err, teacher) {
      if (err) {
        res.status(409);
        res.send({ error: 'Username is already taken' });
      } else {
        res.send(teacher);
      }
    });
  }
};

exports.addStudent = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var classroomName = req.body.classroom;
  var teacher = req.body.teacher;
  if (!username || !password || !classroomName || !teacher) {
    res.status(406);
    res.send({ error: 'Username, Password, Classroom, and Teacher Required' });
  } else {
    Teacher.findOne({ username: teacher, classroom: classroomName }, function(err, classroom) {
      if (err) {
        res.status(500);
        res.send({ error: 'Error retrieving classroom' });
      } else {
        if (classroom.students.includes(username)) {
          res.status(409);
          res.send({ error: 'Student username is already taken' });
        } else {
          classroom.students.push(username);
          classroom.save(function (err, teacher){
            if (err) {
              res.status(500);
              res.send({ error: 'Error saving student to classroom' });
            } else {
              Student.create({
                username: username,
                password: password,
                classroom: classroomName
              }, function(err, student){
                if (err) {
                  res.status(500);
                  res.send({ error: 'Error saving student to database' });
                } else {
                  res.send(teacher);
                }
              });
            }
          });
        }
      }
    });
  }
};

exports.getStudent = function (req, res) {
  var username = req.body.username;
  var classroomName = req.body.classroom;
  var teacher = req.body.teacher;
  console.log("Get Student:" + JSON.stringify(req.body));
  if (!username || !classroomName || !teacher) {
    res.status(406);
    res.send({ error: 'Username, Password, Classroom, and Teacher Required' });
  } else {
    Teacher.findOne({ username: teacher, classroom: classroomName }, function(err, classroom) {
      if (err) {
        res.status(500);
        res.send({ error: 'Error retrieving classroom' });
      } else {
        if (!classroom.students.includes(username)) {
          res.status(409);
          res.send({ error: 'Student does not exist' });
        } else {
          Student.findOne({
            username: username, classroom: classroomName
          }, function(err, student){
            if (err) {
              res.status(500);
              res.send({ error: 'Error saving student to database' });
            } else {
              if (!student) {
                res.status(404);
                res.send({ error: 'Student does not exist' });
              }
              res.send(student);
            }
          });
        }
      }
    });
  }
};

exports.loginTeacher = function (req, res) {
  Teacher.findOne({username: req.body.username}, function(err, user) {
    if (err) {
      res.status(500);
      res.send({ error: 'Error retrieving teacher record' });
    } else if (!user || req.body.password !== user.password ) {
      res.status(401);
      res.send({ error: 'Invalid username or password' });
    } else {
      util.createSession(req, res, user);
      res.send(user);
    }
  });
};

exports.logoutTeacher = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
