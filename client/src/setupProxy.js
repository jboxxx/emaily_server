const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    // this says anytime we send a request (from our development server) to /auth/google
    // forward this request onto the server listed in the target
    // this does not affect production because the create-react-app server doesn't exist in production
    // this tricks the browser in development to also send our cookies as its sending the request to localhost:3000
    // this also tricks the browser into thinking requests are going to the same domain, handles CORS
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000' }));    
};
