
var Teacher = require('./../models/teacherModel.js');
var Student = require('./../models/studentModel.js');
var util = require('./../config/utility.js');

//find Teacher in Database or Create new one, saving  Google OAuth accessToken
exports.findOrCreate = function(accessToken, refreshToken, profile, cb) {
  // googleId
  var id = profile.id;
  // user's display name on Google
  var name = profile.displayName;

Teacher.findOne({ googleId: id}, function (err, user) {
  //if error occurs, return the callback and error
  if (err) {
    return cb(err, null);
  }
  //if a teacher is not found, create and save a new teacher to database
  if (!user) {
    var teacherToSave = {
      googleId: id,
      displayName: name,
      accessToken: accessToken,
      classroom: '',
      students: []
    }

    Teacher.create(teacherToSave, function(err, user) {
      if (err) {
        console.log('no teacher found');
        return cb(err, null)
      }
      if (user) {
        console.log(err, user,'saved');
      }
    });
  }

  return cb(err, user);
})};

//Local Storage Strategy
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
                classroom: classroomName,
                imageUrl: 'https://yt3.ggpht.com/-l-0QzYzy4pc/AAAAAAAAAAI/AAAAAAAAAAA/YvzI2PYIcHs/s100-c-k-no-mo-rj-c0xffffff/photo.jpg'
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
              } else {
                res.send(student);
              }
            }
          });
        }
      }
    });
  }
};

exports.loginTeacher = function (req, res) {
  console.log(req, 'request from teacher login!');
  Teacher.findOne({googleId: req.body.id}, function(err, user) {
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
