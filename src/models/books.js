const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../db.js")
const queryInterface = sequelize.getQueryInterface();

//init DB if doesn't exist
let initDB = queryInterface.createTable('books', {
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
});

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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    freezeTableName: true,
    sequelize, // We need to pass the connection instance
    modelName: 'books', // We need to choose the model name
  });

  module.exports = Book