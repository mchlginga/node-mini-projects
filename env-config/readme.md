# Environment Aware Config Loader

- Dynamic configuration based on where your app runs (e.g, dev vs production).

- Instead of hardcoding things like port, DB, name, or API keys, you use:

1. process.env (environment variables)
2. or a config.json/config.js file that switches values per environment.

---

## Code Flow

1. App reads from environment variables or a config file
2. If no variable is defined, fallback to default values
3. Expose config via a module (require/import)
4. Any part of app can use config.port, config.dbName, etc