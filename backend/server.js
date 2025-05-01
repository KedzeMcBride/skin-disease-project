const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "skin_diagnostic_system",
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO db_user (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to Register User" });
        }
        return res.status(200).json({ message: "User Registered Successfully", data });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM db_user WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("ERROR FAILED TO LOGIN");
        }
        if (data.length > 0) {
            return res.status(200).json("LOGGED IN SUCCESSFULLY");
        } else {
            return res.status(401).json("FAILED TO LOG IN");
        }
    });
});


const server = http.createServer(app);

server.on('clientError', (err, socket) => {
    console.warn('Client error:', err.message);
    socket.destroy();
});

server.listen(8081, () => {
    console.log("Server running on port 8081");
});
