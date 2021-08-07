'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    
  class UserCategory extends Model{

    static associate(models) {
      // hasMany
      UserCategory.hasMany(models.User, {
      foreignKey: 'userCategoryId',
      as: "users"
      })
    }
  };

  UserCategory.init({
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
      modelName: 'UserCategory',
      timestamps: false
    });
  
  return UserCategory

};