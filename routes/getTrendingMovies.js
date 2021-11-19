var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY


router.get('/getTrendingMovies', (req, res) => {

  let language = "en-US";

  if (req.get("Accept-Language") !== undefined && req.get("Accept-Language") !== null) {
    language = req.get("Accept-Language").substring(0,2);
  }

  let url = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + ApiKey + "&language=" + language
  axios.get(url).then((response => {
    let movies = response.data.results;


    let trending = []
    for (i in movies) {
      trending.push({
        id: movies[i].id,
        poster: movies[i].poster_path,
      })
    }

    res.json({
      trending: trending
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
