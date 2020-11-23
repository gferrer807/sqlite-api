const { Sequelize } = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: 'library'
});

module.exports = sequelize