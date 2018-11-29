const express = require('express');
const router = express.Router();
const db = require('../models');
const {
    USER,
} = require('../dbConstants')

const { getFriends } = require('./findFriends')


router.post('/deleteEmployee', (req, res) => {
    console.log('check 1')
    let id = req.body.id;
    let adminId = req.body.adminId;

    //lowers friend count of deleted employee friends by one
    db.friendships.findAll({
        where: {friend2: id}
    })
    .then(results => {

        db.users.findAll({
            where: {id: results.map((e) => {
                return e.dataValues.friend1
            })}
        })
        .then(results => {

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
            {where: {friendship: results.map((e) => {
                return e.dataValues.id
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

                        getFriends(adminId, (friendsArray)=>{
                        
                            res.json({ employees: employees,
                                friends: friendsArray
                            })
                        })
                    })  
                })
            })
        })      
    })
})



module.exports = router;


