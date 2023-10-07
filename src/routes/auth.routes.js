const router = require('express').Router();
const passport = require('passport');
const {
  loginHandler,
  logoutHandler,
  githubCallbackHandler
} = require('../controllers/auth.controllers');

router.get('/login', passport.authenticate('github'), loginHandler);

router.get('/logout', logoutHandler);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  githubCallbackHandler
);

module.exports = router;
