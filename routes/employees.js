const express = require('express');
const router = express.Router();
const db = require('../models');

const {
    USER,
    
} = require('../dbConstants')


router.get('/employees', (req, res) => {

    db[USER].findAll()
    .then(results => {
        var employees = results;

            res.json({ employees: employees })
        
    })
})


module.exports = router;





