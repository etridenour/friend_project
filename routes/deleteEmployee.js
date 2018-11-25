const express = require('express');
const router = express.Router();
const db = require('../models');


router.post('/deleteEmployee', (req, res) => {
    console.log('check 1')
    let id = req.body.id;
    console.log(id)

    db.friendships.findAll({
        where: {friend1: id}
    })
    .then(results => {
        // var friend2 = results[0].dataValues.friend2;
        
        db.users_friendships.destroy(
            {where: {friend: results.map((e) => {
                return e.dataValues.friend2
            })}})
        .then(() => {

            db.friendships.destroy(
                {where: {friend1: id}})
            .then(() => {

                db.users.destroy(
                    {where: {id: id}})
                .then(() => {
                    res.redirect('/employees')  
                })
            })
        })      
    })
})



module.exports = router;


