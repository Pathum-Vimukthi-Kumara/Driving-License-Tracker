const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let dbConfig;

// Try to load config from JSON file first
try {
    const configPath = path.join(__dirname, '../config/database.json');
    if (fs.existsSync(configPath)) {
        dbConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        console.log('Database config loaded from JSON file');
    }
} catch (err) {
    console.log('Could not load database config from JSON file:', err.message);
}

// Fall back to environment variables if JSON config is not available
if (!dbConfig) {
    dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306
    };
    console.log('Database config loaded from environment variables');
}

// Filter out any invalid MySQL connection properties
const validMySQLOptions = [
    'host', 'port', 'user', 'password', 'database', 
    'charset', 'timezone', 'connectTimeout', 'ssl',
    'debug', 'trace', 'multipleStatements', 'flags'
];

// Create a clean config with only valid MySQL options
const cleanDbConfig = {};
for (const option of validMySQLOptions) {
    if (dbConfig[option] !== undefined) {
        cleanDbConfig[option] = dbConfig[option];
    }
}

// Add a reasonable connection timeout
if (!cleanDbConfig.connectTimeout) {
    cleanDbConfig.connectTimeout = 10000; // 10 seconds
}

// Log the database config (without sensitive info)
console.log('Database connection attempt to:', cleanDbConfig.host);

let connection;

try {
    // Create connection with clean config
    connection = mysql.createConnection(cleanDbConfig);
    
    // Add reconnection handling
    connection.on('error', function(err) {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Attempting to reconnect to database...');
            connection = mysql.createConnection(cleanDbConfig);
        } else {
            throw err;
        }
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            return;
        }
        console.log('Connected to MySQL database successfully');
    });
} catch (error) {
    console.error('Fatal database connection error:', error);
    // Don't throw the error, just log it - this prevents app crash
}

module.exports = connection;
