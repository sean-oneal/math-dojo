var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./users/userModel.js').User;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost/catFight');


// var newUser = new User({ username: 'V-Cat', password: 'meow', imageUrl: 'https://s-media-cache-ak0.pinimg.com/originals/e0/81/6b/e0816b09a99f6ce0ee708343cfc5469d.png' });


// newUser.save(function(){
//   console.log('saved');
// });



app.use('/', express.static(__dirname + '../src/client'));

app.post('/signup', function() {
  console.log('do something');
});


app.listen(3000,function(){
  console.log('hello world');
});