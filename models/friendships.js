'use strict';
module.exports = (sequelize, DataTypes) => {
  const friendships = sequelize.define('friendships', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  friendships.associate = function(models) {
    // associations can be defined here
  };
  return friendships;
};