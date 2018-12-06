const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
db = require('../../models');


router.post('/api/savePassword', (req, res) => {
    console.log(req.body)
    const { formProps, token, id, } = req.body
    const password = formProps.password
    
    let newPassword = bcrypt.hashSync(password, 8);

    db.users.findAll({where: {id: id}})
    .then(results => {
        
        let user = results[0].dataValues;
        console.log(user)
        
        try {
            var payload = jwt.decode(token, user.password);
        }
        catch(err) {
            return res.status(422).json({error: "Token not authenticated."});
        }

        db.users.update(
            {
                password: newPassword
            },
            {where: {id: id}}
        ).then((result)=>{
        
            res.status(200).json({updated: "Password updated"})
        })
    })
})

module.exports = router;