// module
const fs = require ("fs/promises");
const path = require ("path");

// variables
const args = process.argv.slice(2);
const command = args[0];
const title = args[1];
const content = args[2];
const postsDir = path.join (__dirname, "posts");

// make sure there is a folder name "posts", create if it don't have it
const ensurePathDir = async () => {
    try {
        await fs.access(postsDir);
    } catch (error) {
        await fs.mkdir(postsDir);
    }
};

// condition if no comman input
if (!command) {
    console.log("No command provided.");
    process.exit(1);
}

const createPost = async () => {
    try {
        await ensurePathDir();

        const filename = title.toLowerCase().replace(/\s+/g, '-') + ".txt";
        const filepath = path.join (postsDir, filename);

        await fs.writeFile (filepath, content);
        console.log("File " + filename + " created.");
        
    } catch (error) {
        console.log("Something went wrong:", error.message);
    }
}

const readPost = async () => {
    try {
        const filename = title.toLowerCase().replace(/\s+/g, '-') + ".txt";
        const filepath = path.join(postsDir, filename);

        const data = await fs.readFile(filepath, "utf-8");
        console.log("Reading post....");
        console.log("=".repeat(30));
        console.log(data);
        console.log("=".repeat(30));
    } catch (error) {
        console.log("Something went wrong:", error.message);
        
    }
}

const deletePost = async () => {
    try {
        const filename = title.toLowerCase().replace(/\s+/g, '-') + ".txt";
        const filepath = path.join (postsDir, filename);

        await fs.unlink(filepath);
        console.log(filename + "has been deleted.");
    } catch (error) {
        console.log("File does not delete:", error.message);
        
    }
}

switch (command) {
    case "create":
        createPost();
        break;
    case "read":
        readPost();
        break;
    case "delete":
        deletePost();
        break;
    default:
        console.log("Invalid input");
        break;
}

