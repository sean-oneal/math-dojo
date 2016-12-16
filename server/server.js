const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/catFight');
const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to database.'));

const port = 3000;

require('./config/middleware.js')(app, express);

app.listen(port, function() {
  console.log('Now listening on port', port);
});

module.exports = app;