var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('listening on port ' + port);

exports = module.exports = app;
