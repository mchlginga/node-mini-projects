# To-Do App (CLI-BASED)

- CLI based to-do app using fs + path + process.argv. The app will let you:

1. Add tasks with a title and default "completed": false.
2. Mark a task as completed (based on title).
3. List all tasks with their status.
4. Remove a tasks by title.

Storage Format: JSON file inside a folder named todos

Each todo will look like:

{
    "id": 1231,
    "title": "Wash Dishes",
    "compelete": false
}

---

## Flow of the Code

1. Parse CLI args
2. Prepare JSON file and ensure directory exists
3. Load exisitng tasks
4. Switch by command:
    - if add > check for duplicates > push new task > save
    - if complete > find by title > update completed: true > save
    - if list > loop and print status
    - if remove > filter out > save
5. Save updated data

---

## Command Line Usage:

- node (file) add "title"
- node (file) complete "title"
- node (file) list
- node (file) remove "title"