var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.get('/getCast/:movieid', (req, res, next) => {

  let movieid = req.params.movieid;
  let trailer = null;
  let language = "en-US";
  let directors = [];
  let actors = [];

  if (req.get("Accept-Language") !== undefined && req.get("Accept-Language") !== null) {
    language = req.get("Accept-Language").substring(0,2);
  }

  let urlCast = "https://api.themoviedb.org/3/movie/" + movieid + "/credits?api_key=" + ApiKey + "&language=" + language

  axios.get(urlCast).then((response) => {

    let cast = response.data.cast;
    let crew = response.data.crew;

    for (i in crew) {
      if (crew[i].job === "Director") {
        directors.push(crew[i].name)
      }
    }

    for (i in cast) {
      if (cast[i].known_for_department === "Acting") {
        actors.push({
          name: cast[i].name,
          character: cast[i].character,
        })
      }
      if (actors.length > 9) break;
    }

    res.json({
      actors : actors,
      directors : directors
    });

  }).catch(function (error) {
    console.log("Possible 404");
  });




})


module.exports = router;

