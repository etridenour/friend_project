const express = require('express');
const router = express.Router();
const db = require('../../models');


router.post('/changpin', (req,res) => {

    console.log(req.body.pin)

})


module.exports = router;