const path = require("path");
const fs = require("fs/promises");

const logDir = path.join(__dirname, "..", "logs");
const logFile = path.join(logDir, "logs.txt");

const ensureLogFile = async () => {
    try {
        await fs.access(logFile);
    } catch (error) {
        await fs.mkdir(logDir, {recursive: true});
        await fs.writeFile(logFile, "");
    }
};

const getTimestamp = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US");
    const time = now.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"});

    return `${date} ${time}`;
};

const logger = async (message) => {
    try {
        await ensureLogFile();

        const timestamp = getTimestamp();
        const logMessage = `${timestamp} - ${message}\n`;

        await fs.appendFile(logFile, logMessage);
    } catch (error) {
        console.log("Something went wrong:", error.message);
    }
};

module.exports = logger;