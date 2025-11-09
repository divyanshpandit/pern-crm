'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get current time for timestamps
    const now = new Date();

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Manager',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Sales Executive',
        createdAt: now,
        updatedAt: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};