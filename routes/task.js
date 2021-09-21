const express = require("express");
const Task = require("../models/task")
const router = express.Router();


router.get("/task", async (req, res) => {
    const task = await Task.find()
    res.json({ task })
})

router.get("/task/:id", async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.status(200).json({ task })
})

router.post("/task", async (req, res, next) => {
    req.Task = new Task()
    next()
}, saveAndEdit())

router.put("/:id", async (req, res, next) => {
    req.Task = await Task.findById(req.params.id)
    next()
}, saveAndEdit())

router.delete("/:id", async (req, res) => {
    await Task.deleteOne({ where: { _id: req.params.id }});
    res.send(`tarefa com ID ${req.params.id} deletada`)
    
})



function saveAndEdit() {
    return async (req, res) => {
        let Task = req.Task
        Task.description = req.body.description
        Task.done = req.body.done
        try {
            const saved = await Task.save();
            res.send("Tarefa salvo com sucesso")
        } catch(err) {
            res.send("Opa! deu um erro")
        }
    }
}



module.exports = router;