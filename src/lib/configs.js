const dotenv = require("dotenv").config();

const CONFIG = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
};

const USER = {
  USERNAME: process.env.USER_NAME,
  USER_ID: process.env.USER_ID,
};

const CRON_STRING = "0 */1 * * *";

const GITHUB_URL = process.env.GITHUB_URL;
const PORT = process.env.PORT;
module.exports = {
  CONFIG,
  USER,
  CRON_STRING,
  GITHUB_URL,
  PORT,
};
