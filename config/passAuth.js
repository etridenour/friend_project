const passport = require('passport');
const config = require('../config');
const db = require('../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');


const jwtOptions = {

    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

};


const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    db.user.findById(payload.sub)
    .then((foundUser) => {
        if(foundUser){
            done(null, foundUser);
        }
        else {
            done(null, false)
        }
    })
    .catch((err) => {
        
    })

})