const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const nodemailer = require('nodemailer');
db = require('../../models');


//change let url  = ... when hosted and ad https to http

router.post('/api/forgotPassword', (req, res) => {
    var email = req.body.userName
    var resetUrl;

    if (process.env.NODE_ENV == 'development') { 
        resetUrl = 'http://localhost:3000'
    } else if (process.env.NODE_ENV == 'production'){
        resetUrl = 'https://watercoolerapp.herokuapp.com'
    }

    db.users.findAll({where: {email: email}})
    .then( results => {
        
        if(results.length === 0){
            return res.status(422).send({error: "Email address does not exist in database."});
        } else {

            let user = results[0].dataValues;
            console.log(user)
            let timestamp = new Date().getTime();
            let passToken = jwt.encode({sub: user.email, iat: timestamp}, user.password);
            let url = `<a href="${resetUrl}/resetpassword/${user.id}/${passToken}">Reset password</a>`;

            //set up nodemailer
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'watercooleremailer@gmail.com',
                    pass: "watercooler12345"
                }
            });

            let mailOptions = {
                from: '"Watercooler', // sender address
                to: user.email, // list of receivers
                subject: 'Watercooler Password Reset', // Subject line
                text: 'Password Reset', // plain text body
                html: `You are receiving this because you (or someone else) requested the reset of the password for your Watercooler account. Please click on the following link to complete the password reset process:<br><br>${url} <br><br> If you did not request this, please ignore this email and your password will remain unchanged.`
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }

            });

            return res.status(200).json({email: user.email})
        }
    })
})


module.exports = router;