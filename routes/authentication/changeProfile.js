const express = require('express');
const router = express.Router();
const db = require('../../models');


router.post('/changeProfile', (req,res) => {

    let newPin = req.body.data.pin
    let id = req.body.data.id
    let newFirstName = req.body.data.newFirstName
    let newLastName = req.body.data.newLastName
    let newTitle = req.body.data.newTitle
    let newJobDescription = req.body.data.newJobDescription

    db.users.update(
        {secretpin: newPin,
        firstName: newFirstName,
        lastName: newLastName,
        title: newTitle,
        jobDescription: newJobDescription  
        },
        {where: {id: id}}
    )
    .then(results =>{
        db.users.findAll({
            where: {id: id}
        })
        .then(results => {
            res.json(results);
        })
    })
})


module.exports = router;