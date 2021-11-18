var express = require('express');
var router = express.Router();
const rating = require('../dao/rating.js');
require('dotenv').config();

router.get('/getRatingDistribution', (req, res) => {

  if (req.query.movieid === undefined) {
    res.status(400).send();
    return;
  }

    rating.getRatingDistribution(req.query.movieid).then((result) => {
      res.json({
        distribution: result,
      })
    }).catch(function (error) {
      console.log("DB conflict");
    });
  
});



module.exports = router;
