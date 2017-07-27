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
 * API setup + handler
 */
const apiV1 = require('./lib/controllers/api');
app.use('/api', apiV1);

/**
 * Special file handlers should go here
 */

/**
 * Setup `public/` as static folder
 */
app.use('/', express.static(path.join(__dirname, 'public')));

/**
 * Run server
 */
require('http').createServer(app).listen(process.env.PORT, function() {
  console.log(`Serving on: ${process.env.PORT}`);
});

///////////////////////////////////////////////////////////////////////

/**
 * Error handling
 */
// development error handler prints stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, request, response, next) {
    response.status(err.status || 500);
    response.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler does not leak stacktrace to user
app.use(function (err, request, response, next) {
  response.status(err.status || 500);
  response.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
