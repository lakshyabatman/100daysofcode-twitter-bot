const Bot = require("./lib/Bot");
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

const TwitterBot = new Bot(CONFIG);

// TwitterBot.fetchTweets(USER.USERNAME, USER.USER_ID).then((data) =>
//   console.log(data)
// );

// TwitterBot.tweet("Hello, from Bot").then((data) => console.log(data));
