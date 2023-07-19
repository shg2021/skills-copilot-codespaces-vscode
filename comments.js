// create web server
const express = require('express');
const app = express();

// parse request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from public directory
app.use(express.static('public'));

// database
const db = require('./db');

// routes
app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

// get all comments
app.get('/api/comments', (req, res) => {
  db.getAllComments()
    .then((comments) => {
      res.send(comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Database error');
    });
});

// add a comment
app.post('/api/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    res.status(400).send('Missing name or comment');
  } else {
    db.addComment(name, comment)
      .then(() => {
        res.status(201).send('Comment added');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Database error');
      });
  }
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});