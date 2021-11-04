var express = require('express');
const path = require("path");
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.use(
  express.static(path.join(__dirname, "./client/build"))
);

router.get('/search/:query', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});

router.post('/search/:query', (req, res, next) => {

  query = req.params.query;

  let url = "https://api.themoviedb.org/3/search/movie?api_key=" + ApiKey + "&language=en-US&query=" + query + "&page=1&include_adult=false";

  axios.get(url)
    .then(function (response) {
      let movieData = response.data.results;
      results = []
      for (index in movieData) {
        movie = movieData[index];
        poster = "https://image.tmdb.org/t/p/w440_and_h660_face/" + movie.poster_path;
        year = movie.release_date === undefined ? undefined : movie.release_date.substring(0, movie.release_date.length - 6)
        results.push({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: poster,
          year: year,
        });
      }

      res.json({
        results
      });

    })
    .catch(function (error) {
      console.log("Possible 404");
    })
    .then(function () {
      // always executed
    });

});

module.exports = router;

