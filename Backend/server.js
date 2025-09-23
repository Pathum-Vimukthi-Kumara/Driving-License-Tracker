const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');



// Load environment variables
try {
    require('dotenv').config();
    console.log('Environment variables loaded. JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('Database host:', process.env.DB_HOST || '(not set in env)');
} catch (err) {
    console.error('Error loading .env file:', err);
}


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const app = express();


// CORS middleware (must be before all routes)
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://driving-license-tracker.vercel.app',
        'https://driving-license-tracker-tmrx.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests globally
app.options('*', cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://driving-license-tracker.vercel.app',
        'https://driving-license-tracker-tmrx.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));


try {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        console.log('Creating uploads directory');
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    app.use('/uploads', express.static(uploadsDir));
    console.log('Uploads directory configured');
} catch (err) {
    console.error('Error setting up uploads directory:', err);
}


try {
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);
    app.use('/auth', authRoutes); 
    app.use('/api/users', require('./routes/users'));
    app.use('/api/officers', require('./routes/officers'));
    app.use('/api/violations', require('./routes/violations'));
    app.use('/api/payments', require('./routes/payments'));
    app.use('/api/admin', require('./routes/admin'));
    console.log('All routes loaded successfully');
} catch (error) {
    console.error('Error setting up routes:', error);
}

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error', message: err.message });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
