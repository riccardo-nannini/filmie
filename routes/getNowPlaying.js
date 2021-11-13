var express = require('express');
var router = express.Router();
const favorite = require('../dao/favorites.js');
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY


router.get('/getNowPlaying', (req, res) => {

  let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + ApiKey + "&language=en-US&page=1"
  axios.get(url).then((response => {
    let movies = response.data.results;


    let nowPlaying = []
    for (i in movies) {
      nowPlaying.push({
        id: movies[i].id,
        poster: movies[i].poster_path,
      })
    }

    res.json({
      nowPlaying: nowPlaying
    })
  }))






});

router.post('/favorite', (req, res) => {
  if (req.isAuthenticated()) {
    favorite.addFavorite(req.user.id, req.body.movieid).then(() => {
      res.status(200).send();
    })
  } else {
    res.status(401).send();
  }
});

module.exports = router;
