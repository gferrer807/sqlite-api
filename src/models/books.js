const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db.js")

const Book = sequelize.define('books2', {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    freezeTableName: true,
    sequelize, // We need to pass the connection instance
    modelName: 'books2', // We need to choose the model name
  });

  module.exports = Book