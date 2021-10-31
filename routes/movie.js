var express = require('express');
const path = require("path");
var router = express.Router();
const axios = require('axios');
require('dotenv').config();


router.use(
  express.static(path.join(__dirname, "./client/build"))
);

router.get('/movie/:movieid', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});

router.post('/movie/:movieid', (req, res, next) => {

  const ApiKey = process.env.APIKEY
  movieid = req.params.movieid;

  let url = "https://api.themoviedb.org/3/movie/"+movieid+"?api_key="+ApiKey+"&language=en-US"
  axios.get(url)
    .then(function (response) {
      let movieData = response.data;

      poster = "https://image.tmdb.org/t/p/w400"+movieData.poster_path;
      backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"+movieData.backdrop_path;

      genres = ""
      for (genre in movieData.genres) {
        console.log("in")
        genres+=movieData.genres[genre].name;
        genres+=", "
        console.log(genre);
      }
      genres = genres.substring(0, genres.length-2)
      console.log(genres)
      res.json({
        id: movieid,
        year: movieData.release_date.substring(0, movieData.release_date.length-6),
        title: movieData.title,
        duration: movieData.runtime,
        overview: movieData.overview,
        tagline: movieData.tagline,
        poster: poster,
        backdrop: backdrop,
        genres: genres
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

