// keys.js - figure out what set of credentials to return

// heroku will will define NODE_ENV at runtime
if (process.env.NODE_ENV === 'production') {
  // we are in production, return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in the dev environment, return the dev set of keys
  module.exports = require('./dev');
}
