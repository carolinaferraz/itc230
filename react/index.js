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
        Bear.find((err, bears) => {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


// routes that end in /bears/:bear_name
router.route('/bears/:bear_name')

// get 1 bear (accessed at GET http://localhost:3000/api/bears/:bear_name)
    .get((req, res) => {
        Bear.findOne({'name': req.params.bear_name},  (err, bear) => {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

// update the bear with this name (accessed at PUT http://localhost:3000/api/bears/:bear_name)
.put((req, res) => {
    Bear.findOne({'name': req.params.bear_name},(err, bear) => {
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
    Bear.findOneAndRemove({'name': req.params.bear_name}, (err, bear) => {
        console.log(bear)
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

// register routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Server running on port ' + port);
