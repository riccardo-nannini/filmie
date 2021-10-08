var express = require('express');
var router = express.Router();

// create a GET route
router.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUddR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  }); 
  
module.exports = router;
