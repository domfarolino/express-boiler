require('dotenv').config({silent: true});

const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

/**
 * Middleware setup (gross)
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public'));

/**
 * Custom handler for all cache control
 */
app.get('*', (request, response, next) => {
  response.set({
    'Cache-Control': 'no-cache'
  });

  // Remove bs headers
  response.removeHeader('X-Powered-By');

  // Move on down the line
  next();
});

/**
 * API setup + basic handler
 */

const apiV1 = require('./lib/controllers/api');
app.use('/api', apiV1);

// app.get('/', (request, response) => {
//   response.status(200).send('Wooo');
// });

/**
 * Static
 */

app.use('/', express.static(path.join(__dirname, 'public')));

require('http').createServer(app).listen(8080, function() {
  console.log(`Running: ${process.env.SECRET_VAR}`);
});

/**
 * Error handling
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, request, response, next) {
    response.status(err.status || 500);
    response.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, request, response, next) {
  response.status(err.status || 500);
  response.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
