/* eslint-disable no-console */
//models/bear

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cred = require('./credentials');

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
