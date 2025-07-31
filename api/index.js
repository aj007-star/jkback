const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('../Config/dbConnect');
const Routes = require('../Routes/Routers');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const corsOptions = {
  origin: 'https://jkfront.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api', Routes);

// Comment this if Vercel crashes here
// const productImagesDir = path.join(__dirname, '../ProductImages');
// app.use('/ProductImages', express.static(productImagesDir));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred!',
    error: err.message,
    success: false
  });
});

// ✅ IMPORTANT: NO app.listen()
module.exports = serverless(app);
