const path = require ("path");
const fs = require ("fs/promises");

const args = process.argv.slice(2);
const command = args[0];
const title = args[1];
const body = args[2];

const noteDir = path.join (__dirname, "notes");
const noteFile = path.join (noteDir, "notes.json");

// ensure "notes" folder and "notes.json" existed
const ensureNoteDir = async () => {
    try {
        await fs.access(noteFile);
    } catch (error) {
        await fs.mkdir(noteDir, {recursive: true});
        await fs.writeFile (noteFile, "[]");
    }
}

const newTitle = (t) => {
    t.trim().toLowerCase();
}

const addNote = async () => {
    try {
        await ensureNoteDir();
        // get data,
        const notes = JSON.parse(await fs.readFile (noteFile, "utf-8"));

        // then read and check,
        const duplicate = notes.find(note => newTitle(note.title) === newTitle(title));
        if (duplicate) {
            console.log("Note already exist!");
            return;     
        }

        // then add,
        const newNote = {
            id: Date.now(),
            title,
            body
        }

        // then push
        notes.push(newNote);
        await fs.writeFile (noteFile, JSON.stringify(notes, null, 2));

        // and print
        console.log("Note " + title + " added!");
    } catch (error) {
        console.log("Error creating note:", error.message);
    }
}

const readNote = async () => {
    try {
        await ensureNoteDir();
        // get the data,
        const notes = JSON.parse (await fs.readFile (noteFile, "utf-8"));

        // read and check,
        const found = notes.find (note => newTitle(note.title) === newTitle(title));
        if (!found) {
            console.log("Note not found.");
            return;
        }

        // print data
        console.log ("=".repeat(30));
        console.log ("Title: " + found.title);
        console.log ("Body: " + found.body);
        console.log ("=".repeat(30));

    } catch (error) {
        console.log("Error reading note:", error.message);
    }
}

const listNote = async () => {
    try {
        await ensureNoteDir();
        // get data,
        const notes = JSON.parse (await fs.readFile (noteFile, "utf-8"));

        // print data
        console.log ("=".repeat(30));
        console.log ("You have " + notes.length + " notes.");
        console.log ("-".repeat(30));
        
        let count = 1;

        for (const note of notes) {
            console.log (count + ". " + note.title)
            count++
        }
        console.log ("=".repeat(30));
    } catch (error) {
        console.log("Error listing notes:", error.message);
    }
}

const deleteNote = async () => {
    try {
        await ensureNoteDir ();
        // get data,
        const notes = JSON.parse(await fs.readFile (noteFile, "utf-8"));

        // read and check data,
        const filtered = notes.filter(note => newTitle(note.title) !== newTitle(title));
        if (filtered.length === notes.length) {
            console.log ("No note found to delete.");
            return;
        } 

        // replace data using filtered data,
        await fs.writeFile (noteFile, JSON.stringify(filtered, null, 2));

        // print result
        console.log ("Deleted " + title + "successfully.");
    } catch (error) {
        console.log("Error deleting note:", error.message);
    }
}

switch (command) {
    case "add":
        addNote();
        break;
    case "read":
        readNote();
        break;
    case "list":
        listNote();
        break;
    case "delete":
        deleteNote();
        break;
    default:
        console.log("Invalid command!");
        break;
}