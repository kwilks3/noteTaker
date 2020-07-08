var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var path = require("path");
var notesData = require("../../../db/db");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.json(notesData);
});

app.post("/api/notes", (req, res) => {
  notesData.push(req.body);
});
app.listen(PORT, function () {
  console.log("listening on PORT " + PORT);
});
