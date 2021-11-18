var express = require('express');
var router = express.Router();
const favorite = require('../dao/favorites.js');
require('dotenv').config();


router.post('/removeFavorite', (req, res) => {
  if (req.isAuthenticated()) {
    favorite.removeFavorite(req.user.id, req.body.movieid).then(() => {
      res.status(200).send();
    })
  } else {
    res.status(401).send();
  }
});

module.exports = router;
