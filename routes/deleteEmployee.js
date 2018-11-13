const express = require('express');
const router = express.Router();
const db = require('../models');


router.post('/deleteEmployee', (req, res) => {
    console.log(req.body.id)
    let id = req.body.id;

    db.users.destroy(
        {where: {id: id}},
        {truncate: false, cascade: true})
    .then(() => {
        res.redirect('/employees')
    })
})


module.exports = router;


