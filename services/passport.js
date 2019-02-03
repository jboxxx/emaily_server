const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');

// this is called when .done() is called below
passport.serializeUser((user, done) => {
  done(null, user.id);  // passes on this as a cookie?
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
      // we have this user
    });
});

// flow:
// client sends to get request to /auth/google
// passport asks for google to authenticate a user
// google sends back a code to the callbackURL
// passport sends the code to google
// google sends back user information to passport in the Strategy's callback
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  }, (accessToken, refreshToken, profile, done) => { // note this is only called when the callbackURL has been sent a get
    User.findOne({ googleId: profile.id })  // returns a promise
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // we don't have a record with this ID, make a new record
          // .save() returns a promise
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, existingUser)); // continues
        }
      });
    }
  )
);
