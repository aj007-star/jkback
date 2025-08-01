const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Array of product objects (id, qty, price, etc.)'
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerDetail: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Name, phone, address, etc.'
  }
});

// 🚫 Avoid calling .sync() in production code
// It’s safer to use migrations or manual sync in scripts

module.exports = Order;
