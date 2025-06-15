// module
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
        const jsonContent = await fs.readFile ("user.json", "utf-8");

        res.writeHead (200, {"Content-Type": "application/json"});
        res.end (jsonContent);
    }
    else {
        const errorFound = await fs.readFile ("error.html", "utf-8");

        res.writeHead (404, {"Content-Type": "text/html"});
        res.end (errorFound);
    }
});

server.listen (3000, () => {
    console.log ("Server is running at http://localhost:3000");
});