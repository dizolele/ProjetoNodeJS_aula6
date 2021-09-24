require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const taskRouter = require("./routes");
const Task = require("./models");
const connectToDataBase = require("./DataBase")

connectToDataBase();



app.use(express.json());
app.use(taskRouter);

const port = 5000

app.listen(port, () => {
    console.log(`Backend funcionando no http://localhost:${port}`)
})