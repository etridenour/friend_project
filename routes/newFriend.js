const express = require('express');
const router = express.Router();
db = require('../models');
const {
    USER,
    FRIENDSHIP,
    USER_FRIENDSHIP_MODEL,
} = require('../dbConstants')

const { getFriends } = require('./findFriends')


router.post('/newFriend', (req, res)=>{

    let friendPin = req.body.friendshipData.friendPin

    db[USER].findAll(
        {where: {secretpin: friendPin}}
    )
    .then(results => {
        if(results.length){

            const friend1 = parseInt(req.body.friendshipData.id);
            const friend2 = parseInt(results[0].dataValues.id);
            let friendCount = req.body.friendshipData.friendCount;

            db[USER].update({
                friendCount: friendCount += 1
            },
            {where: {id: friend1}})

            db[FRIENDSHIP].create({
                friend1: friend1,
                friend2: friend2
                }).then(results => {
                console.log(results)
                const createdFriendship = results.dataValues
    
                // if the friendship was added, join the users together
                if(createdFriendship && createdFriendship.id){
                
                    // joins the users together by adding a row to the 'join' table that 
                    // contains the id of the friend, and the new friendship they belong to
                    db[USER_FRIENDSHIP_MODEL].create({
                        friend: friend2,
                        friendship: parseInt(createdFriendship.id)
                    }).then(function(result){
                        
                    
                        if(result.dataValues.friend){
                            getFriends(friend1, (friendsAarray)=>{
                                res.json({friends: friendsAarray,
                                        friendCount: friendCount})
                            })
                        }
                        
        
                    })
    
                }
    
            })


        } else {

            return res.status(422).send({error: 'Incorrect pin'});

        }
    })


})

module.exports = router;
