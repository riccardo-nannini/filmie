var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.get('/getSimilar/:movieid', (req, res, next) => {

  let movieid = req.params.movieid;
  let similarMovies = []

  let url = "https://api.themoviedb.org/3/movie/" + movieid + "/recommendations?api_key=" + ApiKey + "&language=en-US&page=1"

  axios.get(url).then((response) => {

    let movies = response.data.results;

    for (i in movies) {
      
      if (movies[i].adult !== undefined && movies[i].adult === false) {
        similarMovies.push({
          id: movies[i].id,
          poster: movies[i].poster_path
        });
      }
    }
    res.json(
      similar = similarMovies
    );

  }).catch(function (error) {
    console.log("Possible 404");
  });




})


module.exports = router;

