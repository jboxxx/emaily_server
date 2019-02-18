module.exports = (req, res, next) => {
  // if passport did not find a user referenced inside the cookie on the request
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};
