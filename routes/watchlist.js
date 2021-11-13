var express = require('express');
var router = express.Router();
const watchlist = require('../dao/watchlist.js');
const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

const ApiKey = process.env.APIKEY


router.get('/watchlist', (req, res) => {

  if (req.isAuthenticated()) {
    watchlist.getWatchlist(req.user.id).then((result) => {
      let calls = []
      for (i in result) {
        let url = "https://api.themoviedb.org/3/movie/" + result[i].movieid + "?api_key=" + ApiKey + "&language=en-US"
        calls.push(axios.get(url))
      }
      
      let wlist = []
      Promise.all(calls).then((response) => {
        for (i in response) {
          //console.log(" data: ",response[i].data)
          wlist.push({
            id: response[i].data.id,
            poster: response[i].data.poster_path
          });
        }
        console.log(wlist)

        res.json({
          watchlist: wlist
        });
      });

    })

  } else {
    res.status(401).send();
  }
});

module.exports = router;