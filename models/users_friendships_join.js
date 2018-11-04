'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_friendships_join = sequelize.define('users_friendships_join', {
    userId: DataTypes.INTEGER,
    friendshipId: DataTypes.INTEGER
  }, {});
  users_friendships_join.associate = function(models) {
    // associations can be defined here
  };
  return users_friendships_join;
};