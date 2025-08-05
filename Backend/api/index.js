// Serverless entry point for Vercel

// Import the Express app but don't start the server
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Log environment details to help with debugging
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Working directory:', __dirname);

// Load environment variables
try {
    require('dotenv').config();
    console.log('Environment variables loaded. JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('Database host:', process.env.DB_HOST || '(not set in env)');
} catch (err) {
    console.error('Error loading .env file:', err);
}

// Global error handlers for unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const app = express();

// Middleware with error handling
app.use(cors({
    origin: ['http://localhost:3000', 'https://driving-license-tracker.vercel.app', 'https://driving-license-tracker-tmrx.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

// Log all requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - handle differently in production vs development
if (process.env.NODE_ENV === 'production') {
    console.log('In production - skipping local file system operations');
    // In serverless environments, static file handling is different
    app.use('/uploads', (req, res, next) => {
        // This is just a placeholder - in production you should use a proper file storage service like S3
        res.status(404).json({ error: 'File not found in serverless environment' });
    });
} else {
    // Local development
    const uploadsDir = path.join(__dirname, '../uploads');
    if (fs.existsSync(uploadsDir)) {
        app.use('/uploads', express.static(uploadsDir));
        console.log('Uploads directory exists and is served statically');
    } else {
        console.log('Uploads directory does not exist');
        try {
            fs.mkdirSync(uploadsDir, { recursive: true });
            app.use('/uploads', express.static(uploadsDir));
            console.log('Created uploads directory');
        } catch (err) {
            console.error('Failed to create uploads directory:', err);
        }
    }
}

// Import and use routes
const authRoutes = require('../routes/auth');
const usersRoutes = require('../routes/users');
const officersRoutes = require('../routes/officers');
const violationsRoutes = require('../routes/violations');
const adminRoutes = require('../routes/admin');
const paymentsRoutes = require('../routes/payments');

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/officers', officersRoutes);
app.use('/api/violations', violationsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentsRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Driving License Tracker API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

// Special middleware for debugging in serverless environments
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        req.isServerless = true;
        req.startTime = Date.now();
        
        // Capture original end function to log response info
        const originalEnd = res.end;
        res.end = function(...args) {
            const responseTime = Date.now() - req.startTime;
            console.log(`[Serverless] Response: ${res.statusCode} in ${responseTime}ms`);
            return originalEnd.apply(this, args);
        };
        
        next();
    });
}

// Export the Express API for serverless use
module.exports = app;
