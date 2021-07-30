'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
  class Status extends Model {
    static associate(models) {
      // hasMany
      Status.hasMany(models.Purchase, {
          foreignKey: 'statusId',
          as: "purchases"
        });
    }
  }

  Status.init({
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false
    }
  },{
    sequelize,
    modelName: 'Status'
  });
  
  return Status

}