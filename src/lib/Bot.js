const Twit = require("twit");

class Bot {
  constructor(config) {
    this.T = new Twit(config);
  }
}

Bot.prototype.fetchTweets = function (screen_name, user_id, count = 10) {
  return this.T.get("statuses/user_timeline", {
    screen_name,
    user_id,
    exclude_replies: true,
    tweet_mode: "extended",
    count,
  });
};

Bot.prototype.tweet = async function (status) {
  return this.T.post("statuses/update", { status });
};

module.exports = Bot;
