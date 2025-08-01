const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('u189645309_jk', 'u189645309_jk', 'Shop@8899', {
  host: 'srv1645.hstgr.io',
  dialect: 'mysql',
  pool: {
    max: 5,       // max connections
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 10000
  }
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
