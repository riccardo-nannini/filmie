var express = require('express');
var router = express.Router();
var requestCountry = require('request-country');
const axios = require('axios');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.use(requestCountry.middleware({
  attributeName: 'requestCountryCode', // default is 'requestCountryCode'
  privateIpCountry: 'US' // Result for private network IPs
}));

router.get('/getUpcoming', (req, res) => {

  let countryCode = req.requestCountryCode
  if (countryCode === false) countryCode = "US"

  let url = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + ApiKey + "&language=en-US&page=1&region="+countryCode
  axios.get(url).then((response => {
    let movies = response.data.results;


    let upcoming = []
    for (i in movies) {
      upcoming.push({
        id: movies[i].id,
        poster: movies[i].poster_path,
      })
    }

    res.json({
      upcoming: upcoming
    })
  }))

});

module.exports = router;
