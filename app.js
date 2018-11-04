
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
db = require('./models')

// const Op = db.sequelize.Op

db.friendships.findAll({

    include: [
        {
            model: db.users,
            as: 'friends',
            through: 'user_friendships_join',
            attributes: [
            'id', 'name'
            ]
        }
    ],
    where: {userId: 1}

}).then(results => {
    // console.log(results[0].dataValues.friends)
    results[0].dataValues.friends.forEach((e) => {
        console.log(e.dataValues.name)
    })
})

app.listen(3001);
