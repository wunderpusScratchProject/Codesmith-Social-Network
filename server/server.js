const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:8080'}));


// Once we have React router working, this will keep the page from breaking if you're not on the homepage.
app.get('/*', (req, res) => {
  return res.status(200).redirect('/');
});


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));


// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };

  const errorObj = Object.assign(defaultErr, err); 
  console.log(errorObj.log);

  res.status(errorObj.status).send(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;