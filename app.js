/* Module Import */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const serverPort = process.env.PORT || 5000;

/* JSON Import */
const { moji } = require(__dirname + "/src/moji.json");
const reviews = require(__dirname + "/src/reviews.json");

/* Express Init & Config */
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* Express Routes */

// Home routes
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Homepage",
    data: {
      appReviews: reviews.sort((a, b) => {
        return new Date(a.review_date) - new Date(b.review_date);
      }),
    },
  });
  res.end();
});

// Review Route
app.post("/review", (req, res) => {
  const { ifName, ifRating, ifReview } = req.body;
  reviews.push({
    name: ifName,
    rating: ifRating,
    review_date: Date.now(),
    review: ifReview,
  });
  res.redirect("/");
  res.end();
});

// Hiragana Lesson
app.get("/learn/hiragana", (req, res) => {
  res.render("lessonHiragana", {
    pageTitle: "Hiragana Lesson",
    data: {
      hiragana: moji.hiragana,
    },
  });
  res.end();
});

// Katakana Lesson
app.get("/learn/katakana", (req, res) => {
  res.render("lessonKatakana", {
    pageTitle: "Katakana Lesson",
    data: {
      hiragana: moji.hiragana,
      katakana: moji.katakana,
    },
  });
  res.end();
});

// Hiragana Quiz
app.get("/quiz/hiragana", (req, res) => {
  res.render("quizHiragana", {
    pageTitle: "Hiragana Quiz",
    data: {
      hiragana: moji.hiragana,
      katakana: moji.katakana,
    },
  });
  res.end();
});

// Hiragana Quiz
app.get("/quiz/katakana", (req, res) => {
  res.render("quizKatakana", {
    pageTitle: "Katakana Quiz",
    data: {
      katakana: moji.katakana,
    },
  });
  res.end();
});

// // 404 Routes
// app.get("/error", (req, res) => {
//   res.render("error");
// });

// // Unexpected routes
// app.get("*", function (req, res) {
//   res.redirect("/error");
// });

/* Express Port Listener */
app.listen(serverPort, (err) => {
  if (err) {
    console.log(`Error in server setup. \nErrors${err}`);
  } else {
    console.info(`Server is running in: http://127.0.0.1:${serverPort}`);
  }
});
