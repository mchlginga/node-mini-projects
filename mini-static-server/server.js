const http = require ("http");
const path = require ("path");
const fs = require ("fs/promises");

const logger = require ("./logger/logger.js");

const port = 3000;
const basicDir = path.join (__dirname, "public");

const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
};

const server = http.createServer (async (req, res) => {
    try {
        let filePath = path.join (basicDir, req.url === '/' ? "index.html" : req.url);
        let ext = path.extname(filePath);

        if (!ext) {
            filePath += ".html";
            ext = ".html";
        }

        const contentType = mimeType[ext] || "text/plain";
        const content = await fs.readFile (filePath);
        await logger(`Served: ${req.url} (${contentType})`);

        res.writeHead (200, {"Content-Type": contentType});
        res.end(content);

    } catch (error) {
        try {
            const errorPage = await fs.readFile(path.join (basicDir, "error.html"));
            await logger(`Error serving ${req.url}: ${error.message}`);
            res.writeHead (404, {"Content-Type": "text/html"});
            res.end(errorPage);
        } catch (error) {
            res.end("Something went wrong:", error.message);
        }
    }
});

server.listen (port, () => {
    console.log (`Server is running at http://localhost:${port}`);
});