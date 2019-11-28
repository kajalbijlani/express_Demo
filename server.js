const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
// mongoose.set('useFindAndModify', false);

// define a simple route
app.get('/', (req, res) => {
  res.json({ message: 'Express Demo' });
});

require('./app/routes/demo.js')(app);

// listen for request
app.listen(3003, () => {
  console.log('Server is listening on port 3003');
});
