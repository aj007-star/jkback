const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { connectToDB } = require('../Config/dbConnect');
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

// ✅ DB Connection Middleware
app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        console.error('❌ DB connection failed:', err.message);
        return res.status(500).json({ message: 'Database connection error' });
    }
});

app.use('/api', Routes);

// ❗ Optional — if needed, serve static files from here
// const productImagesDir = path.join(__dirname, '../ProductImages');
// app.use('/ProductImages', express.static(productImagesDir));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({
        message: 'An error occurred!',
        error: err.message,
        success: false
    });
});

module.exports = serverless(app);
