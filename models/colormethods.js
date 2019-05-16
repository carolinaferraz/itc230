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

//delete
exports.delete = (name) => {
    return colordb.findOneAndDelete({'name': name}, (err, deleted) => {
        if (err) {
          return err;
        } return deleted
    })
};

//count
exports.count = () => {
  return colordb.countDocuments((err, count) => {
    return count
  })  
}