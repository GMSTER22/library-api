const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('./src/database/database');
const config = require('./src/config/index');
const router = require('./src/routes/index');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = config.port || 8080;

const app = express();

app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*'
  });
  res.header({
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  });
  res.header({
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });

  next();
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      console.log(accessToken, 'ACCESS TOKEN');
      console.log(refreshToken, 'REFRESH TOKEN');
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.set('views', path.join(__dirname, '/src/views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/src/public')));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', router);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// eslint-disable-next-line no-unused-vars
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
});
