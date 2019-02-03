const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// requires the whole file, ie executes it.
// This is configuring passport to the use GoogleStrategy by default
require('./models/user'); // Defines new Schema named 'users'
require('./services/passport');  // receives data from OAuth flow and writes new users to MongoDB database

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const app = express();

// request flow
// 1) comes in, cookie-session extracts encrypted cookie data from the request
  // and assigns the users id to req.session
// 2) passport pulls out the user id out of the altered request, req.session
// 3) passport sees the user id, and passes to deserialize user, once done ..
// 4) passport finds the user and passes the user model instance to req.user (cookie is the session)

// this listens to all requests and places cookie data on all requests
// the cookie IS the session (in our case, the user) unlike express-session
// adds the encrypted cookie of the user after serializerUser
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // days/hr * hr/min * min/seconds * seconds/millis * millis
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

 // require statement returns a function, and we invoke the function with app

// this takes whatever port heroku wants us to run.  Would be passed into our project at runtime
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('Server is listening on port:', PORT);
