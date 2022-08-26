const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      defaultValue: null
    },

    address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    rolId: {
      type: DataTypes.UUID,
      allowNull: false,
    },


  });
};

// la tabla favorites es una tabla intermedia que relaciona user_id con products_id, se crea en db.js
