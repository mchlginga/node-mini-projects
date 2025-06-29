const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const config = require("./config/index.js");
const logger = require("./logger/logger.js");

const port = config.port;
const publicDir = path.join(__dirname, "public");
const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json"
};

const server = http.createServer(async (req, res) => {
    try {
        let filePath = path.join(publicDir, (req.url === '/' ? "index.html" : req.url));
        let ext = path.extname(filePath);
        if (!ext) {
            filePath += ".html";
            ext = ".html";
        }

        const contentType = mimeTypes[ext] || "text/plain";
        const content = await fs.readFile(filePath, "utf-8");

        res.writeHead(200, {"Content-Type": contentType});
        await logger(`Served: ${req.url} - ${contentType}`);
        res.end(content);
    } catch (error) {
        try {
            const errorPage = await fs.readFile(path.join(publicDir, "error.html"));
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end(errorPage);
        } catch (error) {
            res.end("Failed to access error page:", error.message);
        }
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});