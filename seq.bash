sequelize model:generate --name users \
    --attributes firstName:string,lastName:string,email:string,password:string,secretpin:string,privilege:string

sequelize model:create --name friendships \
    --attributes userId:integer,friendId:integer

sequelize model:create --name users_friendships_join \
    --attributes userId:integer,friendshipId:integer