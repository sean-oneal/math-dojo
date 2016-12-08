var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./users/userModel.js').User;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
mongoose.connect('mongodb://localhost/catFight');

app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY'}));
var port = 3000;

require('./config/middleware.js')(app,express);

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username:username, password:password }).exec(function(err, user) {
    if (user) {
      console.log('cat found');
      res.send(200, user);
    } else {
      console.log('cat not found');
      res.send(404);
    }
  });

});

app.post('/signup', function(req, res) {
  var current = req.body;
  var newUser = new User({
      "username": current.username,
      "password": current.password,
      "imageUrl": current.imageUrl
  })
  newUser.save(function(err) {
    if (err) {
      res.status(500).send({ error: 'Oh snap son, shit\'s broken' });  
    } else {
      console.log('Saved', req.body.username, 'to the database');
    }
  });

});
// app.get('/*', function(req, res){
//   res.redirect('/');
// })


app.listen(port, function() {
  console.log('Now listening on port', port);
});

module.exports = app;