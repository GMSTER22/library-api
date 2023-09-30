const router = require('express').Router();
const booksRouter = require('./books.routes');
const membersRouter = require('./members.routes');
const swaggerDocRouter = require('./swagger');

router.use('/', swaggerDocRouter);

router.get('/', (req, res) => {
  // #swagger.tags=['Hello World']
  res.send('Hello World');
});

router.use('/books', booksRouter);

router.use('/members', membersRouter);

module.exports = router;
