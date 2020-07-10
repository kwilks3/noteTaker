var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
var path = require("path");
var notesData = require("./db/db");
var Store = require("./db/store");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notesData);
});

app.post("/api/notes", (req, res) => {
  Store.saveNotes(req.body);
});

app.delete("/api/notes/:id", function (req, res) {
  // var found = Store.getNotes();
  // var test = found.find((element) => element === req.params.id);
  // Store.write(notesData);
  console.log();
});

app.listen(PORT, function () {
  console.log("listening on PORT " + PORT);
});
