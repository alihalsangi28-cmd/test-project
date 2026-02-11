const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_system'
});

// Connect to DB
db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.send('Database error');
        }

        if (result.length > 0) {
            res.send('✅ Login successful');
        } else {
            res.send('❌ Invalid username or password');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
