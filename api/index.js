// Force Vercel to include mysql2 (required by Sequelize)
require('mysql2');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

const { connectToDB } = require('../Config/dbConnect');
const Routes = require('../Routes/Routers');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS config
const corsOptions = {
  origin: 'https://jkfront.vercel.app', // adjust to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// DB Connection Middleware (runs once per function invocation)
app.use(async (req, res, next) => {
  try {
    await connectToDB(); // Authenticates Sequelize instance
    next();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    return res.status(500).json({ message: 'Database connection error' });
  }
});

// Your route handlers
app.use('/api', Routes);

// Optional: Serve images (uncomment if needed)
// const productImagesDir = path.join(__dirname, '../ProductImages');
// app.use('/ProductImages', express.static(productImagesDir));

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    message: 'An error occurred!',
    error: err.message,
    success: false
  });
});

// Export as a serverless function
module.exports = serverless(app);
