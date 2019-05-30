const Bear = require('./components/bears');
const express = require('express');
var bearmodel = require('./src/bearmodel');


// routes for api
// ===================
const router = express.Router();  

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening!');
    next(); 
});

// test route (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the api route!' });   
});



// routes that end in /bears
router.route('/bears')

// create a bear (accessed at POST http://localhost:3000/api/bears)
.post(function(req, res) {
    let bear = new Bear();  
    bear.name = req.body.name;  
    bear.color = req.body.color;
    bear.type = req.body.type;

// save the bear and check for errors
    bear.save(function(err) {
        if (err)
            res.send(err);
            res.json({ message: 'Bear created!' });
        });

    })

// get all the bears (accessed at GET http://localhost:3000/api/bears)
    .get(function(req, res) {
        console.log(req)
        bearmodel.find(function(err, bears) {
            console.log(bears);
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


// routes that end in /bears/:bear_name
router.route('/bears/:bear_name')

// get 1 bear (accessed at GET http://localhost:3000/api/bears/:bear_name)
    .get(function(req, res) {
        bearmodel.findOne(req.body.bearname, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

// update the bear with this name (accessed at PUT http://localhost:3000/api/bears/:bear_name)
.put(function(req, res) {
    bearmodel.findOne(req.body.bear_name, function(err, bear) {
        if (err)
            res.send(err);
        bear.name = req.body.name;  // update the bears info

    // save the bear
        bear.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Bear updated!' });
        });
    });
})

// delete the bear with this name (accessed at DELETE http://localhost:3000/api/bears/:bear_name)
.delete(function(req, res) {
    bearmodel.findOneAndRemove({
        _name: req.body.bear_name
    }, function(err, bear) {
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