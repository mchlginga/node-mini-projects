# To-Do App (CLI-BASED)

CLI based to-do app using fs + path + process.argv. The app will let you:

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

## Commands:

- node (file) add "title"
- node (file) complete "title"
- node (file) list
- node (file) remove "title"