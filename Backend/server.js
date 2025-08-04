const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Log the environment for debugging
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Working directory:', __dirname);
console.log('Available files:', require('fs').readdirSync(__dirname));

// Middleware
app.use(cors({
    origin: ['https://driving-license-tracker.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
try {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!require('fs').existsSync(uploadsDir)) {
        require('fs').mkdirSync(uploadsDir, { recursive: true });
    }
    app.use('/uploads', express.static(uploadsDir));
} catch (err) {
    console.error('Error setting up uploads directory:', err);
}

// Health check route - important for Vercel
app.get('/api/health', (req, res) => {
    return res.status(200).json({
        status: 'ok',
        message: 'API is running',
        env: process.env.NODE_ENV,
        time: new Date().toISOString()
    });
});

// Root API route
app.get('/api', (req, res) => {
    return res.status(200).json({
        message: 'Driving License Tracking System API',
        version: '1.0.0',
        endpoints: ['/api/auth', '/api/users', '/api/officers', '/api/violations', '/api/payments', '/api/admin']
    });
});

// Root route - needed for Vercel
app.get('/', (req, res) => {
    return res.status(200).send('Driving License Tracking System API Server');
});

// Routes - wrapped in try-catch for better error reporting
try {
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/users', require('./routes/users'));
    app.use('/api/officers', require('./routes/officers'));
    app.use('/api/violations', require('./routes/violations'));
    app.use('/api/payments', require('./routes/payments'));
    app.use('/api/admin', require('./routes/admin'));
} catch (err) {
    console.error('Error loading routes:', err);
}

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Server error', 
        message: err.message,
        path: req.path
    });
});

// 404 handler - must be last
app.use((req, res) => {
    console.log(`404 - Not found: ${req.originalUrl}`);
    res.status(404).json({ 
        error: 'Not Found', 
        path: req.originalUrl 
    });
});

const PORT = process.env.PORT || 5000;

// Use modern export for Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for serverless environments like Vercel
module.exports = app;
