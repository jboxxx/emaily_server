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
    callbackURL: '/auth/google/callback', // can do a runtime decide domain on the file.  Easy
    proxy: true, // this says, yeah its fine if the request is routed through a proxy
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
    async (accessToken, refreshToken, profile, done) => { // note this is only called when the callbackURL has been sent a get
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); // pass onto passport, which will serialize this.  Return doesn't matter
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user); // pass onto passport, which will serialize this
    }
  )
);
