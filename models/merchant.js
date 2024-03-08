// Merchant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const merchant = sequelize.define('merchants', {
  // Define attributes here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    defaultValue: 0 // Set a default value (will be overridden before creating a new record)
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false
});

module.exports = merchant;
