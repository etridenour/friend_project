'use strict';
module.exports = (sequelize, DataTypes) => {
  const friendships = sequelize.define('friendships', {
    friend1: DataTypes.INTEGER,
    friend2: DataTypes.INTEGER
  }, {});
  friendships.associate = function(models) {
    friendships.belongsToMany(models.users, { as: 'theFriend', foreignKey: 'friendship', through: 'users_friendships' })
  };
  return friendships;
};