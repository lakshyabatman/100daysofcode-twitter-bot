const Bot = require("./Bot");

const main = (CONFIG, USER) => {
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
        } OG forgot to tweet today because he's def coding! So here I'm his bot to tweet from his side.\nI exist cause of his hardwork! Feel free to check my source code  to know more about me!\n#100DaysOfCode`;

        TwitterBot.tweet(tweetTemplate)
          .then((data) =>
            console.info("Tweet is added", { date: new Date().toDateString() })
          )
          .catch((err) =>
            console.error("Failed to send tweet", {
              error: err,
              date: new Date().toDateString(),
            })
          );
      }
    }
  });
};

module.exports = main;
