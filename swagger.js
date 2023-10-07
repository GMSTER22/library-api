// eslint-disable-next-line node/no-unpublished-require
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My library API',
    description: 'An API for interacting with books and members informations.'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      description: 'This API uses OAuth 2 with the Authorization code grant flow',
      authorizationUrl: 'http://localhost:8080/login',
      flow: 'authorizationCode',
      scopes: {
        write_books: 'modify books in your account',
        write_members: 'modify members in your account'
      }
    }
  }
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
