var express = require('express');
var router = express.Router();
const favorite = require('../dao/favorites.js');
const axios = require('axios');
const { response } = require('express');
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
          //console.log(" data: ",response[i].data)
          fav.push({
            id: response[i].data.id,
            poster: response[i].data.poster_path
          });
        }
        console.log(fav)

        res.json({
          favorite: fav
        });
      });

    })

  } else {
    res.status(401).send();
  }
});

module.exports = router;
