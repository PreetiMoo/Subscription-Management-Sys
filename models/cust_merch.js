const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const customer_merchant = sequelize.define('customer_merchants', {
  // Define attributes here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  cust_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  merchant_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  },{
  timestamps: false
});


module.exports = customer_merchant;



