# CRUD JSON API using Pure HTTP

- Building a simple API using pure Node.js http module, fs, path - no express.

Goal:

- GET       /notes > get all notes
- POST      /notes > add a new note
- PUT       /notes/:id > update note by id
- DELETE    /notes/:id > delete note by id

Use cases:

- Practicing REST principles
- Handling routes manually
- Preparing for middleware and route handling for Express

Concepts you'll apply:

- req.method, req.url req.on ('data')
- fs.readFile / writeFile
- status codes
- JSON.parse / JSON.stringify

---

## Code Flow

1. Create notes.json (empty)
2. Start http server
3. Inside server:
    - Parse URL
    - Match method + path
    - For POST/PUT, collect body via data event
    - Do logic: read/write to notes.json
    - Return JSON response