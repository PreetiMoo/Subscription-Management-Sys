'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('merchant_customizations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      merchant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primary_color_schema: {
        type: Sequelize.STRING,
        allowNull: false
      },
      secondary_color_schema: {
        type: Sequelize.STRING,
        allowNull: false
      },
      merchant_link:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('merchant_customizations')
  }
};
