var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();



mongoose.connect('mongodb://localhost/catFight');

app.use(bodyParser.json())


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '../src/client'));


app.listen(3000,function(){
  console.log('hello world')
});