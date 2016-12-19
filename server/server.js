const express = require('express');
const mongoose = require('mongoose');
const Teacher = require('./controllers/teacherController.js');
const passport = require('passport');
const app = express();
const auth = require('../auth.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const util = require('./config/utility.js');

mongoose.connect('mongodb://localhost/mathDojo');
const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to database.'));

const port = 3000;

require('./config/middleware.js')(app, express);

app.use(passport.initialize());
app.use(passport.session());
//TODO: Should be in middleware?

passport.use(new GoogleStrategy({
  clientID: auth.googleAuth.clientID,
  clientSecret: auth.googleAuth.clientSecret,
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback'},
  Teacher.findOrCreate));

passport.serializeUser((user, done) => done(null, user.googleId));
passport.deserializeUser((id, done) => done(null, id));

//TODO: Modulatity? Add to Router?
//TODO: Set up callback to TeacherLogin and StudentLogin
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    //res.cookie('auth', JSON.stringify(req.user));
    console.log(JSON.stringify(req.user));
    var cookieValue = req.user.googleId + ',' + req.user.displayName + ',' + req.user.classroom + ',' + req.user.students.join(',');
    console.log('cookieValue:' + cookieValue);
    res.cookie('auth', cookieValue);
    res.redirect('/teacher');
  });

app.listen(port, function() {
  console.log('Now listening on port', port);
});

module.exports = app;
