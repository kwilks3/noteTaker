const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {}

Store.prototype.read = function () {
  return readFileAsync("./db/db.json", (err, data) => {
    if (err) throw err;
  });
};
Store.prototype.write = function (note) {
  return writeFileAsync("./db/db.json", JSON.stringify(note));
};
Store.prototype.getNotes = function () {
  return this.read().then((notes) => {
    return JSON.parse(notes) || [];
  });
};

Store.prototype.saveNotes = function (note) {
  const { title, text } = note;
  if (!title || !text) {
    throw new Error("No Notes!");
  }
  const newNote = {
    title,
    text,
    id: Math.round(Math.random() * 1000000),
  };
  return this.getNotes()
    .then((notes) => [...notes, newNote])
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote);
};

Store.prototype;

module.exports = new Store();
