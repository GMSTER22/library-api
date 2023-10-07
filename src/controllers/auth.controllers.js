// eslint-disable-next-line no-unused-vars
const loginHandler = (req, res) => {
  // #swagger.tags=['Authentication']
  // #swagger.description = 'Endpoint to login'
};

const logoutHandler = (req, res, next) => {
  // #swagger.tags=['Authentication']
  // #swagger.description = 'Endpoint to logout'
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

const githubCallbackHandler = (req, res) => {
  // Successful authentication, redirect home.
  req.session.user = req.user;
  res.redirect('/');
};

module.exports = {
  loginHandler,
  logoutHandler,
  githubCallbackHandler
};
