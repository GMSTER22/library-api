const router = require('express').Router();

// eslint-disable-next-line node/no-unpublished-require
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../../swagger.json');

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
