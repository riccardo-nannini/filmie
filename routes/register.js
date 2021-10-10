var express      = require('express');
const path       = require("path");
var router       = express.Router();
const user       = require('../dao/user.js');


router.get('/register', (req, res) => {
    res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
  });

router.post('/register', (req, res) => {

    const saltHash = user.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    user.addUser(req.body.name, req.body.surname, req.body.email, hash, salt)

    res.redirect("/");
}
);
  
module.exports = router;