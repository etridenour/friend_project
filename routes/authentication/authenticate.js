const express = require('express');
const router = express.Router();
const db = require('../../models');
let passport = require('passport');
let jwt = require('jwt-simple');
const passportService = require('../../config/passAuth');
const requireAuth = passport.authenticate('jwt', {session: false});

const { getFriends } = require('../findFriends')

router.post('/authenticate', requireAuth, (req, res) => {
    var email = req.body.email
    db.users.findAll({where: {email: email}})
    .then( results => {
        
        if(results.length === 0){
        
        } else {
            var theUser = results[0].dataValues

            let uid = theUser.id

            getFriends(uid, (friendsArray)=>{
                return res.json({user: theUser, friends: friendsArray })
            })
            

            }
        
        })
        
        
        }
    )


module.exports = router;
