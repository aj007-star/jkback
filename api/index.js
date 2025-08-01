// Force Vercel to include mysql2 (required by Sequelize)
require('mysql2');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const serverless = require('serverless-http');

const { connectToDB } = require('../Config/dbConnect');
const Routes = require('../Routes/Routers');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS
app.use(cors({
  origin: 'https://jkfront.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Health check route BEFORE DB middleware
app.get('/api/ping', (req, res) => {
  console.log('✅ Ping hit');
  res.status(200).json({ message: 'API is alive 🚀' });
});

// ✅ DB connect middleware — skip for `/ping`
app.use(async (req, res, next) => {
  if (req.originalUrl === '/api/ping') return next(); // avoid DB for ping
  try {
    await connectToDB();
    next();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    res.status(500).json({ message: 'Database connection error' });
  }
});

// All routes
app.use('/api', Routes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    message: 'An error occurred!',
    error: err.message,
    success: false
  });
});

module.exports = serverless(app);
