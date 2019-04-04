const http = require("http"); 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
    const fs = require("fs");
    fs.readFile("home.html", (err, data) => {
      if (err) return console.error(err);
      res.end(data.toString());
   });
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('hello, this is an application under construction, i still need to decide what i want it to do!');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 -- Not found :(');
      break;
    }
}).listen(process.env.PORT || 3000);