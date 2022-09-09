const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('order', {
    number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderProducts:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipping:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
      allowNull: false,
      defaultValue: 'created',
    },
  });
};
