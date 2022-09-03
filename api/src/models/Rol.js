const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('rol', {
    // id:{
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   allowNull: false
    // },
    rolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },    
  });
};
