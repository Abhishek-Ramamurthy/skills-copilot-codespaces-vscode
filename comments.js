// Create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments.json');

var server = http.createServer(function(req, res) {
  var path = url.parse(req.url).pathname;
  var query = url.parse(req.url).query;
  var params = qs.parse(query);

  // GET
  if (req.method === 'GET') {
    if (path === '/') {
      fs.readFile('./index.html', function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('404 not found');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
        }
      });
    } else if (path === '/comments') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(comments));
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 not found');
    }
  }

  // POST
  if (req.method === 'POST') {
    if (path === '/comments') {
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        var comment = qs.parse(body);
        comments.push(comment);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(comments));
      });
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    if (path === '/comments') {
      comments.pop();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(comments));
    }
  }
});

server.listen(8080);

console.log('Server running at http://localhost:8080/');