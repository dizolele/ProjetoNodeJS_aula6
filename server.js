const express = require("express");
const mongoose = require("mongoose");
const app = express();
const taskRouter = require("./routes/task");
const Task = require("./models/task");



mongoose.connect("mongodb+srv://dizolele:meli@cluster0.nqr1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
{ useNewUrlParser:true, 
useUnifiedTopology: true})

const db = mongoose.connection;
db.on("error", (error) => console.console.error(error));
db.once("open", () => console.log("conectado com o banco de dados"))

app.use(express.json());
app.use(taskRouter);

const port = 5000

app.listen(port, () => {
    console.log(`Backend funcionando no http://localhost:${port}`)
})