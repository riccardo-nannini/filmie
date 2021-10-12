var express = require('express');
const path = require("path");
var router = express.Router();
const user = require('../dao/user.js');

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function inputValidation(user) {
  //TODO check che tutti i campi siano presenti
  if (!validateEmail(user.email)) return false;
  if (String(user.password).length < 8) return false;
  return true;
}

router.get('/register', (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"));
});

router.post('/register', (req, res) => {

  if (!inputValidation(req.body)) {
    res.status(450).send();
    return;
  }
  user.findByEmail(req.body.email).then((result) => {
    if (result) {
      res.status(451).send();
      return;
    } else {
      const saltHash = user.genPassword(req.body.password);

      const salt = saltHash.salt;
      const hash = saltHash.hash;

      user.addUser(req.body.name, req.body.surname, req.body.email, hash, salt)

      res.status(200);
      res.redirect('/login')
    }
  })
});

module.exports = router;