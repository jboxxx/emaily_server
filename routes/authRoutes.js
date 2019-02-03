const passport = require('passport'); // note this instance of passport has been configured by our service in index.js

module.exports = (app) => {
  // redirects and sends to google servers based on the GoogleStrategy
  // Google the sends a response back to our app if ok to our callbackURL
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // even though the route handlers looks similar.  the GoogleStrategy sees to code
  // it then tries to exchange with code for some information
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(); // // passport attaches the method logout to the request object
    res.send(req.user); // returns nothing as req.user is undefined
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.session);
    res.send(req.user); // passport attaches user and session etc to the request object
  });
};
