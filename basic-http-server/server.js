const http = require ("http");
const fs = require ("fs/promises");
const path = require ("path");

const logger = require ("./logger/logger.js");

const baseDir = path.join (__dirname, "public");
const port = 3000;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
};

const server = http.createServer (async (req, res) => {
    try {
        let filePath = path.join (baseDir, req.url === '/' ? "index.html" : req.url); // user.json
        let ext = path.extname(filePath); // .json

        if (!ext) {
            filePath += ".html";
            ext = ".html";
        }

        const contentType = mimeTypes[ext] || "text/plain"; // ".json": "application/json"
        const content = await fs.readFile (filePath); // user.json

        res.writeHead (202, {"Content-Type": contentType}); // "application/json"
        res.end (content); // user.json
        await logger (`Served: ${req.url} - ${contentType}`);
    } catch (error) {
        try {
            const errorPage = await fs.readFile (path.join (baseDir, "error.html"));
            res.writeHead (404, {"Content-Type": "text/html"})
            res.end (errorPage);
            await logger (`Error serving: ${req.url} - ${contentType}`);
        } catch (error) {
            console.log ("Something went wrong:", error.message);
        }
    }
});

server.listen (port, () => {
    console.log (`Server is running at http://localhost:${port}`);
});


/* // module
const http = require ("http");
const fs = require ("fs/promises");

// create server
const server = http.createServer (async (req, res) => {
    const pathUrl = req.url;

    if (pathUrl === "/") {
        
        try {
            const htmlContent = await fs.readFile ("index.html", "utf-8");

            res.writeHead (200, {"Content-Type": "text/html"});
            res.end (htmlContent);
        } catch (error) {   
            res.end ("Something went wrong:", error.message);
        }
    }
    else if (pathUrl === "/about") {

        try {
            const jsonContent = await fs.readFile ("user.json", "utf-8");

            res.writeHead (200, {"Content-Type": "application/json"});
            res.end (jsonContent);
        } catch (error) {
            res.end ("Something went wrong:", error.message);
        }
    }
    else {
        const errorFound = await fs.readFile ("error.html", "utf-8");

        res.writeHead (404, {"Content-Type": "text/html"});
        res.end (errorFound);
    }
});

server.listen (3000, () => {
    console.log ("Server is running at http://localhost:3000");
}); */