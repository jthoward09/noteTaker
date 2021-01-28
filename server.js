// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Data from database file
let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// Routes
// =============================================================

// Basic route to grab the correct files
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Grab all the notes from the db.json file
app.get("/api/notes", function(req, res) {
  res.json(savedNotes);
});

app.post("/api/notes", function(req, res) {
  // Grab the new note from the form
  const newNote = req.body;

  // Push this note to the file
  savedNotes.push(newNote);

  // Take the data and stringify
  let saveData = JSON.stringify(savedNotes);

  // Write new data to file.
  fs.writeFileSync('./db/db.json', saveData)

  res.json(true);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
