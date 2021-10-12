var express = require('express');
const path = require("path");
var router = express.Router();
const passport = require('passport');


router.use(
  express.static(path.join(__dirname, "./client/build"))
);

router.get('/login', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});

router.post('/login', (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
  
    if (err) return next(err);
  
    if (!user) { 
      return res.status(403).send();
    }
    req.logIn(user, function (err) {
      if (err) return next(err);
  
      res.status(200);
      res.redirect("/protected");  
    });
  })(req, res, next)
  
});

module.exports = router;
 
