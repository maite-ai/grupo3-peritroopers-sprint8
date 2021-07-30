'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.hasMany(models.Product, {
        foreignKey: 'colorId',
        as: 'products'
      }); 
    }
  }
  
  Color.init({
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Color'
  });

  return Color

}