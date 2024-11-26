const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();  // Load environment variables from .env

// Initialize Express app
const app = express();

// Creating connection to DBMS
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

// Actual Connection
db.connect((err) => {
    if (err) {
        console.log(`Error connecting to the database:`, err.stack);
        return;
    }
    console.log(`Successfully connected to the database`);
});

// Exporting the connection
module.exports = db;


