import { createConnection } from 'mysql';
import express from 'express';
var app = express();

// Set up connection to database.
var connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wiki_app_db',
});

// Connect to database.
// connection.connect();

// Listen to POST requests to /users.
app.post('http://localhost:3000/article', function(req, res) {
  // Get sent data.
  var article = req.body;
  // Do a MySQL query.
  var query = connection.query(`SELECT * FROM 'article' WHERE 'subject' LIKE '%${article}%'`, function(err, result) {
    // Neat!
  });
  res.end('Success');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});