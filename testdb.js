/* eslint-disable no-console */
let Color = require('./models/color.js');

//get number of mongoDB documents
Color.countDocuments((err, result) => {
    if (err) {
        console.log(err); //output error if one occurred
    } else {
        console.log('total number of mongoDB docs: ' + result); //otherwise print number of mongoDB documents in database
    }
});

// find all documents 
Color.find((err, result) => {
    if (err) {
        console.log(err); //output error if one occurred
    } else {
        console.log('array of mongoDB docs: \n' + result); //otherwise output the array of documents
    }
});
