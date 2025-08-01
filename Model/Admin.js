const { DataTypes } = require('sequelize');
const { sequelize } = require('../Config/dbConnect');

const AdminDetail = sequelize.define('AdminDetail', {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isGoogleEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  facebookPixelId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googlePixelId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upi: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// 🚫 Removed sync() for production
// Avoid modifying DB schema at runtime in serverless environments

module.exports = AdminDetail;
