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
            return res.json("ERROR FAILED TO LOGIN")
        }
        if(data.length > 0){
            return res.json("LOGGED IN SUCCESSFULLY");
        }
        else{
            return res.json("FAILED TO LOG IN");
        }
    });
});


app.listen(5174, () => {
    console.log("Server running on port 5173");
});