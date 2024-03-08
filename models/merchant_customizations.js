const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const merchant_customization = sequelize.define('merchant_customizations', {
  // Define attributes here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  merchant_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  primary_color_schema: {
    type: DataTypes.STRING,
    allowNull: false
  },
  secondary_color_schema: {
    type: DataTypes.STRING,
    allowNull: false
  },
  merchant_link:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
}},{
  timestamps: false
});


module.exports = merchant_customization;



