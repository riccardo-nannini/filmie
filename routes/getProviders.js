var express = require('express');
var router = express.Router();
const axios = require('axios');
var requestCountry = require('request-country');
require('dotenv').config();

const ApiKey = process.env.APIKEY

router.use(requestCountry.middleware({
  attributeName: 'requestCountryCode', // default is 'requestCountryCode'
  privateIpCountry: 'US' // Result for private network IPs
}));

router.get('/getProviders/:movieid', (req, res, next) => {

  let movieid = req.params.movieid;
  let buy = [];
  let rent = [];
  let flatrate = [];
  let countryCode = req.requestCountryCode
  if (countryCode === false) countryCode = "US"

  let url = "https://api.themoviedb.org/3/movie/" + movieid + "/watch/providers?api_key=" + ApiKey + "&language=en-US&page=1"

  axios.get(url).then((response) => {

    let countries = response.data.results;

    if (countries[countryCode] !== undefined) {
      let countryProviders = countries[countryCode]
      for (i in countryProviders.flatrate) {
        flatrate.push({
          name: countryProviders.flatrate[i].provider_name,
          logo: countryProviders.flatrate[i].logo_path,
        })
      }
      for (i in countryProviders.buy) {
        buy.push({
          name: countryProviders.buy[i].provider_name,
          logo: countryProviders.buy[i].logo_path,
        })
      }
      for (i in countryProviders.rent) {
        rent.push({
          name: countryProviders.rent[i].provider_name,
          logo: countryProviders.rent[i].logo_path,
        })
      }
    }
    
    res.json({
      buy : buy,
      rent : rent,
      flatrate : flatrate,
    });

  }).catch(function (error) {
    console.log("Possible 404");
  });




})


module.exports = router;

