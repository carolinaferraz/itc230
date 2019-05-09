// CONTROLLER

'use strict'
const express = require('express'); 
let color = require('./models/color');


const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const qs = require("querystring");

app.use(express.static('public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("server running on port "  + PORT + "! :)");
});

//home
app.get('/', (req,res) => {
  res.render('home');
 });

 //get all
app.get('/getall', (req, res) => {
  res.end(JSON.stringify(color.getAll()))
});

//get
app.get('/get', (req, res) => {
  let found = color.get(req.body.name); // get color object
  let output = (found) ? JSON.stringify(found) : "Not found";
  res.end(output);
  });

 //details 
 app.post('/detail', (req, res) => {
  let result = color.get(req.body.colorname);
  res.render('details', {name: req.body.colorname, result: result});
});

 // add
 app.post('/add', (req, res) => { 
  let newColor = {
    name: req.body.name, 
    hex: req.body.hex, 
    rgb: req.body.rgb};
  try {
    let result = color.add(newColor);
    res.status(201).send(result);
  } 
  catch (error){
    res.status(400).send({
      error: 'color already exists!'
    });
  }
  
  
 });

//delete 
app.get('/delete', (req, res) => {
 let delurl = req.url.split("?");
 let delquery = qs.parse(delurl[1]);
 let result = color.delete(delquery.name);
 res.render('delete', {name: delquery.name, result: result});

});
  
// define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.sendStatus(404);
 });
 

 // about
app.get('/about', (req, res) => {
  res.render('about');
 });