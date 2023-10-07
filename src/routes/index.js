const router = require('express').Router();
const authRouter = require('./auth.routes');
const booksRouter = require('./books.routes');
const membersRouter = require('./members.routes');
const swaggerDocRouter = require('./swagger');

// router.get('/', (req, res) => {
//   #swagger.tags=['Hello World']
//   res.send('Hello World');
// });

router.use('/', swaggerDocRouter);

router.get('/', (req, res) => {
  // #swagger.tags=['Home']
  console.log(req.session.user);
  res.render('index', { userName: req.session.user ? req.session.user.displayName : null });
  // res.send(req.session.user ? `Logged in as ${req.session.user.displayName}` : 'Logged Out');
});

router.use('/', authRouter);

router.use('/books', booksRouter);

router.use('/members', membersRouter);

module.exports = router;
