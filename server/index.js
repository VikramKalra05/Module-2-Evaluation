const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { postRouter } = require("./routes/postRouter");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "*"
}));

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter)

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