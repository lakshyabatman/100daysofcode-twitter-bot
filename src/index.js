const cron = require("node-cron");
const main = require("./lib/tweetWatcher");
const dotenv = require("dotenv").config();
const Express = require("express");
const path = require("path");

const {
  CONFIG,
  USER,
  CRON_STRING,
  GITHUB_URL,
  PORT,
} = require("./lib/configs");

const app = Express();

/**
 * Cron Schedule
 */
cron.schedule(
  CRON_STRING,
  () => {
    try {
      console.info("Running Cron Job", { date: new Date().toDateString() });

      main(CONFIG, USER);
      console.info("Cron Job Done", { date: new Date().toDateString() });
    } catch (err) {
      console.error("Cron Job failed", {
        err,
        date: new Date().toDateString(),
      });
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);

main(CONFIG, USER);
app.use(Express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("index.html");
});

app.listen(PORT, () => {
  console.log("Server up and ruuning!");
});
