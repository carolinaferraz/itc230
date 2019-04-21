'use strict'

const express = require('express'); 
let color = require("./lib/colors.js");

const app = express();
const bodyParser = require("body-parser")
const PORT = 3000;
const qs = require("querystring");

app.use(express.static('public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions



app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

//get all
app.get('/getall', (req, res) => {
  res.end(JSON.stringify(color.getAll()))
});

//get
app.get('/get', (req, res) => {
let url = req.url.split("?");  // separate route from query string
let query = qs.parse(url[1]); // convert query string to object
let path = url[0].toLowerCase();

let found = color.get(query.name); // get color object
res.writeHead(200, {'Content-Type': 'text/plain'});
let output = (found) ? JSON.stringify(found) : "Not found";
res.end('here is your color:' + "\n" + output);
});

//delete - returns boolean for now, getall presents updated array
app.get(('/delete'), (req, res) => {
  let delurl = req.url.split("?");
  let delquery = qs.parse(delurl[1]);
  let bye = color.delete(delquery.name);
  res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(bye));
});

// send plain text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('about page');
 });

// define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

app.listen(PORT, () => {
  console.log("your server is running on port "  + PORT + "! :)");
  });