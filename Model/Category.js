const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect'); // Destructure sequelize correctly

// Define the Category model
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// 🚫 DO NOT SYNC in production serverless environments like Vercel
// Category.sync(); ← Comment this out in production

module.exports = Category;
