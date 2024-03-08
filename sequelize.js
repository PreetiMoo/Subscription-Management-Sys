const { Sequelize } = require("sequelize");

// Replace 'database_name', 'username', 'password', and other options with your actual MySQL database configuration.
const sequelize = new Sequelize("subsys", "root", "Preeti", {
  host: "localhost",
  dialect: "mysql" // Set the dialect to 'mysql'
});

// Export the Sequelize instance to use in other files
module.exports = sequelize;
