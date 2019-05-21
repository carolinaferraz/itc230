const mongoose = require('mongoose');

// values indicate the data type of each key
const colorSchema = mongoose.Schema({
    name: { type: String, required: true },
    hex: String,
    rgb: String
   });
   
   module.exports = mongoose.model('Color', colorSchema, 'colors');