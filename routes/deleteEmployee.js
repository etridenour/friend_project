const express = require('express');
const router = express.Router();
const db = require('../models');
const {
    USER,
} = require('../dbConstants')


router.post('/deleteEmployee', (req, res) => {
    console.log('check 1')
    let id = req.body.id;
    console.log(id)

    //lowers friend count of deleted employee friends by one
    db.friendships.findAll({
        where: {friend2: id}
    })
    .then(results => {
        results.map((e) => {
            console.log(e.dataValues.friend1)
        })
        db.users.findAll({
            where: {id: results.map((e) => {
                return e.dataValues.friend1
            })}
        })
        .then(results => {
            results.map((e) => {
                console.log(e.dataValues.friendCount)
            })
            results.map((e) => {
                db.users.update({
                    friendCount: e.dataValues.friendCount -= 1
                },
                {where: {id: e.dataValues.id}}
                )
            })
        })
        
    })

    //deletes employee
    db.friendships.findAll({
        where: {friend1: id}
    })
    .then(results => {
        console.log('check 2')

        db.users_friendships.destroy(
            {where: {friend: results.map((e) => {
                return e.dataValues.friend2
            })}})

        db.users_friendships.destroy(
            {where: {friend: id}}
        )
        .then(() => {

            db.friendships.destroy(
                {where: {friend1: id}})

            db.friendships.destroy(
                {where: {friend2: id}}
            )
            .then(() => {

                db.users.destroy(
                    {where: {id: id}})
                .then(() => {
                    
                    db[USER].findAll()
                    .then(results => {

                        var employees = results;

                            res.json({ employees: employees })
                        
                    })  
                })
            })
        })      
    })
})



module.exports = router;


