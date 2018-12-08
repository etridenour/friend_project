const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const db = require('../../models');
const bcrypt = require('bcryptjs');


tokenForUser = (user) => {

    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET_WEB_TOKEN)
    
}


router.post('/signup', (req, res) => {
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let firstName = fName.charAt(0).toUpperCase() + fName.substr(1).toLowerCase();
    let lastName = lName.charAt(0).toUpperCase() + lName.substr(1).toLowerCase();
    let email = req.body.email.toLowerCase();
    let password = bcrypt.hashSync(req.body.password, 8);
    let secretpin = req.body.secretpin;
    let jobDescription = req.body.jobDescription;
    let title = req.body.title;

    db.users.findAll({where: {email: email}})
    .then(results => {

        if(results.length === 0){
            db.users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                secretpin: secretpin,
                privilege: 'employee',
                friendCount: 0,
                jobDescription: jobDescription,
                title: title
            })
            .then((user) => {
                return res.json({token: tokenForUser(user)})
            })
        }
        
        else return res.status(422).send({error: 'Email already exists'});
    })
})



module.exports = router;
