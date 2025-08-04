const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Global error handlers for unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route for Vercel
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'API is running',
        env: process.env.NODE_ENV || 'development' 
    });
});

// Routes with error handling
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/users', require('./routes/users'));
    app.use('/api/officers', require('./routes/officers'));
    app.use('/api/violations', require('./routes/violations'));
    app.use('/api/payments', require('./routes/payments'));
    app.use('/api/admin', require('./routes/admin'));
} catch (error) {
    console.error('Error setting up routes:', error);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

const PORT = process.env.PORT || 5000;

// For local development
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// For Vercel deployment
module.exports = app;
