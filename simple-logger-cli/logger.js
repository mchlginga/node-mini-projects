const path = require ("path");
const fs = require ("fs/promises");

const args = process.argv.slice(2);
const action = args.join(' ');

const logDir = path.join (__dirname, "logs");
const logFile = path.join (logDir, "logs.txt");

const ensureLogFile = async () => {
    try {
        await fs.access (logFile);
    } catch (error) {
        await fs.mkdir (logDir, {recursive: true});
        await fs.writeFile (logFile, '');
    }
}

const getTimestamp = () => {
    try {
        const now = new Date();
        const date = now.toLocaleDateString("en-US");
        const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        return `${date} ${time}`;
    } catch (error) {
        console.log ("Something went wrong:", error.message);
    }
}

const writeLog = async () => {
    try {
        await ensureLogFile();

        const timestamp = getTimestamp();
        const logMessage = `${timestamp} - ${action}\n`;

        await fs.appendFile (logFile, logMessage);

        console.log("Log saved:", logMessage.trim());
    } catch (error) {
        console.log("Something went wrong:", error.message);
    }
}

writeLog();