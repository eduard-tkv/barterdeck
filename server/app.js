const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');

const busboy = require('busboy');

const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config');

const app = express();

const cors = require('cors');

//app.use(cors());

app.use(cors({
  origin: 'http://localhost:3333',
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({extended: false}));

/*
app.use(busboy({
  limits: {
    files: 1,
    fileSize: 110000
  }
}));
*/

app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({keys: ['goVeg@nCho0seLife', 'alvaysBeurS3lf', '...']}));

app.use(express.static(path.join(__dirname, 'public')));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
const Account = require('./models/account');

/*
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Account.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, return the message
        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, user);
    });

}));
*/

//passport.use(new LocalStrategy(Account.authenticate()));
passport.use(Account.createStrategy());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Connect mongoose
mongoose.connection.openUri(config.dbUri, function(err) {
  if (err) {
    console.log('\nERROR: COULD NOT CONNECT TO MONGODB!');
  }
  
  console.log(`Connected to MongoDB on port: ${app.get('port')}`);
});

// Register routes
app.use('/', require('./routes/users'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;