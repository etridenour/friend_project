'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secretpin: DataTypes.STRING,
    privilege: DataTypes.STRING,
    friendCount: DataTypes.INTEGER
  }, {});
  users.associate = function(models) {
    users.belongsToMany(models.friendships, { foreignKey: 'friend', through: 'users_friendships' })
  };
  return users;
};