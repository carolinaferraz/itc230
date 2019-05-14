/* eslint-disable no-console */
let colordb = require('./color');


//get all
exports.getAll = () => {
  return colordb.find({}, (err, result) => {
    if (err) {
      return err;
    } return result;
  });
};

//get
exports.get = (colorname) => {
    return colordb.findOne({'name': colorname}, (err, result) => {
        if(err) {
            return err; 
        } return result
})};

//add
exports.add = (newcolor) => { 
  let imanewcolor = newcolor.name;

  colordb.updateOne({'name': imanewcolor}, newcolor, {upsert: true}, (err, result) => {
  if (err) {
      return err;
  }   return result;

})};

//delete -- broken
// exports.delete = (name) => { 
//     colordb.findOneAndDelete({'name': name}, (err, result).countDocuments(({}), (err, count) => {
//         if (err) {
//             return err;
//         }   
//         return count
//     })

// });