var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.get('/getVideos/:movieid', (req, res, next) => {

  let movieid = req.params.movieid;
  let trailer = null;
  let language = "en-US";

  if (req.get("Accept-Language") !== undefined && req.get("Accept-Language") !== null) {
    language = req.get("Accept-Language").substring(0,2);
  }

  let url = "https://api.themoviedb.org/3/movie/" + movieid + "/videos?api_key=" + ApiKey + "&language=" + language

  axios.get(url).then((response) => {

    let videos = response.data.results;

    for (i in videos) {
      if (videos[i].type !== undefined && videos[i].type === "Trailer") {
        trailer = videos[i].key;
        break;
      }
    }

    res.json(
      trailer=trailer
    );

  }).catch(function (error) {
    console.log("Possible 404");
  });




})


module.exports = router;

