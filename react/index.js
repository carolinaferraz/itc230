/* eslint-disable no-console */
// index.js


const express = require('express');        
const app = express();                 
let bodyParser = require('body-parser');

let Bear = require('./models/bear');

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;        // set port


// routes for api
// ===================
let router = express.Router();  

// middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening!');
    next(); 
});

//home 
app.get('/', (req,res) => {
    Bear.find({}, (err, bears) => {
        if (err)
            res.send(err);
            res.render('home', {bears: JSON.stringify(bears)} );
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error"
        });
    });
   });


// test route (accessed at GET http://localhost:3000/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to the api route!' });   
});

// routes that end in /bears
router.route('/bears')


// get all the bears (accessed at GET http://localhost:3000/api/bears) ✓
    .get((req, res) => {
        Bear.find((err, bears) => {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


// routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

// get 1 bear (accessed at GET http://localhost:3000/api/bears/:bear_id) ✓
    .get((req, res) => {
        Bear.findById(req.params.bear_id,  (err, bear) => {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })


//add and update bears ✓
router.route('/bears/add')
    .post((req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let bear = new Bear({name:req.body.name,color:req.body.color,type:req.body.type});
        bear.save((err,newbear) => {
            if (err) return next(err);
            console.log(newbear)
            res.json({updated: 0, _id: newbear._id});
        });
    } else { // update existing document
        Bear.updateOne({ _id: req.body._id}, {name:req.body.name, color: req.body.color, type: req.body.type }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

// delete the bear with this id (accessed at DELETE http://localhost:3000/api/bears/delete/:bear_id) ✓
router.route('/bears/delete/:bear_id')
    .get((req, res, next) => {
        Bear.remove({_id:req.params.bear_id }, (err, result) => {
            if (err) return next(err);
            res.json({message: 'Successful deleted.'});
    });
});

// register routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Server running on port ' + port);