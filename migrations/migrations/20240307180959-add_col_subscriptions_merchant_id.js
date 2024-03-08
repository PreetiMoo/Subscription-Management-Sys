"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        { tableName: "subscriptions" },
        "merchant_id",
        {
          type: Sequelize.INTEGER
        },
        { transaction: t }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: "subscriptions" },
      "merchant_id",
      {
        transaction: t
      }
    );
  }
};
