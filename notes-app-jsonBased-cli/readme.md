# Notes App (JSON-Based CLI)

This is CLI based app that manage notes.json file inside the folder (e.g., notes/notes.json). Here, you can store all the notes that has structure:

json file
---

[
    {
        "id": 123456,
        "title": "Grocery",
        "body": "Buy sponge and pringles"
    }
]

## Flow of the App

Folder:         notes
File:           notes.json
Entry Point:    notes.js

### Command Line Usage:

- node notes.js add "title" "content"
- node notes.js list
- node notes.js read "title"
- node notes.js delete "title"

