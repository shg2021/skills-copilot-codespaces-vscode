// create web server with express
const express = require('express');
const app = express();
// get the comments in the comments.json file
const comments = require('./comments.json');
// set port to 3000
const port = 3000;

// serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// set up route to get comments
app.get('/comments', (req, res) => {
  // send back all of the comments
  res.send(comments);
});

// listen for requests on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});