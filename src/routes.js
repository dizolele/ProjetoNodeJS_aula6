const express = require("express");
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./../swagger.json")

const taskControllers = require("./taskcontrollers")
const taskMiddelwares = require("./taskmiddelwares")


router.use('/api-docs', swaggerUi.serve);


router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/", (req, res) => {
    res.send("Bem-vindo a API de tarefas")
})

router.get("/tasks", taskControllers.todasTarefas);

router.get("/task/:id", taskMiddelwares.checarId, taskControllers.umaTarefa);

router.post("/task", taskControllers.post_Put("post"));

router.put("/task/:id", taskControllers.post_Put("put"));

router.delete("/:id", taskControllers.apagarTarefa);









module.exports = router;