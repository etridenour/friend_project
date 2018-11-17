'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'users',
      'friendCount',
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('friendCount', 'users');
  }
};
