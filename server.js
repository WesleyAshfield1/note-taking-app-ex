const express = require('express')
const path = require('path');
const fs = require('fs')
const app = express()

const PORT = process.env.PORT || 5001

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'))
app.use(express.static('db'))
app.use(express.json())

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));
  newNote.id = notes.length + 1;
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
  res.json(newNote);
});



app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});