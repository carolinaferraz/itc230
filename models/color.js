//DATA MODEL

/* eslint-disable no-console */
const mongoose = require('mongoose');
let cred = require('../lib/credentials');



mongoose.connect(cred.connectionString, { dbName: 'itc230', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// values indicate the data type of each key
const colorSchema = mongoose.Schema({
 name: { type: String, required: true },
 hex: String,
 rgb: String
});

module.exports = mongoose.model('Color', colorSchema);