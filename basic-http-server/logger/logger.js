const path = require ("path");
const fs = require ("fs/promises");

const loggerDir = path.join (__dirname, "..", "logs");
const loggerFile = path.join (loggerDir, "log.txt");

const ensureLoggerFile = async () => {
    try {
        await fs.access (loggerFile);
    } catch (error) {
        await fs.mkdir (loggerDir, {recursive: true});
        await fs.writeFile (loggerFile, "");
    }
}

const getTimestamp = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US");
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit"});
    
    return `${date} ${time}`;
}

const logger = async (m) => {
    try {
        await ensureLoggerFile();

        const timestamp = getTimestamp();
        const logMessage = `${timestamp} - ${m}\n`;

        await fs.appendFile(loggerFile, logMessage);
    } catch (error) {
        console.log ("Something went wrong:", error.message);
    }
}

module.exports = logger;