const path = require("path");
const fs = require("fs/promises");

const logger = require("./logger/logger.js");

const todoDir = path.join(__dirname, "todos");
const todoFile = path.join(todoDir, "todos.json");

const args = process.argv.slice(2);
const command = args[0];
const title = args[1];

const ensureTodoFile = async () => {
    try {
        await fs.access(todoFile);
    } catch (error) {
        await fs.mkdir(todoDir, {recursive: true});
        await fs.writeFile(todoFile, "[]");
    }
};

const parseTodoFile = async (todoF) => {
    try {
        return todoF = JSON.parse(await fs.readFile(todoFile, "utf-8"));
    } catch (error) {
        console.log("Error parsing JSON file:", error.message);
    }
};

const newTitle = (t) => {
    try {
        return t.trim().toLowerCase().replace(/\s+/g, '-');
    } catch (error) {
        console.log("Error creating new title:", error.message);
    }
    
};

const addTodo = async (todoF) => {
    try {
        await ensureTodoFile();

        const todos = await parseTodoFile(todoF);
        const isDuplicate = todos.find(todo => newTitle(todo.title) === newTitle(title));
        if (isDuplicate) {
            console.log(`${title} is already exist.`);
            return;
        }

        const newTodo = {
            id: Date.now(),
            title,
            completed: false
        };

        todos.push(newTodo);
        await fs.writeFile(todoFile, JSON.stringify(todos, null, 2));
        await logger(`Added: ${title}`);

        console.log(`Todo Added: ${title}`);
    } catch (error) {
        console.log("Error adding todo:", error.message);
    }
};

const completedTodo = async (todoF) => {
    try {
        await ensureTodoFile();
        
        const todos = await parseTodoFile(todoF);
        const todoExist = todos.findIndex(todo => newTitle(todo.title) === newTitle(title));
        if (todoExist === -1) {
            console.log(`${title} is not found`);
            return;
        }
        
        todos[todoExist].completed = true;

        await fs.writeFile(todoFile, JSON.stringify(todos, null, 2));
        await logger(`Completed: ${title}`);

        console.log(`${title} is marked as completed.`);
        
    } catch (error) {
        console.log("Error completing todo:", error.message);
    }
};

const listTodo = async (todoF) => {
    try {
        await ensureTodoFile();

        const todos = await parseTodoFile(todoF);
        let count = 1;

        console.log('='.repeat(30));
        console.log(`You have ${todos.length} To-Do`);
        console.log('-'.repeat(30));
        for (let todo of todos) {
            const status = todo.completed ? "true" : "false";
            console.log(`${count}. ${todo.title} - ${status}`);

            count++;
        };
        console.log('='.repeat(30));
        await logger(`List: tasks`);

    } catch (error) {
        console.log("Error listing todos", error.message);
    }
};

const deleteTodo = async (todoF) => {
    try {
        await ensureTodoFile();

        const todos = await parseTodoFile(todoF);
        const filter = todos.filter(todo => newTitle(todo.title) !== newTitle(title));
        if (filter.length === todos.length) {
            console.log(`${title} is not exist.`);
            return;
        }

        await fs.writeFile(todoFile, JSON.stringify(filter, null, 2));
        await logger(`Deleted: ${title}`);

        console.log(`${title} is successfully deleted.`);
    } catch (error) {
        console.log("Error deleting todo:", error.message);
    }
};

switch (command) {
    case "add":
        addTodo();
        break;
    case "completed":
        completedTodo();
        break;
    case "list":
        listTodo();
        break;
    case "delete":
        deleteTodo();
        break;
    default:
        console.log("Invalid command!");
        break;
}