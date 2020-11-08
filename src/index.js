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

TwitterBot.fetchTweets(USER.USERNAME, USER.USER_ID).then((data) => {
  if (data.hasOwnProperty("data")) {
    let lastCodeRelatedTweet;
    [...data.data].every((tweet) => {
      if (tweet.full_text.split("\n").indexOf("#100DaysOfCode") != -1) {
        lastCodeRelatedTweet = tweet;
        return false;
      }
      return true;
    });

    let uploadedDate = new Date(lastCodeRelatedTweet.created_at);
    let timePassed = Math.ceil(
      (new Date() - uploadedDate) / (1000 * 60 * 60 * 24)
    );

    let lastCodeDay = lastCodeRelatedTweet.full_text.split(" ")[0];
    lastCodeDay = parseInt(lastCodeDay[lastCodeDay.length - 1]);

    if (timePassed > 1) {
      let tweetTemplate = `#day${
        lastCodeDay + 1
      } OG forgot to tweet because he's def coding! So here I'm his bot to tweet for him.\nI exist cause his hardwork! Feel free to check my source code  to know more about me!\n#100daysofcode `;

      TwitterBot.tweet(tweetTemplate)
        .then((data) => console.log("Success"))
        .catch((err) => console.log(err));
    }
  }
});
