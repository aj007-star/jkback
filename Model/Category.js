const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect'); // ✅ Destructure sequelize correctly

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Category.sync()
  .then(() => {
    console.log('Category table has been created, if it did not already exist.');
  })
  .catch((error) => {
    console.error('Error creating Category table:', error);
  });

module.exports = Category;
