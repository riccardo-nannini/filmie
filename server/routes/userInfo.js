var express = require('express');
var router = express.Router();

router.get('/userInfo', (req, res) => {

    if (req.isAuthenticated()) {
        res.json({ email: req.user.email, name: req.user.name, id: req.user.id, surname: req.user.surname });
    } else {
        res.status(401).send();
    }
});

module.exports = router;
