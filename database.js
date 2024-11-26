// Import required modules
const express = require('express');
const mysql = require('mysql2');

// Initialize Express app
const app = express();

// Creating connection to DBMS
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'softwaremaheli18',  
    port: 3306,  
    database: 'zero_hunger'
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

