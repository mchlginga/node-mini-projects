const http = require ("http");
const config = require ("./config/index");

const port = config.port;

const server = http.createServer ((req, res) => {
    res.end(`Running on port ${port} in ${config.env} mode using ${config.dbName}`);
});

server.listen (port, () => {
    console.log (`Server is running at http://localhost:${port}`);
});