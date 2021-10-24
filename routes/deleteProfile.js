var express = require('express');
var router = express.Router();
const user = require('../dao/user.js');

router.post('/deleteProfile', (req, res) => {

    if (req.isAuthenticated()) {
        user.deleteUser(req.user.email).then(() => {
            res.redirect("/login");
        })
    } else {
        res.status(401).send();
    }
});

module.exports = router;
