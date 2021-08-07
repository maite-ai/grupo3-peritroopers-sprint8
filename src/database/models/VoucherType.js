'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {

  class VoucherType extends Model {
    
    static associate(models) {
      // hasMany
      VoucherType.hasMany(models.Purchase, {
          as: "purchases",
          foreignKey: 'voucherTypeId',
        })
    }
  }

  VoucherType.init({
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false
    }}, {
      sequelize,
      modelName: 'VoucherType',
      timestamps: false
    });

  return VoucherType

};