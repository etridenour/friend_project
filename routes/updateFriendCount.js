db.friendships.findAll(
    {where: {friend2: id}}
)
.then(results => {
    console.log('check 2')
    results.map((e) => {
        var friendUpdateId = e.dataValues.friend1;
        
        db.users.findAll({
            where: {id: friendUpdateId}
        })
        .then(results => {
            console.log('check 3')
            var friendCount = results[0].dataValues.friendCount;
            db.users.update({
                friendCount: friendCount -= 1
            },
            {where: {id: friendUpdateId}})
        })
    })
    }) 