var express = require('express');
var router = express.Router();


// create a GET route
router.get('/profile', (req, res) => { 
    res.send({ express: 'yooo' }); 
  }); 
  
module.exports = router;