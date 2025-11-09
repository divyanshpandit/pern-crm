'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Activities', 'lead_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Leads',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Activities', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Activities', 'lead_id');
    await queryInterface.removeColumn('Activities', 'user_id');
  }
};
