var express = require('express');
var router = express.Router();
const path = require("path");
const session = require("express-session");
const passport = require('passport');


router.use(
  express.static(path.join(__dirname, "./client/build"))
);

// create a GET route
router.get('/protected', (req, res) => {

  if (req.isAuthenticated()) {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html"));
  } else {
    res.send("<h1>You are not authenticated</h1>");
  }
});

module.exports = router;
