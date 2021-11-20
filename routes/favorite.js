var express = require('express');
var router = express.Router();
const favorite = require('../dao/favorites.js');
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY


router.get('/favorite', (req, res) => {

  if (req.isAuthenticated()) {
    favorite.getFavorite(req.user.id).then((result) => {
      let calls = []
      for (i in result) {
        let url = "https://api.themoviedb.org/3/movie/" + result[i].movieid + "?api_key=" + ApiKey + "&language=en-US"
        calls.push(axios.get(url))
      }

      let fav = []
      Promise.all(calls).then((response) => {
        for (i in response) {
          fav.push({
            id: response[i].data.id,
            poster: response[i].data.poster_path
          });
        }

        res.json({
          favorite: fav
        });
      });

    })

  } else {
    res.status(401).send();
  }
});

router.post('/favorite', (req, res) => {
  if (req.isAuthenticated()) {
    if (req.body.movieid === undefined) {
      res.status(401).send();
      return;
    }    
    favorite.addFavorite(req.user.id, req.body.movieid).then(() => {
      res.status(200).send();
    })
  } else {
    res.status(401).send();
  }
});

module.exports = router;
