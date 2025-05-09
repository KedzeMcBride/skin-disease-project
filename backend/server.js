const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "skin_diagnostic_system",
});


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    //password hashing
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = "INSERT INTO db_user (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to Register User" });
            }
            return res.status(200).json({ message: "User Registered Successfully" });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error encrypting password" });
    }
});
// Login endpoint with password comparison
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received:", req.body); // Debug incoming request

    const sql = "SELECT * FROM db_user WHERE email = ?";
    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json("ERROR FAILED TO LOGIN");
        }
        if (data.length > 0) {
            try {
                console.log("Plain text password:", password);
                console.log("Hashed password from database:", data[0].password);

                const isMatch = await bcrypt.compare(password, data[0].password);
                console.log("Password comparison result:", isMatch);

                if (isMatch) {
                    console.log("Login successful for user:", email);
                    return res.status(200).json("LOGGED IN SUCCESSFULLY");
                } else {
                    console.log("Invalid credentials for user:", email);
                    return res.status(401).json("INVALID CREDENTIALS");
                }
            } catch (compareErr) {
                console.error("Password comparison error:", compareErr);
                return res.status(500).json("ERROR COMPARING PASSWORD");
            }
        } else {
            console.log("User not found:", email);
            return res.status(404).json("USER NOT FOUND");
        }
    });
});

//Area for chatting backend

const server = http.createServer(app);

server.on('clientError', (err, socket) => {
    console.warn('Client error:', err.message);
    socket.destroy();
});

server.listen(8081, () => {
    console.log("Server running on port 8081");
});