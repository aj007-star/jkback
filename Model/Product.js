const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect'); // Correctly imported
const Category = require('./Category');

// Define the Product model
const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subprice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  productImages: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 100,
  },
});

// Define relationships
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

// 🚫 DO NOT SYNC IN PRODUCTION SERVERLESS DEPLOYMENTS LIKE VERCEL
// Product.sync(); ← remove or comment this in production

module.exports = Product;
