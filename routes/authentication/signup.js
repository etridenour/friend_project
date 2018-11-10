const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const config = require('../../config');
const db = require('../../models');
const bcrypt = require('bcryptjs');


tokenForUser = (user) => {

    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
    
}


router.post('/signup', (req, res) => {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 8);
    let secretpin = req.body.secretpin;

    db.users.findAll({where: {email: email}})
    .then(results => {

        if(results.length === 0){
            db.users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                secretpin: secretpin,
                privilege: 'employee'
            })
            .then((user) => {
                return res.json({token: tokenForUser(user)})
            })
        }
        
        else return res.status(422).send({error: 'Email already exists'});
    })
})



module.exports = router;
