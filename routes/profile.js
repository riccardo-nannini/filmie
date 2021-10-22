var express = require('express');
const path = require("path");
var router = express.Router();

router.use(
  express.static(path.join(__dirname, "./client/build"))
);

// create a GET route
router.get('/profile', (req, res) => {

  if (req.isAuthenticated()) {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html"));
  } else {
    res.redirect("/login");
  }
});

module.exports = router;