'use strict';
module.exports = (sequelize, DataTypes) => {
  const friendships = sequelize.define('friendships', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  friendships.associate = function(models) {
    friendships.belongsToMany(models.users, { as: 'friends', foreignKey: 'friendshipId', through: 'users_friendships_join' })
  };
  return friendships;
};