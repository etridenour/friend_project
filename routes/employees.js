const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/employees', (req, res) => {

    db.users.findAll()
    .then(results => {

        res.json({ employees: results })

    })

})

module.exports = router;




