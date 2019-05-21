const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// Require colors routes
require('./app/routes')(app);

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const cred = require('./app/credentials');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(cred.connectionString, { dbName: 'itc230', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

//home
app.get('/', (req, res) => {
    res.json({"message": " ✎ welcome to the colors app!"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});