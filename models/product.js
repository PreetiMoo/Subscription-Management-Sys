// Merchant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js'); // Import the Sequelize instance from 'sequelize.js'

const product = sequelize.define('products', {
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
  prod_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false
});


module.exports = product;



// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const merchant = sequelize.define('merchants', {
//   // Model attributes are defined here
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// // `sequelize.define` also returns the model
// console.log(merchant === sequelize.models.merchant); // true

// module.exports = merchant



