const path = require("path");
const fs = require("fs/promises");

const logger = require("./logger/logger.js");

const args = process.argv.slice(2);
const command = args[0];
const title = args[1];
const body = args[2];

const postDir = path.join(__dirname, "posts");

const ensurePostDir = async () => {
    try {
        await fs.access(postDir);
    } catch (error) {
        await fs.mkdir(postDir, {recursive: true});
    }
};

const newTitle = async (t) => {
    return t.trim().toLowerCase().replace(/\s+/g, '-');
};

const createPost = async() => {
    try {
        await ensurePostDir();

        const filename = await newTitle(title) + ".txt";
        const filepath = path.join(postDir, filename);

        await fs.writeFile(filepath, body);
        await logger(`Created post: ${filename}`);

        console.log(`New post created: ${filename}`)
    } catch (error) {
        console.log("Error creating post:", error.message);
    }
};

const readPost = async () => {
    try {
        await ensurePostDir();

        const filename = await newTitle(title) + ".txt";
        const filepath = path.join(postDir, filename);

        const content = await fs.readFile(filepath, "utf-8");
        await logger(`Read post: ${filename}`);

        console.log("=".repeat(30));
        console.log(`File: ${filename}`);
        console.log("-".repeat(30));
        console.log(content);
        console.log("-".repeat(30));
    } catch (error) {
        console.log("File cannot be found:", error.message);

    }
};

const listPost = async () => {
    try {
        await ensurePostDir();

        
    } catch (error) {
        console.log("Failed to list posts:", error.message);
    }
};

const deletePost = async () => {
    try {
        await ensurePostDir();

        const filename = await newTitle(title) + ".txt";
        const filepath = path.join(postDir, filename);

        await fs.unlink(filepath);
        await logger(`delete: ${filename}`);
        console.log(`Post successfully deleted: ${filename}`)
    } catch (error) {
        console.log("Failed deleting post:", error.message)
    }
};

switch (command) {
    case "create":
        createPost();
        break;
    case "read":
        readPost();
        break;
    case "list":
        listPost();
        break;
    case "delete":
        deletePost();
        break;
    default:
        console.log ("Invalid command!");
        break;
}