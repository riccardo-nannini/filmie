var express = require('express');
var router = express.Router();
const watchlist = require('../dao/watchlist.js');
require('dotenv').config();


router.post('/removeWatchlist', (req, res) => {
  if (req.isAuthenticated()) {
    watchlist.removeWatchlist(req.user.id, req.body.movieid).then(() => {
      res.status(200).send();
    })
  } else {
    res.status(401).send();
  }
});

module.exports = router;
