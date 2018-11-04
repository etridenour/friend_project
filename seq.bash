# sequelize model:generate --name users \
#     --attributes name:string,email:string,password:string,secretpin:string,friends:integer

# sequelize model:create --name friendships \
#     --attributes userId:integer,friendId:integer

# sequelize model:create --name users_friendships_join \
#     --attributes userId:integer,friendshipId:integer