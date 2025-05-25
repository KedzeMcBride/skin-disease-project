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

//Registration area begin
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
    console.log("Login request received:", req.body); 

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
                    return res.status(200).json({message:"LOGGED IN SUCCESSFULLY", id: data[0].id, name: data[0].name, email: data[0].email });
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

// getting user details from db_user table
// and sending it to the frontend
app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    const sql = "SELECT name, email, profile_picture, address, city, state, zipCode, country, phone, dateOfBirth FROM db_user WHERE email = ?";    db.query(sql, [email], (err, results) => {
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

// Update user details in db_user table
// and send the updated data back to the frontend
app.put('/user/:email', (req, res) => {
    const { email } = req.params;
    const { name, profilePicture, address, city, state, zipCode, country, phone, dateOfBirth } = req.body;
    const sql = `
        UPDATE db_user 
        SET name = ?, profile_picture = ?, address = ?, city = ?, state = ?, zipCode = ?, country = ?, phone = ?, dateOfBirth = ?
        WHERE email = ?
    `;
    db.query(
        sql,
        [name, profilePicture, address, city, state, zipCode, country, phone, dateOfBirth, email], // <-- FIXED
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Failed to update user" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        }
    );
});
//POST FOR STORING USER CONDITIONS
app.post('/db_user/:email/conditions', (req, res) => {
    const { email } = req.params;
    const { condition, diagnosedDate, severity, treatment, status } = req.body;
    const sql = `
        INSERT INTO user_conditions (email, conditions, diagnosedDate, severity, treatment, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [email, condition, diagnosedDate, severity, treatment, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to add condition" });
        }
        return res.status(200).json({ message: "Condition added successfully", id: result.insertId });
    });
});
// Endpoint to store user conditions

// GET user conditions
app.get('/db_user/:email/conditions', (req, res) => {
    const { email } = req.params;
    const sql = "SELECT * FROM user_conditions WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to fetch conditions" });
        }
        return res.status(200).json(results);
    });
});
// GET endpoint to retrieve user conditions


//Delete user conditions
app.delete('/db_user/:email/conditions/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM user_conditions WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to delete condition" });
        }
        return res.status(200).json({ message: "Condition deleted successfully" });
    });
});
//End of delete user conditions


// START USER DOCTOR APPOINTMENT
app.post('/appointments', (req, res) => {
    const { user_id, user_name, doctor_id, appointment_date } = req.body;
    const sql = `
        INSERT INTO appointments (user_id, user_name, doctor_id, appointment_date)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [user_id, user_name, doctor_id, appointment_date], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to book appointment" });
        }
        return res.status(200).json({ message: "Appointment booked", id: result.insertId });
    });
});
// ENDPOINT TO BOOK AN APPOINTMENT

// LOGIN SPECIALLY FOR ADMIN
app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Admin login request received:", req.body); // Log the request body 

    const sql = "SELECT * FROM db_administrator WHERE admin_email = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            console.error("Admin login DB error:", err);
            return res.status(500).json({ message: "Server error" });
        }
        if (data.length > 0) {
            console.log("Admin found:", data[0].admin_email); // Log the found admin email
            console.log("Plain text password:", password);
            // Compare plain text password
            if (password === data[0].admin_password) {
                return res.status(200).json({ message: "ADMIN LOGGED IN", email: data[0].admin_email });
            } else {
                return res.status(401).json({ message: "INVALID ADMIN CREDENTIALS" });
            }
        } else {
            return res.status(404).json({ message: "ADMIN NOT FOUND" });
        }
    });
});
//END OF ADMIN LOGIN



const server = http.createServer(app);

server.on('clientError', (err, socket) => {
    console.warn('Client error:', err.message);
    socket.destroy();
});

server.listen(8081, () => {
    console.log("Server running on port 8081");
});