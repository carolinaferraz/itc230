// CONTROLLER

'use strict'

const express = require('express'); 
let color = require("./lib/colors.js");

const app = express();
const bodyParser = require("body-parser")
const PORT = 3000;
const qs = require("querystring");

app.use(express.static('public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//send content of 'home' view
app.get('/', (req,res) => {
  res.render('home');
 });


//get all
app.get('/getall', (req, res) => {
  res.end(JSON.stringify(color.getAll()))
});

//get
app.get('/get', (req, res) => {
let url = req.url.split("?");  // separate route from query string
let query = qs.parse(url[1]); // convert query string to object

let found = color.get(query.name); // get color object
res.writeHead(200, {'Content-Type': 'text/plain'});
let output = (found) ? JSON.stringify(found) : "Not found";
res.end('your color:' + "\n" + output);
});

//detail 
app.post('/detail', (req, res) => {
  

  let result = color.get(req.body.colorname);
  res.render('details', {name: req.body.colorname, result: result });
 });


//delete - returns boolean value, getall presents updated array
app.get(('/delete'), (req, res) => {
  let delurl = req.url.split("?");
  let delquery = qs.parse(delurl[1]);
  let result = color.delete(delquery.name);
  res.render('delete', {name: delquery.name, result: result});

});

// about
app.get('/about', (req, res) => {
  res.render('about');
 });

// define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("server running on port "  + PORT + "! :)");
  });