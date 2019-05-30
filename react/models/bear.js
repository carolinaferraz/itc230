//bear model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let cred = require('../src/credentials');

mongoose.connect(cred.connectionString, { dbName: 'hello-nodejs', useNewUrlParser: true, useFindAndModify: false }); 

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
  });


var BearSchema = new Schema({
    name: String,
    color: String,
    type: String,
});

module.exports = mongoose.model('Bear', BearSchema);
