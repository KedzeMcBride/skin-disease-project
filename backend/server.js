const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // ✅ for parsing JSON bodies

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "skin_diagnostic_system",
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to Register User" });
        }
        return res.status(200).json({ message: "User Registered Successfully", data });
    });
});

app.listen(3306, () => {
    console.log("Server running on port 3306");
});
