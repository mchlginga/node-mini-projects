const http = require("http");
const path = require("path");
const fs = require("fs/promises");

const config = require("./config/index.js");
const logger = require("./logger/logger.js");

const baseFile = path.join(__dirname, "public");

const port = config.port;

const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/js",
    ".json": "application/json"
};

const server = http.createServer (async (req, res) => {
    try {
        // res.end(`Running on port: ${port} in ${config.env} mode using ${config.dbName}`);

        let filePath = path.join(baseFile, req.url === '/' ? "index.html" : req.url);
        let ext = path.extname(filePath);

        if (!ext) {
            filePath = ".html";
            ext = ".html";
        }

        const contentType = mimeTypes[ext] || "text/plain";
        const content = await fs.readFile(filePath);

        res.writeHead(200, {"Content-Type": contentType});
        logger(`Served: ${req.url} - ${contentType}`);

        res.end(content);
    } catch (error) {
        const errorPage = await fs.readFile (path.join(baseFile, "error.html"));

        res.writeHead(404, {"content-type": "text/html"});
        logger(`Error serving: ${req.url}`);

        res.end(errorPage);
    }
});

server.listen (port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});