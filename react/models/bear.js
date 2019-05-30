/* eslint-disable no-console */
//bear model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cred = require('../src/credentials');

mongoose.connect(cred.connectionString, { dbName: 'hello-nodejs', useNewUrlParser: true, useFindAndModify: false }); 

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
  });


let BearSchema = new Schema({
    name: String,
    color: String,
    type: String,
});

module.exports = mongoose.model('Bear', BearSchema);
