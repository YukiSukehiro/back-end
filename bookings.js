const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "services"
})

app.post('/services', (req, res) => {
    const sql = "INSERT INTO bookings ( `NAME` , `ADDRESS` , `PHONE NUMBER`, `EMAIL`, `DATE` ) VALUES (?)";
    const values = [
        req.body.name,
        req.body.address,
        req.body.phonenumber,
        req.body.email,
        req.body.date
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/bookings', (req, res) => {
    const sql = "SELECT * FROM bookings WHERE `NAME` = ? AND `ADDRESS` = ? `PHONE NUMBER` = ? AND `EMAIL` = ? AND `DATE` = ? ";
    db.query(sql, [req.body.name, req.body.address, req.body.phonenumber, req.body.email, req.body.date ], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.lenght > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    })
})

app.listen(8081, () => {
    console.log("listening");
})