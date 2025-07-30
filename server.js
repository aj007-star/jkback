const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./Config/dbConnect');
const Routes = require('./Routes/Routers');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: 'https://jkfront.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight OPTIONS requests

// Your routes
app.use('/api', Routes);

// Serve product images statically
const productImagesDir = path.join(__dirname, 'ProductImages');
app.use('/ProductImages', express.static(productImagesDir));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred!',
    error: err.message,
    success: false
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
