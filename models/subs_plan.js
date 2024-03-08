const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const subs_plan = sequelize.define('subs_plans', {
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
  plan_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  plan_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
  timestamps: false
});


module.exports = subs_plan;



