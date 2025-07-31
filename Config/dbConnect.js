const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('u189645309_jk', 'u189645309_jk', 'Shop@8899', {
  host: 'srv1645.hstgr.io',
  dialect: 'mysql'
});

let isConnected = false;

async function connectToDB() {
  if (!isConnected) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected.');
      isConnected = true;
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error.message);
      throw error;
    }
  }
}

module.exports = { sequelize, connectToDB };
