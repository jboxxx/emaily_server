const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// this takes whatever port heroku wants us to run.  Would be passed into our project at runtime
const PORT = process.env.PORT || 5000;
app.listen(5000);
