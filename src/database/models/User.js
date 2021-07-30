'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {  

  class User extends Model {
    
    static associate(models) {
      // hasMany
      User.hasMany(models.Purchase, {
        foreignKey: 'userId',
        as: "purchases"
      })
      // belongsTo
      User.belongsTo(models.UserCategory, {
        foreignKey: 'userCategoryId',
        as: 'userCategories'
      })
    }
  };
   
User.init({
  id: {
  type: dataTypes.INTEGER.UNSIGNED,
  primaryKey: true,
  autoIncrement: true,
  },
  name: {
    type: dataTypes.STRING(25),
    allowNull: false
  },
  lastName: {
    type: dataTypes.STRING(25),
    allowNull: false
  },
  birthDate: {
    type: dataTypes.DATE,
    allowNull: false
  },
  address: {
    type: dataTypes.STRING(120),
    allowNull: false
  },
  email: {
    type: dataTypes.STRING(95),
    allowNull: false
  },
  password: {
    type: dataTypes.STRING(255),
    allowNull: false
  },
  avatar: {
    type: dataTypes.STRING(150),
    allowNull: false
  },
  userCategoryId: dataTypes.INTEGER.UNSIGNED,
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

return User;
};