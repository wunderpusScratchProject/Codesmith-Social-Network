const path = require('path');
const express = require('express');
const PORT = 3000;
const fs = require('fs');

const app = express();

app.use(express.json());

//serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index');
})


//catch all
app.use('*', (req, res) => fs.sendFile(path.join(__dirname, '/404.html')));

// Global error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
