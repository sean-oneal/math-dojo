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

// var newUser = new User({ username: 'V-Cat', password: 'meow', imageUrl: 'https://s-media-cache-ak0.pinimg.com/originals/e0/81/6b/e0816b09a99f6ce0ee708343cfc5469d.png' });


// newUser.save(function(){
//   console.log('saved');
// });
require('./config/middleware.js')(app,express);

// app.get('/logout', function (req, res) {
//   req.session.destroy();
//   res.redirect('../login');
//   res.send("logout success!");
// });
// app.get('/', function(req, res) {
//   console.log('Cookies: ', req.cookies)
// })

app.post('/signup', function(req,res) {
  console.log('do something', req.body);
});
// app.get('/*', function(req, res){
//   res.redirect('/');
// })


app.listen(3000,function(){
  console.log('Server listening at port 3000');
});

module.exports = app;