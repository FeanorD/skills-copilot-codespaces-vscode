// Create web server

const express = require('express');
const app = express();
const port = 3000;

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// create connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comments'
});

// connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// get all comments
app.get('/comments', (req, res) => {
  connection.query('SELECT * FROM comments', (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

// get a comment by id
app.get('/comments/:id', (req, res) => {
  connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
});

// create a comment
app.post('/comments', (req, res) => {
  connection.query('INSERT INTO comments SET ?', req.body, (err, rows, fields) => {
    if (err) throw err;
    res.send('Comment added.');
  });
});

// update a comment
app.put('/comments/:id', (req, res) => {
  connection.query('UPDATE comments SET comment = ? WHERE id = ?', [req.body.comment, req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.send('Comment updated.');
  });
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
  connection.query('DELETE FROM comments WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    res.send('Comment deleted.');
  });
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});