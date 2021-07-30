'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // hasMany
      Brand.hasMany(models.Product, {
        foreignKey: 'brandId',
        as: "products"
      })
    }
  }
  
  Brand.init({
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
    modelName: 'Brand'
  });
  
  return Brand;

}

