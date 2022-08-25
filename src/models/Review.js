const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('review', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};