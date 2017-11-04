var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

app.all('/*', function (req, res, next) {
  // res.writeHead(200, corsHeaders);
  res.header ('access-control-allow-origin', '*');
  res.header ('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header ('access-control-allow-headers', 'content-type, accept');
  res.header ('access-control-max-age', 10);
  next();
});
app.options('/*', function (req, res, next) {
  res.writeHead(200, corsHeaders);
  // console.log("being Hit");
  res.send();
  // next();
});

// Logging and parsing
// app.use(morgan('dev'));
app.use(parser.json());
// app.post('/', () => console.log ('im here'))
// Set up our routes
app.use('/classes', router);
// app.use('/bower_components', express.static(__dirname + '../bower_components'));

// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

/////// testings ///
// var model = require('./models/index.js');
// model.messages.get();