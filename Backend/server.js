const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/officers', require('./routes/officers'));
app.use('/api/violations', require('./routes/violations'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));

// Root route
app.get('/', (req, res) => {
    res.status(200).send('Driving License Tracking System API');
});

// Handle 404
app.use((req, res) => {
    console.log(`404 - Not found: ${req.originalUrl}`);
    res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
