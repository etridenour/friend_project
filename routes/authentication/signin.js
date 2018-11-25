const express = require('express');
const router = express.Router();
const config = require('../../config');
const db = require('../../models');
const bcrypt = require('bcryptjs');


const { getFriends } = require('../findFriends')


router.post('/signin', (req, res) => {


    let email = req.body.email;
    let password = req.body.password;

    db.users.findAll({where: {email: email}})
    .then(results => {

        if(results){
            const user = results[0];
            console.log(user)
            if(user){
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    // console.log(err);

                    if(err){
                        return res.json({ message: 'Password error'})
                    }

                    if(!isMatch){
                        return res.json({ message: 'Bad password'})
                    }

                    let theUser = {
                        token: tokenForUser(user),
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        secretpin: user.secretpin,
                        privilege: user.privilege,
                        friendCount: user.friendCount
                    }

                    let uid = user.id;

                    getFriends(uid, (friendsArray)=>{
                        return res.json({user: theUser, friends: friendsArray })
                    })
                })
            }

            else{
                return res.json({ message: 'Account not found'})
            }

        } else {
            return res.json({ message: 'Account not found'})
        }
    })
})






module.exports = router;