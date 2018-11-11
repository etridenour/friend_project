const express = require('express');
const router = express.Router();
const db = require('../../models');


router.post('/changeProfile', (req,res) => {

    let newPin = req.body.data.pin
    let id = req.body.data.id
    let newFirstName = req.body.data.newFirstName
    let newLastName = req.body.data.newLastName

    db.users.update(
        {secretpin: newPin,
        firstName: newFirstName,
        lastName: newLastName   
        },
        {where: {id: id}}
    )
    .then(

        res.json({newPin: newPin})

    )

})


module.exports = router;