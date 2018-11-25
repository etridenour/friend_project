const express = require('express');
const router = express.Router();
const db = require('../models');

const {
    USER,
    FRIENDSHIP,
    USER_FRIENDSHIP_MODEL,
    USER_FRIENDSHIP_THROUGH,
    USER_FRIENDSHIP_AS
} = require('../dbConstants')


router.get('/employees', (req, res) => {

    db[USER].findAll()
    .then(results => {
        var employees = results;
        
        db[FRIENDSHIP].findAll({

            include: [
                {
                    model: db[USER],
                    as: USER_FRIENDSHIP_AS,
                    through: USER_FRIENDSHIP_THROUGH,
                    attributes: [
                    'id', 'firstName', 'lastName', 'email', 'secretpin', 'privilege'
                    ]
        
                }
        
            ],
            where: {friend1: employees.map((e) => {
                return e.dataValues.id
            })}
        
        })
        .then(results => {
            console.log(results)
            results.map((e) => {
                // console.log(e.dataValues.theFriend)
                // console.log(e)
            })
        })
        

    })

})


module.exports = router;

// res.json({ employees: employees })




