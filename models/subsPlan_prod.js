const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const subsPlanProd = sequelize.define('subsPlan_prods', {
  // Define attributes here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  plan_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
},{
  timestamps: false
});


module.exports = subsPlanProd;



