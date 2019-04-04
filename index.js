const http = require("http"); 
const fs = require("fs");

http.createServer((req,res) => {
  const path = req.url.toLowerCase();
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
    
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 -- Not found :(');
      break;
    }
}).listen(process.env.PORT || 3000);
