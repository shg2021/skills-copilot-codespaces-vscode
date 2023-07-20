// create web server that can listen for incoming requests
// and can send back responses
// 
// The web server will be able to handle 2 types of requests
// GET - read a file
// POST - write to a file
// 
// GET /comments
// POST /comments
// 
// GET /comments
// read the comments.json file
// send back the contents of the comments.json file
// 
// POST /comments
// read the comments.json file
// add the new comment to the comments.json file
// send back the contents of the comments.json file
// 
// 
// 
// 
// 

var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true);
  var path = parsedUrl.pathname;
  var method = request.method;

  if (path === '/comments' && method === 'GET'){
    // read the comments.json file
    // send back the contents of the comments.json file
    fs.readFile('comments.json', function(err, data) {
      if (err) throw err;
      var comments = JSON.parse(data);
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(JSON.stringify(comments));
    });
  } else if (path === '/comments' && method === 'POST') {
    // read the comments.json file
    // add the new comment to the comments.json file
    // send back the contents of the comments.json file
    var comment = '';
    request.on('data', function(chunk){
      comment += chunk.toString();
    });
    request.on('end', function(){
      fs.readFile('comments.json', function(err, data){
        if (err) throw err;
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments), function(err){
          if (err) throw err;
          response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          response.end(JSON.stringify(comments));
        });
      });
    });
  }
});

server.listen(port, function(){
  console.log('Listening on port ' + port);
});