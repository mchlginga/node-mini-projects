const path = require("path");
const fs = require("fs/promises");

const logger = require("./logger/logger.js");

const noteDir = path.join(__dirname, "notes");
const noteFile = path.join(noteDir, "notes.json");

const args = process.argv.slice(2);
const command = args[0];
const title = args[1];
const body = args[2];


const ensureNoteFile = async () => {
    try {
        await fs.access(noteFile);
    } catch (error) {
        await fs.mkdir(noteDir, {recursive: true});
        await fs.writeFile(noteFile, "[]");
    }
};

const newTitle = (t) => {
    try {
        return t.trim().toLowerCase().replace(/\s+/g, '-');
    } catch (error) {
        return `Error creating new title: ${error.message}`;
    }
};

const parseNotes = async (n) => {
    try {
        await ensureNoteFile();

        return n = JSON.parse(await fs.readFile(noteFile, "utf-8"));
    } catch (error) {
        console.log("Error parsing notes:", error.message);
    }
};

const createNote = async (n) => {
    try {
        await ensureNoteFile();

        const notes = await parseNotes(n);
        const duplicate = notes.find(note => newTitle(note.title) === newTitle(title));

        if (duplicate) {
            console.log(`${title} is already exist!`);
            return;
        }

        const obj = {
            id: Date.now(),
            title,
            body
        };

        notes.push(obj);
        await fs.writeFile(noteFile, JSON.stringify(notes, null, 2));
        await logger(`Add: ${title}`);

        console.log(`Added note: ${title}`);

    } catch (error) {
        console.log("Error creating notes:", error.message);
    }
};

const readNote = async (n) => {
    try {
        await ensureNoteFile();

        const notes = await parseNotes(n);
        const noteMatch = notes.find(note => newTitle(note.title) === newTitle(title));

        if (!noteMatch) {
            console.log(`Note not found.`);
            return;
        }

        const content = noteMatch.body;
        await logger(`Read: ${title}`);

        console.log('='.repeat(30));
        console.log(`Title: ${title}`);
        console.log('-'.repeat(30));
        console.log(content);
        console.log('='.repeat(30));

    } catch (error) {
        console.log("Error reading note:", error.message);
    }
};

const updateNote = async (n) => {
    try {
        await ensureNoteFile();

        const notes = await parseNotes(n);
        const noteIndex = notes.findIndex(note => newTitle(note.title) === newTitle(title));

        if (!noteIndex) {
            console.log("Note not found.");
            return;
        }

        notes[noteIndex] = {
            id: notes[noteIndex].id,
            title: notes[noteIndex].title,
            body
        };

        await fs.writeFile(noteFile, JSON.stringify(notes, null, 2));
        await logger(`Update: ${title}`);

        console.log(`${title} is successfully updated.`);
        

    } catch (error) {
        console.log("Error updating note:", error.message);
    }
};

const deleteNote = async (n) => {
    try {
        await ensureNoteFile();

        const notes = await parseNotes(n);
        const filter = notes.filter(note => newTitle(note.title) !== newTitle(title));

        if (notes.length === filter.length) {
            console.log("Note not found.");
            return;
        }

        await fs.writeFile(noteFile, JSON.stringify(filter, null, 2));
        await logger(`Delete: ${title}`);

        console.log(`${title} is successfully deleted.`);

    } catch (error) {
        console.log("Error deleting note:", error.message);
    }
};

const listNote = async (n) => {
    try {
        await ensureNoteFile();

        const notes = await parseNotes(n);
        let count = 1;

        console.log("=".repeat(30));
        console.log(`You have ${notes.length} notes.`);
        console.log("-".repeat(30));
        for (let note of notes) {
            console.log(`${count}. ${note.title}`);
            count++;
        }
        console.log("=".repeat(30));
        await logger(`List notes`);
    } catch (error) {
        console.log("Error listing notes:", error.message);
    }
};

switch (command) {
    case "create":
        createNote();
        break;
    case "read":
        readNote();
        break;
    case "update":
        updateNote();
        break;
    case "delete":
        deleteNote();
        break;
    case "list":
        listNote();
        break;
    default:
        console.log("Invalid command!");
        break;
}