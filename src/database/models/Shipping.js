'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
  class Shipping extends Model {
    static associate(models) {
      // hasMany
      Shipping.hasMany(models.Purchase, {
          foreignKey: 'shippingId',
          as: "purchases"
        });
    }
  }

  Shipping.init({
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    number: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    },
    floor: {
      type: dataTypes.INTEGER(11),
      allowNull: true
    },
    apartment: {
      type: dataTypes.STRING(5),
      allowNull: true
    },
    city: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    province: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    postalCode: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Shipping'
  });

  return Shipping

}