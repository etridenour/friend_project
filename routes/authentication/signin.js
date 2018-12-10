const express = require('express');
const router = express.Router();
const db = require('../../models');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');


const { getFriends } = require('../findFriends')

tokenForUser = (user) => {

    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET_WEB_TOKEN)
    
}


router.post('/signin', (req, res) => {


    let email = req.body.email.toLowerCase();
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
                        friendCount: user.friendCount,
                        jobDescription: user.jobDescription,
                        title: user.title
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