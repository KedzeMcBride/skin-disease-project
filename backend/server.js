require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skin_diagnostic_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
    
    // Ensure tables exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS db_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();

// Registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT * FROM db_user WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        error: 'Email already registered',
        field: 'email'
      });
    }

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO db_user (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertId 
    });
  } catch (err) {
    console.error('Registration error:', err);
    
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        error: 'Email already registered',
        field: 'email'
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to register user'
    });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [users] = await pool.execute(
      'SELECT * FROM db_user WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        field: 'email'
      });
    }

    const user = users[0];
    
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        field: 'password'
      });
    }

    // Successful login
    res.json({ 
      message: 'Login successful',
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to login'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong!'
  });
});

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});