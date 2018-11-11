const express = require('express')
const router = express.Router();
db = require('../models')

const {
    USER,
    FRIENDSHIP,
    USER_FRIENDSHIP_MODEL,
    USER_FRIENDSHIP_THROUGH,
    USER_FRIENDSHIP_AS
} = require('../dbConstants')


function getFriends(uid, sendFriendsToRoute) {

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
        where: {friend1: uid}
    
        }).then(results => {
    
        var friendsArray = []
    
        results.forEach(function(dbRecord){
    
            // makes sure there is a friendship record
            if(dbRecord && dbRecord.dataValues){
    
            var friendship = dbRecord.dataValues
    
            // makes sure the friendship record contains a friend
            if(friendship.theFriend && friendship.theFriend[0] && friendship.theFriend[0].dataValues){
                
                var theFriend = friendship.theFriend[0].dataValues
    
                // if the friend record is a valid user object, push it in to the friends array
                if(theFriend.id){
                delete theFriend.users_friendships
                friendsArray.push(theFriend)
    
                }
            
            }
    
            }
    
        })
        
        sendFriendsToRoute(friendsArray)
    
        })

}

module.exports = {

    getFriends: getFriends

}
