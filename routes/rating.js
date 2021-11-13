var express = require('express');
var router = express.Router();
const rating = require('../dao/rating.js');
require('dotenv').config();

router.get('/rating', (req, res) => {

  if (req.query.movieid === undefined) {
    res.status(400).send();
    return;
  }
    rating.getRatingByMovie(req.query.movieid).then((result) => {
      
      let rating = Object.values(result)[0];
      if (rating === null) rating = 0;
      res.json({
        rating: Math.round(rating),
      })
    }).catch(function (error) {
      console.log("DB conflict");
    });
  
});

router.post('/rating', (req, res) => {

  if (req.body.movieid === undefined) res.status(400).send();
  if (req.body.rating === undefined) res.status(400).send();

  if (req.isAuthenticated()) {
    rating.addRating(req.body.movieid, req.user.id, req.body.rating).then(() => {
      res.status(200).send();
    })
  } else {
    res.status(401).send();
  }
});

module.exports = router;
