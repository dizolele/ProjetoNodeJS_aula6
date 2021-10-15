const Task = require("./models")

module.exports = {

    async todasTarefas (req, res) {
        const task = await Task.find().sort({createAt: "desc"})
        res.status(200).json({ task })
    },

    async umaTarefa (req, res) {
        const task = await Task.findById(req.params.id)
        res.status(200).json({ task })
    },

    post_Put (postPut) {
        return async (req, res) => {
            let task
            if(postPut === "post"){
                task = await new Task();
            } else if(postPut === "put"){
                task = await Task.findById(req.params.id)
            }

            task.description = req.body.description
            task.done = req.body.done

            try{
                await task.save()
                let msg = ""
                postPut === "post"  ?  msg = "Adicionado"  : msg = "Atualizado"
                res.status(200).json({message: `Tarefa ${msg} com sucesso`})
                
            } catch(error) {
                res.status(500).json({error: error.message})
            }
        }
    },

    async apagarTarefa (req, res) {
        try {
            await Task.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "Tarefa deletada no banco de dados"})
        } catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    



}