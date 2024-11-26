
const express = require('express');
const db = require('./database'); 
const app = express();
const port = 3100; // 

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Deveoping core features 

// Set up a default route
app.get('/', (req, res) => {
    res.send('Welcome to the Zero Hunger API!');
});

// Displaying data from donors
app.get('/donors', (req, res) => {
    db.query('SELECT * FROM donors', (err, results) => {
        if (err) {
            console.error('Database query error:', err.message);
            return res.status(500).json({ error: 'Error retrieving data from the database' });
        }
        res.status(200).json(results);
    });
});

//Adding data in donors
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

//Updating a donor in donors
app.put('/donors/:id', (req, res) => {
    const donorId = req.params.id; 
    const donor_contact_email = "jason@gmail.com";
    const donor_frequency = "weekly";
    const donor_location = "nairobi-kenya";
    const sql = 'UPDATE donors SET donor_contact_email = ?, donor_frequency = ?, donor_location = ? WHERE id = ?';

    db.query(sql, [donor_contact_email, donor_frequency, donor_location, donorId], (err, result) => {
    if (err) {
        console.error(err); 
        return res.status(500).send('Error updating donor.');
    }
    res.send('Donor updated successfully!');
    });
});

//Deleting data from donors
app.delete('/donors/:id', (req, res) => {
    const donorId = req.params.id;
    const sql = 'DELETE FROM donors WHERE id = 301';
    db.query(sql, [donorId], (err, result) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error deleting donor.');
    }
    res.send('Donor deleted successfully!');
    });
});


//Implementing the logic for any specific features
// User authetication


const bcrypt = require('bcrypt');


app.use(express.json()); 

app.post('/register', async (req, res) => {
const { username, password } = req.body;

try {
// Hash the password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Insert into the database
const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
db.query(sql, [username, hashedPassword], (err, result) => {
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

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // 

app.post('/login', async (req, res) => {
const { username, password } = req.body;

// Checking  if the user exists in the database

const sql = 'SELECT * FROM users WHERE username = janedoe';
db.query(sql, [username], async (err, results) => {
if (err) {
console.error('Error querying database:', err);
return res.status(500).send('Error logging in.');
}

if (results.length === 0) {
return res.status(404).send('User not found.');
}

const user = results[0]; // The user record from the database

// Comparing the provided password with the hashed password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(401).send('Invalid credentials.');
    }

// Generating  a JWT
const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
expiresIn: '1h'
});

res.json({ message: 'Login successful!', token });
});
});





// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});