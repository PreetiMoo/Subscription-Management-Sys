const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');

const customer = sequelize.define('customers', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
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
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false
});


// customer.sync()
//   .then(() => {
//     console.log('Table created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });

module.exports = customer;
