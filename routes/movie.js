var express = require('express');
const path = require("path");
var router = express.Router();
const favorite = require('../dao/favorites.js');
const watchlist = require('../dao/watchlist.js');
const rating = require('../dao/rating.js');
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.use(
  express.static(path.join(__dirname, "./client/build"))
);

router.get('/movie/:movieid', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});

router.post('/movie/:movieid', (req, res, next) => {

  let movieid = req.params.movieid;
  let isFavorite = false;
  let isWatchlist = false;
  let isRated = false;
  let calls = [];
  let resp;
  let poster = null;
  let backdrop = null;

  let url = "https://api.themoviedb.org/3/movie/"+movieid+"?api_key="+ApiKey+"&language=en-US"
  
  calls.push(axios.get(url));
  if (req.isAuthenticated()) {
    calls.push(favorite.getFavoriteMovie(req.user.id, movieid))
    calls.push(watchlist.getWatchlistMovie(req.user.id, movieid))
    calls.push(rating.getRatingByMovieAndUser(req.user.id, movieid))
  }

  Promise.all(calls).then((response) => {

      if (response[1] !== undefined) isFavorite = true;
      if (response[2] !== undefined) isWatchlist = true;
      if (response[3] !== undefined) isRated = true;

      let movieData = response[0].data;
      if (movieData.poster_path !== null) poster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"+movieData.poster_path;
      if (movieData.backdrop_path !== null) backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"+movieData.backdrop_path;

      genres = ""
      for (genre in movieData.genres) {
        genres+=movieData.genres[genre].name;
        genres+=", "
      }
      genres = genres.substring(0, genres.length-2)

      resp = {
        id: movieid,
        year: movieData.release_date,
        title: movieData.title,
        duration: movieData.runtime,
        overview: movieData.overview,
        tagline: movieData.tagline,
        poster: poster,
        backdrop: backdrop,
        genres: genres,
        isAuth: req.isAuthenticated(),
        isFavorite: isFavorite,
        isWatchlist: isWatchlist,
        isRated: isRated
      }

      res.json(
        resp
      );
    }).catch(function (error) {
      console.log("Possible 404 or DB constraint violated");
    });
  });

module.exports = router;

