const passport = require('passport'); // note this instance of passport has been configured by our service in index.js

module.exports = (app) => {
  // redirects and sends to google servers based on the GoogleStrategy
  // Google the sends a response back to our app if ok to our callbackURL
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // even though the route handlers looks similar, the GoogleStrategy sees the code, so it knows the user as accepted from google
  // it then tries to exchange with code for some information
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys'); // note this redirects to localhost:3000 -> which is where the request originally came from, from the proxy
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // passport attaches the method logout to the request object, un-sets cookie
    res.redirect('/'); // full html refresh as opposed to sending nothing and handling routing / redux on client side in action creator
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session); is the cookie session
    res.send(req.user); // passport attaches user and session etc to the request object
  });
};
