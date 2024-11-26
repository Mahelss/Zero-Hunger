const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database'); 
require('dotenv').config();

const app = express();
const port = 3100; 
const SECRET_KEY = process.env.SECRET_KEY || 'your_secure_secret_key';

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Zero Hunger API!');
});

app.get('/donors', (req, res) => {
    db.query('SELECT * FROM donors', (err, results) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Error retrieving data' });
        }
        res.status(200).json(results);
    });
});

app.post('/donors', (req, res) => {
    const sql = `INSERT INTO donors (id, donor_contact_email, donor_frequency, donor_location) VALUES (302, 'jason.kagwe@gmail.com', 'weekly', 'Nairobi_Kenya')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error adding donor:', err);
            return res.status(500).send('Error adding donor.');
        }
        res.status(201).send('Donor added successfully!');
    });
});

app.put('/donors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'UPDATE donors SET donor_contact_email = ?, donor_frequency = ?, donor_location = ? WHERE id = ?';
    const values = ['jason@gmail.com', 'weekly', 'nairobi-kenya', id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating donor.');
        }
        res.send('Donor updated successfully!');
    });
});

app.delete('/donors/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM donors WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting donor.');
        }
        res.send('Donor deleted successfully!');
    });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Error registering user.');
            }
            res.status(201).send('User registered successfully!');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing registration.');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';

    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error logging in.');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found.');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials.');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
