const { DataTypes } = require('sequelize');
const {Product} = require('./Product')
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
      validate: {
        notNull: { msg: "The score field cannot be null " },
        isNumeric: true,
        min: 0,
        max: 5,
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  });
};