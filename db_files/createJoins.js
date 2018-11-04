db = require('../models')

db.users_friendships_join.create(
    {userId: 3,
    friendshipId: 1,
    }
)
db.users_friendships_join.create(
    {userId: 4,
    friendshipId: 1,
    }
)
db.users_friendships_join.create(
    {userId: 3,
    friendshipId: 2,
    }
)
db.users_friendships_join.create(
    {userId: 5,
    friendshipId: 2,
    }
)
