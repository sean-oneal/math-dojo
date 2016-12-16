const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const auth = require('../auth.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

mongoose.connect('mongodb://localhost/catFight');
const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to database.'));

const port = 3000;

require('./config/middleware.js')(app, express);
//TODO: Should be in middleware?
passport.use(new GoogleStrategy({
  clientID: auth.googleAuth.clientID,
  clientSecret: auth.googleAuth.clientSecret,
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback'},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile}, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((id, done) => done(null, id));

//TODO: Modulatity? Add to Router?
//TODO: Set up callback to TeacherLogin and StudentLogin
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, function() {
  console.log('Now listening on port', port);
});

module.exports = app;