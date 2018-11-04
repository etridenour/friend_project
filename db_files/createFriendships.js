db = require('../models')

//create

db.friendships.create(
    {userId: 1,
    friendId: 2
    }
)
db.friendships.create(
    {userId: 3,
    friendId: 3
    }
)
db.friendships.create(
    {userId: 2,
    friendId: 4
    }
)
db.friendships.create(
    {userId: 2,
    friendId: 5
    }
)

