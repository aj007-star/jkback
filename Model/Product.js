const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect'); // ✅ FIXED
const Category = require('./Category');

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
    defaultValue: 100
  },
});

Product.belongsTo(Category, { foreignKey: 'CategoryId' });

Product.sync()
  .then(() => {
    console.log('Product table has been created, if it did not already exist.');
  })
  .catch((error) => {
    console.error('Error creating Product table:', error.message);
  });

module.exports = Product;
