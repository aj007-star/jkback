const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const sequelize=require('./Config/dbConnect');
const Routes = require('./Routes/Routers');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors({
  origin: 'https://jkfront.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use('/api', Routes);
const productImagesDir = path.join(__dirname, 'ProductImages');
app.use('/ProductImages', express.static(productImagesDir));


app.use((err, req, res, next) => {
  console.error(err.stack);

  res.setHeader('Access-Control-Allow-Origin', 'https://jkfront.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // important: respond to preflight
  }
  next();
  res.status(500).json({ message: 'An error occurred!', error: err.message,success: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
