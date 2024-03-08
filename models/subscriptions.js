const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js"); // Import the Sequelize instance from 'sequelize.js'

const subscription = sequelize.define(
  "subscriptions",
  {
    // Define attributes here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    cust_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE
    },
    merchant_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
);

module.exports = subscription;
