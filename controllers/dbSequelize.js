const { Sequelize } = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
    // SQLite only
    storage: './libraries'
  });

  var Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      field: 'title' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    available: {
        type: Sequelize.BOOLEAN,
        field: 'available',
    },
    email: {
        type: Sequelize.STRING,
        field: 'email' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    email: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  
  User.sync({force: true}).then(function () {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });