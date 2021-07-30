'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class Order extends Model {
      static associate(models) {
        // belongsTo
        Order.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'products'
        });
        // belongsTo
        Order.belongsTo(models.Purchase, {
            foreignKey: 'purchaseId',
            as: 'purchases'
        });
      }
    }
  
    Order.init({
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: dataTypes.INTEGER(11),
        allowNull: false
      },
      subtotal: {
        type: dataTypes.DECIMAL(11, 2),
        allowNull: false
      },
      discount: {
        type: dataTypes.INTEGER(11),
        allowNull: true
      },
      productId: dataTypes.INTEGER.UNSIGNED,
      purchaseId: dataTypes.INTEGER.UNSIGNED,
    }, {
      sequelize,
      modelName: 'Order'
    });

    return Order

}
