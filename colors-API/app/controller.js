const colordb = require('./model');


// get all ✓
exports.getAll = (req, res) => {
    colordb.find()
    .then(colors => {
        res.send(colors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error"
        });
    });
};

// get ✓
exports.get = (req, res) => {
    colordb.findOne({'name': req.params.name}, (err, result) => {
        if(err) {
            return err; 
        } return result
        }).then(result => {
            res.send(result);
    })}

// add ✓
exports.add = (req, res) => {
    //new color
    let newcolor = {
        name: req.body.name, 
        hex: req.body.hex, 
        rgb: req.body.rgb
    }; 

    colordb.updateOne({'name': newcolor.name}, newcolor, {upsert: true}, (err, result) => {
        if(err) {
            return err; 
        } return result
    }).then(() => {
    res.status(200).send({
        message: "color added."
    })
    });
}

// delete ✓
exports.delete = (req, res) => {
    colordb.findOneAndDelete({'name': req.params.name}, (err, result) => {
        if(err) {
            return err; 
        } return result
        }).then(result => {
            res.status(200).send({
                message: "color deleted."
            })
    })}

//count
exports.count = () => {
    return colordb.countDocuments((err, count) => {
      return count })};