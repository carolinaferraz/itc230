const beardb = require('../models/bear');


// get all ✓
exports.getAll = (req, res) => {
    beardb.find()
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
    beardb.findOne({'name': req.body.name}, (err, result) => {
        if(err) {
            return err; 
        } return result
        }).then(result => {
            res.send(result);
    })}

// add ✓
exports.add = (req, res) => {
    //new color
    let newbear = {
        name: req.body.name, 
        hex: req.body.hex, 
        rgb: req.body.rgb
    }; 

    beardb.updateOne({'name': newbear.name}, newbear, {upsert: true}, (err, result) => {
        if(err) {
            return err; 
        } return result
    }).then(() => {
    res.status(200).send({
        message: "bear added."
    })
    });
}

// delete ✓
exports.delete = (req, res) => {
    beardb.findOneAndDelete({'name': req.params.name}, (err, result) => {
        if(err) {
            return err; 
        } return result
        }).then(result => {
            res.status(200).send({
                message: "bear deleted."
            })
    })}

//count
exports.howmany = (req, res) => {
    beardb.countDocuments((err, count) => {
        if(err) {
            return err; 
        } return count
        }).then(count => {
            res.status(200).res.sendStatus(count)
    })}