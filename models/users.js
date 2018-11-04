'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secretpin: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    users.belongsToMany(models.friendships, { as: 'theUsers', foreignKey: 'id', through: 'users_friendships_join' })
  };
  return users;
};