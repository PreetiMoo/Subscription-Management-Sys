"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        "subscriptions", // tableName should be passed as the first argument, not as an object
        "payment_status",
        {
            type: Sequelize.ENUM('pending', 'success', 'failure'),
            defaultValue: 'pending' // Optional: You can specify a default value if needed
        },
        { transaction: t }
    );
    
      await queryInterface.addColumn(
        { tableName: "subscriptions" },
        "transaction_ID", 
        {
          type: Sequelize.UUID
        },
        { transaction: t }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: "subscriptions" },
      "payment_status",
      
    );
    await queryInterface.removeColumn(
      { tableName: "subscriptions" },
      "transaction_ID",
      
    );
  }
};
