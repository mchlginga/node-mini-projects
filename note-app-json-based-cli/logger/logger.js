const fs = require ("fs/promises");
const path = require ("path");

const logDir = path.join (__dirname, "..", "logs");
const logFile = path.join (logDir, "logger.txt");

const ensureLogDir = async () => {
    try {
        await fs.access(logFile);
    } catch (error) {
        await fs.mkdir(logDir, {recursive: true});
        await fs.writeFile (logFile, "");
    }
}

const getTimestamp = () => {
        const now = new Date();
        const date = now.toLocaleDateString("en-US");
        const time = now.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"});
        return `${date} ${time}`;
}

const logger = async (m) => {
    try {
        await ensureLogDir();

        const timestamp = getTimestamp();
        const logMessage = `${timestamp} - ${m}\n`;

        await fs.appendFile(logFile, logMessage);
    } catch (error) {
        console.log ("Something went wrong:", error.message);
    }
}

module.exports = logger;