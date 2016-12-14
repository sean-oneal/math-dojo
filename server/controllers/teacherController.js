
var Teacher = require('./../models/teacherModel.js');
var util = require('./../config/utility.js');

exports.createTeacher = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var classroom = req.body.classroom;
  var imageUrl = req.body.imageUrl;
  if (!username || !password || !imageUrl) {
    res.send({ error: 'Please fill out all fields' });
  } else {
    Teacher.create({
      username: username,
      password: password,
      classroom: classroom,
      imageUrl: imageUrl
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

exports.loginTeacher = function (req, res) {
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
        res.send(200, user);
      }
    }
  });
};

exports.logoutTeacher = function (req, res) {
  req.session.destroy();
  console.log('session over');
};

exports.retrieveAll = function (req, res) {
	Teacher.find({}, function(err, users) {
		if (err) {
			console.log('Error retrieving database:', err);
			res.status(400).send(err);
		} else {
			res.send(users);
		}
	});
}

exports.retrieveTeacher = function (req, res) {
  console.log('retrieving');
  Teacher.findOne(req.params, function(err, user) {
    if (err) {
      console.log('Error retrieving User:', err);
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
};

exports.updateTeacher = function (req, res) {
  Teacher.findOneAndUpdate(req.params, req.body, {new: true}, function(err, user) {
    if (err) {
      console.log('Error updating user:', err);
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  });
};

exports.deleteTeacher = function (req, res) {
  Teacher.findOneAndRemove(req.params, function(err, user) {
    if (err) {
      console.log('Error deleting user:', err);
      res.status(400).send(err);
    } else {
      console.log('User deleted');
      res.send(user);
    }
  });
};
