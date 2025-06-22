const path = require ("path");
const fs = require ("fs/promises");

const args = process.argv.slice(2);
const command = args[0];
const title = args [1];

const todoDir = path.join (__dirname, "todos");
const todoFile = path.join (todoDir, "todo.json");

const ensureTodoDir = async () => {
    try {
        await fs.access (todoFile);
    } catch (error) {
        await fs.mkdir (todoDir, {recursive: true});
        await fs.writeFile (todoFile, "[]");
    }
}

const newTitle = (t) => {
    t.trim().toLowerCase();
}

const addTask = async () => {
    try {
        await ensureTodoDir();
        // get data,
        const todos = JSON.parse(await fs.readFile (todoFile, "utf-8"));

        // read and check,
        const exist = todos.find(todo => newTitle(todo.title) === newTitle(title));
        if (exist) {
            console.lo
        }

        // add,
        const newTask = {
            id: Date.now(),
            title,
            complete: false
        }

        todos.push(newTask);

        await fs.writeFile(todoFile, JSON.stringify(todos, null, 2));
        console.log("Task: " + title + " added!");
    } catch (error) {
        console.log("Error creating To-Do:", error.message);
    }
    
}

const isCompeleted = async () => {
    try {
        await ensureTodoDir();
        // get data,
        const todos = JSON.parse(await fs.readFile(todoFile, "utf-8"));

        // check,
        const tasks = todos.find(todo => newTitle(todo.title) === newTitle(title));
        if (!tasks) return console.log ("Task not found.");

        tasks.completed = true;

        await fs.writeFile (todoFile, JSON.stringify(todos, null, 2));

        console.log ("Marked as compeleted!");
    } catch (error) {
        console.log("Error completing task.", error.message);
    }
}

switch (command) {
    case "add":
        addTask();
        break;
    case "completed":
        isCompeleted();
        break;
    default:
        console.log ("Invalid command!");
        break;
}