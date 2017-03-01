const routes = require('express').Router();

routes.get('/*', (request, response, next) => {
  // API responses should never be stored
  response.set({
    'Cache-Control': 'no-store'
  });

  next();
});

module.exports = routes;