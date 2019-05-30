/* eslint-disable no-console */
const Bear = require('./components/bears');
const express = require('express');
let bearmodel = require('../models/bear');


// routes for api
// ===================
const router = express.Router();  

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening!');
    next(); 
});

// test route (accessed at GET http://localhost:3000/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to the api route!' });   
});



// routes that end in /bears
router.route('/bears')

// create a bear (accessed at POST http://localhost:3000/api/bears)
.post((req, res) => {
    let bear = new Bear();  
    bear.name = req.body.name;  
    bear.color = req.body.color;
    bear.type = req.body.type;

// save the bear and check for errors
    bear.save((err) => {
        if (err)
            res.send(err);
            res.json({ message: 'Bear created!' });
        });

    })

// get all the bears (accessed at GET http://localhost:3000/api/bears)
    .get((req, res) => {
        console.log(req)
        bearmodel.find((err, bears) => {
            console.log(bears);
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


// routes that end in /bears/:bear_name
router.route('/bears/:bear_name')

// get 1 bear (accessed at GET http://localhost:3000/api/bears/:bear_name)
    .get((req, res) => {
        bearmodel.findOne(req.body.bearname, (err, bear) => {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

// update the bear with this name (accessed at PUT http://localhost:3000/api/bears/:bear_name)
.put((req, res) => {
    bearmodel.findOne(req.body.bear_name, (err, bear) => {
        if (err)
            res.send(err);
        bear.name = req.body.name;  // update the bears info

    // save the bear
        bear.save((err) => {
            if (err)
                res.send(err);
            res.json({ message: 'Bear updated!' });
        });
    });
})

// delete the bear with this name (accessed at DELETE http://localhost:3000/api/bears/:bear_name)
.delete((req, res) => {
    bearmodel.findOneAndRemove({
        _name: req.body.bear_name
    }, (err, bear) => {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});



// //old routes.js code
// module.exports = (app) => {
//     const bears = require('./components/bears');

//     // get all
//     app.get('/api/bears', bears.getAll);

//     //get
//     app.get('/api/bears/:name', bears.get);

//     // add
//     app.post('/api/bears/', bears.add);

//     // delete
//     app.delete('/api/bears/delete/:name', bears.delete);

//     // count
//     app.post('/api/bears/count', bears.howmany);
// }