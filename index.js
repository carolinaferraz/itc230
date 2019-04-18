var http = require("http"), fs = require('fs'); 
const qs = require("querystring");
var color = require("./lib/colors.js");


http.createServer((req,res) => {
  let url = req.url.split("?");  // separate route from query string
  let query = qs.parse(url[1]); // convert query string to object
  let path = url[0].toLowerCase();

 
  switch(path) {
    case '/':
    fs.readFile("public/home.html", (err, data) => {
      if (err) return console.error(err);
      res.end(data.toString());
   });
      break;

    case '/about':
    fs.readFile("public/about.html", (err, data) => {
      if (err) return console.error(err);
      res.end(data.toString());
      });
      break;

      case '/getall':
      res.end(JSON.stringify(color.getAll()));
      break;

      case '/get':
      let found = color.get(query.name); // get color object
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let output = (found) ? JSON.stringify(found) : "Not found";
      res.end('here is your color:' + "\n" + output);
      break;

      case '/delete':
      let bye = color.delete(query.name);
      
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(bye));
      break;

      
    
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: Page not found :(');
      break;
    }
}).listen(process.env.PORT || 3000);