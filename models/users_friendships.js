'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_friendships = sequelize.define('users_friendships', {
    friend: DataTypes.INTEGER,
    friendship: DataTypes.INTEGER
  }, {});
  users_friendships.associate = function(models) {
    // associations can be defined here
    
  };
  return users_friendships;
};