const express = require("express");
const { connection } = require("./config/db");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`The server is running at port ${PORT} and db is connected`);
    } catch (error) {
        console.log(error);
    }
})