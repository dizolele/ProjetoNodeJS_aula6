const express = require("express");
const Task = require("./models")
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./../swagger.json");

router.use('/api-docs', swaggerUi.serve);


router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
    res.send("Bem-vindo a API de tarefas")
})

router.get("/tasks", async (req, res) => {
    const task = await Task.find({ })
    res.status(200).json({ task });
})

router.get("/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ task });
})

router.post("/tasks", async (req, res, next) => {
    req.Task = new Task
    next();
}, saveAndEdit())

router.put("/:id", async (req, res, next) => {
    req.Task = await Task.findById(req.params.id);
    next()
}, saveAndEdit());

router.delete("/:id", async (req, res, next) => {
    req.Task = await Task.findByIdAndDelete(req.params.id)
    res.status(200).send("Tarefa deletada com sucesso")
})



function saveAndEdit() {
    return async (req, res) => {
        let Task = req.Task
        Task.description = req.body.description
        Task.done = req.body.done
        try {
            const saved = Task.save();
            res.status(200).send("tarefa salvo com sucesso");
        } catch(err) {
            res.status(400).send("Opa deu um erro")
        }
    }
}


module.exports = router;