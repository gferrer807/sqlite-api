const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db.js")

const Book = sequelize.define('books', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
    },
    available: {
        type: DataTypes.BOOLEAN
    },
    email: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
  }, {
    freezeTableName: true,
    sequelize, // We need to pass the connection instance
    modelName: 'books', // We need to choose the model name
  });

  module.exports = Book