const express = require('express');
const router = express.Router();
const db = require('../models');


router.post('/privilegeChange', (req, res) => {

    let id = req.body.id;
    let privilege = req.body.privilege

    db.users.update(
        {
            privilege: privilege
        },
        {where: {id: id}}
    )
    .then(() => {
        res.redirect('/api/employees')
    })
})

module.exports = router;