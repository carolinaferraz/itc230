// CONTROLLER

/* eslint-disable no-console */
'use strict'
const express = require('express'); 

const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.static('public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

const colormethods = require('./models/colormethods');
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//start server
app.listen(PORT, () => {
  console.log("server running on port "  + PORT + "! :)");
});

//home
app.get('/', (req,res) => {
  res.render('home');
 });

 app.get('/colors', (req, res, next) => {
  colormethods.getAll().then((items) => {
    res.send({colors: items});
  }).catch((err) => {
    return next(err);
  });
});

 // add
 app.post('/add', (req, res) => { 
  let newcolor = {
    name: req.body.name, 
    hex: req.body.hex, 
    rgb: req.body.rgb};
 
    let result = colormethods.add(newcolor);
    res.sendStatus(200);
    res.send(result);
});


//get details
app.post('/detail', (req, res) => {
  colormethods.get(req.body.colorname).then((item) => {
    res.render('details', {colorname:req.body.colorname, item})  
    })
});


//delete & count
app.get('/delete', (req, res) => {
  colormethods.delete(req.query.name).then(() => {
    colormethods.count().then((count)=> {
      res.render('delete', {name: req.query.name, count});
    })
  });
});