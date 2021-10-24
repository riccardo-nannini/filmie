var express = require('express');
var router = express.Router();
const user = require('../dao/user.js');

router.post('/updateProfile', (req, res) => {

    if (req.isAuthenticated()) {
        if (req.body.newPass !== req.body.confOldPass) {
            res.status(451).send();
            return;
        }
        user.authenticateAsync(req.user.email, req.body.oldPass).then((result) => {
            if (!result) {
                res.status(452).send();
                return
            } else {
                user.updatePassword(req.user.email, req.body.newPass);
                res.status(200).send();
            }
        })
    } else {
        res.status(401).send();
    }
});

module.exports = router;
