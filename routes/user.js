var express = require('express');
var router = express.Router();

router.get('/user', (req, res) => {

    if (req.isAuthenticated()) {
        res.json({ email: req.user.email, name: req.user.name, id: req.user.id, surname: req.user.surname });
    } else {
        res.status(401).send();
    }
});

router.post('/user', (req, res) => {

    if (req.isAuthenticated()) {
        if (req.body.newPass === undefined || req.body.confOldPass === undefined ||req.body.oldPass === undefined ) {
            res.status(401).send();
            return;
          }
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


router.delete('/user', (req, res) => {

    if (req.isAuthenticated()) {
        user.deleteUser(req.user.email).then(() => {
            res.redirect("/login");
        })
    } else {
        res.status(401).send();
    }
});


module.exports = router;
