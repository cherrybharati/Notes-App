const util = require("util");
const fs = require("fs");

const { v1: uuidv1 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(db) {
        return writeFileAsync("db/db.json", JSON.stringify(db));
    }

    getNotes() {
        return this.read().then((notes) => {
            
            let parsedNotes;

            parsedNotes = JSON.parse(notes);
           

            if (!Array.isArray(parsedNotes)) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }

    addNote(note) {
       
        if (!note.title || !note.text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }

       
        note.id = uuidv1();

      
        return this.getNotes().then(notes => {
            notes.push(note)

            this.write(notes)

            return (note);
        })
    }

    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filterNotes => this.write(filterNotes));
    }
}

module.exports = new Store();