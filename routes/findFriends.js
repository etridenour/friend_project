const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({extended: false}));


router.get('/findFriends', (req, res) => {

    let friendsArray = [];

    db.friendships.findAll({

        include: [
            {
                model: db.users,
                as: 'friends',
                through: 'user_friendships_join',
                attributes: [
                'id', 'name', 'email', 'secretpin'
                ]
            }
        ],
        where: {userId: 1}
    
    }).then(results => {
        // console.log(results[0].dataValues.friends)
        results[0].dataValues.friends.forEach((e) => {

            friendsArray.push({
                id: e.dataValues.id,
                name: e.dataValues.name,
                email: e.dataValues.email,
                pin: e.dataValues.secretpin
            })
        })
        
        return friendsArray;
        
    }).then(array => {
        res.json(array);
    })
})

module.exports = router;

// console.log(e.dataValues.name)
            // console.log(e.dataValues.email)
            // console.log(e.dataValues.secretpin)