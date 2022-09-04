const { DataTypes } = require("sequelize");
const { Rol } = require("./Rol");
module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    picture: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      defaultValue: null,
    },

    // address: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },  
    rol: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
      },
  });
};

// la tabla favorites es una tabla intermedia que relaciona user_id con products_id, se crea en db.js
