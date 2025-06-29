require("dotenv").config();

const env = process.env.ENV || "development";

const config = env === "production"
? require("./prod") 
: require("./dev");

module.exports = config;