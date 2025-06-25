const http = require ("http");
const config = require ("./config/config.js");

const server = http.createServer ( (req, res) => {
    res.end (`Running on port ${config.port} in ${config.env} mode using ${config.dbName}`);
});

server.listen (config.port, () => {
    console.log (`Server is running at http://localhost:${config.port}`);
});