const { DataTypes } = require("sequelize");
const { Categorie } = require('./Categorie')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,

      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "The brand field cannot be null " },
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "The product name field cannot be null " },
          notEmpty: true,
        },
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "The product price field cannot be null " },
          isNumeric: true,
        },
      },

      currency: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "The product currency field cannot be null " },
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "The product description field cannot be null " },
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "The product rating field cannot be null " },
          isNumeric: true,
          min: 0,
          max: 5,
        },
      },
      product_type: { 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "The product type field cannot be null " },
          notEmpty: true,
        },
      },
      tag_list: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      product_colors: { 
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        validate: {
          notNull: { msg: "The product colors field cannot be null " },
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};