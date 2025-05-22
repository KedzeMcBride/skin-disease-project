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
                    return res.status(200).json({message:"LOGGED IN SUCCESSFULLY", name: data[0].name, email: data[0].email });
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

app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    const sql = "SELECT name, email, profile_picture, address, city, state, zipCode, country FROM db_user WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch user" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(results[0]);
    });
});

app.put('/user/:email', (req, res) => {
    const { email } = req.params;
    const { name, profilePicture, address, city, state, zipCode, country } = req.body;
    const sql = `
        UPDATE db_user 
        SET name = ?, profile_picture = ?, address = ?, city = ?, state = ?, zipCode = ?, country = ?
        WHERE email = ?
    `;
    db.query(
        sql,
        [name, profilePicture, address, city, state, zipCode, country, email],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to update user" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        }
    );
});

const server = http.createServer(app);

server.on('clientError', (err, socket) => {
    console.warn('Client error:', err.message);
    socket.destroy();
});

server.listen(8081, () => {
    console.log("Server running on port 8081");
});