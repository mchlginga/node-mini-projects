# Simple Logger Tool (CLI Logger)

- Every time you run a command, it will log:

1. Data/Time
2. What command was executed

Example Output in logs.txt:

2025-060-23 7:13PM - Added Task: Write Code
2025-060-23 2:13AM - Deleted Task: Draw Code

---

CLI tool acts like a utility logger.

- Create a logger.js script
- Accept a message or action via command line
- Append the message to a logs.txt
- Automatically attach timespamp on each entry

---

Will use:

1. fs.appendFile
2. Data object for timestamp
3. path for clean file handling

---

## Code Flow

1. Use process.argv to get the command/action
2. Build a log message: timestamp + action
3. Use fs.appendFile() to add it to logs.txt
4. Create the logs/folder if it doesn't exist
5. Append log entry, each on a new line

