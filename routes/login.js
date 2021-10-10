var express = require('express');
const path = require("path");
var router = express.Router();
const passport   = require('passport');


router.use(
    express.static(path.join(__dirname, "./client/build"))
  );
  
router.get('/login', (req, res) => {
    res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
  });

router.post('/login', passport.authenticate("local", {
  failureRedirect: "/login-failure",
  successRedirect: "/login-success",
}));
  
module.exports = router;

