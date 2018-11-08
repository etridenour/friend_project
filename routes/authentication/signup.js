const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const config = require('../../config');
const db = require('../../models');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


tokenForUser = (user) => {

    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
    
}


router.post('/signup', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = bcrypt.hashsync(req.body.password, 8);
    let secretpin = bcrypt.hashsync(req.body.secretpin, 8);

    db.users.findAll({where: {email: email}})
    .then(results => {

        if(results.length === 0){
            db.users.create({
                name: name,
                email: email,
                password: password,
                secretpin: secretpin
            })
            .then((user) => {
                return res.json({token: tokenForUser(user)})
            })
        }
        
        else return res.status(422).send({error: 'Email already exists'});
    })
})



module.exports = router;
