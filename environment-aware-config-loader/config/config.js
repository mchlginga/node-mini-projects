require ("dotenv").config();

const config = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || "development",
    dbName: process.env.DB_NAME || "default_db",
};

module.exports = config;