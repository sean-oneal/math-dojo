var morgan = require('morgan');
var bodyParser = require('body-parser');


module.exports = function(app, express){

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../../src/client'));
app.use('/config', express.static(__dirname + '/../../'));
};

