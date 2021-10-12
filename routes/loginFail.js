var express = require('express');
const path = require("path");
var router = express.Router();

router.use(
    express.static(path.join(__dirname, "./client/build"))
  );
  
router.get('/loginFail', (req, res) => {
    res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
  });
  
module.exports = router;

